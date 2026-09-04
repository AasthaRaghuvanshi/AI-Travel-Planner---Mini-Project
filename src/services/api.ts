import { TripPlan, TripQuery } from '../types';
import { generateTripPlan } from '../data/mockTrips';

export interface GenerateTripResult {
  plan: TripPlan;
  source: 'gemini' | 'engine';
}

/**
 * Calls the server-side AI endpoint to generate a personalized,
 * mathematically consistent travel itinerary and budget breakdown.
 * Falls back safely to the client-side dynamic engine if network or server fails.
 */
export async function fetchGeneratedTrip(query: TripQuery): Promise<GenerateTripResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch('/api/generate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('API error from /api/generate-trip, using local engine:', errorData);
      return { plan: generateTripPlan(query), source: 'engine' };
    }

    const data = await response.json();
    if (data && data.plan) {
      return { plan: data.plan, source: data.source || 'gemini' };
    }

    return { plan: generateTripPlan(query), source: 'engine' };
  } catch (err) {
    console.warn('Network or timeout reaching /api/generate-trip, falling back to dynamic engine:', err);
    return { plan: generateTripPlan(query), source: 'engine' };
  }
}
