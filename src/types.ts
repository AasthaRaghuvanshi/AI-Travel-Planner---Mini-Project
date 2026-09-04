export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type TravelStyle = 'budget' | 'comfort' | 'premium';

export type TripPace = 'relaxed' | 'balanced' | 'fast';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface DestinationWeather {
  tempHighC: number;
  tempLowC: number;
  tempHighF: number;
  tempLowF: number;
  condition: string;
  icon: string;
  rainfallChance: number;
  humidity: number;
  packingAdvice: string[];
  bestSeason: string;
  summary: string;
  isDemoData: boolean;
  sourceLabel: string;
}

export interface TripMapLocation {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  dayNumber?: number;
  category: 'landmark' | 'stay' | 'dining' | 'transit' | 'activity';
  costLabel?: string;
}

export interface TripQuery {
  destination: string;
  startingLocation: string;
  budget: number;
  currency: Currency;
  travelers: number;
  durationDays: number;
  datesRange: string;
  travelStyle: TravelStyle;
  interests: string[];
  tripPace: TripPace;
}

export interface BudgetItem {
  id: string;
  category: 'flights' | 'stay' | 'dining' | 'activities' | 'local_transit' | 'buffer';
  title: string;
  subtitle: string;
  amount: number;
  sharePercent: number;
  details: string;
  badge?: string;
  actionLabel?: string;
  imageUrl?: string;
  rating?: number;
  tags?: string[];
}

export interface DailyActivity {
  time: string;
  title: string;
  description: string;
  cost: number;
  costLabel: string;
  category: 'transit' | 'stay' | 'dining' | 'sightseeing' | 'activity' | 'relax';
  isFree?: boolean;
}

export interface DailyItinerary {
  dayNumber: number;
  dateStr: string;
  title: string;
  estCost: number;
  morningActivity: DailyActivity;
  afternoonActivity: DailyActivity;
  eveningActivity: DailyActivity;
  suggestedFood: {
    breakfast: string;
    lunch: string;
    dinner: string;
    estCost: number;
    details: string;
  };
  localTransit: {
    mode: string;
    details: string;
    estCost: number;
  };
  activities: DailyActivity[];
}

export interface AccommodationPreview {
  name: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
  location: string;
  type?: string;
}

export interface TripSwap {
  id: string;
  category: 'stay' | 'transit' | 'dining' | 'activities' | 'local_transit';
  categoryLabel: string;
  title: string;
  currentPlanTitle: string;
  currentPlanCost: number;
  swapPlanTitle: string;
  swapPlanCost: number;
  savings: number;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  perNightCurrent?: number;
  perNightSwap?: number;
  highlights: string[];
  applied: boolean;
}

export interface BudgetSwapOption {
  id: string;
  category: string;
  currentTitle: string;
  currentCost: number;
  newTitle: string;
  newCost: number;
  savingsAmount: number;
  details: string;
  selected: boolean;
  imageUrl?: string;
  rating?: number;
}

export interface DestinationRecommendations {
  placesToVisit: {
    title: string;
    description: string;
    estCost: number;
    tags?: string[];
  }[];
  activities: {
    title: string;
    description: string;
    estCost: number;
    category: string;
  }[];
  localFood: {
    dish: string;
    description: string;
    estCostRange: string;
  }[];
  foodAreas: {
    areaName: string;
    vibe: string;
    recommendation: string;
  }[];
  accommodationTypes: {
    type: string;
    neighborhood: string;
    estPricePerNight: number;
    highlights: string[];
  }[];
  localTransportation: {
    mode: string;
    description: string;
    estCost: string;
  }[];
  culturalExperiences: {
    title: string;
    description: string;
    tip: string;
  }[];
}

export interface TripPlan {
  id: string;
  query: TripQuery;
  destinationName: string;
  startingLocation: string;
  subtitle: string;
  country: string;
  weather: string;
  datesRange: string;
  heroImage: string;
  totalBudget: number;
  estimatedTotal: number;
  originalEstimatedTotal?: number;
  surplus: number;
  isOverBudget: boolean;
  budgetDeficit: number;
  percentAllocated: number;
  dailyAverage: number;
  perPerson: number;
  categoryShares: {
    flights: number;
    stays: number;
    dining: number;
    activities: number;
    transit: number;
    other: number;
  };
  smartTip: {
    title: string;
    savings: number;
    description: string;
    applied: boolean;
  };
  items: BudgetItem[];
  dailyItineraries: DailyItinerary[];
  accommodations: AccommodationPreview[];
  recommendations: DestinationRecommendations;
  swaps: TripSwap[];
  swapOptions: BudgetSwapOption[];
  appliedOptimizations?: string[];
  weatherData?: DestinationWeather;
  mapLocations?: TripMapLocation[];
  isSaved?: boolean;
  savedAt?: string;
  createdAt: string;
}

export type ActiveTab = 'home' | 'explore' | 'my-trips' | 'about';

export type CurrentStep = 'home' | 'customize' | 'breakdown' | 'itinerary';
