import React, { useState } from 'react';
import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from '../services/currencyService';

interface MyTripsViewProps {
  savedPlans: TripPlan[];
  onSelectPlan: (plan: TripPlan) => void;
  onEditPlan: (plan: TripPlan) => void;
  onDeletePlan: (planId: string) => void;
  onSharePlan: (plan: TripPlan) => void;
  onPrintPlan: (plan: TripPlan) => void;
  onPlanNewTrip: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  savedPlans,
  onSelectPlan,
  onEditPlan,
  onDeletePlan,
  onSharePlan,
  onPrintPlan,
  onPlanNewTrip,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  return (
    <div id="my-trips-container" className="flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 pb-24 gap-6">
      {/* Header */}
      <div className="pt-2 flex items-center justify-between border-b border-[#E5E5E5] pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">
            Travel Bookings & Curated Dossiers
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">
            My Saved <span className="italic font-normal">Journeys</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={onPlanNewTrip}
          className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Trip</span>
        </button>
      </div>

      {(!savedPlans || savedPlans.filter((p) => p && p.destinationName).length === 0) ? (
        <div className="p-10 bg-white border border-[#E5E5E5] text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A]">
            <span className="material-symbols-outlined text-[28px]">luggage</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">No Saved Trips Yet</h2>
          <p className="text-xs text-[#666666] max-w-xs font-serif italic">
            Plan your journey within budget and bookmark it here to access, edit, share, or print anytime.
          </p>
          <button
            type="button"
            onClick={onPlanNewTrip}
            className="mt-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors"
          >
            Start Planning Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedPlans
            .filter((p): p is TripPlan => Boolean(p && p.destinationName && p.query))
            .map((plan) => {
              const sym = CURRENCY_SYMBOLS[plan.query?.currency || 'USD'] || '$';
              return (
              <div
                key={plan.id}
                className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-3.5 hover:border-[#1A1A1A] transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">flight_takeoff</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#666666] font-bold">
                          {plan.query.travelStyle.toUpperCase()} TIER
                        </span>
                        {plan.savedAt && (
                          <span className="text-[9px] text-[#999]">
                            • Saved {new Date(plan.savedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                        {plan.destinationName}
                      </h3>
                      <p className="text-xs text-[#666666] font-serif italic">
                        {plan.query.durationDays} Days • {plan.datesRange} • {plan.query.travelers} Travelers
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F0EDE8]">
                    <span className="font-serif text-xl font-bold text-[#1A1A1A] block">
                      {sym}{plan.estimatedTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A] font-semibold bg-[#FAF9F7] px-2 py-0.5 border border-[#E5E5E5]">
                      +{sym}{plan.surplus.toLocaleString()} Buffer
                    </span>
                  </div>
                </div>

                {/* Inclusions summary bar */}
                <div className="p-2.5 bg-[#FAF9F7] border border-[#ECEAE5] flex flex-wrap items-center justify-between text-[11px] text-[#666666] gap-2">
                  <span>Flights: {sym}{plan.items.find((i) => i.category === 'flights')?.amount || 400}</span>
                  <span>•</span>
                  <span>Stays: {sym}{plan.items.find((i) => i.category === 'stay')?.amount || 300}</span>
                  <span>•</span>
                  <span>Dining: {sym}{plan.items.find((i) => i.category === 'dining')?.amount || 195}</span>
                  <span>•</span>
                  <span>Activities: {sym}{plan.items.find((i) => i.category === 'activities')?.amount || 110}</span>
                </div>

                {/* Delete Confirmation Banner */}
                {deleteConfirmId === plan.id ? (
                  <div className="p-3 bg-[#FFF5F5] border border-[#E5A5A5] flex items-center justify-between text-xs">
                    <span className="text-[#B91C1C] font-semibold">
                      Permanently remove this saved trip?
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onDeletePlan(plan.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-2.5 py-1 bg-[#B91C1C] text-white text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2.5 py-1 bg-white border border-[#E5E5E5] text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Action buttons */
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#E5E5E5] gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onPrintPlan(plan)}
                        className="px-2.5 py-1.5 border border-[#E5E5E5] bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Export / Print Itinerary"
                      >
                        <span className="material-symbols-outlined text-[15px]">print</span>
                        <span className="hidden sm:inline">Print / PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSharePlan(plan)}
                        className="px-2.5 py-1.5 border border-[#E5E5E5] bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Share Itinerary"
                      >
                        <span className="material-symbols-outlined text-[15px]">share</span>
                        <span className="hidden sm:inline">Share</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditPlan(plan)}
                        className="px-2.5 py-1.5 border border-[#E5E5E5] bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Edit Trip Parameters"
                      >
                        <span className="material-symbols-outlined text-[15px]">tune</span>
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(plan.id)}
                        className="p-1.5 border border-[#E5E5E5] bg-white hover:bg-red-50 text-[#666666] hover:text-red-700 text-xs font-semibold flex items-center cursor-pointer transition-colors"
                        title="Delete Trip"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan)}
                      className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-1 cursor-pointer ml-auto"
                    >
                      <span>Open Itinerary</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
