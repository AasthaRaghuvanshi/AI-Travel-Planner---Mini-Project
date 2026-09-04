import React, { useState } from 'react';

export const AboutView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the TripWise Dynamic Budget Allocation work?',
      a: 'Our algorithm takes your destination, budget ceiling, trip length, and party size to distribute funds across six critical pillars: Transit (38%), Accommodations (28%), Food & Dining (18%), Sightseeing & Experiences (10%), Local Transport (3%), and an Emergency Cushion (3%). It continuously checks real market baselines so you never land underfunded.',
    },
    {
      q: 'What is the "Make Your Trip Cheaper" Smart Optimizer?',
      a: 'The Smart Optimizer identifies intelligent substitutions that reduce expenses without degrading the travel experience. For example, switching a direct peak flight by one day or selecting a boutique bamboo homestay with organic breakfast can instantly save over $300 while delivering authentic local charm.',
    },
    {
      q: 'Are taxes, fees, and tourist levies included in the budget?',
      a: 'Yes. TripWise explicitly factors in airport departure levies, local hotel taxes, and daily tipping conventions into each category so your budget covers the entire journey with zero surprise fees.',
    },
    {
      q: 'Can I customize individual items or change hotels?',
      a: 'Absolutely. You can fine-tune every parameter in the Customization step, swap recommendations in the Budget Breakdown view, or apply one-click savings via the Smart Optimizer.',
    },
  ];

  return (
    <div id="about-view-container" className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pb-24 gap-6">
      {/* Header */}
      <div className="pt-2 flex flex-col gap-1 border-b border-[#E5E5E5] pb-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">
          About TripWise
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">
          Plan. Travel. <span className="italic font-normal">Savor.</span>
        </h1>
        <p className="text-sm text-[#666666] font-serif italic">
          We believe dream travel shouldn’t require endless spreadsheets or terrifying surprise credit card bills.
        </p>
      </div>

      {/* Core Mission Card */}
      <div className="p-5 bg-white border border-[#E5E5E5] flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
              The Zero-Surprise-Fees Philosophy
            </h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold">
              Engineered for complete financial peace of mind
            </span>
          </div>
        </div>
        <p className="text-xs text-[#666666] leading-relaxed font-serif italic">
          Standard booking sites show partial hotel room rates and leave you to discover baggage fees, airport transfers, tourist taxes, and high food costs upon arrival. TripWise budgets your complete itinerary end-to-end, reserving safe buffers and providing realistic day-by-day expenditure estimates.
        </p>
      </div>

      {/* 6 Allocation Pillars */}
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
          Our 6 Budget Allocation Pillars
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">✈️</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Transit & Flights</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Roundtrip flights + baggage & taxes</span>
          </div>
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">🏨</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Curated Stays</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Vetted hotels & boutique homestays</span>
          </div>
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">🍽️</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Food & Dining</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Daily authentic meals, cafes & tastings</span>
          </div>
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">🏛️</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Sightseeing</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Ticket fees & cultural excursions</span>
          </div>
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">🚇</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Local Transport</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Scooters, rideshare, and transit passes</span>
          </div>
          <div className="p-3.5 bg-[#FAF9F7] border border-[#E5E5E5] flex flex-col gap-1">
            <span className="text-lg">🛡️</span>
            <span className="font-serif text-sm font-bold text-[#1A1A1A]">Emergency Buffer</span>
            <span className="text-[11px] text-[#666666] font-serif italic">Liquid cash reserve for unforeseen needs</span>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E5E5] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-2 cursor-pointer hover:bg-[#FAF9F7] transition-colors"
                >
                  <span className="font-serif text-sm font-bold text-[#1A1A1A]">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-[#1A1A1A] text-[18px] transition-transform">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#666666] leading-relaxed border-t border-[#E5E5E5] pt-3 font-serif italic bg-[#FAF9F7]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
