import React, { useState } from 'react';
import { TripPlan, DailyItinerary } from '../types';
import { CURRENCY_SYMBOLS } from '../services/currencyService';
import { getDestinationWeather } from '../services/weatherService';
import { extractMapLocationsFromPlan } from '../services/mapService';
import { TripMapView } from './TripMapView';
import { ShareTripModal } from './ShareTripModal';
import { PrintTripModal } from './PrintTripModal';

interface ItineraryViewProps {
  plan: TripPlan;
  onSaveTrip: (plan: TripPlan) => void;
  onBookTrip: (plan: TripPlan) => void;
  onAdjustBudget: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  plan,
  onSaveTrip,
  onBookTrip,
  onAdjustBudget,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);

  if (!plan) return null;

  const currencySymbol = CURRENCY_SYMBOLS[plan.query?.currency || 'USD'] || '$';

  // Weather data resolved dynamically or from plan
  const weather = plan.weatherData || getDestinationWeather(plan.destinationName || 'Destination', plan.datesRange || '');
  // Map locations resolved dynamically or from plan
  const mapLocations = plan.mapLocations && plan.mapLocations.length > 0 ? plan.mapLocations : extractMapLocationsFromPlan(plan);

  const handleSave = () => {
    onSaveTrip(plan);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const flightItem = plan.items.find((i) => i.category === 'flights');
  const stayItem = plan.items.find((i) => i.category === 'stay');
  const primaryAccommodation = plan.accommodations[0];
  const recommendations = plan.recommendations;

  const daysToRender: DailyItinerary[] = isAllExpanded
    ? plan.dailyItineraries
    : plan.dailyItineraries.filter((d) => d.dayNumber === selectedDayNumber);

  return (
    <div id="itinerary-view-container" className="flex flex-col w-full max-w-3xl mx-auto pb-24 pt-2">
      {/* Editorial Trip Header & Hero Summary */}
      <div className="px-4 sm:px-6 pb-6 border-b border-[#E5E5E5]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
              CURATED BESPOKE ITINERARY • {plan.query.travelStyle.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#666]">
              <span className="material-symbols-outlined text-[15px] text-[#1A1A1A]">calendar_today</span>
              <span>{plan.datesRange}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-tight font-normal">
                {plan.destinationName}
              </h1>
              <p className="text-xs text-[#666] mt-1 font-light">
                {plan.subtitle}
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="px-3 py-1.5 border border-[#E5E5E5] bg-white hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer transition-colors"
                title="Share Trip Itinerary"
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPrintOpen(true)}
                className="px-3 py-1.5 border border-[#E5E5E5] bg-white hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer transition-colors"
                title="Print or Export PDF"
              >
                <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                <span className="hidden sm:inline">PDF / Print</span>
              </button>

              <button
                type="button"
                onClick={onAdjustBudget}
                className="px-3 py-1.5 border border-[#E5E5E5] bg-white hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer transition-colors"
                title="Modify Budget and Preferences"
              >
                <span className="material-symbols-outlined text-[15px]">tune</span>
                <span className="hidden sm:inline">Adjust</span>
              </button>
            </div>
          </div>

          {/* Quick meta chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="border border-[#E5E5E5] px-3 py-1 bg-[#FAF9F7] text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold">
              {plan.query.durationDays} {plan.query.durationDays === 1 ? 'Day' : 'Days'}
            </span>
            <span className="border border-[#E5E5E5] px-3 py-1 bg-[#FAF9F7] text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold">
              {plan.query.travelers} {plan.query.travelers === 1 ? 'Traveler' : 'Travelers'}
            </span>
            <span className="border border-[#E5E5E5] px-3 py-1 bg-[#FAF9F7] text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold">
              Depart: {plan.startingLocation || 'Origin'}
            </span>
            <span className="border border-[#E5E5E5] px-3 py-1 bg-[#FAF9F7] text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold">
              {plan.query.travelStyle.toUpperCase()} TIER
            </span>
          </div>
        </div>
      </div>

      {/* Financial Intelligence Summary Card */}
      <div className="px-4 sm:px-6 my-6">
        <div className="p-6 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#999] font-medium">
                Financial Allocation
              </span>
              <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-bold mt-0.5">
                Target Budget vs Estimated Spend
              </span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border ${
                plan.isOverBudget
                  ? 'bg-[#FFF5F5] text-[#B91C1C] border-[#B91C1C]'
                  : 'bg-white text-black border-black'
              }`}
            >
              {plan.isOverBudget ? 'Over Budget' : 'Within Budget'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#E5E5E5]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#999]">Target Cap</span>
              <span className="text-xl font-light text-[#1A1A1A] mt-0.5">
                {currencySymbol}{plan.totalBudget.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#999]">Estimated</span>
              <span className="text-xl font-light text-[#1A1A1A] mt-0.5 font-bold">
                {currencySymbol}{plan.estimatedTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#999]">
                {plan.isOverBudget ? 'Deficit' : 'Surplus Buffer'}
              </span>
              <span
                className={`text-xl font-serif italic mt-0.5 ${
                  plan.isOverBudget ? 'text-[#B91C1C]' : 'text-[#1A1A1A]'
                }`}
              >
                {plan.isOverBudget
                  ? `-${currencySymbol}${plan.budgetDeficit.toLocaleString()}`
                  : `+${currencySymbol}${plan.surplus.toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Segmented budget gauge */}
          <div className="space-y-2">
            <div className="w-full bg-[#E5E5E5] h-1.5 flex overflow-hidden">
              <div
                className="bg-[#1A1A1A] h-full"
                style={{ width: `${plan.categoryShares.flights}%` }}
                title={`Flights: ${plan.categoryShares.flights}%`}
              ></div>
              <div
                className="bg-[#555] h-full"
                style={{ width: `${plan.categoryShares.stays}%` }}
                title={`Stays: ${plan.categoryShares.stays}%`}
              ></div>
              <div
                className="bg-[#888] h-full"
                style={{ width: `${plan.categoryShares.dining}%` }}
                title={`Dining: ${plan.categoryShares.dining}%`}
              ></div>
              <div
                className="bg-[#AAA] h-full"
                style={{ width: `${plan.categoryShares.activities}%` }}
                title={`Activities: ${plan.categoryShares.activities}%`}
              ></div>
              <div
                className="bg-[#CCC] h-full"
                style={{ width: `${plan.categoryShares.transit}%` }}
                title={`Local Transit: ${plan.categoryShares.transit}%`}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#666]">
              <span>{plan.percentAllocated}% of budget allocated</span>
              <button
                type="button"
                onClick={onAdjustBudget}
                className="text-[#1A1A1A] font-bold underline hover:text-black cursor-pointer"
              >
                Fine-tune Breakdown →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Curated Recommendations & Estimates */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A1A1A]">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
            Curated Recommendations
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-[#999]">
            Destination Intel
          </span>
        </div>

        {/* Recommendation Stack */}
        <div className="flex flex-col gap-4">
          {/* Card 1: How to Get There */}
          <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold block">
                  How to Get There • Origin: {plan.startingLocation || 'Departure City'}
                </span>
                <h3 className="text-sm font-serif italic text-[#1A1A1A] mt-0.5">
                  {flightItem?.title || `Flights to ${plan.destinationName}`}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  {currencySymbol}{flightItem ? flightItem.amount.toFixed(0) : '350'}
                </span>
                <span className="block text-[10px] text-[#666]">
                  {plan.query.travelers} pax roundtrip
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5] text-xs">
              <span className="text-[10px] uppercase tracking-wider text-black font-bold border border-black px-2 py-0.5">
                Recommended Carrier
              </span>
              <span className="text-[11px] text-[#666]">
                {flightItem?.details || 'Standard direct or 1-stop schedule'}
              </span>
            </div>
          </div>

          {/* Card 2: Where to Stay */}
          <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold block">
                  Where to Stay
                </span>
                <h3 className="text-sm font-serif italic text-[#1A1A1A] mt-0.5">
                  {primaryAccommodation?.name || stayItem?.title || `Curated Hotel in ${plan.destinationName}`}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  {currencySymbol}{stayItem ? stayItem.amount.toFixed(0) : '280'}
                </span>
                <span className="block text-[10px] text-[#666]">
                  {Math.max(1, plan.query.durationDays - 1)} nights (
                  {currencySymbol}{primaryAccommodation?.pricePerNight || Math.round((stayItem?.amount || 280) / Math.max(1, plan.query.durationDays - 1))}/nt)
                </span>
              </div>
            </div>
            {primaryAccommodation?.imageUrl && (
              <div className="relative w-full h-44 overflow-hidden mt-1 bg-[#FAF9F7]">
                <img
                  className="w-full h-full object-cover"
                  alt={primaryAccommodation.name}
                  src={primaryAccommodation.imageUrl}
                />
                <div className="absolute top-2 right-2 px-2 py-1 bg-white text-black font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  {primaryAccommodation.rating} ★ Curated
                </div>
                <div className="absolute bottom-2 left-2 px-3 py-1 bg-white/95 text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold">
                  {primaryAccommodation.location}
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Authentic Dishes & Food Areas */}
          <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold block">
                  Where to Eat & Authentic Dishes
                </span>
                <h3 className="text-sm font-serif italic text-[#1A1A1A] mt-0.5">
                  Local Flavors & Curated Markets
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  {currencySymbol}{plan.items.find((i) => i.category === 'dining')?.amount.toFixed(0) || '190'}
                </span>
                <span className="block text-[10px] text-[#666]">Food budget</span>
              </div>
            </div>

            {/* Food items */}
            {recommendations?.localFood && recommendations.localFood.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {recommendations.localFood.map((food, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAF9F7] border border-[#E5E5E5] text-xs">
                    <span className="font-bold text-[#1A1A1A] block">{food.dish}</span>
                    <span className="text-[11px] text-[#666] leading-relaxed block mt-0.5">
                      {food.description}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#999] block mt-1">
                      Est. {food.estCostRange}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Food Areas */}
            {recommendations?.foodAreas && recommendations.foodAreas.length > 0 && (
              <div className="pt-2 border-t border-[#E5E5E5]">
                <span className="text-[9px] uppercase tracking-widest text-[#999] block mb-1">
                  Top Food Neighborhoods:
                </span>
                <div className="flex flex-wrap gap-2">
                  {recommendations.foodAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2.5 py-1 bg-white border border-[#E5E5E5] text-[#1A1A1A]"
                    >
                      <strong className="font-semibold">{area.areaName}:</strong> {area.rec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Sightseeing & Cultural Highlights */}
          {recommendations?.placesToVisit && recommendations.placesToVisit.length > 0 && (
            <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold">
                  Must-See Places & Sightseeing
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#999]">
                  {recommendations.placesToVisit.length} Landmark Highlights
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendations.placesToVisit.map((place, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#1A1A1A] block">{place.title}</span>
                      <p className="text-[11px] text-[#666] mt-1 leading-relaxed">{place.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5E5E5] text-[10px]">
                      <span className="uppercase tracking-wider text-[#999]">
                        {place.tags?.[0] || 'Landmark'}
                      </span>
                      <span className="font-bold text-[#1A1A1A]">
                        {place.estCost === 0 ? 'Free Entry' : `${currencySymbol}${place.estCost}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card 5: Cultural Etiquette & Advice */}
          {recommendations?.culturalExperiences && recommendations.culturalExperiences.length > 0 && (
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A] font-bold">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="uppercase tracking-wider text-[10px]">Local Travel Etiquette</span>
              </div>
              {recommendations.culturalExperiences.map((exp, idx) => (
                <div key={idx} className="text-xs text-[#666] leading-relaxed pt-1">
                  <strong className="text-[#1A1A1A]">{exp.title}:</strong> {exp.description} — <em className="text-[#1A1A1A] font-serif">{exp.tip}</em>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weather Forecast & Seasonal Climate Section (STEP 8) */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E5E5E5] gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#1A1A1A]">partly_cloudy_day</span>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
                  Destination Climate & Weather Forecast
                </h3>
              </div>
              <p className="text-xs text-[#666] mt-0.5">
                Seasonal conditions for {plan.destinationName} during {plan.datesRange}
              </p>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[9px] uppercase tracking-wider font-bold text-amber-900 bg-amber-50 px-2 py-0.5 border border-amber-200">
                {weather.isDemoData ? 'Estimated Climate Data' : 'Live Satellite Feed'}
              </span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-[#999] font-bold">Temperature</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
                {weather.tempHighC}°C <span className="text-xs font-normal text-[#666]">/ {weather.tempLowC}°C</span>
              </span>
              <span className="text-[10px] text-[#666] mt-0.5">{weather.condition}</span>
            </div>

            <div className="p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-[#999] font-bold">Rainfall Chance</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
                {weather.rainfallChance}%
              </span>
              <span className="text-[10px] text-[#666] mt-0.5">Precipitation index</span>
            </div>

            <div className="p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-[#999] font-bold">Relative Humidity</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
                {weather.humidity}%
              </span>
              <span className="text-[10px] text-[#666] mt-0.5">Atmospheric comfort</span>
            </div>

            <div className="p-3 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-[#999] font-bold">Prime Season</span>
              <span className="text-xs font-bold text-[#1A1A1A] mt-1 leading-snug">
                {weather.bestSeason}
              </span>
              <span className="text-[10px] text-[#666] mt-0.5">Optimal travel window</span>
            </div>
          </div>

          {/* Packing Advice & Climate Summary */}
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A] font-bold">
              Curator's Packing Recommendations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {weather.packingAdvice.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[11px] text-[#1A1A1A] flex items-center gap-1 font-medium"
                >
                  <span className="material-symbols-outlined text-[13px] text-[#666]">check</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#666] italic mt-1 font-serif">
              "{weather.summary}"
            </p>
          </div>

          <div className="text-[10px] text-[#999] flex items-center justify-between border-t border-[#F0EDE8] pt-2">
            <span>Modular interface ready for Live Weather API integration</span>
            <span>Ref: {weather.sourceLabel}</span>
          </div>
        </div>
      </div>

      {/* Interactive Map & Locations Section (STEP 9) */}
      <div className="px-4 sm:px-6 mb-8">
        <TripMapView
          plan={plan}
          destinationName={plan.destinationName}
          locations={mapLocations}
          className="mb-0"
        />
      </div>

      {/* Section 2: Day-by-Day Timeline Itinerary */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1A1A1A]">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
            Day-by-Day Schedule
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAllExpanded(!isAllExpanded)}
              className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-bold underline hover:text-black cursor-pointer"
            >
              {isAllExpanded ? 'Show Single Day' : 'View All Days'}
            </button>
            <span className="text-[10px] uppercase tracking-widest text-[#999]">
              {plan.dailyItineraries.length} Days
            </span>
          </div>
        </div>

        {/* Day Selector Tabs (Dynamic for any number of days) */}
        {!isAllExpanded && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar" id="dayTabs">
            {plan.dailyItineraries.map((day) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDayNumber(day.dayNumber)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shrink-0 transition-all cursor-pointer border ${
                  selectedDayNumber === day.dayNumber
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#E5E5E5] hover:border-black'
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>
        )}

        {/* Render Days */}
        <div className="flex flex-col gap-6">
          {daysToRender.map((day) => (
            <div key={day.dayNumber} className="day-panel flex flex-col gap-3">
              <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold">
                    {day.dateStr} • Day {day.dayNumber}
                  </span>
                  <h3 className="text-sm font-serif italic text-[#1A1A1A] mt-0.5">
                    {day.title}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-black font-bold border border-black px-2 py-0.5 bg-white">
                  {currencySymbol}{day.estCost} est.
                </span>
              </div>

              {/* Timeline Rail */}
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E5E5E5]">
                {day.activities.map((act, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-6 top-1.5 w-[9px] h-[9px] bg-[#1A1A1A] ring-2 ring-white"></div>
                    <div className="bg-white p-4 border border-[#E5E5E5]">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#999]">
                        <span className="font-semibold text-[#1A1A1A]">{act.time}</span>
                        <span className="font-bold text-[#1A1A1A]">{act.costLabel}</span>
                      </div>
                      <div className="text-xs font-bold text-[#1A1A1A] mt-1">
                        {act.title}
                      </div>
                      <p className="text-xs text-[#666] mt-1 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Dining & Transit for the day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <div className="p-3 bg-white border border-[#E5E5E5] text-xs">
                  <span className="text-[9px] uppercase tracking-widest text-[#999] font-bold block mb-1">
                    Daily Meals
                  </span>
                  <div className="space-y-0.5 text-[11px] text-[#666]">
                    <div>
                      <strong className="text-[#1A1A1A]">Breakfast:</strong> {day.suggestedFood.breakfast}
                    </div>
                    <div>
                      <strong className="text-[#1A1A1A]">Lunch:</strong> {day.suggestedFood.lunch}
                    </div>
                    <div>
                      <strong className="text-[#1A1A1A]">Dinner:</strong> {day.suggestedFood.dinner}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E5E5] text-xs">
                  <span className="text-[9px] uppercase tracking-widest text-[#999] font-bold block mb-1">
                    Daily Transit
                  </span>
                  <div className="text-[11px] text-[#666]">
                    <div className="font-semibold text-[#1A1A1A]">{day.localTransit.mode}</div>
                    <p className="mt-0.5">{day.localTransit.details}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible toggle */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsAllExpanded(!isAllExpanded)}
            className="w-full py-3 px-4 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>
              {isAllExpanded
                ? 'Switch to Day-by-Day Tabs'
                : `View Complete ${plan.query.durationDays}-Day Schedule`}
            </span>
          </button>
        </div>
      </div>

      {/* Planning Notice & Estimate Disclaimer */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] text-[11px] text-[#666] leading-relaxed">
          <strong className="text-[#1A1A1A] font-semibold">Curated Planning Notice:</strong> All prices, flight routes, activity costs, and schedules are estimates modeled for personalized travel planning. Actual ticket and booking rates fluctuate by season and availability.
        </div>
      </div>

      {/* Floating Sticky Action Bottom Deck */}
      <div className="sticky bottom-16 sm:bottom-0 z-40 bg-[#FDFCFB]/95 backdrop-blur-md px-4 sm:px-6 py-4 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-3">
          {/* Save & Export Itinerary */}
          <button
            type="button"
            onClick={handleSave}
            className={`flex-1 py-3.5 px-3 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              savedFeedback || plan.isSaved
                ? 'bg-[#FAF9F7] text-black border-black'
                : 'bg-transparent hover:bg-black hover:text-white border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {savedFeedback || plan.isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{savedFeedback ? 'Saved ✓' : plan.isSaved ? 'Saved' : 'Save Trip'}</span>
          </button>

          {/* Book Complete Trip CTA */}
          <button
            type="button"
            onClick={() => onBookTrip(plan)}
            className="flex-[2] py-3.5 px-4 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Book Trip ({currencySymbol}{plan.estimatedTotal.toLocaleString()})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Share Modal Dialog (STEP 11) */}
      <ShareTripModal
        isOpen={isShareOpen}
        plan={plan}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Print & PDF Export Modal Dialog (STEP 12) */}
      <PrintTripModal
        isOpen={isPrintOpen}
        plan={plan}
        onClose={() => setIsPrintOpen(false)}
      />
    </div>
  );
};
