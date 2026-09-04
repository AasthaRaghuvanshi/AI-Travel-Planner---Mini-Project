/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CurrentStep, Currency, TripPlan, TripQuery, User } from './types';
import { DEFAULT_QUERY, generateTripPlan } from './data/mockTrips';
import { fetchGeneratedTrip } from './services/api';
import { convertTripPlanCurrency } from './services/currencyService';
import { getStoredUser, clearStoredAuth } from './services/authService';
import { getSavedTrips, saveTripToDatabase, deleteTripFromDatabase } from './services/dbService';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { CustomizeView } from './components/CustomizeView';
import { BreakdownView } from './components/BreakdownView';
import { ItineraryView } from './components/ItineraryView';
import { ExploreView } from './components/ExploreView';
import { MyTripsView } from './components/MyTripsView';
import { AboutView } from './components/AboutView';
import { BudgetOptimizerModal } from './components/BudgetOptimizerModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { ShareTripModal } from './components/ShareTripModal';
import { PrintTripModal } from './components/PrintTripModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [currentStep, setCurrentStep] = useState<CurrentStep>('home');
  const [tripQuery, setTripQuery] = useState<TripQuery>(DEFAULT_QUERY);
  const [currentPlan, setCurrentPlan] = useState<TripPlan>(() => generateTripPlan(DEFAULT_QUERY));
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [savedPlans, setSavedPlans] = useState<TripPlan[]>(() => {
    try {
      const stored = localStorage.getItem('tripwise_saved_plans');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((p) => p && p.destinationName);
          if (valid.length > 0) return valid;
        }
      }
    } catch {
      // fallback
    }
    // Default pre-saved plan for a rich initial experience
    return [generateTripPlan(DEFAULT_QUERY, true)];
  });

  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global modals for My Trips actions
  const [modalPlan, setModalPlan] = useState<TripPlan | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Fetch initial saved trips from database / storage on mount
  useEffect(() => {
    async function loadTrips() {
      try {
        const loaded = await getSavedTrips();
        if (loaded && loaded.length > 0) {
          const valid = loaded.filter((p) => p && p.destinationName);
          if (valid.length > 0) {
            setSavedPlans(valid);
          }
        }
      } catch (err) {
        console.warn('Initial trip load error:', err);
      }
    }
    loadTrips();
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === tripQuery.currency) return;

    // Convert current plan to new currency
    const convertedPlan = convertTripPlanCurrency(currentPlan, newCurrency);
    setCurrentPlan(convertedPlan);

    // Update query budget and currency
    setTripQuery((prev) => ({
      ...prev,
      currency: newCurrency,
      budget: convertedPlan.totalBudget,
    }));

    // Convert saved plans
    setSavedPlans((prev) =>
      prev.map((p) => convertTripPlanCurrency(p, newCurrency))
    );

    showToast(`Currency switched to ${newCurrency}. Values recalculated.`);
  };

  const handleQueryChange = (updated: Partial<TripQuery>) => {
    setTripQuery((prev) => {
      const next = { ...prev, ...updated };
      return next;
    });
  };

  const handleAuthSuccess = (authUser: User) => {
    setUser(authUser);
    showToast(`Welcome back, ${authUser.name}! Synchronized.`);
  };

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
    showToast('Logged out successfully.');
  };

  const handlePlanTrip = async () => {
    setIsGenerating(true);
    try {
      const { plan, source } = await fetchGeneratedTrip(tripQuery);
      setCurrentPlan(plan);
      setCurrentStep('breakdown');
      if (source === 'gemini') {
        showToast('Itinerary enriched with Gemini AI! ✨');
      } else {
        showToast('Personalized itinerary generated!');
      }
    } catch (err) {
      console.warn('Fallback to local engine:', err);
      const fallback = generateTripPlan(tripQuery);
      setCurrentPlan(fallback);
      setCurrentStep('breakdown');
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerateTripFromCustomizer = async () => {
    setIsGenerating(true);
    try {
      const { plan, source } = await fetchGeneratedTrip(tripQuery);
      setCurrentPlan(plan);
      setCurrentStep('breakdown');
      if (source === 'gemini') {
        showToast('Itinerary fine-tuned with Gemini AI! ✨');
      } else {
        showToast('Personalized itinerary generated!');
      }
    } catch (err) {
      console.warn('Fallback to local engine:', err);
      const fallback = generateTripPlan(tripQuery);
      setCurrentPlan(fallback);
      setCurrentStep('breakdown');
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTrendingTrip = async (
    dest: string,
    budget: number,
    days: number,
    travelers: number
  ) => {
    const updatedQuery: TripQuery = {
      ...tripQuery,
      destination: dest,
      budget,
      durationDays: days,
      travelers,
    };
    setTripQuery(updatedQuery);
    setIsGenerating(true);
    try {
      const { plan } = await fetchGeneratedTrip(updatedQuery);
      setCurrentPlan(plan);
      setCurrentTab('home');
      setCurrentStep('breakdown');
    } catch {
      const newPlan = generateTripPlan(updatedQuery);
      setCurrentPlan(newPlan);
      setCurrentTab('home');
      setCurrentStep('breakdown');
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreDestination = async (dest: string, budget: number, days: number) => {
    const updatedQuery: TripQuery = {
      ...tripQuery,
      destination: dest,
      budget,
      durationDays: days,
    };
    setTripQuery(updatedQuery);
    setIsGenerating(true);
    try {
      const { plan } = await fetchGeneratedTrip(updatedQuery);
      setCurrentPlan(plan);
      setCurrentTab('home');
      setCurrentStep('breakdown');
    } catch {
      const newPlan = generateTripPlan(updatedQuery);
      setCurrentPlan(newPlan);
      setCurrentTab('home');
      setCurrentStep('breakdown');
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveTrip = async (planToSave: TripPlan) => {
    const alreadySaved = savedPlans.some((p) => p.id === planToSave.id);
    try {
      const saved = await saveTripToDatabase(planToSave);
      if (!alreadySaved) {
        setSavedPlans((prev) => [saved, ...prev]);
        setCurrentPlan((prev) => ({ ...prev, isSaved: true }));
        showToast('Trip dossier saved to My Trips! ✈️');
      } else {
        setSavedPlans((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
        showToast('Trip itinerary updated in your saved dossier.');
      }
    } catch (err) {
      console.warn('Save trip error:', err);
      showToast('Trip saved locally.');
    }
  };

  const handleDeleteSavedPlan = async (id: string) => {
    try {
      await deleteTripFromDatabase(id);
      setSavedPlans((prev) => prev.filter((p) => p.id !== id));
      showToast('Plan removed from saved journeys.');
    } catch (err) {
      console.warn('Delete trip error:', err);
      setSavedPlans((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSelectSavedPlan = (plan: TripPlan) => {
    setCurrentPlan(plan);
    setTripQuery(plan.query);
    setCurrentTab('home');
    setCurrentStep('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditSavedPlan = (plan: TripPlan) => {
    setCurrentPlan(plan);
    setTripQuery(plan.query);
    setCurrentTab('home');
    setCurrentStep('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareSavedPlan = (plan: TripPlan) => {
    setModalPlan(plan);
    setIsShareModalOpen(true);
  };

  const handlePrintSavedPlan = (plan: TripPlan) => {
    setModalPlan(plan);
    setIsPrintModalOpen(true);
  };

  const handleApplyOptimizerSwaps = (updatedPlan: TripPlan) => {
    setCurrentPlan(updatedPlan);
    showToast(`Smart Optimizer applied! Budget updated to ${tripQuery.currency} ${updatedPlan.estimatedTotal.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col antialiased selection:bg-[#1A1A1A] selection:text-white">
      {/* Universal Header */}
      <Header
        currentTab={currentTab}
        currentStep={currentStep}
        currentCurrency={tripQuery.currency}
        onCurrencyChange={handleCurrencyChange}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onNavigateHome={() => {
          setCurrentTab('home');
          setCurrentStep('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStepChange={(step) => {
          setCurrentTab('home');
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-20">
        {/* Editorial Loading Overlay */}
        {isGenerating && (
          <div className="fixed inset-0 z-50 bg-[#FDFCFB]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-transparent animate-spin mb-4"></div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#999] font-bold block mb-1">
              TRIPWISE INTELLIGENCE ENGINE
            </span>
            <h3 className="font-serif italic text-2xl text-[#1A1A1A] mb-2 font-normal">
              Curating Your Journey to {tripQuery.destination}...
            </h3>
            <p className="text-xs text-[#666] max-w-sm leading-relaxed font-light">
              Analyzing flights from {tripQuery.startingLocation || 'origin'}, boutique stays, culinary highlights, and curated activities within your {tripQuery.currency} {tripQuery.budget.toLocaleString()} budget.
            </p>
          </div>
        )}

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2 text-xs uppercase tracking-wider font-bold flex items-center gap-2 border border-black shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="material-symbols-outlined text-[16px] text-white">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Home flow */}
        {currentTab === 'home' && (
          <>
            {currentStep === 'home' && (
              <HomeView
                query={tripQuery}
                onQueryChange={handleQueryChange}
                onPlanTrip={handlePlanTrip}
                onSelectTrendingTrip={handleSelectTrendingTrip}
                isGenerating={isGenerating}
                onViewAllTrending={() => {
                  setCurrentTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentStep === 'customize' && (
              <CustomizeView
                query={tripQuery}
                onQueryChange={handleQueryChange}
                onGenerateTrip={handleGenerateTripFromCustomizer}
                isGenerating={isGenerating}
                onBackToHome={() => {
                  setCurrentStep('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentStep === 'breakdown' && (
              <BreakdownView
                plan={currentPlan}
                onViewItinerary={() => {
                  setCurrentStep('itinerary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAdjustPreferences={() => {
                  setCurrentStep('customize');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenOptimizer={() => setIsOptimizerOpen(true)}
                onUpdatePlan={(updated) => setCurrentPlan(updated)}
              />
            )}

            {currentStep === 'itinerary' && (
              <ItineraryView
                plan={currentPlan}
                onSaveTrip={handleSaveTrip}
                onBookTrip={() => setIsBookingOpen(true)}
                onAdjustBudget={() => {
                  setCurrentStep('breakdown');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}

        {/* Tab 2: Explore */}
        {currentTab === 'explore' && (
          <ExploreView onSelectDestination={handleExploreDestination} />
        )}

        {/* Tab 3: My Trips */}
        {currentTab === 'my-trips' && (
          <MyTripsView
            savedPlans={savedPlans}
            onSelectPlan={handleSelectSavedPlan}
            onEditPlan={handleEditSavedPlan}
            onDeletePlan={handleDeleteSavedPlan}
            onSharePlan={handleShareSavedPlan}
            onPrintPlan={handlePrintSavedPlan}
            onPlanNewTrip={() => {
              setCurrentTab('home');
              setCurrentStep('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 4: About */}
        {currentTab === 'about' && <AboutView />}
      </main>

      {/* Modals */}
      <BudgetOptimizerModal
        plan={currentPlan}
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        onApplySwaps={handleApplyOptimizerSwaps}
      />

      <BookingModal
        plan={currentPlan}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={() => {
          handleSaveTrip(currentPlan);
        }}
      />

      {/* User Authentication Modal (STEP 13) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Shared Trip Modal triggered from My Trips */}
      {modalPlan && (
        <>
          <ShareTripModal
            isOpen={isShareModalOpen}
            plan={modalPlan}
            onClose={() => {
              setIsShareModalOpen(false);
              setModalPlan(null);
            }}
          />
          <PrintTripModal
            isOpen={isPrintModalOpen}
            plan={modalPlan}
            onClose={() => {
              setIsPrintModalOpen(false);
              setModalPlan(null);
            }}
          />
        </>
      )}

      {/* Universal Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
