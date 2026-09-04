import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TripPlan, TripMapLocation } from '../types';
import { extractMapLocationsFromPlan, getDestinationCenter } from '../services/mapService';

interface TripMapViewProps {
  plan?: TripPlan;
  destinationName?: string;
  locations?: TripMapLocation[];
  className?: string;
}

export const TripMapView: React.FC<TripMapViewProps> = ({
  plan,
  destinationName,
  locations: customLocations,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [activeLocation, setActiveLocation] = useState<TripMapLocation | null>(null);

  const destName = plan?.destinationName || destinationName || 'Destination';
  const locations = customLocations && customLocations.length > 0
    ? customLocations
    : (plan ? extractMapLocationsFromPlan(plan) : []);
  const centerCoords = getDestinationCenter(destName);
  const dailyItineraries = plan?.dailyItineraries || [];

  const filteredLocations = selectedDay === 'all'
    ? locations
    : locations.filter((loc) => loc.dayNumber === selectedDay || loc.category === 'stay');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up prior map instance if existing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map with standard CartoDB Voyager or OSM clean tiles
    const map = L.map(mapContainerRef.current, {
      center: [centerCoords.lat, centerCoords.lng],
      zoom: centerCoords.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Clean, aesthetic light tiles (CartoDB Positron / OpenStreetMap fallback)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Subtle attribution
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; OpenStreetMap & CartoDB')
      .addTo(map);

    // Zoom control in bottom left to stay out of header
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [destName]);

  // Update markers whenever filtered locations change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = L.latLngBounds([]);

    filteredLocations.forEach((loc) => {
      const isStay = loc.category === 'stay';
      const label = isStay ? 'STAY' : loc.dayNumber ? `D${loc.dayNumber}` : '•';
      
      const customIcon = L.divIcon({
        className: 'custom-editorial-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
            <div class="${
              isStay ? 'bg-[#1A1A1A] text-white border-2 border-white' : 'bg-white text-[#1A1A1A] border-2 border-[#1A1A1A]'
            } shadow-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-none font-sans whitespace-nowrap">
              ${label}
            </div>
            <div class="absolute -bottom-1 w-1.5 h-1.5 bg-[#1A1A1A] rotate-45"></div>
          </div>
        `,
        iconSize: [36, 24],
        iconAnchor: [18, 24],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveLocation(loc);
        map.panTo([loc.lat, loc.lng], { animate: true });
      });

      markersRef.current.push(marker);
      bounds.extend([loc.lat, loc.lng]);
    });

    if (filteredLocations.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [filteredLocations]);

  const handleSelectLocation = (loc: TripMapLocation) => {
    setActiveLocation(loc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([loc.lat, loc.lng], 14, { animate: true });
    }
  };

  return (
    <div className={`w-full bg-white border border-[#E5E5E5] flex flex-col overflow-hidden ${className}`}>
      {/* Map Header & Controls */}
      <div className="p-4 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F7]">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold">
            <span className="material-symbols-outlined text-[14px] text-[#1A1A1A]">pin_drop</span>
            <span>Interactive Cartography • {destName}</span>
          </div>
          <h3 className="font-serif italic text-base text-[#1A1A1A] mt-0.5">
            Geographic Route & Curated Waypoints
          </h3>
        </div>

        {/* Day Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold border transition-colors cursor-pointer whitespace-nowrap ${
              selectedDay === 'all'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
            }`}
          >
            All Locations
          </button>
          {dailyItineraries.map((d) => (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => setSelectedDay(d.dayNumber)}
              className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                selectedDay === d.dayNumber
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
              }`}
            >
              Day {d.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Map Display Viewport */}
      <div className="relative w-full h-80 sm:h-96 bg-[#F5F2ED]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Active Location Card overlay */}
        {activeLocation && (
          <div className="absolute top-3 right-3 left-3 sm:left-auto sm:w-72 z-20 bg-white/95 backdrop-blur-md border border-[#1A1A1A] p-3.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#999] font-bold block">
                  {activeLocation.dayNumber ? `Day ${activeLocation.dayNumber}` : 'Accommodation'} • {activeLocation.category.toUpperCase()}
                </span>
                <h4 className="text-xs font-bold text-[#1A1A1A] mt-0.5">
                  {activeLocation.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveLocation(null)}
                className="text-[#999] hover:text-black text-xs p-1"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-[#666] mt-1 line-clamp-2 leading-relaxed font-light">
              {activeLocation.description}
            </p>
            {activeLocation.costLabel && (
              <div className="mt-2 pt-2 border-t border-[#E5E5E5] flex justify-between items-center text-[10px]">
                <span className="text-[#999] uppercase tracking-wider">Estimated Cost</span>
                <span className="font-bold text-[#1A1A1A]">{activeLocation.costLabel}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Waypoint Quick-Selector Strip */}
      <div className="p-3 bg-white border-t border-[#E5E5E5] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[9px] uppercase tracking-widest text-[#999] font-semibold shrink-0 pl-1">
          Waypoints ({filteredLocations.length}):
        </span>
        {filteredLocations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => handleSelectLocation(loc)}
            className={`px-2.5 py-1 text-[10px] border whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              activeLocation?.id === loc.id
                ? 'bg-[#FAF9F7] text-black border-black font-bold'
                : 'bg-white text-[#666] border-[#E5E5E5] hover:text-black'
            }`}
          >
            {loc.dayNumber ? `D${loc.dayNumber}: ` : ''}{loc.title}
          </button>
        ))}
      </div>
    </div>
  );
};
