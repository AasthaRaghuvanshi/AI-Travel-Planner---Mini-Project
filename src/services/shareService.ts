import { TripPlan } from '../types';
import { CURRENCY_SYMBOLS } from './currencyService';

export interface ShareResult {
  success: boolean;
  method: 'native' | 'clipboard' | 'failed';
  message: string;
}

/**
 * Builds a clean, shareable URL for the trip.
 */
export function generateShareUrl(plan: TripPlan): string {
  const baseUrl = window.location.origin;
  // Compact query params for sharing
  const params = new URLSearchParams({
    dest: plan.destinationName,
    budget: plan.totalBudget.toString(),
    curr: plan.query.currency,
    days: plan.query.durationDays.toString(),
    pax: plan.query.travelers.toString(),
    tier: plan.query.travelStyle,
    tripId: plan.id,
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generates an editorial text summary of the trip suitable for messaging or email.
 */
export function generateShareableText(plan: TripPlan): string {
  const symbol = CURRENCY_SYMBOLS[plan.query.currency] || '$';
  const header = `✈️ TRIPWISE CURATED ITINERARY: ${plan.destinationName.toUpperCase()}\n`;
  const details = `📅 ${plan.query.durationDays} Days • ${plan.datesRange} • ${plan.query.travelers} Traveler(s)\n` +
    `💰 Total Budget: ${symbol}${plan.totalBudget.toLocaleString()} | Est. Spend: ${symbol}${plan.estimatedTotal.toLocaleString()} (${symbol}${plan.surplus} Buffer)\n\n`;

  const highlights = `🏨 Stay: ${plan.accommodations[0]?.name || 'Curated Hotel'}\n` +
    `🍜 Highlights: ${plan.recommendations.localFood.slice(0, 3).map((f) => f.dish).join(', ')}\n\n`;

  const schedule = plan.dailyItineraries.slice(0, 3).map((d) => 
    `Day ${d.dayNumber}: ${d.title}\n• Morning: ${d.morningActivity.title}\n• Afternoon: ${d.afternoonActivity.title}\n• Evening: ${d.eveningActivity.title}`
  ).join('\n\n');

  const footer = `\n\nPlan and customize on TripWise: ${generateShareUrl(plan)}`;

  return header + details + highlights + schedule + footer;
}

/**
 * Shares the trip using native share API if available, or copies link to clipboard.
 */
export async function shareTrip(plan: TripPlan): Promise<ShareResult> {
  const shareUrl = generateShareUrl(plan);
  const shareText = generateShareableText(plan);

  if (navigator.share) {
    try {
      await navigator.share({
        title: `TripWise: ${plan.destinationName} Itinerary`,
        text: `Check out my curated ${plan.query.durationDays}-day travel plan to ${plan.destinationName}!`,
        url: shareUrl,
      });
      return {
        success: true,
        method: 'native',
        message: 'Shared successfully via device share sheet!',
      };
    } catch (err: any) {
      // User cancelled or share failed, fallback to clipboard
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          return {
            success: true,
            method: 'clipboard',
            message: 'Trip link copied to clipboard!',
          };
        } catch {
          return {
            success: false,
            method: 'failed',
            message: 'Unable to share trip.',
          };
        }
      }
      return {
        success: false,
        method: 'failed',
        message: 'Share cancelled.',
      };
    }
  } else {
    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(shareUrl);
      return {
        success: true,
        method: 'clipboard',
        message: 'Trip link copied to clipboard!',
      };
    } catch {
      return {
        success: false,
        method: 'failed',
        message: 'Unable to copy to clipboard.',
      };
    }
  }
}
