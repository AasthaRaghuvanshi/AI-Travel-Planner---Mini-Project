import React, { useState } from 'react';
import { TripPlan, BudgetSwapOption } from '../types';
import { CURRENCY_SYMBOLS } from '../data/mockTrips';

interface BudgetOptimizerModalProps {
  plan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
  onApplySwaps: (updatedPlan: TripPlan) => void;
}

export const BudgetOptimizerModal: React.FC<BudgetOptimizerModalProps> = ({
  plan,
  isOpen,
  onClose,
  onApplySwaps,
}) => {
  const [swaps, setSwaps] = useState<BudgetSwapOption[]>(plan.swapOptions);

  if (!isOpen) return null;

  const currencySymbol = CURRENCY_SYMBOLS[plan.query.currency] || '$';

  const toggleSwap = (id: string) => {
    setSwaps((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt))
    );
  };

  const selectAll = () => {
    setSwaps((prev) => prev.map((opt) => ({ ...opt, selected: true })));
  };

  const resetAll = () => {
    setSwaps((prev) => prev.map((opt) => ({ ...opt, selected: false })));
  };

  const currentSelectedSavings = swaps
    .filter((s) => s.selected)
    .reduce((acc, curr) => acc + curr.savingsAmount, 0);

  const newEstimatedTotal = Math.max(0, plan.estimatedTotal - currentSelectedSavings);
  const newSurplus = plan.totalBudget - newEstimatedTotal;
  const percentSaved = Math.round((currentSelectedSavings / plan.estimatedTotal) * 100);

  const handleApply = () => {
    const updatedPlan: TripPlan = {
      ...plan,
      estimatedTotal: newEstimatedTotal,
      surplus: newSurplus,
      percentAllocated: Math.round((newEstimatedTotal / plan.totalBudget) * 100),
      dailyAverage: Math.round(newEstimatedTotal / plan.query.durationDays),
      perPerson: Math.round(newEstimatedTotal / plan.query.travelers),
      swapOptions: swaps,
      items: plan.items.map((item) => {
        const matchingSwap = swaps.find((s) => s.category === item.category && s.selected);
        if (matchingSwap) {
          return {
            ...item,
            amount: matchingSwap.newCost,
            details: `${matchingSwap.newTitle} (${matchingSwap.details})`,
          };
        }
        return item;
      }),
    };

    onApplySwaps(updatedPlan);
    onClose();
  };

  return (
    <div
      id="budget-optimizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] bg-[#FDFCFB] shadow-2xl flex flex-col overflow-hidden border border-[#E5E5E5]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A]">
              <span className="material-symbols-outlined text-[22px]">savings</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Smart Budget Optimizer
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                Curated local alternatives • Zero quality compromise
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-8 h-8 border border-[#E5E5E5] bg-white hover:bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
          {/* Total Potential Savings Hero Box */}
          <div className="p-5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold">
                Potential Savings
              </span>
              <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-bold">
                +{currencySymbol}{currentSelectedSavings} Saved ({percentSaved > 0 ? `-${percentSaved}%` : '0%'})
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                {currencySymbol}{newEstimatedTotal.toLocaleString()}
              </span>
              <span className="text-sm line-through text-[#999999] font-serif">
                {currencySymbol}{plan.estimatedTotal.toLocaleString()}
              </span>
              <span className="text-xs text-[#666666] uppercase tracking-wider">new estimated total</span>
            </div>
            <div className="text-xs text-[#666666] flex items-center gap-1 font-serif italic">
              <span className="material-symbols-outlined text-[15px] text-[#1A1A1A]">check_circle</span>
              Remaining safe buffer increases to {currencySymbol}{newSurplus}.
            </div>
          </div>

          {/* Controls: Select All / Reset */}
          <div className="flex items-center justify-between pt-1 border-b border-[#E5E5E5] pb-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">
              Select Recommendations to Apply
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] hover:underline cursor-pointer"
              >
                Select All
              </button>
              <span className="text-xs text-[#999999]">•</span>
              <button
                type="button"
                onClick={resetAll}
                className="text-[11px] uppercase tracking-wider font-semibold text-[#666666] hover:text-[#1A1A1A] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Interactive Swap Cards List */}
          <div className="space-y-3">
            {swaps.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSwap(item.id)}
                className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.selected
                    ? 'bg-[#FAF9F7] border-[#1A1A1A]'
                    : 'bg-white border-[#E5E5E5] hover:border-[#999999]'
                }`}
              >
                {/* Custom Styled Checkbox */}
                <div
                  className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    item.selected
                      ? 'bg-[#1A1A1A] text-white'
                      : 'border border-[#999999] bg-white'
                  }`}
                >
                  {item.selected && (
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#666666] font-bold">
                      {item.category.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E5E5E5] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-bold">
                      Save {currencySymbol}{item.savingsAmount}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-base font-bold text-[#1A1A1A]">
                      {item.newTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#1A1A1A] font-bold">
                      {currencySymbol}{item.newCost}
                    </span>
                    <span className="line-through text-[#999999]">
                      was {currencySymbol}{item.currentCost}
                    </span>
                    <span className="text-[#666666] text-[11px] font-serif italic">({item.currentTitle})</span>
                  </div>

                  <p className="text-xs text-[#666666] font-serif italic leading-relaxed mt-0.5">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inspirational Savings Reinvestment Box */}
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#1A1A1A]">lightbulb</span>
            <p className="text-xs text-[#666666] leading-relaxed font-serif italic">
              <strong className="text-[#1A1A1A] not-italic font-sans font-bold">What could you do with your {currencySymbol}{currentSelectedSavings} savings?</strong>{' '}
              Add 2 extra days, treat yourself to a luxury dinner, or bank it as safe buffer for your next adventure.
            </p>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 border-t border-[#E5E5E5] bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-[#E5E5E5] bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#FAF9F7] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] py-3 px-4 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Apply Selected Swaps ({currencySymbol}{newEstimatedTotal})</span>
            <span className="material-symbols-outlined text-[16px]">check</span>
          </button>
        </div>
      </div>
    </div>
  );
};
