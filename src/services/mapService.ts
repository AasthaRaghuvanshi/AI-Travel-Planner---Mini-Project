import { TripMapLocation, TripPlan } from '../types';

/**
 * Known coordinate centerpoints for popular destinations.
 */
export const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  tokyo: { lat: 35.6762, lng: 139.6503, zoom: 12 },
  kyoto: { lat: 35.0116, lng: 135.7681, zoom: 13 },
  bali: { lat: -8.4095, lng: 115.1889, zoom: 11 },
  paris: { lat: 48.8566, lng: 2.3522, zoom: 13 },
  london: { lat: 51.5074, lng: -0.1278, zoom: 13 },
  dubai: { lat: 25.2048, lng: 55.2708, zoom: 12 },
  delhi: { lat: 28.6139, lng: 77.209, zoom: 12 },
  rome: { lat: 41.9028, lng: 12.4964, zoom: 13 },
  newyork: { lat: 40.7128, lng: -74.006, zoom: 12 },
  default: { lat: 35.0116, lng: 135.7681, zoom: 12 },
};

/**
 * Resolves map center coordinates for any destination name.
 */
export function getDestinationCenter(destination: string): { lat: number; lng: number; zoom: number } {
  const norm = destination.toLowerCase().replace(/[^a-z]/g, '');
  for (const [key, coords] of Object.entries(DESTINATION_COORDINATES)) {
    if (norm.includes(key)) {
      return coords;
    }
  }
  return DESTINATION_COORDINATES.default;
}

/**
 * Extracts all mapped places from a TripPlan, organizing them by Day.
 */
export function extractMapLocationsFromPlan(plan: TripPlan): TripMapLocation[] {
  const center = getDestinationCenter(plan.destinationName);
  const locations: TripMapLocation[] = [];

  // Add primary accommodation as Day 0 / Stay location
  if (plan.accommodations && plan.accommodations[0]) {
    locations.push({
      id: 'stay-primary',
      title: plan.accommodations[0].name,
      description: `Accommodation: ${plan.accommodations[0].location}`,
      lat: center.lat + 0.005,
      lng: center.lng - 0.004,
      category: 'stay',
      costLabel: `${plan.query.currency === 'INR' ? '₹' : '$'}${plan.accommodations[0].pricePerNight}/nt`,
    });
  }

  // Iterate daily itineraries to extract day-specific activities
  plan.dailyItineraries.forEach((day) => {
    day.activities.forEach((act, actIdx) => {
      // Deterministic slight offset so pins are spread realistically across city
      const angle = (day.dayNumber * 73 + actIdx * 47) % 360;
      const dist = 0.008 + ((day.dayNumber + actIdx) % 4) * 0.007;
      const rad = (angle * Math.PI) / 180;
      const offsetLat = Math.sin(rad) * dist;
      const offsetLng = Math.cos(rad) * dist;

      locations.push({
        id: `act-${day.dayNumber}-${actIdx}`,
        title: act.title,
        description: act.description,
        lat: center.lat + offsetLat,
        lng: center.lng + offsetLng,
        dayNumber: day.dayNumber,
        category: act.category === 'dining' ? 'dining' : act.category === 'transit' ? 'transit' : 'landmark',
        costLabel: act.costLabel,
      });
    });
  });

  return locations;
}
