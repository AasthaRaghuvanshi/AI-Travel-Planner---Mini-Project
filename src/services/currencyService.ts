import { Currency, TripPlan, TripQuery, BudgetItem, DailyItinerary } from '../types';

export interface CurrencyDetails {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyDetails[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AED: 'د.إ',
};

/**
 * Benchmark exchange rates relative to USD (1 USD = X Currency).
 * IMPORTANT: These are estimated demo baseline rates for offline travel modeling.
 * A live FX provider (e.g. Open Exchange Rates / fixer.io) can be plugged in seamlessly.
 */
export const DEMO_ESTIMATED_RATES: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  AED: 3.67,
};

export const IS_LIVE_EXCHANGE_CONNECTED = false;
export const RATE_DISCLAIMER_TEXT =
  'Demo / Estimated Exchange Rates (Live rates API can be integrated without UI changes)';

/**
 * Converts an amount from one currency to another using the modular conversion engine.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = DEMO_ESTIMATED_RATES[fromCurrency] || 1;
  const toRate = DEMO_ESTIMATED_RATES[toCurrency] || 1;
  
  // Convert from origin to USD benchmark, then to target currency
  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;
  
  // High-denomination currencies like INR round to whole numbers, others round reasonably
  if (toCurrency === 'INR' || toCurrency === 'AED') {
    return Math.round(converted);
  }
  return Math.round(converted * 100) / 100;
}

/**
 * Returns formatted string with currency symbol and standard grouping.
 */
export function formatCurrencyAmount(
  amount: number,
  currency: Currency,
  includeDecimals: boolean = false
): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const rounded = includeDecimals ? amount.toFixed(2) : Math.round(amount).toLocaleString();
  return `${symbol}${rounded}`;
}

/**
 * Converts an entire TripPlan to a new target currency, maintaining accurate allocations.
 */
export function convertTripPlanCurrency(plan: TripPlan, targetCurrency: Currency): TripPlan {
  if (plan.query.currency === targetCurrency) return plan;

  const currentCurrency = plan.query.currency;

  const newTotalBudget = Math.round(convertCurrency(plan.totalBudget, currentCurrency, targetCurrency));
  const newEstimatedTotal = Math.round(convertCurrency(plan.estimatedTotal, currentCurrency, targetCurrency));
  const newSurplus = Math.round(convertCurrency(plan.surplus, currentCurrency, targetCurrency));
  const newBudgetDeficit = Math.round(convertCurrency(plan.budgetDeficit, currentCurrency, targetCurrency));
  const newDailyAverage = Math.round(convertCurrency(plan.dailyAverage, currentCurrency, targetCurrency));
  const newPerPerson = Math.round(convertCurrency(plan.perPerson, currentCurrency, targetCurrency));

  const newItems: BudgetItem[] = plan.items.map((item) => ({
    ...item,
    amount: Math.round(convertCurrency(item.amount, currentCurrency, targetCurrency)),
  }));

  const newDailyItineraries: DailyItinerary[] = plan.dailyItineraries.map((day) => ({
    ...day,
    estCost: Math.round(convertCurrency(day.estCost, currentCurrency, targetCurrency)),
    activities: day.activities.map((act) => ({
      ...act,
      cost: Math.round(convertCurrency(act.cost, currentCurrency, targetCurrency)),
      costLabel: act.cost === 0 ? 'Free' : `${CURRENCY_SYMBOLS[targetCurrency]}${Math.round(convertCurrency(act.cost, currentCurrency, targetCurrency))}`,
    })),
  }));

  const newAccommodations = plan.accommodations.map((acc) => ({
    ...acc,
    pricePerNight: Math.round(convertCurrency(acc.pricePerNight, currentCurrency, targetCurrency)),
  }));

  const newQuery: TripQuery = {
    ...plan.query,
    budget: newTotalBudget,
    currency: targetCurrency,
  };

  return {
    ...plan,
    query: newQuery,
    totalBudget: newTotalBudget,
    estimatedTotal: newEstimatedTotal,
    surplus: newSurplus,
    budgetDeficit: newBudgetDeficit,
    dailyAverage: newDailyAverage,
    perPerson: newPerPerson,
    items: newItems,
    dailyItineraries: newDailyItineraries,
    accommodations: newAccommodations,
  };
}
