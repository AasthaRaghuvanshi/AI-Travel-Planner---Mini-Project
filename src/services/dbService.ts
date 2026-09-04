import { TripPlan } from '../types';
import { getStoredToken } from './authService';

const LOCAL_STORAGE_KEY = 'tripwise_saved_plans';

/**
 * Loads saved plans either from authenticated server database or local storage fallback.
 */
export async function getSavedTrips(): Promise<TripPlan[]> {
  const token = getStoredToken();
  if (token) {
    try {
      const res = await fetch('/api/trips', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.trips)) {
          // Update local cache
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.trips));
          return data.trips;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch from backend database, using local storage cache:', err);
    }
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Saves a trip to server database (if authenticated) and persists to local storage.
 */
export async function saveTripToDatabase(plan: TripPlan): Promise<TripPlan> {
  const token = getStoredToken();
  const updatedPlan: TripPlan = {
    ...plan,
    isSaved: true,
    savedAt: new Date().toISOString(),
  };

  // Persist locally first
  try {
    const existing = await getSavedTrips();
    const filtered = existing.filter((p) => p.id !== updatedPlan.id);
    const combined = [updatedPlan, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combined));
  } catch (err) {
    console.warn('Local storage error while saving trip:', err);
  }

  // If authenticated, sync with server database
  if (token) {
    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: updatedPlan }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.plan || updatedPlan;
      }
    } catch (err) {
      console.warn('Failed to sync trip to server database:', err);
    }
  }

  return updatedPlan;
}

/**
 * Deletes a trip from server database and local storage.
 */
export async function deleteTripFromDatabase(tripId: string): Promise<void> {
  // Update local storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const trips: TripPlan[] = JSON.parse(raw);
      const filtered = trips.filter((t) => t.id !== tripId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.warn('Error deleting from local storage:', err);
  }

  // Delete from backend if authenticated
  const token = getStoredToken();
  if (token) {
    try {
      await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn('Error deleting trip from server database:', err);
    }
  }
}
