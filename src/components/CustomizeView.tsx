import React from 'react';
import { TripQuery, TravelStyle, TripPace, Currency } from '../types';
import { CURRENCY_SYMBOLS } from '../data/mockTrips';

interface CustomizeViewProps {
  query: TripQuery;
  onQueryChange: (updated: Partial<TripQuery>) => void;
  onGenerateTrip: () => void;
  onBackToHome: () => void;
  isGenerating?: boolean;
}

const ALL_INTERESTS = [
  { id: 'Nature', icon: 'park' },
  { id: 'Food', icon: 'restaurant' },
  { id: 'Relaxation', icon: 'spa' },
  { id: 'Culture', icon: 'temple_buddhist' },
  { id: 'Adventure', icon: 'hiking' },
  { id: 'Shopping', icon: 'shopping_bag' },
  { id: 'History', icon: 'history_edu' },
  { id: 'Nightlife', icon: 'nightlife' },
];

export const CustomizeView: React.FC<CustomizeViewProps> = ({
  query,
  onQueryChange,
  onGenerateTrip,
  onBackToHome,
  isGenerating = false,
}) => {
  const currencySymbol = CURRENCY_SYMBOLS[query.currency] || '$';

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

  const handleTravelersDelta = (delta: number) => {
    const next = Math.max(1, Math.min(10, query.travelers + delta));
    onQueryChange({ travelers: next });
  };

  const handleDurationDelta = (delta: number) => {
    const next = Math.max(1, Math.min(30, query.durationDays + delta));
    onQueryChange({ durationDays: next });
  };

  const handleCurrencyChange = (curr: Currency) => {
    onQueryChange({ currency: curr });
  };

  const estTripCost = Math.round(query.budget * 0.9);
  const surplusCost = query.budget - estTripCost;
  const costPerPerson = Math.round(query.budget / query.travelers);

  return (
    <div id="customize-view-container" className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 gap-6 pb-20">
      {/* Progress & Intro Context */}
      <section className="flex flex-col gap-2 pt-2 border-b border-[#E5E5E5] pb-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">tune</span>
            Step 1 of 2: Trip Customization
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-bold">50% Completed</span>
        </div>
        <div className="w-full h-1 bg-[#ECEAE5] overflow-hidden">
          <div className="h-full bg-[#1A1A1A] w-1/2 transition-all duration-500"></div>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">
              Customize Your <span className="italic font-normal">Journey</span>
            </h1>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] hover:opacity-60 flex items-center gap-1 border-b border-[#1A1A1A] pb-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Edit Goal
            </button>
          </div>
          <p className="text-sm text-[#666666] mt-1 font-serif italic">
            Fine-tune your trip details and preferences so TripWise can tailor every dollar.
          </p>
        </div>
      </section>

      {/* Destination & Duration Overview Card */}
      <section className="bg-white p-5 border border-[#E5E5E5] flex flex-col gap-4">
        {/* Active Destination Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">Destination</span>
          <div className="flex items-center justify-between bg-[#FAF9F7] p-3.5 border border-[#E5E5E5]">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 overflow-hidden flex-shrink-0 border border-[#E5E5E5]">
                <img
                  className="w-full h-full object-cover"
                  alt={query.destination}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgA7H0BEGxohdiYO7jaw2RaBSGQY8w3aLGR0Xs4vzrKhcguU50J4dPyrkvws1ULEEYi7b_Ifsa01WD8Muc88c6U-1rrWwNu__5ZBMEPlTtRydQdTkIIWgnWGa6eZ-LSI5CmYq95zFCCptAnlyDiXjRSwkLe8J-7zpoZ3sQkPLeM3KTx_G79nA1QCEXO2iz-wMJmCPvrb0yvY5fU9a_xRwkdElo8gFZzzqmYYJQNn1Duvi3iBUfqEoNzw"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg text-[#1A1A1A] truncate font-bold">
                  {query.destination}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#666666]">
                  Southeast Asia • Tropical Oasis
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Edit destination"
              onClick={onBackToHome}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>

          {/* Quick Swap Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 no-scrollbar">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] whitespace-nowrap font-medium">Popular:</span>
            {['Tokyo', 'Rome', 'Paris', 'Kyoto'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => onQueryChange({ destination: `${city}, Popular` })}
                className="text-xs bg-[#FAF9F7] text-[#1A1A1A] px-3 py-1 whitespace-nowrap active:scale-95 transition-all hover:bg-[#1A1A1A] hover:text-white border border-[#E5E5E5] cursor-pointer"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Departure Starting Location */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#E5E5E5]">
          <label htmlFor="customize-starting-loc" className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">
            Starting Location (Departure Point)
          </label>
          <div className="flex items-center bg-[#FAF9F7] px-3.5 py-2.5 border border-[#E5E5E5]">
            <span className="material-symbols-outlined text-[16px] text-[#666666] mr-2">flight_takeoff</span>
            <input
              id="customize-starting-loc"
              type="text"
              value={query.startingLocation}
              onChange={(e) => onQueryChange({ startingLocation: e.target.value })}
              placeholder="e.g. San Francisco, USA or London, UK"
              className="w-full bg-transparent text-[#1A1A1A] font-serif text-sm italic focus:outline-none"
            />
          </div>
        </div>

        {/* Duration and Dates */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Dates Selector */}
          <div className="flex flex-col gap-1.5 bg-[#FAF9F7] p-3.5 border border-[#E5E5E5]">
            <div className="flex items-center gap-1 text-[#666666]">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold">Dates</span>
            </div>
            <span className="font-serif text-base text-[#1A1A1A] font-semibold">
              {query.datesRange || 'Oct 14 - 21'}
            </span>
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#E5E5E5]">
              <button
                type="button"
                aria-label="Decrease days"
                onClick={() => handleDurationDelta(-1)}
                className="w-7 h-7 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] active:scale-95 transition-transform hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">remove</span>
              </button>
              <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-bold">
                {query.durationDays} Days
              </span>
              <button
                type="button"
                aria-label="Increase days"
                onClick={() => handleDurationDelta(1)}
                className="w-7 h-7 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] active:scale-95 transition-transform hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
              </button>
            </div>
          </div>

          {/* Travelers Stepper */}
          <div className="flex flex-col gap-1.5 bg-[#FAF9F7] p-3.5 border border-[#E5E5E5]">
            <div className="flex items-center gap-1 text-[#666666]">
              <span className="material-symbols-outlined text-[16px]">group</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold">Travelers</span>
            </div>
            <span className="font-serif text-base text-[#1A1A1A] font-semibold">
              {query.travelers} {query.travelers === 1 ? 'Guest' : 'Guests'}
            </span>
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#E5E5E5]">
              <button
                type="button"
                aria-label="Decrease travelers"
                onClick={() => handleTravelersDelta(-1)}
                className="w-7 h-7 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] active:scale-95 transition-transform hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">remove</span>
              </button>
              <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-bold">
                {query.travelers} Pers
              </span>
              <button
                type="button"
                aria-label="Increase travelers"
                onClick={() => handleTravelersDelta(1)}
                className="w-7 h-7 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] active:scale-95 transition-transform hover:bg-[#1A1A1A] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Configurator */}
      <section className="bg-white p-5 border border-[#E5E5E5] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">payments</span>
            <h2 className="font-serif text-xl text-[#1A1A1A] font-bold">Total Budget</h2>
          </div>
          {/* Currency Switcher */}
          <div className="flex bg-[#FAF9F7] p-0.5 border border-[#E5E5E5] text-[10px] uppercase tracking-wider font-bold">
            {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => handleCurrencyChange(curr)}
                className={`px-3 py-1 transition-all cursor-pointer ${
                  query.currency === curr
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'text-[#666666] hover:text-[#1A1A1A]'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Presentation */}
        <div className="flex flex-col items-center justify-center py-6 bg-[#FAF9F7] border border-[#E5E5E5]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">
            Calculated Target
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight">
              {currencySymbol}{query.budget.toLocaleString()}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#666666] font-serif italic">total</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[#1A1A1A] text-xs font-medium">
            <span className="material-symbols-outlined text-[14px]">person</span>
            <span>{currencySymbol}{costPerPerson.toLocaleString()} per person</span>
          </div>
        </div>

        {/* Budget Tier Quick Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[800, 1200, 1800, 2500].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => onQueryChange({ budget: tier })}
              className={`py-2 px-1 text-center text-xs font-semibold tracking-wider active:scale-95 transition-all cursor-pointer border ${
                query.budget === tier
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FAF9F7] text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
              }`}
            >
              {currencySymbol}{tier.toLocaleString()}{tier === 2500 ? '+' : ''}
            </button>
          ))}
        </div>
      </section>

      {/* Travel Style Cards */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#1A1A1A] font-bold">Travel Style</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">Select Comfort Tier</span>
        </div>
        <div className="flex flex-col gap-3">
          {/* Budget Tier */}
          <div
            onClick={() => onQueryChange({ travelStyle: 'budget' })}
            className={`p-4 bg-white border transition-all cursor-pointer flex items-center justify-between ${
              query.travelStyle === 'budget'
                ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                : 'border-[#E5E5E5] hover:border-[#1A1A1A]'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">backpack</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-[#1A1A1A] font-bold">Budget Explorer</span>
                  <span className="text-[9px] uppercase tracking-widest bg-[#FAF9F7] text-[#666666] px-2 py-0.5 border border-[#E5E5E5]">
                    Smart Saver
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  Hostels, boutique guesthouses, public & scooter transit, street dining.
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2 border ${
                query.travelStyle === 'budget'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'border-[#E5E5E5] bg-[#FAF9F7]'
              }`}
            >
              {query.travelStyle === 'budget' && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
          </div>

          {/* Comfort Tier (Recommended) */}
          <div
            onClick={() => onQueryChange({ travelStyle: 'comfort' })}
            className={`p-4 bg-white border transition-all cursor-pointer flex items-center justify-between relative ${
              query.travelStyle === 'comfort'
                ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                : 'border-[#E5E5E5] hover:border-[#1A1A1A]'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">hotel</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-[#1A1A1A] font-bold">Comfort Curated</span>
                  <span className="text-[9px] uppercase tracking-widest bg-[#1A1A1A] text-white px-2 py-0.5">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  3-4★ boutique hotels, private transfers, curated cafe & local dining experiences.
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2 border ${
                query.travelStyle === 'comfort'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'border-[#E5E5E5] bg-[#FAF9F7]'
              }`}
            >
              {query.travelStyle === 'comfort' && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
          </div>

          {/* Premium Tier */}
          <div
            onClick={() => onQueryChange({ travelStyle: 'premium' })}
            className={`p-4 bg-white border transition-all cursor-pointer flex items-center justify-between ${
              query.travelStyle === 'premium'
                ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                : 'border-[#E5E5E5] hover:border-[#1A1A1A]'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">diamond</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-[#1A1A1A] font-bold">Premium Heritage</span>
                  <span className="text-[9px] uppercase tracking-widest bg-[#FAF9F7] text-[#666666] px-2 py-0.5 border border-[#E5E5E5]">
                    Luxury
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  5★ resorts & villas, private guided excursions, premium fine dining tastings.
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-2 border ${
                query.travelStyle === 'premium'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'border-[#E5E5E5] bg-[#FAF9F7]'
              }`}
            >
              {query.travelStyle === 'premium' && (
                <span className="material-symbols-outlined text-[14px]">check</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interests & Vibe Section */}
      <section className="bg-white p-5 border border-[#E5E5E5] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-serif text-xl text-[#1A1A1A] font-bold">Interests & Vibe</h2>
            <span className="text-xs text-[#666666] font-serif italic">Curate your trip's atmosphere</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A] font-bold px-2 py-1 bg-[#FAF9F7] border border-[#E5E5E5]">
            {query.interests.length} selected
          </span>
        </div>

        {/* Multi-select chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {ALL_INTERESTS.map((item) => {
            const isSelected = query.interests.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleInterest(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-[#FAF9F7] text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                <span>{item.id}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[13px]">check</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Trip Pace Preferences */}
      <section className="bg-white p-5 border border-[#E5E5E5] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">speed</span>
            <h2 className="font-serif text-xl text-[#1A1A1A] font-bold">Daily Rhythm</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#666666]">2-3 stops / day</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => onQueryChange({ tripPace: 'relaxed' })}
            className={`flex flex-col items-center justify-center p-3 text-center active:scale-95 transition-all cursor-pointer border ${
              query.tripPace === 'relaxed'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-[#FAF9F7] text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] mb-1">self_improvement</span>
            <span className="text-xs font-bold uppercase tracking-wider">Relaxed</span>
            <span className={`text-[10px] mt-0.5 ${query.tripPace === 'relaxed' ? 'text-gray-300' : 'text-[#666666]'}`}>
              1-2 stops
            </span>
          </button>

          <button
            type="button"
            onClick={() => onQueryChange({ tripPace: 'balanced' })}
            className={`flex flex-col items-center justify-center p-3 text-center active:scale-95 transition-all cursor-pointer border ${
              query.tripPace === 'balanced'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-[#FAF9F7] text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] mb-1">balance</span>
            <span className="text-xs font-bold uppercase tracking-wider">Balanced</span>
            <span className={`text-[10px] mt-0.5 ${query.tripPace === 'balanced' ? 'text-gray-300' : 'text-[#666666]'}`}>
              Recommended
            </span>
          </button>

          <button
            type="button"
            onClick={() => onQueryChange({ tripPace: 'fast' })}
            className={`flex flex-col items-center justify-center p-3 text-center active:scale-95 transition-all cursor-pointer border ${
              query.tripPace === 'fast'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-[#FAF9F7] text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] mb-1">bolt</span>
            <span className="text-xs font-bold uppercase tracking-wider">Fast-Paced</span>
            <span className={`text-[10px] mt-0.5 ${query.tripPace === 'fast' ? 'text-gray-300' : 'text-[#666666]'}`}>
              Full days
            </span>
          </button>
        </div>
      </section>

      {/* Destination Teaser & Visual Context */}
      <section className="relative overflow-hidden h-40 bg-[#1A1A1A] border border-[#E5E5E5]">
        <img
          className="w-full h-full object-cover opacity-80"
          alt="Destination Preview"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuATIuULUGmkO6Nvmbr76oDHOffTf882eNyvoQ8XdSLKfHgECoYACEBn85ZT6JYmZb6w-fGsuKrS1AGp1Ag0OG0qMnU2GJAXY1hQlk_GelOvsU0IB6FjeZCX1MJiwgLh0Ye0EvDWsi9MfVMl5d7ekAafwlctYK-isP1q3Vnb6T6uBwg0jT_kN6slgX7KHeuxuZaXX7EMIaaX_AoAzv3XSN3cuPPV3fowcn6RM0PzjD5wmWlkIIj16EUvVw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-bold">
                Destination Preview
              </span>
              <span className="font-serif text-xl font-bold text-white">
                {query.destination}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1 text-xs border border-white/30 text-white">
              <span className="material-symbols-outlined text-[14px]">wb_sunny</span>
              <span>29°C Warm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Allocation & Primary CTA Deck */}
      <section className="bg-white p-5 border border-[#E5E5E5] flex flex-col gap-4">
        {/* Allocation Preview Gauge */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#666666] text-[10px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[15px] text-[#1A1A1A]">pie_chart</span>
              <span>Estimated Budget Usage</span>
            </div>
            <span className="text-xs text-[#1A1A1A] font-bold">
              Est. {currencySymbol}{estTripCost.toLocaleString()} / {currencySymbol}{query.budget.toLocaleString()}
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-1.5 flex bg-[#ECEAE5]">
            <div className="h-full bg-[#1A1A1A] w-[45%]" title="Lodging: 45%"></div>
            <div className="h-full bg-[#666666] w-[25%]" title="Dining: 25%"></div>
            <div className="h-full bg-[#999999] w-[20%]" title="Activities: 20%"></div>
            <div className="h-full bg-[#D4D1CA] w-[10%]" title="Buffer: 10%"></div>
          </div>

          <div className="flex items-center justify-between text-[#666666] text-[11px] pt-1 font-serif italic">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block"></span> Stays
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#666666] inline-block"></span> Food
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#999999] inline-block"></span> Tours
            </span>
            <span className="text-[#1A1A1A] font-bold font-sans not-italic">+{currencySymbol}{surplusCost} Safe Buffer</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          id="generate-my-trip-btn"
          type="button"
          disabled={isGenerating}
          onClick={onGenerateTrip}
          className="w-full py-4 px-5 bg-[#1A1A1A] hover:bg-black text-white flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span>Curating Journey with AI...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Generate My Travel Plan</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
};
