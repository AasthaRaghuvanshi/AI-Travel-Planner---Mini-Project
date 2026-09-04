import React, { useState } from 'react';
import { EXPLORE_DESTINATIONS } from '../data/mockTrips';

interface ExploreViewProps {
  onSelectDestination: (dest: string, budget: number, days: number) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectDestination }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Under $1,000', 'Asia', 'Europe', 'Americas', 'Beach', 'Cultural'];

  const filteredDestinations = EXPLORE_DESTINATIONS.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      item.tags.includes(activeCategory) ||
      (activeCategory === 'Under $1,000' && item.budget <= 1000);

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="explore-view-container" className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 pb-24 gap-6">
      {/* Header */}
      <div className="pt-2 flex flex-col gap-1 border-b border-[#E5E5E5] pb-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#666666] font-semibold">
          Curated Escapes
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">
          Explore <span className="italic font-normal">Handpicked</span> Destinations
        </h1>
        <p className="text-sm text-[#666666] font-serif italic">
          Budget-vetted destinations calculated to deliver maximum value with zero surprise costs.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3.5 text-[#1A1A1A] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by city, country or vibe..."
          className="w-full bg-[#FAF9F7] pl-11 pr-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] border border-[#E5E5E5] transition-colors placeholder:text-[#999999]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 text-[#666666] hover:text-[#1A1A1A] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === cat
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-[#FAF9F7] text-[#666666] hover:text-[#1A1A1A] hover:bg-white border-[#E5E5E5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredDestinations.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E5E5E5] overflow-hidden flex flex-col group hover:border-[#1A1A1A] transition-colors"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#FAF9F7]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={item.name}
                src={item.imageUrl}
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-[11px] font-bold text-white flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[13px] text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {item.rating}
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] uppercase tracking-wider font-bold border border-[#E5E5E5]">
                From ${item.budget} / pers
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1 gap-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#666666] mt-0.5 font-serif italic">
                  {item.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#FAF9F7] text-[#666666] text-[10px] uppercase tracking-wider border border-[#ECEAE5]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                <span className="text-[11px] text-[#666666]">
                  {item.days} Days Curated
                </span>
                <button
                  type="button"
                  onClick={() => onSelectDestination(item.name, item.budget, item.days)}
                  className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.15em] font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Plan Trip</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
