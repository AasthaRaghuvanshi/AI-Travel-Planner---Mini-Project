import { DestinationWeather } from '../types';

/**
 * Climate profile database for world travel destinations.
 * Provides realistic seasonal estimates based on destination climate zones.
 * Clearly labeled as Estimated Climate Data with an interface ready for live API integration.
 */
interface DestinationClimateProfile {
  tempHighC: number;
  tempLowC: number;
  condition: string;
  icon: string;
  rainfallChance: number;
  humidity: number;
  packingAdvice: string[];
  bestSeason: string;
  summary: string;
}

const DESTINATION_CLIMATE_MAP: Record<string, DestinationClimateProfile> = {
  tokyo: {
    tempHighC: 22,
    tempLowC: 14,
    condition: 'Mild & Pleasant',
    icon: 'partly_cloudy_day',
    rainfallChance: 25,
    humidity: 60,
    packingAdvice: ['Light windbreaker', 'Comfortable sneakers for walking', 'Compact umbrella', 'Layering shirts'],
    bestSeason: 'Spring (Mar–May) & Autumn (Sep–Nov)',
    summary: 'Temperate conditions ideal for strolling temple gardens and lively shopping districts.',
  },
  kyoto: {
    tempHighC: 21,
    tempLowC: 13,
    condition: 'Clear & Crisp',
    icon: 'sunny',
    rainfallChance: 20,
    humidity: 58,
    packingAdvice: ['Slip-on footwear for shrines', 'Light jacket for bamboo groves', 'Sun hat', 'Reusable water bottle'],
    bestSeason: 'Spring Cherry Blossoms & Autumn Foliage',
    summary: 'Pleasant temple weather with clear blue skies and crisp morning air.',
  },
  paris: {
    tempHighC: 19,
    tempLowC: 11,
    condition: 'Partly Sunny with Light Breeze',
    icon: 'partly_cloudy_day',
    rainfallChance: 30,
    humidity: 68,
    packingAdvice: ['Stylish trench coat', 'Walking boots', 'Scarf for cool evenings', 'Crossbody bag'],
    bestSeason: 'May to September',
    summary: 'Charming temperate Parisian weather; ideal for café terraces and museum visits.',
  },
  bali: {
    tempHighC: 30,
    tempLowC: 24,
    condition: 'Tropical Sunshine',
    icon: 'wb_sunny',
    rainfallChance: 35,
    humidity: 78,
    packingAdvice: ['Breathable linen attire', 'Reef-safe sunscreen', 'Swimwear', 'Insect repellent', 'Sandals'],
    bestSeason: 'April to October (Dry Season)',
    summary: 'Warm equatorial breezes with golden sunset evenings and tropical temperatures.',
  },
  london: {
    tempHighC: 18,
    tempLowC: 10,
    condition: 'Variable Sun & Gentle Showers',
    icon: 'rainy',
    rainfallChance: 45,
    humidity: 72,
    packingAdvice: ['Waterproof coat', 'Sturdy walking shoes', 'Layered knitwear', 'Pocket umbrella'],
    bestSeason: 'June to August',
    summary: 'Classic maritime climate with refreshing breezes and scattered afternoon showers.',
  },
  dubai: {
    tempHighC: 32,
    tempLowC: 23,
    condition: 'Sunny & Desert Warmth',
    icon: 'sunny',
    rainfallChance: 5,
    humidity: 45,
    packingAdvice: ['UV sunglasses', 'Sun protection hat', 'Light cotton clothing', 'Light sweater for air conditioning'],
    bestSeason: 'November to March (Pleasant Winter)',
    summary: 'Abundant desert sunshine with mild coastal evenings and clear night skies.',
  },
  delhi: {
    tempHighC: 28,
    tempLowC: 16,
    condition: 'Warm & Sunny',
    icon: 'sunny',
    rainfallChance: 15,
    humidity: 50,
    packingAdvice: ['Breathable cotton apparel', 'Scarf or shawl for monuments', 'Comfortable footwear', 'Sunglasses'],
    bestSeason: 'October to March',
    summary: 'Warm daytime sun transitioning to cool, pleasant evenings suitable for heritage walks.',
  },
  rome: {
    tempHighC: 25,
    tempLowC: 15,
    condition: 'Mediterranean Sunshine',
    icon: 'wb_sunny',
    rainfallChance: 18,
    humidity: 55,
    packingAdvice: ['Sun hat', 'Modest clothing for basilicas (covered shoulders)', 'Supportive cobblestone walking shoes'],
    bestSeason: 'April to June & September to October',
    summary: 'Golden Mediterranean warmth, perfect for outdoor dining and historic monuments.',
  },
  newyork: {
    tempHighC: 20,
    tempLowC: 12,
    condition: 'Crisp & Vibrant',
    icon: 'air',
    rainfallChance: 25,
    humidity: 62,
    packingAdvice: ['Comfortable city sneakers', 'Versatile denim/chinos', 'Mid-weight jacket', 'Sunglasses'],
    bestSeason: 'Autumn (Sep–Nov) & Spring (Apr–Jun)',
    summary: 'Vibrant city weather with comfortable daytime walking temperatures and cool breezes.',
  },
  default: {
    tempHighC: 24,
    tempLowC: 15,
    condition: 'Pleasant & Moderate',
    icon: 'partly_cloudy_day',
    rainfallChance: 20,
    humidity: 55,
    packingAdvice: ['Comfortable daywear', 'Light evening layer', 'Walking shoes', 'Travel adapter & sunscreen'],
    bestSeason: 'Spring and Autumn shoulder seasons',
    summary: 'Favorable travel weather suitable for outdoor sightseeing and leisure activities.',
  },
};

/**
 * Returns weather forecast information for a destination.
 * Clearly flags whether data is estimated seasonal demo or live API.
 */
export function getDestinationWeather(
  destination: string,
  _datesRange?: string
): DestinationWeather {
  const norm = destination.toLowerCase().replace(/[^a-z]/g, '');
  
  // Find matching key
  let profile = DESTINATION_CLIMATE_MAP.default;
  for (const [key, val] of Object.entries(DESTINATION_CLIMATE_MAP)) {
    if (norm.includes(key)) {
      profile = val;
      break;
    }
  }

  const tempHighF = Math.round((profile.tempHighC * 9) / 5 + 32);
  const tempLowF = Math.round((profile.tempLowC * 9) / 5 + 32);

  return {
    tempHighC: profile.tempHighC,
    tempLowC: profile.tempLowC,
    tempHighF,
    tempLowF,
    condition: profile.condition,
    icon: profile.icon,
    rainfallChance: profile.rainfallChance,
    humidity: profile.humidity,
    packingAdvice: profile.packingAdvice,
    bestSeason: profile.bestSeason,
    summary: profile.summary,
    isDemoData: true,
    sourceLabel: 'Estimated Seasonal Climate (Demo Data — Connect Live Weather API)',
  };
}
