import React, { useState } from 'react';
import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from '../data/mockTrips';

interface BreakdownViewProps {
  plan: TripPlan;
  onViewItinerary: () => void;
  onAdjustPreferences: () => void;
  onOpenOptimizer: () => void;
  onUpdatePlan: (updated: TripPlan) => void;
}

export const BreakdownView: React.FC<BreakdownViewProps> = ({
  plan,
  onViewItinerary,
  onAdjustPreferences,
  onOpenOptimizer,
  onUpdatePlan,
}) => {
  const [tipApplied, setTipApplied] = useState(plan?.smartTip?.applied || false);
  const [activeSegmentModal, setActiveSegmentModal] = useState<string | null>(null);

  if (!plan) return null;

  const currencySymbol = CURRENCY_SYMBOLS[plan.query?.currency || 'USD'] || '$';

  const handleApplyTip = () => {
    if (!tipApplied) {
      setTipApplied(true);
      const discount = plan.smartTip.savings;
      const updatedEstimated = plan.estimatedTotal - discount;
      const updatedSurplus = plan.totalBudget - updatedEstimated;
      const updatedItems = plan.items.map((item) =>
        item.category === 'flights'
          ? { ...item, amount: item.amount - discount, details: `${item.details} (Off-Peak Thurs Applied -$${discount})` }
          : item
      );

      onUpdatePlan({
        ...plan,
        estimatedTotal: updatedEstimated,
        surplus: updatedSurplus,
        percentAllocated: Math.round((updatedEstimated / plan.totalBudget) * 100),
        dailyAverage: Math.round(updatedEstimated / plan.query.durationDays),
        perPerson: Math.round(updatedEstimated / plan.query.travelers),
        items: updatedItems,
        smartTip: {
          ...plan.smartTip,
          applied: true,
        },
      });
    }
  };

  return (
    <div id="breakdown-view-container" className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 gap-6 pb-20 pt-2">
      {/* Editorial Trip Header & Financial Kicker */}
      <div className="flex flex-col gap-3 border-b border-[#E5E5E5] pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-semibold">
            {plan.query.travelStyle.toUpperCase()} TIER • {plan.query.travelers} {plan.query.travelers === 1 ? 'TRAVELER' : 'TRAVELERS'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] font-bold border border-[#E5E5E5] px-2 py-0.5 bg-white">
            CONFIRMED PLAN
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-tight font-normal">
              {plan.destinationName}
            </h1>
            <p className="text-xs text-[#666] mt-1">
              {plan.query.durationDays} Days Curated Journey • {plan.datesRange}
            </p>
          </div>
          <div className="sm:text-right">
            <span className="text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-none block">
              {currencySymbol}{plan.estimatedTotal.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-medium mt-0.5 block">
              Total Estimated Cost
            </span>
          </div>
        </div>

        {/* Remaining Budget / Surplus / Over-Budget Status Banner */}
        {plan.isOverBudget ? (
          <div className="mt-2 p-4 bg-[#FFF5F5] border border-[#E5A5A5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#B91C1C]">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                  Over Budget by {currencySymbol}{plan.budgetDeficit.toLocaleString()}
                </span>
              </div>
              <span className="text-xs text-[#666] mt-0.5">
                Total exceeds target budget of {currencySymbol}{plan.totalBudget.toLocaleString()}. Use Optimizer to balance stays and flights.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenOptimizer}
              className="py-2 px-4 bg-[#B91C1C] text-white text-[10px] uppercase tracking-wider font-bold hover:bg-black transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              Balance Budget →
            </button>
          </div>
        ) : (
          <div className="mt-2 p-4 bg-[#FAF9F7] border border-[#E5E5E5] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-semibold">
                Remaining Budget Surplus
              </span>
              <span className="text-xl font-serif italic text-[#1A1A1A] mt-0.5">
                +{currencySymbol}{plan.surplus.toLocaleString()}.00
              </span>
              {plan.originalEstimatedTotal && plan.originalEstimatedTotal > plan.estimatedTotal && (
                <span className="text-[10px] text-[#15803D] font-medium mt-0.5">
                  ✓ Saved {currencySymbol}{(plan.originalEstimatedTotal - plan.estimatedTotal).toLocaleString()} via Smart Optimizer
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#666] font-medium block">
                Target Cap: {currencySymbol}{plan.totalBudget.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#1A1A1A] font-bold mt-0.5 block">
                {plan.percentAllocated}% Allocated
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Financial Metrics Strip */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between gap-1">
          <span className="text-[10px] uppercase tracking-widest text-[#999] font-semibold">Daily Average</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-light text-[#1A1A1A]">
              {currencySymbol}{plan.dailyAverage}
            </span>
            <span className="text-xs text-[#666]">/ day</span>
          </div>
          <span className="text-[10px] text-[#666] italic mt-1 font-serif">Comprehensive daily expenditure</span>
        </div>

        <div className="p-4 bg-white border border-[#E5E5E5] flex flex-col justify-between gap-1">
          <span className="text-[10px] uppercase tracking-widest text-[#999] font-semibold">Per Person</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-light text-[#1A1A1A]">
              {currencySymbol}{plan.perPerson}
            </span>
            <span className="text-xs text-[#666]">/ guest</span>
          </div>
          <span className="text-[10px] text-[#666] italic mt-1 font-serif">All inclusions covered</span>
        </div>
      </div>

      {/* Editorial Allocation Bar */}
      <div className="p-5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
            Budget Allocation
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-[#999]">
            {plan.query.currency} ({currencySymbol})
          </span>
        </div>

        {/* Segmented Color Bar */}
        <div className="w-full bg-[#E5E5E5] h-1.5 flex overflow-hidden">
          <div className="bg-[#1A1A1A] h-full" style={{ width: `${plan.categoryShares.flights}%` }}></div>
          <div className="bg-[#555] h-full" style={{ width: `${plan.categoryShares.stays}%` }}></div>
          <div className="bg-[#888] h-full" style={{ width: `${plan.categoryShares.dining}%` }}></div>
          <div className="bg-[#AAA] h-full" style={{ width: `${plan.categoryShares.activities}%` }}></div>
          <div className="bg-[#CCC] h-full" style={{ width: `${plan.categoryShares.transit}%` }}></div>
          <div className="bg-[#DDD] h-full" style={{ width: `${plan.categoryShares.other || 2}%` }}></div>
        </div>

        {/* Micro Legend */}
        <div className="flex flex-wrap gap-3 pt-1 text-[10px] uppercase tracking-wider text-[#666]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#1A1A1A]"></span> Flights {plan.categoryShares.flights}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#555]"></span> Stays {plan.categoryShares.stays}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#888]"></span> Dining {plan.categoryShares.dining}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#AAA]"></span> Activities {plan.categoryShares.activities}%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#CCC]"></span> Local {plan.categoryShares.transit}%
          </span>
        </div>
      </div>

      {/* Smart Cost Optimization Callout */}
      <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
            {plan.smartTip.title}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-black font-bold border border-black px-2 py-0.5">
            Save {currencySymbol}{plan.smartTip.savings}
          </span>
        </div>
        <p className="text-xs text-[#666] leading-relaxed">
          {plan.smartTip.description}
        </p>
        <button
          type="button"
          onClick={handleApplyTip}
          disabled={tipApplied}
          className={`mt-2 py-2 px-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer border ${
            tipApplied
              ? 'bg-[#FAF9F7] text-[#999] border-[#E5E5E5]'
              : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-black'
          }`}
        >
          {tipApplied ? '✓ Suggested Date Applied (-$45)' : 'Apply Suggested Departure Date'}
        </button>
      </div>

      {/* Optimizer Teaser Banner */}
      <div
        onClick={onOpenOptimizer}
        className="p-5 bg-[#FAF9F7] border border-[#1A1A1A] flex items-center justify-between cursor-pointer hover:bg-white transition-colors"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
              Optimize Itinerary Cost
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold bg-[#1A1A1A] text-white px-2 py-0.5">
              +$340 Potential
            </span>
          </div>
          <span className="text-xs text-[#666]">
            Review 4 suggested alternative stays, flights, and activities
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-b border-black pb-0.5">
          Review →
        </span>
      </div>

      {/* Itemized Breakdown Table / List */}
      <div className="flex flex-col bg-[#F5F2ED] p-6 sm:p-8 border border-[#DED9D2]">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1A1A1A]">
          <h3 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
            Itemized Budget Breakdown
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-[#999]">
            {plan.items.length} Segments
          </span>
        </div>

        <div className="space-y-4">
          {plan.items.map((item, idx) => {
            const isLast = idx === plan.items.length - 1;
            return (
              <div
                key={item.id || idx}
                className={`flex justify-between items-start ${isLast ? 'pb-1' : 'border-b border-[#DED9D2] pb-3'}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A]">{item.title}</span>
                    {item.badge && (
                      <span className="text-[9px] uppercase tracking-wider bg-white border border-[#DED9D2] px-1.5 py-0.2 text-[#666]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#666] block mt-0.5">
                    {item.details || item.subtitle} • {item.sharePercent}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {currencySymbol}{item.amount.toFixed(2)}
                  </span>
                  {item.actionLabel && (
                    <button
                      type="button"
                      onClick={onOpenOptimizer}
                      className="block text-[9px] uppercase tracking-wider text-[#999] hover:text-black mt-0.5 cursor-pointer ml-auto"
                    >
                      {item.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Total Strip inside Breakdown Box */}
        <div className="mt-8 pt-6 border-t border-black flex justify-between items-center">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#999]">
              Remaining Budget
            </span>
            <span className="text-2xl font-serif italic text-[#1A1A1A]">
              +{currencySymbol}{plan.surplus}.00
            </span>
          </div>
          <button
            type="button"
            onClick={onViewItinerary}
            className="bg-[#1A1A1A] text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all cursor-pointer"
          >
            Explore Days →
          </button>
        </div>
      </div>

      {/* Selected Accommodations Preview */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
            Curated Stays
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#999]">
            {plan.accommodations.length} Properties
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {plan.accommodations.map((acc, idx) => (
            <div key={idx} className="bg-white border border-[#E5E5E5] flex flex-col group overflow-hidden">
              <div className="h-32 w-full overflow-hidden bg-[#FAF9F7]">
                <img
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  alt={acc.name}
                  src={acc.imageUrl}
                />
              </div>
              <div className="p-3 flex flex-col justify-between">
                <span className="font-serif italic text-sm text-[#1A1A1A]">{acc.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#666] mt-1">
                  {currencySymbol}{acc.pricePerNight} / night
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          id="btn-view-itinerary"
          type="button"
          onClick={onViewItinerary}
          className="w-full py-4 bg-[#1A1A1A] text-white uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>View Day-by-Day Itinerary</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>

        <button
          id="btn-adjust-preferences"
          type="button"
          onClick={onAdjustPreferences}
          className="w-full py-3 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Adjust Budget & Preferences</span>
        </button>
      </div>
    </div>
  );
};
