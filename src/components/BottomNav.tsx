import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  currentTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 w-full z-50 pb-safe bg-white border-t border-[#E5E5E5]"
    >
      <div className="max-w-md mx-auto h-16 px-6 flex items-center justify-between">
        {/* Home */}
        <button
          id="nav-tab-home"
          aria-current={currentTab === 'home' ? 'page' : undefined}
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-[#1A1A1A]'
              : 'text-[#888] hover:text-[#1A1A1A]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_stories
          </span>
          <span className={`text-[9px] uppercase tracking-[0.2em] mt-1 ${currentTab === 'home' ? 'font-bold text-[#1A1A1A] border-b border-black pb-0.5' : 'font-medium'}`}>
            Plan
          </span>
        </button>

        {/* Explore */}
        <button
          id="nav-tab-explore"
          aria-current={currentTab === 'explore' ? 'page' : undefined}
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all cursor-pointer ${
            currentTab === 'explore'
              ? 'text-[#1A1A1A]'
              : 'text-[#888] hover:text-[#1A1A1A]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: currentTab === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className={`text-[9px] uppercase tracking-[0.2em] mt-1 ${currentTab === 'explore' ? 'font-bold text-[#1A1A1A] border-b border-black pb-0.5' : 'font-medium'}`}>
            Destinations
          </span>
        </button>

        {/* My Trips */}
        <button
          id="nav-tab-my-trips"
          aria-current={currentTab === 'my-trips' ? 'page' : undefined}
          onClick={() => onTabChange('my-trips')}
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all cursor-pointer ${
            currentTab === 'my-trips'
              ? 'text-[#1A1A1A]'
              : 'text-[#888] hover:text-[#1A1A1A]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: currentTab === 'my-trips' ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmark
          </span>
          <span className={`text-[9px] uppercase tracking-[0.2em] mt-1 ${currentTab === 'my-trips' ? 'font-bold text-[#1A1A1A] border-b border-black pb-0.5' : 'font-medium'}`}>
            Journal
          </span>
        </button>

        {/* About */}
        <button
          id="nav-tab-about"
          aria-current={currentTab === 'about' ? 'page' : undefined}
          onClick={() => onTabChange('about')}
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all cursor-pointer ${
            currentTab === 'about'
              ? 'text-[#1A1A1A]'
              : 'text-[#888] hover:text-[#1A1A1A]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: currentTab === 'about' ? "'FILL' 1" : "'FILL' 0" }}
          >
            article
          </span>
          <span className={`text-[9px] uppercase tracking-[0.2em] mt-1 ${currentTab === 'about' ? 'font-bold text-[#1A1A1A] border-b border-black pb-0.5' : 'font-medium'}`}>
            Manifesto
          </span>
        </button>
      </div>
    </nav>
  );
};
