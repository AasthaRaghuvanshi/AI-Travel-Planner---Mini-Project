import React, { useState } from 'react';
import { TripPlan } from '../types';
import { generateShareUrl, generateShareableText, shareTrip } from '../services/shareService';

interface ShareTripModalProps {
  isOpen: boolean;
  plan: TripPlan;
  onClose: () => void;
}

export const ShareTripModal: React.FC<ShareTripModalProps> = ({ isOpen, plan, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  if (!isOpen || !plan) return null;

  const shareUrl = generateShareUrl(plan);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setStatusNote('Direct trip link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setStatusNote('Unable to access clipboard. Please copy manually.');
    }
  };

  const handleCopyText = async () => {
    try {
      const text = generateShareableText(plan);
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setStatusNote('Full itinerary summary copied to clipboard!');
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      setStatusNote('Unable to access clipboard.');
    }
  };

  const handleNativeShare = async () => {
    const result = await shareTrip(plan);
    if (result.message) {
      setStatusNote(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#1A1A1A] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999] hover:text-[#1A1A1A] transition-colors p-1"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b border-[#E5E5E5] pb-4 mb-5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#999] font-bold block">
            TripWise Collaboration & Sharing
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
            Share <span className="italic font-normal">{plan.destinationName}</span>
          </h3>
          <p className="text-xs text-[#666] mt-1 font-serif italic">
            {plan.query.durationDays} Days • {plan.datesRange} • {plan.query.travelers} Travelers
          </p>
        </div>

        {statusNote && (
          <div className="mb-4 p-2.5 bg-[#FAF9F7] border border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] flex items-center gap-2 animate-in fade-in duration-150">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{statusNote}</span>
          </div>
        )}

        {/* Share Link Row */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-[10px] uppercase tracking-wider text-[#666] font-semibold">
            Trip Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 bg-[#FAF9F7] border border-[#E5E5E5] text-xs text-[#666] select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Native Share button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-4 border border-[#E5E5E5] hover:border-[#1A1A1A] bg-[#FAF9F7] flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A1A1A] block">Device Share</span>
              <span className="text-[10px] text-[#666]">AirDrop, Messages, Social</span>
            </div>
          </button>

          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopyText}
            className="p-4 border border-[#E5E5E5] hover:border-[#1A1A1A] bg-[#FAF9F7] flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A1A1A] block">
                {copiedText ? 'Copied Summary!' : 'Copy Text'}
              </span>
              <span className="text-[10px] text-[#666]">Formatted for WhatsApp/Email</span>
            </div>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="p-3 bg-white border border-[#E5E5E5] text-[11px] text-[#999] leading-relaxed">
          <span className="font-semibold text-[#666]">Privacy Protected:</span> Shared links only expose public destination itinerary, estimates, and schedules. Private user profiles, payment methods, and personal accounts are never shared.
        </div>
      </div>
    </div>
  );
};
