import React, { useState } from 'react';
import { TripQuery, Currency } from '../types';
import { TRENDING_TRIPS, CURRENCY_SYMBOLS } from '../data/mockTrips';

interface HomeViewProps {
  query: TripQuery;
  onQueryChange: (updated: Partial<TripQuery>) => void;
  onPlanTrip: () => void;
  onSelectTrendingTrip: (destination: string, budget: number, days: number, travelers: number) => void;
  onViewAllTrending: () => void;
  isGenerating?: boolean;
}

const HOME_INTERESTS = [
  'Nature',
  'Adventure',
  'Food',
  'Shopping',
  'Culture',
  'History',
  'Relaxation',
];

export const HomeView: React.FC<HomeViewProps> = ({
  query,
  onQueryChange,
  onPlanTrip,
  onSelectTrendingTrip,
  onViewAllTrending,
  isGenerating = false,
}) => {
  const [destinationFlash, setDestinationFlash] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currencySymbol = CURRENCY_SYMBOLS[query.currency] || '$';

  const handleSelectPreset = (dest: string) => {
    onQueryChange({ destination: dest });
    setDestinationFlash(true);
    setTimeout(() => setDestinationFlash(false), 500);
  };

  const handleCurrencyChange = (curr: Currency) => {
    onQueryChange({ currency: curr });
  };

  const handleBudgetQuickSelect = (amount: number) => {
    onQueryChange({ budget: amount });
  };

  const handleTravelersDelta = (delta: number) => {
    const next = Math.max(1, Math.min(10, query.travelers + delta));
    onQueryChange({ travelers: next });
  };

  const handleDurationDelta = (delta: number) => {
    const next = Math.max(1, Math.min(30, query.durationDays + delta));
    onQueryChange({ durationDays: next });
  };

  const toggleInterest = (interest: string) => {
    const exists = query.interests.includes(interest);
    if (exists) {
      if (query.interests.length > 1) {
        onQueryChange({ interests: query.interests.filter((i) => i !== interest) });
      }
    } else {
      onQueryChange({ interests: [...query.interests, interest] });
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setValidationError(null);

    if (!query.destination || !query.destination.trim()) {
      setValidationError('Please specify a travel destination.');
      return;
    }

    if (!query.budget || query.budget < 100) {
      setValidationError('Please enter a budget of at least 100.');
      return;
    }

    onPlanTrip();
  };

  return (
    <div id="home-view-container" className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-4 pb-6 flex flex-col gap-4">
        {/* Kicker / Tagline */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-[1px] bg-[#1A1A1A]"></span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
            The Art of Travel
          </span>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.15]">
            Curated Journeys,<br />
            <span className="font-serif italic text-[#1A1A1A]">Engineered Within Budget.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed max-w-lg">
            Specify your destination and financial boundary. Our algorithm structures an authentic, itemized journey with zero unexpected costs.
          </p>
        </div>

        {/* Visual Destination Preview Highlight */}
        <div
          onClick={() => {
            handleSelectPreset('Positano, Italy');
            onQueryChange({ budget: 840 });
          }}
          className="relative w-full h-48 sm:h-52 overflow-hidden border border-[#E5E5E5] group cursor-pointer active:scale-[0.99] transition-transform bg-[#FAF9F7]"
        >
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSDR1R-c3XhYO1EmhrNVzie5ekOrKAbIBDvQtleGq6vNFnAJ7gtgkMtVe4397aWWZH69USTCDqAmkTfosYve8OwCzTLpxSDUdkm3sb5RuIyLysvAF0Xa6UgwU6KptAd1IgmyOsIv1R5oqmUDxoKubQTrgNcjzlu4N6ZACsP2yIG_gscKslz6xzy2W1mfiIBQSF_UZUpAJfI7dSzIEXThi6VZzyCAePzqerJTVmLX8l8E-D2uUXW-mNtQ')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/80 block mb-1">
                  Featured Escape
                </span>
                <h3 className="font-serif italic text-2xl font-normal text-white">
                  Positano, Italy
                </h3>
                <p className="text-xs text-white/90 font-light mt-0.5">From $840 all-inclusive</p>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] font-semibold border border-white/30">
                Editorial Choice
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Smart Budget Trip Planner Form Card */}
      <section className="px-4 sm:px-6 pb-8">
        <form
          id="budget-planner-form"
          onSubmit={handleSubmit}
          className="w-full bg-[#FAF9F7] border border-[#E5E5E5] p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold block">
                Itinerary Generator
              </span>
              <h2 className="font-serif italic text-2xl sm:text-3xl text-[#1A1A1A] mt-1 font-normal">
                Plan Your Trip
              </h2>
            </div>
            <div className="w-2 h-2 bg-[#1A1A1A] rounded-full"></div>
          </div>

          {/* Destination Input Module */}
          <div className="flex flex-col gap-2">
            <label htmlFor="destination-input" className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
              Destination
            </label>
            <div className="relative flex items-center">
              <input
                id="destination-input"
                name="destination"
                type="text"
                value={query.destination}
                onChange={(e) => onQueryChange({ destination: e.target.value })}
                placeholder="e.g., Amalfi Coast, Italy"
                required
                className={`w-full bg-transparent border-b ${
                  destinationFlash ? 'border-[#1A1A1A]' : 'border-[#1A1A1A]'
                } py-2.5 text-[#1A1A1A] font-serif text-lg italic focus:outline-none focus:border-black transition-all`}
              />
            </div>

            {/* Quick Preset Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
              <span className="text-[9px] uppercase tracking-widest text-[#999] mr-1 whitespace-nowrap">
                Suggestions:
              </span>
              <button
                type="button"
                onClick={() => handleSelectPreset('Bali, Indonesia')}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all cursor-pointer border ${
                  query.destination.includes('Bali')
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                }`}
              >
                Bali
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('Rome, Italy')}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all cursor-pointer border ${
                  query.destination.includes('Rome')
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                }`}
              >
                Rome
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('Tokyo, Japan')}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all cursor-pointer border ${
                  query.destination.includes('Tokyo')
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                }`}
              >
                Tokyo
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('Lisbon, Portugal')}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all cursor-pointer border ${
                  query.destination.includes('Lisbon')
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                }`}
              >
                Lisbon
              </button>
            </div>
          </div>

          {/* Starting Location Input Module */}
          <div className="flex flex-col gap-2">
            <label htmlFor="starting-location-input" className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
              Starting Location (Departure Point)
            </label>
            <div className="relative flex items-center">
              <input
                id="starting-location-input"
                name="startingLocation"
                type="text"
                value={query.startingLocation}
                onChange={(e) => onQueryChange({ startingLocation: e.target.value })}
                placeholder="e.g., San Francisco, USA or London, UK"
                required
                className="w-full bg-transparent border-b border-[#E5E5E5] py-2 text-[#1A1A1A] font-serif text-base italic focus:outline-none focus:border-black transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 no-scrollbar">
              <span className="text-[9px] uppercase tracking-widest text-[#999] mr-1 whitespace-nowrap">
                Depart from:
              </span>
              {['New York, USA', 'London, UK', 'San Francisco, USA', 'Sydney, Australia'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onQueryChange({ startingLocation: city })}
                  className={`px-2.5 py-0.5 text-[9px] uppercase tracking-wider transition-all cursor-pointer border ${
                    query.startingLocation.includes(city.split(',')[0])
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                      : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                  }`}
                >
                  {city.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Input Module */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="budget-input" className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
                Travel Budget
              </label>
              {/* Currency Toggle Switch */}
              <div className="flex items-center border border-[#E5E5E5] bg-white">
                <button
                  type="button"
                  id="curr-usd"
                  onClick={() => handleCurrencyChange('USD')}
                  className={`px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                    query.currency === 'USD'
                      ? 'bg-[#1A1A1A] text-white font-bold'
                      : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  USD
                </button>
                <button
                  type="button"
                  id="curr-eur"
                  onClick={() => handleCurrencyChange('EUR')}
                  className={`px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                    query.currency === 'EUR'
                      ? 'bg-[#1A1A1A] text-white font-bold'
                      : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  EUR
                </button>
                <button
                  type="button"
                  id="curr-gbp"
                  onClick={() => handleCurrencyChange('GBP')}
                  className={`px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                    query.currency === 'GBP'
                      ? 'bg-[#1A1A1A] text-white font-bold'
                      : 'text-[#666] hover:text-[#1A1A1A]'
                  }`}
                >
                  GBP
                </button>
              </div>
            </div>

            <div className="relative flex items-center">
              <span id="currency-prefix" className="font-serif italic text-lg text-[#999] mr-2">
                {currencySymbol}
              </span>
              <input
                id="budget-input"
                name="budget"
                type="number"
                min="100"
                max="100000"
                step="50"
                value={query.budget || ''}
                onChange={(e) => onQueryChange({ budget: Number(e.target.value) })}
                placeholder="1200"
                required
                className="w-full bg-transparent border-b border-[#E5E5E5] py-2 focus:border-black text-[#1A1A1A] font-medium text-lg focus:outline-none transition-all"
              />
            </div>

            {/* Budget Quick Selection Chips */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleBudgetQuickSelect(500)}
                className={`py-1.5 px-2 text-center text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                  query.budget === 500
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
                }`}
              >
                {currencySymbol}500
              </button>
              <button
                type="button"
                onClick={() => handleBudgetQuickSelect(1200)}
                className={`py-1.5 px-2 text-center text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                  query.budget === 1200
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
                }`}
              >
                {currencySymbol}1,200
              </button>
              <button
                type="button"
                onClick={() => handleBudgetQuickSelect(2500)}
                className={`py-1.5 px-2 text-center text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                  query.budget === 2500
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
                }`}
              >
                {currencySymbol}2,500
              </button>
              <button
                type="button"
                onClick={() => handleBudgetQuickSelect(5000)}
                className={`py-1.5 px-2 text-center text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${
                  query.budget === 5000
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black'
                }`}
              >
                Luxury
              </button>
            </div>
          </div>

          {/* Travelers & Duration (2-column editorial grid) */}
          <div className="grid grid-cols-2 gap-6 pt-1">
            {/* Travelers */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2 font-semibold">
                Travelers
              </label>
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
                <span id="traveler-count" className="font-medium text-[#1A1A1A] text-base">
                  {query.travelers} {query.travelers === 1 ? 'Guest' : 'Guests'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Decrease travelers"
                    onClick={() => handleTravelersDelta(-1)}
                    className="w-6 h-6 border border-[#E5E5E5] bg-white flex items-center justify-center text-xs text-[#1A1A1A] hover:border-black transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    aria-label="Increase travelers"
                    onClick={() => handleTravelersDelta(1)}
                    className="w-6 h-6 border border-[#E5E5E5] bg-white flex items-center justify-center text-xs text-[#1A1A1A] hover:border-black transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Days */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2 font-semibold">
                Days
              </label>
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
                <span id="duration-count" className="font-medium text-[#1A1A1A] text-base">
                  {query.durationDays} {query.durationDays === 1 ? 'Day' : 'Days'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Decrease duration"
                    onClick={() => handleDurationDelta(-1)}
                    className="w-6 h-6 border border-[#E5E5E5] bg-white flex items-center justify-center text-xs text-[#1A1A1A] hover:border-black transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    aria-label="Increase duration"
                    onClick={() => handleDurationDelta(1)}
                    className="w-6 h-6 border border-[#E5E5E5] bg-white flex items-center justify-center text-xs text-[#1A1A1A] hover:border-black transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Style Selector */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
                Travel Style
              </label>
              <span className="text-[10px] text-[#666] font-serif italic">
                {query.travelStyle === 'budget' ? 'Hostels & Local Transit' : query.travelStyle === 'comfort' ? 'Boutique 3-4★ & Curated Dining' : '5★ Luxury & Private Guides'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['budget', 'comfort', 'premium'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => onQueryChange({ travelStyle: style })}
                  className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                    query.travelStyle === style
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                  }`}
                >
                  {style === 'budget' ? 'Budget' : style === 'comfort' ? 'Comfort' : 'Premium'}
                </button>
              ))}
            </div>
          </div>

          {/* Interests & Vibe */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
                Interests & Focus
              </label>
              <span className="text-[10px] uppercase tracking-wider text-[#999]">
                {query.interests.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {HOME_INTERESTS.map((interest) => {
                const isSelected = query.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold'
                        : 'bg-white text-[#666] border-[#E5E5E5] hover:border-black hover:text-[#1A1A1A]'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Error Alert */}
          {validationError && (
            <div className="p-3 bg-[#FFF5F5] border border-[#E5A5A5] text-[#900] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* Primary Action CTA Button (Editorial Aesthetic rectangular button) */}
          <button
            id="plan-trip-btn"
            type="submit"
            disabled={isGenerating}
            className="mt-2 bg-[#1A1A1A] text-white py-4 rounded-none uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                <span>Curating Personalized Itinerary with AI...</span>
              </>
            ) : (
              <>
                <span>Plan My Trip</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>

          {/* Editorial Quote Card */}
          <div className="p-4 bg-white border border-[#E5E5E5] mt-2">
            <p className="text-[11px] leading-relaxed text-[#666] italic font-serif">
              “The world is a book and those who do not travel read only one page.” — St. Augustine
            </p>
          </div>
        </form>
      </section>

      {/* What's Included Preview Teaser */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
              Allocation Pillars
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-[#999] font-medium">
              100% Comprehensive
            </span>
          </div>
          <p className="text-xs text-[#666] leading-relaxed">
            TripWise partitions capital across the six essential pillars of international travel to guarantee total transparency.
          </p>

          {/* Coverage Breakdown Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">01</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Flights & Transit
              </span>
              <span className="text-[11px] text-[#666]">38% of total budget</span>
            </div>

            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">02</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Curated Stays
              </span>
              <span className="text-[11px] text-[#666]">28% of total budget</span>
            </div>

            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">03</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Dining & Cuisine
              </span>
              <span className="text-[11px] text-[#666]">18% of total budget</span>
            </div>

            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">04</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Sightseeing & Culture
              </span>
              <span className="text-[11px] text-[#666]">10% of total budget</span>
            </div>

            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">05</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Local Transport
              </span>
              <span className="text-[11px] text-[#666]">3% of total budget</span>
            </div>

            <div className="p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
              <span className="font-serif italic text-sm text-[#999]">06</span>
              <span className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                Emergency Cushion
              </span>
              <span className="text-[11px] text-[#666]">3% safety reserve</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Trips Under $1,000 Carousel / Featured Cards */}
      <section className="pb-12">
        <div className="px-4 sm:px-6 flex items-center justify-between mb-4 border-b border-[#E5E5E5] pb-2">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
              Curated Under $1,000
            </h2>
          </div>
          <button
            type="button"
            id="see-all-trending-btn"
            onClick={onViewAllTrending}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:underline cursor-pointer flex items-center gap-1"
          >
            All Destinations <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Swipe Carousel */}
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 no-scrollbar snap-x snap-mandatory">
          {TRENDING_TRIPS.map((trip, idx) => (
            <div
              key={trip.id}
              className="min-w-[270px] max-w-[290px] snap-start bg-white border border-[#E5E5E5] flex flex-col flex-shrink-0 group hover:border-[#1A1A1A] transition-colors"
            >
              <div className="relative h-40 w-full overflow-hidden bg-[#FAF9F7]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${trip.imageUrl}')` }}
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-md text-[9px] uppercase tracking-widest font-semibold text-[#1A1A1A] border border-[#E5E5E5]">
                  0{idx + 1}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-bold">
                  {trip.priceLabel}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h3 className="font-serif italic text-lg text-[#1A1A1A]">{trip.destination}</h3>
                  <p className="text-xs text-[#666] mt-1 line-clamp-2">{trip.tagline}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5]">
                  <span className="text-[10px] uppercase tracking-wider text-[#999] font-medium">{trip.highlight}</span>
                  <button
                    type="button"
                    onClick={() => onSelectTrendingTrip(trip.destination, trip.budget, trip.days, trip.travelers)}
                    className="border border-[#1A1A1A] px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
