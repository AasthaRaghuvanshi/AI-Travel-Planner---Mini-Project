import React, { useState } from 'react';
import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from '../data/mockTrips';

interface BookingModalProps {
  plan: TripPlan;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [leadName, setLeadName] = useState('Emma Watson');
  const [email, setEmail] = useState('emma.traveler@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !plan) return null;

  const currencySymbol = CURRENCY_SYMBOLS[plan?.query?.currency || 'USD'] || '$';
  const bookingReference = `TW-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onSuccess();
    }, 900);
  };

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] bg-[#FDFCFB] shadow-2xl flex flex-col overflow-hidden border border-[#E5E5E5]">
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="p-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#E5E5E5] bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A]">
                  <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    Lock In Your Trip
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                    Zero hidden fees • Guaranteed budget package
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="w-8 h-8 border border-[#E5E5E5] bg-white hover:bg-[#FAF9F7] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 no-scrollbar">
              {/* Trip Capsule */}
              <div className="p-4 bg-white border border-[#E5E5E5] flex items-center gap-3.5">
                <img
                  className="w-16 h-16 object-cover border border-[#E5E5E5]"
                  alt={plan.destinationName}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgA7H0BEGxohdiYO7jaw2RaBSGQY8w3aLGR0Xs4vzrKhcguU50J4dPyrkvws1ULEEYi7b_Ifsa01WD8Muc88c6U-1rrWwNu__5ZBMEPlTtRydQdTkIIWgnWGa6eZ-LSI5CmYq95zFCCptAnlyDiXjRSwkLe8J-7zpoZ3sQkPLeM3KTx_G79nA1QCEXO2iz-wMJmCPvrb0yvY5fU9a_xRwkdElo8gFZzzqmYYJQNn1Duvi3iBUfqEoNzw"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-serif text-lg font-bold text-[#1A1A1A] truncate">
                    {plan.destinationName}
                  </span>
                  <span className="text-xs text-[#666666] font-serif italic">
                    {plan.query.durationDays} Days • {plan.datesRange} • {plan.query.travelers} Guests
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-bold mt-1">
                    Total: {currencySymbol}{plan.estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Traveler Details */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] block">
                  Lead Traveler Details
                </span>
                <div>
                  <label className="block text-xs font-semibold text-[#666666] mb-1">
                    Full Name (as on Passport)
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-[#FAF9F7] px-3.5 py-2.5 border border-[#E5E5E5] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF9F7] px-3.5 py-2.5 border border-[#E5E5E5] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666666] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF9F7] px-3.5 py-2.5 border border-[#E5E5E5] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown Summary */}
              <div className="p-4 bg-white border border-[#E5E5E5] space-y-2">
                <div className="flex justify-between text-xs text-[#666666]">
                  <span>Flights & Transit</span>
                  <span className="font-semibold text-[#1A1A1A]">{currencySymbol}410.00</span>
                </div>
                <div className="flex justify-between text-xs text-[#666666]">
                  <span>Accommodations ({plan.query.durationDays - 1} nights)</span>
                  <span className="font-semibold text-[#1A1A1A]">{currencySymbol}300.00</span>
                </div>
                <div className="flex justify-between text-xs text-[#666666]">
                  <span>Food & Experiences Package</span>
                  <span className="font-semibold text-[#1A1A1A]">{currencySymbol}370.00</span>
                </div>
                <div className="pt-2 border-t border-[#E5E5E5] flex justify-between font-serif text-base font-bold text-[#1A1A1A]">
                  <span>Estimated Total Due</span>
                  <span>{currencySymbol}{plan.estimatedTotal.toLocaleString()}.00</span>
                </div>
              </div>

              {/* Protection Notice */}
              <div className="flex items-start gap-2 p-3 bg-[#FAF9F7] border border-[#E5E5E5] text-xs text-[#666666]">
                <span className="material-symbols-outlined text-[16px] text-[#1A1A1A] flex-shrink-0 mt-0.5">verified_user</span>
                <span className="font-serif italic leading-relaxed">
                  TripWise Smart Price Lock: Your rate is held for 48 hours with 100% free cancellation before departure.
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-[#E5E5E5] bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#FAF9F7] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-[2] py-3 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isProcessing ? 'sync' : 'lock'}
                  </span>
                  <span>
                    {isProcessing ? 'Confirming...' : `Confirm & Lock Rate (${currencySymbol}${plan.estimatedTotal})`}
                  </span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 bg-[#1A1A1A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <div>
              <span className="px-3 py-1 bg-[#FAF9F7] border border-[#E5E5E5] text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold">
                Booking Confirmed
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-3">
                You're Going to {plan.destinationName}!
              </h2>
              <p className="text-xs text-[#666666] font-serif italic mt-1">
                Booking reference: <strong className="text-[#1A1A1A] font-sans not-italic tracking-wider">{bookingReference}</strong>
              </p>
            </div>

            <div className="w-full p-4 bg-[#FAF9F7] border border-[#E5E5E5] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#666666]">Lead Traveler:</span>
                <span className="font-bold text-[#1A1A1A]">{leadName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Confirmation sent to:</span>
                <span className="font-bold text-[#1A1A1A]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">Remaining Safe Buffer:</span>
                <span className="font-bold text-[#1A1A1A]">+{currencySymbol}{plan.surplus} Buffer</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer transition-colors"
            >
              Back to My Itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
