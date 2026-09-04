import React, { useState } from 'react';
import { ActiveTab, CurrentStep, Currency, User } from '../types';
import { SUPPORTED_CURRENCIES, RATE_DISCLAIMER_TEXT } from '../services/currencyService';

interface HeaderProps {
  currentTab: ActiveTab;
  currentStep: CurrentStep;
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onStepChange?: (step: CurrentStep) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  currentCurrency,
  onCurrencyChange,
  user,
  onOpenAuth,
  onLogout,
  onNavigateHome,
  onStepChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const activeCurrencyInfo = SUPPORTED_CURRENCIES.find((c) => c.code === currentCurrency) || SUPPORTED_CURRENCIES[0];

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 w-full z-50 pt-safe bg-white border-b border-[#E5E5E5]"
      >
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-10 flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <button
            id="header-brand-btn"
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group cursor-pointer"
            type="button"
          >
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
              <span className="text-white font-serif font-bold text-sm italic">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-semibold text-[#1A1A1A] leading-none">
                TRIPWISE
              </span>
              <span className="text-[9px] text-[#999] uppercase tracking-[0.25em] font-medium mt-0.5">
                Editorial Travel
              </span>
            </div>
          </button>

          {/* Step Breadcrumb indicator if in customized flow */}
          {currentStep !== 'home' && (
            <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-[#666]">
              <button
                onClick={onNavigateHome}
                className="hover:text-black transition-colors cursor-pointer"
                type="button"
              >
                Plan
              </button>
              <span className="text-[#CCC]">/</span>
              <button
                onClick={() => onStepChange?.('customize')}
                className={`transition-colors cursor-pointer ${currentStep === 'customize' ? 'text-black font-bold border-b border-black pb-0.5' : 'hover:text-black'}`}
                type="button"
              >
                Customize
              </button>
              <span className="text-[#CCC]">/</span>
              <button
                onClick={() => onStepChange?.('breakdown')}
                className={`transition-colors cursor-pointer ${currentStep === 'breakdown' ? 'text-black font-bold border-b border-black pb-0.5' : 'hover:text-black'}`}
                type="button"
              >
                Breakdown
              </button>
              <span className="text-[#CCC]">/</span>
              <button
                onClick={() => onStepChange?.('itinerary')}
                className={`transition-colors cursor-pointer ${currentStep === 'itinerary' ? 'text-black font-bold border-b border-black pb-0.5' : 'hover:text-black'}`}
                type="button"
              >
                Itinerary
              </button>
            </div>
          )}

          {/* Right Controls: Currency Switcher & Auth */}
          <div className="flex items-center gap-2 relative">
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                id="btn-currency-selector"
                type="button"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="h-9 px-2.5 bg-white border border-[#E5E5E5] hover:border-[#1A1A1A] text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 transition-colors cursor-pointer"
                title={RATE_DISCLAIMER_TEXT}
              >
                <span>{activeCurrencyInfo.symbol}</span>
                <span className="text-[11px] font-mono">{activeCurrencyInfo.code}</span>
                <span className="material-symbols-outlined text-[14px] text-[#666]">arrow_drop_down</span>
              </button>

              {showCurrencyDropdown && (
                <div
                  id="currency-popover"
                  className="absolute right-0 top-11 w-48 bg-white border border-[#1A1A1A] shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-2 py-1 border-b border-[#E5E5E5] mb-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#999] font-bold block">
                      Select Currency
                    </span>
                    <span className="text-[8px] text-[#666] leading-tight block mt-0.5">
                      Demo conversion rates
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          onCurrencyChange(c.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`px-2.5 py-1.5 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
                          currentCurrency === c.code
                            ? 'bg-[#1A1A1A] text-white font-bold'
                            : 'hover:bg-[#FAF9F7] text-[#1A1A1A]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span className="font-semibold">{c.code}</span>
                        </div>
                        <span className="font-serif italic font-bold">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notifications"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#666] hover:text-[#1A1A1A] hover:bg-[#FAF9F7] transition-colors relative cursor-pointer border border-[#E5E5E5]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#1A1A1A]"></span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div
                  id="notifications-popover"
                  className="absolute right-0 top-12 w-80 bg-white border border-[#E5E5E5] p-5 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">Notices</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#999] font-semibold">
                      Live Updates
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 pt-3">
                    <div className="flex items-start gap-3 p-2.5 bg-[#FAF9F7] border border-[#E5E5E5]">
                      <span className="material-symbols-outlined text-[18px] text-[#1A1A1A] mt-0.5">
                        currency_exchange
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1A1A1A]">Multi-Currency Ready</span>
                        <span className="text-[11px] text-[#666] mt-0.5">
                          Support for INR, USD, EUR, GBP, and AED with instant conversions.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2.5 bg-[#FAF9F7] border border-[#E5E5E5]">
                      <span className="material-symbols-outlined text-[18px] text-[#1A1A1A] mt-0.5">
                        cloud
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1A1A1A]">Weather Forecasts</span>
                        <span className="text-[11px] text-[#666] mt-0.5">
                          Destination climate telemetry & packing recommendations enabled.
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full mt-4 py-2 border border-[#E5E5E5] text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                    type="button"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            {/* User Profile / Auth Area */}
            {user ? (
              <div className="relative">
                <button
                  id="btn-user-profile"
                  aria-label="User Profile"
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-85 transition-opacity border border-[#1A1A1A] p-0.5 cursor-pointer"
                  type="button"
                >
                  <img
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                    src={user.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Curator'}
                  />
                </button>

                {/* Profile Popover */}
                {showProfile && (
                  <div
                    id="profile-popover"
                    className="absolute right-0 top-12 w-72 bg-white border border-[#E5E5E5] p-5 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5E5]">
                      <img
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#E5E5E5]"
                        src={user.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Curator'}
                      />
                      <div className="flex flex-col">
                        <span className="font-serif text-base font-semibold text-[#1A1A1A]">{user.name}</span>
                        <span className="text-[10px] text-[#666] truncate max-w-[150px]">{user.email}</span>
                        <span className="text-[9px] uppercase tracking-widest text-[#999] mt-0.5">Editorial Member</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-3 text-xs text-[#1A1A1A]">
                      <div className="flex items-center justify-between p-2.5 bg-[#FAF9F7] border border-[#E5E5E5]">
                        <span className="text-[11px] uppercase tracking-wider text-[#666]">Active Currency</span>
                        <span className="font-serif italic font-bold">{activeCurrencyInfo.code} ({activeCurrencyInfo.symbol})</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-[#FAF9F7] border border-[#E5E5E5]">
                        <span className="text-[11px] uppercase tracking-wider text-[#666]">Cloud Database</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          Connected
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          setShowProfile(false);
                          onLogout();
                        }}
                        className="flex-1 py-2 border border-[#E5E5E5] text-[10px] uppercase tracking-[0.2em] font-bold text-[#666] hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
                        type="button"
                      >
                        Sign Out
                      </button>
                      <button
                        onClick={() => setShowProfile(false)}
                        className="flex-1 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-colors cursor-pointer"
                        type="button"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-login-trigger"
                type="button"
                onClick={onOpenAuth}
                className="h-9 px-3.5 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">account_circle</span>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
