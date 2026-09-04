import {
  TripPlan,
  TripQuery,
  TripSwap,
  BudgetSwapOption,
  BudgetItem,
  DailyItinerary,
  AccommodationPreview,
  DestinationRecommendations,
  DailyActivity,
} from '../types';

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const TRENDING_TRIPS = [
  {
    id: 'trending-bali',
    destination: 'Bali, Indonesia',
    days: 7,
    travelers: 2,
    budget: 780,
    priceLabel: '$780 all-in',
    tagline: '7 Days • Resort + Daily Activities',
    highlight: 'Includes flights',
    rating: 4.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgA7H0BEGxohdiYO7jaw2RaBSGQY8w3aLGR0Xs4vzrKhcguU50J4dPyrkvws1ULEEYi7b_Ifsa01WD8Muc88c6U-1rrWwNu__5ZBMEPlTtRydQdTkIIWgnWGa6eZ-LSI5CmYq95zFCCptAnlyDiXjRSwkLe8J-7zpoZ3sQkPLeM3KTx_G79nA1QCEXO2iz-wMJmCPvrb0yvY5fU9a_xRwkdElo8gFZzzqmYYJQNn1Duvi3iBUfqEoNzw',
  },
  {
    id: 'trending-prague',
    destination: 'Prague, Czechia',
    days: 5,
    travelers: 2,
    budget: 620,
    priceLabel: '$620 all-in',
    tagline: '5 Days • Boutique Stay + Walking Pass',
    highlight: 'Central hotels',
    rating: 4.8,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFezM0Ofg4X_9JXlMwFLG3UWyHI2ksdZR_RQIw1cEpH6Lkn6wgg_bBrpPbdxaYftu37WaxQj8hx92tvSHUsMw6e52OtGs5asoOhpjAS3bimx7zsb_p0F2UB8ouU7Xpy13gTS8dG5UVENLnBOsVK0JHX89ej5-kYULMQmJN951qBeCeVUIK4ssQ7CWxtNtbhUwTGtTNEE3VEvWnHaCKqyzpZ5Op73E_hktFnTVCYCOkwgnd_DtAfi7O7Q',
  },
  {
    id: 'trending-lisbon',
    destination: 'Lisbon, Portugal',
    days: 6,
    travelers: 2,
    budget: 890,
    priceLabel: '$890 all-in',
    tagline: '6 Days • Coastal AirBnB + Dining',
    highlight: 'Foodie choice',
    rating: 4.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbi6swyNa7weuxSbYlbuI7h0GQyie9gRMoHeGqvKW4tB0U_RM4DhYYoB9A-T-yEeHxDaF-zyAzKv25cQCBCj8D8j4mSuWxzRoDqiXAnEg5vZUcYin8ouDbSgH-N3NgESU-OiGVljqQJ7iFV1vikTASSu9VO-iQZoVax2yaga3V2gaGypeJaYUI5W6MwG48sEbSUYHoVoaxHq0W9twdXOf7RlZYkCvYiJ6DvWRxCVP2E6_SLl1m02H_oQ',
  },
  {
    id: 'trending-tokyo',
    destination: 'Tokyo, Japan',
    days: 7,
    travelers: 2,
    budget: 1450,
    priceLabel: '$1,450 all-in',
    tagline: '7 Days • Modern Ryokan + JR Pass',
    highlight: 'Bullet train included',
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'trending-rome',
    destination: 'Rome, Italy',
    days: 6,
    travelers: 2,
    budget: 980,
    priceLabel: '$980 all-in',
    tagline: '6 Days • Colosseum Skip-the-Line + Trastevere',
    highlight: 'Historic center stay',
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
  },
];

export const EXPLORE_DESTINATIONS = [
  {
    id: 'explore-bali',
    name: 'Bali, Indonesia',
    destination: 'Bali, Indonesia',
    days: 7,
    travelers: 2,
    budget: 780,
    priceLabel: '$780 all-in',
    tagline: '7 Days • Resort + Daily Activities',
    highlight: 'Includes flights',
    highlights: ['Uluwatu Temple', 'Ubud Terraces', 'Beachfront Seafood'],
    rating: 4.9,
    tags: ['Asia', 'Beach', 'Cultural', 'Under $1,000'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgA7H0BEGxohdiYO7jaw2RaBSGQY8w3aLGR0Xs4vzrKhcguU50J4dPyrkvws1ULEEYi7b_Ifsa01WD8Muc88c6U-1rrWwNu__5ZBMEPlTtRydQdTkIIWgnWGa6eZ-LSI5CmYq95zFCCptAnlyDiXjRSwkLe8J-7zpoZ3sQkPLeM3KTx_G79nA1QCEXO2iz-wMJmCPvrb0yvY5fU9a_xRwkdElo8gFZzzqmYYJQNn1Duvi3iBUfqEoNzw',
  },
  {
    id: 'explore-prague',
    name: 'Prague, Czechia',
    destination: 'Prague, Czechia',
    days: 5,
    travelers: 2,
    budget: 620,
    priceLabel: '$620 all-in',
    tagline: '5 Days • Boutique Stay + Walking Pass',
    highlight: 'Central hotels',
    highlights: ['Charles Bridge', 'Old Town Square', 'Prague Castle'],
    rating: 4.8,
    tags: ['Europe', 'Cultural', 'Under $1,000'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFezM0Ofg4X_9JXlMwFLG3UWyHI2ksdZR_RQIw1cEpH6Lkn6wgg_bBrpPbdxaYftu37WaxQj8hx92tvSHUsMw6e52OtGs5asoOhpjAS3bimx7zsb_p0F2UB8ouU7Xpy13gTS8dG5UVENLnBOsVK0JHX89ej5-kYULMQmJN951qBeCeVUIK4ssQ7CWxtNtbhUwTGtTNEE3VEvWnHaCKqyzpZ5Op73E_hktFnTVCYCOkwgnd_DtAfi7O7Q',
  },
  {
    id: 'explore-lisbon',
    name: 'Lisbon, Portugal',
    destination: 'Lisbon, Portugal',
    days: 6,
    travelers: 2,
    budget: 890,
    priceLabel: '$890 all-in',
    tagline: '6 Days • Coastal AirBnB + Dining',
    highlight: 'Foodie choice',
    highlights: ['Tram 28 Pass', 'Pastéis de Belém', 'Sintra Day Trip'],
    rating: 4.9,
    tags: ['Europe', 'Beach', 'Cultural', 'Under $1,000'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbi6swyNa7weuxSbYlbuI7h0GQyie9gRMoHeGqvKW4tB0U_RM4DhYYoB9A-T-yEeHxDaF-zyAzKv25cQCBCj8D8j4mSuWxzRoDqiXAnEg5vZUcYin8ouDbSgH-N3NgESU-OiGVljqQJ7iFV1vikTASSu9VO-iQZoVax2yaga3V2gaGypeJaYUI5W6MwG48sEbSUYHoVoaxHq0W9twdXOf7RlZYkCvYiJ6DvWRxCVP2E6_SLl1m02H_oQ',
  },
  {
    id: 'explore-tokyo',
    name: 'Tokyo, Japan',
    destination: 'Tokyo, Japan',
    days: 7,
    travelers: 2,
    budget: 1450,
    priceLabel: '$1,450 all-in',
    tagline: '7 Days • Modern Ryokan + JR Pass',
    highlight: 'Bullet train included',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Outer Market'],
    rating: 4.9,
    tags: ['Asia', 'Cultural'],
    imageUrl:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'explore-rome',
    name: 'Rome, Italy',
    destination: 'Rome, Italy',
    days: 6,
    travelers: 2,
    budget: 980,
    priceLabel: '$980 all-in',
    tagline: '6 Days • Colosseum Skip-the-Line + Trastevere',
    highlight: 'Historic center stay',
    highlights: ['Colosseum & Forum', 'Vatican Museums', 'Trastevere Food Walk'],
    rating: 4.8,
    tags: ['Europe', 'Cultural', 'Under $1,000'],
    imageUrl:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'explore-costa-rica',
    name: 'San José & Arenal, Costa Rica',
    destination: 'San José & Arenal, Costa Rica',
    days: 8,
    travelers: 2,
    budget: 920,
    priceLabel: '$920 all-in',
    tagline: '8 Days • Eco Rainforest Lodge + Hot Springs',
    highlight: 'Wildlife canopy pass',
    highlights: ['Arenal Volcano Hike', 'Tabacón Hot Springs', 'Cloud Forest Canopy'],
    rating: 4.9,
    tags: ['Americas', 'Beach', 'Under $1,000'],
    imageUrl:
      'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&auto=format&fit=crop&q=80',
  },
];

export const DEFAULT_QUERY: TripQuery = {
  destination: 'Bali, Indonesia',
  startingLocation: 'San Francisco, USA',
  budget: 1200,
  currency: 'USD',
  travelers: 2,
  durationDays: 7,
  datesRange: 'Oct 14 – Oct 21',
  travelStyle: 'comfort',
  interests: ['Nature', 'Food', 'Relaxation', 'Culture'],
  tripPace: 'balanced',
};

// Destination Knowledge Registry
interface DestinationProfile {
  country: string;
  weather: string;
  subtitle: string;
  costTier: 'budget' | 'moderate' | 'expensive';
  heroImage: string;
  stayPhoto: string;
  stayName: string;
  stayNeighborhood: string;
  transitProvider: string;
  localTransitMode: string;
  places: { title: string; desc: string; cost: number; tags: string[] }[];
  experiences: { title: string; desc: string; cost: number; cat: string }[];
  foods: { dish: string; desc: string; price: string }[];
  foodAreas: { area: string; vibe: string; rec: string }[];
  stayTypes: { type: string; area: string; price: number; perks: string[] }[];
  localTransit: { mode: string; desc: string; cost: string }[];
  cultureTips: { title: string; desc: string; tip: string }[];
  dailyTemplates: {
    title: string;
    morning: { title: string; desc: string; cost: number };
    afternoon: { title: string; desc: string; cost: number };
    evening: { title: string; desc: string; cost: number };
    food: { b: string; l: string; d: string; cost: number; note: string };
    transit: { mode: string; route: string; cost: number };
  }[];
}

const DESTINATION_PROFILES: Record<string, DestinationProfile> = {
  bali: {
    country: 'Indonesia',
    weather: '29°C Warm & Tropical',
    subtitle: 'Lush terraced hills, sacred water temples & Indian Ocean sunsets',
    costTier: 'budget',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgA7H0BEGxohdiYO7jaw2RaBSGQY8w3aLGR0Xs4vzrKhcguU50J4dPyrkvws1ULEEYi7b_Ifsa01WD8Muc88c6U-1rrWwNu__5ZBMEPlTtRydQdTkIIWgnWGa6eZ-LSI5CmYq95zFCCptAnlyDiXjRSwkLe8J-7zpoZ3sQkPLeM3KTx_G79nA1QCEXO2iz-wMJmCPvrb0yvY5fU9a_xRwkdElo8gFZzzqmYYJQNn1Duvi3iBUfqEoNzw',
    stayPhoto:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVceZW34KI1hMwWo1X-qeWneJAIARz0-3T1-IA2IspIDdg_zbEE7UYf9nYY51teWlZd_Iz12zSDJOzyFBiVopjAkuc4a6BbO2lIREQPoupKinVyRmvRbc1eYQ6601WjVp-nGsviZS31O78G-5_e04B_h9gWSzuysdsa_aYumVrHxh1UYigfePseWxdgCBEBHQStWHqWkZeGFo3kWqyCT2pEKp9f4MCAgnI-WCzfb8qIXMQVdT7dxkerw',
    stayName: 'Boutique Ubud Pool Villa & Seminyak Suite',
    stayNeighborhood: 'Ubud Valley & Seminyak Coast',
    transitProvider: 'Singapore Airlines / Scoot Promo Rate',
    localTransitMode: 'Private Chauffeur & Grab/Scooter Passes',
    places: [
      { title: 'Tegalalang Rice Terraces', desc: 'Ancient Subak irrigation valleys surrounded by jungle palm canopies', cost: 5, tags: ['UNESCO', 'Scenic', 'Nature'] },
      { title: 'Uluwatu Clifftop Sea Temple', desc: 'Dramatic ocean promontory perched 70 meters over crashing breaks', cost: 8, tags: ['Heritage', 'Sunset', 'Culture'] },
      { title: 'Sacred Monkey Forest Sanctuary', desc: 'Moss-cloaked 14th-century banyan trees with sacred macaque clans', cost: 7, tags: ['Wildlife', 'Rainforest'] },
      { title: 'Tirta Empul Holy Spring Temple', desc: 'Centuries-old stone water purification pools fed by natural springs', cost: 6, tags: ['Spiritual', 'Historic'] },
      { title: 'Campuhan Ridge Walk', desc: 'Panoramic hilltop crest trail between two lush river ravines', cost: 0, tags: ['Free', 'Trek', 'Sunrise'] },
    ],
    experiences: [
      { title: 'Sunset Kecak Fire Chanting Performance', desc: 'Fifty choral performers chanting against crimson horizon sea cliffs', cost: 12, cat: 'Culture' },
      { title: 'Nusa Penida Manta Ray Snorkel Excursion', desc: 'Speedboat across Badung Strait to snorkel with gentle ocean mantas', cost: 35, cat: 'Adventure' },
      { title: 'Organic Balinese Cooking Masterclass', desc: 'Harvest garden spices and prepare traditional sambal matah and satay', cost: 22, cat: 'Food' },
    ],
    foods: [
      { dish: 'Nasi Campur Bali', desc: 'Fragrant steamed rice with spiced chicken, sate lilit, lawar beans & spicy sambal', price: '$3 – $6' },
      { dish: 'Babi Guling / Bebek Betutu', desc: 'Traditional slow-roasted spiced suckling pork or turmeric-braised duck in banana leaf', price: '$4 – $9' },
      { dish: 'Jimbaran Bay Grilled Snapper', desc: 'Fresh morning catch barbecued over coconut husks with sweet soy and lime', price: '$8 – $15' },
    ],
    foodAreas: [
      { area: 'Jimbaran Beachfront', vibe: 'Barefoot candlelit ocean dining', rec: 'Order grilled lobster and snapper right by the surf line' },
      { area: 'Ubud Hanoman & Monkey Forest Road', vibe: 'Organic plant-based cafes & warungs', rec: 'Try Warung Nia and fresh dragonfruit bowls' },
      { area: 'Seminyak Petitenget', vibe: 'Cosmopolitan evening bistros & sundowners', rec: 'Great for sunset mocktails and modern Indonesian tapas' },
    ],
    stayTypes: [
      { type: 'Traditional Open-Air Bamboo Eco-Lodge', area: 'Ubud Outskirts', price: 45, perks: ['Jungle plunge pool', 'Breakfast included', 'Valley views'] },
      { type: 'Boutique Modern Garden Villa', area: 'Canggu / Seminyak', price: 75, perks: ['Private dipping pool', 'Walk to beach', 'Daily housekeeping'] },
      { type: 'Local Guesthouse / Homestay', area: 'Sanur / Penestanan', price: 22, perks: ['Family hospitality', 'Quiet courtyard', 'Scooter hire'] },
    ],
    localTransit: [
      { mode: 'Grab / Gojek Ride-Hail App', desc: 'Fast, cheap car or scooter hops in southern and central Bali', cost: '$2 – $6 per ride' },
      { mode: 'Daily Scooter Rental', desc: 'Ideal for navigating scenic rural roads with helmet and valid permit', cost: '$5 – $8 / day' },
      { mode: 'Private Daily Chauffeur', desc: 'Full-day air-conditioned car for temple tours and volcano hops', cost: '$35 – $45 / day (group)' },
    ],
    cultureTips: [
      { title: 'Temple Sarong & Sash Dress Code', desc: 'Always wrap waist with a sash and wear modest shoulder coverings when entering temple grounds', tip: 'Most temples provide rental sashes for a small donation' },
      { title: 'Canang Sari Offerings on Footpaths', desc: 'Watch your step on footpaths where small palm-leaf flower and incense offerings rest daily', tip: 'Step gently around them rather than stepping over them' },
    ],
    dailyTemplates: [
      {
        title: 'Arrival & Seminyak Coastal Sunset',
        morning: { title: 'Airport Arrival & Private Island Transfer', desc: 'Welcome meet & transfer from DPS to your boutique stay', cost: 15 },
        afternoon: { title: 'Boutique Check-In & Pool Refresh', desc: 'Sip welcome lemongrass tea and stroll the sunlit garden terrace', cost: 0 },
        evening: { title: 'Seminyak Beachfront Sunset & Seafood Grill', desc: 'Barefoot walk along volcanic sand followed by fresh grilled fish', cost: 18 },
        food: { b: 'Flight / welcome fruit', l: 'Organic warung lunch ($6)', d: 'Jimbaran beach grilled dinner ($12)', cost: 18, note: 'Fresh coconut and tropical juices included' },
        transit: { mode: 'Air-conditioned Private Car', route: 'DPS Airport → Hotel', cost: 15 },
      },
      {
        title: 'Emerald Terraces & Rainforest Culture',
        morning: { title: 'Tegalalang Rice Terraces Sunrise Trek', desc: 'Wander tiered jade terraces before the midday heat', cost: 8 },
        afternoon: { title: 'Sacred Monkey Forest & Ubud Palace', desc: 'Moss-covered stone carvings, playful macaques & artisan woodcrafts', cost: 10 },
        evening: { title: 'Campuhan Ridge Golden Hour & Warung Feast', desc: 'Breezy ridgeline stroll followed by authentic Balinese Nasi Campur', cost: 12 },
        food: { b: 'Tropical smoothie bowl & kopi Bali', l: 'Canopy jungle cafe lunch ($7)', d: 'Traditional duck warung ($11)', cost: 18, note: 'Authentic local spices and vegetarian options' },
        transit: { mode: 'Chartered Day Ride / Grab', route: 'Ubud central valley loop', cost: 10 },
      },
      {
        title: 'Clifftop Temples & Ocean Fires',
        morning: { title: 'Padang Padang Beach Surf Cove', desc: 'Golden sands tucked beneath limestone cliffs with turquoise waves', cost: 5 },
        afternoon: { title: 'Uluwatu Coastal Promontory & Temple', desc: 'Perched 70 meters above sea spray with sweeping Indian Ocean views', cost: 8 },
        evening: { title: 'Sunset Kecak Fire Dance at Clifftop Amphitheater', desc: 'Hypnotic vocal choir against the dramatic dusk sky', cost: 15 },
        food: { b: 'Fresh baked banana bread & fruit', l: 'Cliff surf cafe bowl ($8)', d: 'Candlelit beach dinner ($14)', cost: 22, note: 'Stunning panoramic ocean sunset dining' },
        transit: { mode: 'Grab / Scooter Hire', route: 'South Bukit Peninsula transit', cost: 8 },
      },
    ],
  },
  tokyo: {
    country: 'Japan',
    weather: '19°C Crisp & Pleasant',
    subtitle: 'Neon-lit futuristic avenues, historic Shinto shrines & culinary perfection',
    costTier: 'expensive',
    heroImage:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    stayPhoto:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    stayName: 'Modern Ryokan & Design Hotel Ginza',
    stayNeighborhood: 'Ginza / Asakusa',
    transitProvider: 'ANA / Japan Airlines / Zipair Direct',
    localTransitMode: 'Tokyo Metro 72-Hour Pass & JR Yamanote Line',
    places: [
      { title: 'Senso-ji Temple & Nakamise-dori', desc: 'Tokyo’s oldest Buddhist sanctuary with vibrant traditional street stalls', cost: 0, tags: ['Historic', 'Cultural', 'Free'] },
      { title: 'Meiji Jingu & Yoyogi Forest', desc: 'Serene towering cedar grove surrounding an imperial Shinto shrine', cost: 0, tags: ['Spiritual', 'Nature', 'Free'] },
      { title: 'Shibuya Sky & Scramble Crossing', desc: '360° open-air rooftop observation deck over the iconic intersection', cost: 18, tags: ['Modern', 'Skyline', 'Iconic'] },
      { title: 'Tsukiji Outer Market', desc: 'Historic morning food alley with master sushi chefs and tamagoyaki grills', cost: 0, tags: ['Foodie', 'Market'] },
      { title: 'Shinjuku Gyoen National Garden', desc: 'Tranquil fusion of traditional Japanese landscapes and greenhouse botanics', cost: 4, tags: ['Garden', 'Relaxation'] },
    ],
    experiences: [
      { title: 'Tsukiji Nigiri Sushi Masterclass', desc: 'Learn authentic knife craft and rice seasoning from a veteran chef', cost: 40, cat: 'Food' },
      { title: 'teamLab Borderless Digital Art Museum', desc: 'Immersive projection world of light, waterfalls and floral illusions', cost: 28, cat: 'Culture' },
      { title: 'Golden Gai & Omoide Yokocho Izakaya Walk', desc: 'Cozy lantern-lit alleys with grilled yakitori and craft highballs', cost: 25, cat: 'Nightlife' },
    ],
    foods: [
      { dish: 'Tonkotsu Ramen with Chashu', desc: 'Rich 16-hour simmered pork broth, springy noodles & soft ajitsuke egg', price: '$7 – $11' },
      { dish: 'Edomae Morning Sushi Set', desc: 'Bluefin tuna, sea urchin, and fresh scallops at market price', price: '$12 – $22' },
      { dish: 'Charcoal Yakitori & Gyoza', desc: 'Skewered grilled chicken thighs with sweet tare glaze and charred scallions', price: '$8 – $15' },
    ],
    foodAreas: [
      { area: 'Tsukiji Outer Market Alleys', vibe: 'Bustling morning seafood buzz', rec: 'Grab warm wagyu skewers and freshly torched unagi' },
      { area: 'Omoide Yokocho (Memory Lane)', vibe: 'Vintage post-war lantern alleys', rec: 'Tiny 6-seat yakitori counters under paper lanterns' },
      { area: 'Kagurazaka Hill', vibe: 'Quiet cobbled geisha district', rec: 'Refined soba noodle shops and French-Japanese patisseries' },
    ],
    stayTypes: [
      { type: 'Modern Boutique Ryokan with Onsen', area: 'Asakusa / Yanaka', price: 110, perks: ['Tatami flooring', 'Hinoki cypress bath', 'Green tea station'] },
      { type: 'Design City Hotel', area: 'Shibuya / Shinjuku', price: 95, perks: ['Walking distance to JR rail', 'City skyline view', 'High-speed Wi-Fi'] },
      { type: 'Premium Capsule / Micro Hotel', area: 'Ginza / Nihonbashi', price: 42, perks: ['Private sound-dampened pod', 'Sauna access', 'Ultra-clean'] },
    ],
    localTransit: [
      { mode: 'Tokyo Metro 72-Hour Tourist Ticket', desc: 'Unlimited rides across all 13 subway lines in greater Tokyo', cost: '$11 flat (3 days)' },
      { mode: 'Suica / Pasmo IC Card', desc: 'Contactless tap-and-go card for all JR lines, buses, and konbini snacks', cost: '$5 deposit + pay-as-you-go' },
      { mode: 'JR Yamanote Circular Line', desc: 'Above-ground loop connecting all primary hubs (Shinjuku, Shibuya, Tokyo Station)', cost: '$1.20 – $1.80 per trip' },
    ],
    cultureTips: [
      { title: 'Quiet Transit Etiquette', desc: 'Set phones to silent mode and avoid phone calls on trains; keep voices hushed', tip: 'Observe orderly queues on marked platform lines' },
      { title: 'Cash vs IC Card Payments', desc: 'While digital cards are widespread, many small izakayas and noodle counters remain cash-only', tip: '7-Eleven ATMs accept international cards without hassle' },
    ],
    dailyTemplates: [
      {
        title: 'Arrival & Historic Asakusa',
        morning: { title: 'Arrival at Narita / Haneda & Skyliner Train', desc: 'Swift rail express into central Tokyo; pickup your Suica IC card', cost: 18 },
        afternoon: { title: 'Senso-ji Temple & Asakusa Old Town Stroll', desc: 'Pass under the Thunder Gate (Kaminarimon) and taste warm melonpan', cost: 4 },
        evening: { title: 'Sumida Riverfront & Craft Ramen Dinner', desc: 'SkyTree views over the river followed by rich Hakata tonkotsu ramen', cost: 15 },
        food: { b: 'In-transit konbini onigiri ($4)', l: 'Handmade tempura soba ($10)', d: 'Steaming tonkotsu ramen & gyoza ($12)', cost: 26, note: 'Authentic local spots with counter seating' },
        transit: { mode: 'Tokyo Metro Subway', route: 'Airport express & Asakusa line', cost: 14 },
      },
      {
        title: 'Neon Crossings & Shinto Serenity',
        morning: { title: 'Meiji Shrine Morning Forest Walk', desc: 'Quiet early morning stroll beneath towering cypress torii gates', cost: 0 },
        afternoon: { title: 'Harajuku Cat Street & Omotesando Design', desc: 'Trendy fashion lanes, third-wave matcha lattes & architecture', cost: 8 },
        evening: { title: 'Shibuya Crossing & Rooftop Sky Panorama', desc: 'Watch thousands cross the intersection from high vantage point', cost: 18 },
        food: { b: 'Japanese bakery matcha croissant ($5)', l: 'Tonkatsu pork cutlet set ($12)', d: 'Charcoal yakitori skewers & rice ($16)', cost: 33, note: 'Includes green tea and seasonal sides' },
        transit: { mode: 'JR Yamanote Line', route: 'Harajuku → Shibuya loop', cost: 4 },
      },
      {
        title: 'Morning Seafood & Digital Realms',
        morning: { title: 'Tsukiji Outer Market Breakfast Tasting', desc: 'Fresh tamago omelet on a stick, fresh nigiri & grilled scallops', cost: 16 },
        afternoon: { title: 'teamLab Borderless Immersive Art', desc: 'World of interactive light illusions, floating tea house & mirrors', cost: 28 },
        evening: { title: 'Omoide Yokocho Lantern Alley Feast', desc: 'Sizzle of charcoal grills in cozy vintage alleyway counters', cost: 20 },
        food: { b: 'Fresh market sashimi bowl ($14)', l: 'Udon with dashi broth ($8)', d: 'Izakaya shared tasting plates ($18)', cost: 40, note: 'Rich variety of seasonal delicacies' },
        transit: { mode: 'Tokyo Metro / Yurikamome Line', route: 'Tsukiji → Odaiba → Shinjuku', cost: 8 },
      },
    ],
  },
  prague: {
    country: 'Czechia',
    weather: '18°C Mild & Sunny',
    subtitle: 'Cobblestone fairytale streets, gothic towers & Bohemian culinary traditions',
    costTier: 'budget',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFezM0Ofg4X_9JXlMwFLG3UWyHI2ksdZR_RQIw1cEpH6Lkn6wgg_bBrpPbdxaYftu37WaxQj8hx92tvSHUsMw6e52OtGs5asoOhpjAS3bimx7zsb_p0F2UB8ouU7Xpy13gTS8dG5UVENLnBOsVK0JHX89ej5-kYULMQmJN951qBeCeVUIK4ssQ7CWxtNtbhUwTGtTNEE3VEvWnHaCKqyzpZ5Op73E_hktFnTVCYCOkwgnd_DtAfi7O7Q',
    stayPhoto:
      'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop&q=80',
    stayName: 'Historic Old Town Boutique Residence',
    stayNeighborhood: 'Staré Město / Malá Strana',
    transitProvider: 'Lufthansa / Austrian / EasyJet Direct',
    localTransitMode: 'Prague Integrated Transit (PID) Tram Pass',
    places: [
      { title: 'Charles Bridge at Dawn', desc: '14th-century stone bridge adorned with 30 baroque saint statues over the Vltava', cost: 0, tags: ['Historic', 'Scenic', 'Free'] },
      { title: 'Prague Castle Complex & St. Vitus', desc: 'The world’s largest ancient castle grounds with stained-glass gothic cathedral', cost: 12, tags: ['UNESCO', 'Gothic', 'Panoramic'] },
      { title: 'Old Town Square & Astronomical Clock', desc: 'Centuries-old clock displaying mechanical apostle procession every hour', cost: 0, tags: ['Iconic', 'Culture', 'Free'] },
      { title: 'Malá Strana & Wallenstein Palace Gardens', desc: 'Quiet baroque gardens with peacocks, sculpted fountains and grottoes', cost: 0, tags: ['Gardens', 'Baroque', 'Free'] },
      { title: 'Letná Park Beer Garden Lookout', desc: 'High bluff offering panoramic vistas of all five bridges over the Vltava River', cost: 0, tags: ['Sunset', 'Viewpoint', 'Free'] },
    ],
    experiences: [
      { title: 'Classic Vltava River Wooden Canal Boat', desc: 'Glide beneath ancient arched spans with warm gingerbread and commentary', cost: 14, cat: 'Sightseeing' },
      { title: 'Bohemian Traditional Brewery Tasting', desc: 'Sample freshly poured Pilsner Urquell from oak cellars with pickled cheese', cost: 12, cat: 'Food' },
      { title: 'Klementinum Historic Baroque Library Tour', desc: 'World-renowned astronomical tower and ceiling-frescoed book sanctuary', cost: 15, cat: 'Culture' },
    ],
    foods: [
      { dish: 'Svíčková na Smetaně', desc: 'Braised beef sirloin in spiced vegetable cream sauce with bread dumplings and cranberries', price: '$8 – $13' },
      { dish: 'Crispy Roasted Duck & Red Cabbage', desc: 'Traditional Bohemian spiced quarter duck with potato knedlíky', price: '$10 – $16' },
      { dish: 'Fresh Cinnamon Trdelník Pastry', desc: 'Warm chimney cake rolled in walnut sugar and cinnamon over open embers', price: '$3 – $5' },
    ],
    foodAreas: [
      { area: 'Havelská Traditional Market', vibe: 'Historic 13th-century fruit & snack stalls', rec: 'Pick up fresh berries, pastries and pretzels' },
      { area: 'Karlín Neighborhood', vibe: 'Hip transformed industrial culinary quarter', rec: 'Artisan espresso bars, sourdough bakeries and modern bistros' },
      { area: 'Malá Strana Cellar Taverns', vibe: 'Atmospheric vaulted stone pubs', rec: 'Traditional goulashes served in carved sourdough bowls' },
    ],
    stayTypes: [
      { type: 'Restored 17th-Century Baroque Hotel', area: 'Malá Strana', price: 65, perks: ['Exposed timber beams', 'Buffet breakfast included', 'Quiet cobbled street'] },
      { type: 'Boutique Design Apartment', area: 'Old Town / Staré Město', price: 55, perks: ['Full kitchen', 'Walk to Charles Bridge', 'Balcony view'] },
      { type: 'Cozy Central Guesthouse', area: 'Vinohrady', price: 32, perks: ['Next to tram line', 'Artisan cafes nearby', 'Green park proximity'] },
    ],
    localTransit: [
      { mode: 'PID 72-Hour Unlimited Transit Ticket', desc: 'Covers all iconic yellow trams, 3 metro lines, and Petřín funicular', cost: '$14 flat (3 days)' },
      { mode: 'Historic Tram #22 & #42', desc: 'Scenic route climbing from the river through castle gates and vineyards', cost: 'Included in ticket' },
      { mode: 'Walking On Foot', desc: 'Prague’s compact historic center is one of the world’s most walkable UNESCO sites', cost: 'Free' },
    ],
    cultureTips: [
      { title: 'Tipping Custom in Taverns', desc: 'Round up the bill or add 10% for good service; tell the server before they run the card', tip: 'Say "Děkuji" (thank you) when receiving service' },
      { title: 'Quiet Evening Cobblestone Streets', desc: 'Residential windows open onto cobbled alleys; keep late-night conversation respectful', tip: 'Wear sturdy, comfortable footwear for cobbled inclines' },
    ],
    dailyTemplates: [
      {
        title: 'Arrival & Old Town Fairytale Walk',
        morning: { title: 'Prague Václav Havel Arrival & Express Transit', desc: 'Airport express transfer into Old Town; check-in and refresh', cost: 8 },
        afternoon: { title: 'Old Town Square & Astronomical Clock Walk', desc: 'Admire gothic spires and watch the 600-year-old hourly procession', cost: 0 },
        evening: { title: 'Charles Bridge Sunset & Bohemian Cellar Dinner', desc: 'Gilded dusk reflections on the river followed by hearty goulash', cost: 16 },
        food: { b: 'Transit snack & coffee', l: 'Czech open-faced chlebíčky ($5)', d: 'Traditional Svíčková beef & dumplings ($12)', cost: 20, note: 'Includes a glass of fresh unpasteurized Pilsner' },
        transit: { mode: 'Prague Metro Line A & Tram', route: 'Airport → Staroměstská', cost: 5 },
      },
      {
        title: 'Royal Castle Heights & River Canals',
        morning: { title: 'Scenic Tram #22 Climb to Prague Castle', desc: 'Glide through vineyards and enter the grand imperial courtyards', cost: 2 },
        afternoon: { title: 'St. Vitus Cathedral & Golden Lane', desc: 'Stained glass brilliance and pastel 16th-century artisan houses', cost: 12 },
        evening: { title: 'Vltava Historic Wooden Boat Cruise', desc: 'Glide beneath Charles Bridge arches as city towers illuminate', cost: 14 },
        food: { b: 'Fresh pastry & espresso ($4)', l: 'Castle hill rustic tavern lunch ($9)', d: 'Crispy duck & red cabbage ($14)', cost: 27, note: 'Traditional Bohemian recipes with local accompaniments' },
        transit: { mode: 'Historic Tram #22', route: 'Malá Strana → Hradčany', cost: 3 },
      },
      {
        title: 'Artisan Quarters & Panoramic Bluffs',
        morning: { title: 'Peaceful Wallenstein Baroque Gardens', desc: 'Stroll among white peacocks and marble statues without crowds', cost: 0 },
        afternoon: { title: 'Karlín District Cafe Crawl & Sourdough', desc: 'Explore Prague’s coolest culinary quarter and modern design shops', cost: 8 },
        evening: { title: 'Letná Park Sunset & River Viewpoint', desc: 'Watch golden hour settle over all five bridges of the Vltava River', cost: 0 },
        food: { b: 'Artisan croissant & flat white ($5)', l: 'Bistro seasonal soup & bread ($7)', d: 'Riverfront grilled pork knuckle ($15)', cost: 27, note: 'Shared plates with scenic sunset outlooks' },
        transit: { mode: 'Tram #17 & #1', route: 'Riverfront promenade lines', cost: 3 },
      },
    ],
  },
  lisbon: {
    country: 'Portugal',
    weather: '23°C Sunny & Coastal Breeze',
    subtitle: 'Sun-drenched yellow trams, Atlantic seafood & melancholic fado melodies',
    costTier: 'moderate',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbi6swyNa7weuxSbYlbuI7h0GQyie9gRMoHeGqvKW4tB0U_RM4DhYYoB9A-T-yEeHxDaF-zyAzKv25cQCBCj8D8j4mSuWxzRoDqiXAnEg5vZUcYin8ouDbSgH-N3NgESU-OiGVljqQJ7iFV1vikTASSu9VO-iQZoVax2yaga3V2gaGypeJaYUI5W6MwG48sEbSUYHoVoaxHq0W9twdXOf7RlZYkCvYiJ6DvWRxCVP2E6_SLl1m02H_oQ',
    stayPhoto:
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&auto=format&fit=crop&q=80',
    stayName: 'Alfama Azulejo Heritage Apartment',
    stayNeighborhood: 'Alfama / Chiado',
    transitProvider: 'TAP Air Portugal / Iberia / EasyJet Direct',
    localTransitMode: 'Viva Viagem Metro & Vintage Yellow Tram #28',
    places: [
      { title: 'Miradouro de Santa Luzia & Portas do Sol', desc: 'Tile-clad terraces overlooking terracotta rooftops and the blue Tagus estuary', cost: 0, tags: ['Viewpoint', 'Azulejos', 'Free'] },
      { title: 'Jerónimos Monastery in Belém', desc: 'Exquisite Manueline stone lace architecture and tomb of Vasco da Gama', cost: 11, tags: ['UNESCO', 'Maritime', 'Historic'] },
      { title: 'Alfama Old Moorish Labyrinth', desc: 'Steep cobblestone alleys with hanging laundry, fado taverns and orange trees', cost: 0, tags: ['Cultural', 'Historic', 'Free'] },
      { title: 'Castelo de São Jorge Ramparts', desc: 'Ancient hilltop fortress offering sweeping 360° panoramas over Lisbon', cost: 15, tags: ['Fortress', 'Views', 'Heritage'] },
      { title: 'Praça do Comércio Waterfront', desc: 'Monumental riverfront square opening onto the golden sunset waters of the Tagus', cost: 0, tags: ['Iconic', 'Plaza', 'Free'] },
    ],
    experiences: [
      { title: 'Authentic Fado Dinner in Alfama Cellar', desc: 'Live soulful Portuguese guitar and heartfelt vocals in a family tasca', cost: 24, cat: 'Culture' },
      { title: 'Day Trip to Sintra Palaces & Moorish Castle', desc: 'Fairytale romanticist palace perched in misty pine-cloaked peaks', cost: 22, cat: 'Sightseeing' },
      { title: 'Pastéis de Belém Custard Tart Tasting', desc: 'Warm egg custard pastry straight from the original 1837 copper ovens', cost: 5, cat: 'Food' },
    ],
    foods: [
      { dish: 'Bacalhau à Brás', desc: 'Shredded salt cod sautéed with thin potato straw, onions, scrambled eggs and black olives', price: '$9 – $14' },
      { dish: 'Fresh Charcoal Grilled Sardines', desc: 'Summer coastal catch seasoned with sea salt on crusty broa cornbread', price: '$8 – $12' },
      { dish: 'Warm Pastéis de Nata', desc: 'Crispy laminated puff pastry cups with caramelized custard dusted in cinnamon', price: '$1.50 – $2.50' },
    ],
    foodAreas: [
      { area: 'Time Out Market (Mercado da Ribeira)', vibe: 'Lively food hall featuring Portugal’s star chefs', rec: 'Try artisanal seafood croquettes and octopus salad' },
      { area: 'Bairro Alto & Bica Tascas', vibe: 'Bohemian tavern-lined cobbled inclines', rec: 'Small plate petiscos paired with crisp Vinho Verde' },
      { area: 'Belém Riverfront Bakeries', vibe: 'Classic 19th-century tile salons', rec: 'Order a box of warm pastéis sprinkled with powdered sugar' },
    ],
    stayTypes: [
      { type: 'Restored Azulejo Townhouse Apartment', area: 'Alfama', price: 75, perks: ['River views', 'Original Portuguese tiles', 'Espresso machine'] },
      { type: 'Boutique Hotel with Rooftop Pool', area: 'Príncipe Real', price: 95, perks: ['Cocktail bar', 'Designer decor', 'Shaded garden'] },
      { type: 'Traditional Chiado Guesthouse', area: 'Baixa-Chiado', price: 45, perks: ['Step out to tram line', 'Wooden shutters', 'Central location'] },
    ],
    localTransit: [
      { mode: 'Viva Viagem 24-Hour Pass', desc: 'Unlimited rides on Lisbon metro, vintage yellow trams, buses, and Santa Justa lift', cost: '$7.20 / day' },
      { mode: 'Historic Tram #28E', desc: 'Winding scenic route through narrow Alfama streets and steep hills', cost: 'Included in 24h pass' },
      { mode: 'CP Urban Train to Sintra & Cascais', desc: 'Fast coastal trains to Atlantic surf beaches and fairytale castles', cost: '$3.50 per journey' },
    ],
    cultureTips: [
      { title: 'Fado Performance Etiquette', desc: 'When the fado singer and acoustic guitarist perform, absolute silence is expected', tip: 'Applaud after the song completes, not mid-verse' },
      { title: 'Cobblestone Walking Footwear', desc: 'Lisbon’s calcada portuguesa stone pavements are smooth and can be slippery on inclines', tip: 'Wear rubber-soled sneakers or sturdy walking sandals' },
    ],
    dailyTemplates: [
      {
        title: 'Arrival & Alfama Golden Hour',
        morning: { title: 'Lisbon Portela Airport Arrival & Metro Transfer', desc: 'Quick 25-minute red line subway into historic downtown; check-in', cost: 6 },
        afternoon: { title: 'Miradouro de Santa Luzia & Alfama Alleys', desc: 'Admire bougainvillea trellis, azulejo mosaics and sweeping Tagus vistas', cost: 0 },
        evening: { title: 'Intimate Candlelit Fado Dinner in Alfama', desc: 'Emotional soulful acoustic music accompanied by Bacalhau à Brás', cost: 24 },
        food: { b: 'Airport espresso & pastel ($4)', l: 'Traditional tasca sandwich bifana ($5)', d: 'Fado tavern dinner & Vinho Verde ($18)', cost: 27, note: 'Hearty Portuguese comfort cooking' },
        transit: { mode: 'Lisbon Metro & Tram 28', route: 'Airport → Rossio → Alfama', cost: 5 },
      },
      {
        title: 'Belém Heritage & Golden Pastries',
        morning: { title: 'Tram #15 Ride to Belém Waterfront', desc: 'Coastal tram journey past the 25 de Abril suspension bridge', cost: 3 },
        afternoon: { title: 'Jerónimos Monastery & Belém Tower', desc: 'Marvel at stone carvings celebrating ancient age of discovery navigators', cost: 11 },
        evening: { title: 'Warm Custard Tart Tasting & River Sunset', desc: 'Pastéis de Belém pastry tasting followed by riverside stroll at MAAT', cost: 6 },
        food: { b: 'Cafe com leite & toast ($4)', l: 'Grilled sea bass with boiled potatoes ($13)', d: 'Time Out Market petiscos tasting ($16)', cost: 33, note: 'Fresh Atlantic seafood specialties' },
        transit: { mode: 'Modern Tram #15E', route: 'Cais do Sodré → Belém', cost: 4 },
      },
      {
        title: 'Bohemian Heights & Sunset Views',
        morning: { title: 'Bica Funicular & Miradouro de Santa Catarina', desc: 'Iconic yellow funicular climb with river views and street music', cost: 3 },
        afternoon: { title: 'Príncipe Real Botanical Garden & Design Shops', desc: 'Shaded 100-year-old cedar trees and Portuguese artisan craft galleries', cost: 5 },
        evening: { title: 'Miradouro de São Pedro de Alcântara Dusk', desc: 'Two-tier landscaped terrace offering sunset panoramas of castle hill', cost: 0 },
        food: { b: 'Fruit bowl & artisan flat white ($5)', l: 'Portuguese octopus salad & bread ($11)', d: 'Rooftop grilled petiscos & wine ($17)', cost: 33, note: 'Relaxed alfresco terrace dining' },
        transit: { mode: 'Walking & Elevador da Bica', route: 'Chiado → Bairro Alto loop', cost: 3 },
      },
    ],
  },
};

// Generic Fallback Profile Generator for Any City in the World
function getGenericProfile(destination: string): DestinationProfile {
  const parts = destination.split(',');
  const cityName = parts[0]?.trim() || destination;
  const countryName = parts[1]?.trim() || 'Global';

  return {
    country: countryName,
    weather: '22°C Pleasant & Mild',
    subtitle: `Captivating cultural landmarks, vibrant local markets & tailored ${cityName} discoveries`,
    costTier: 'moderate',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDR1R-c3XhYO1EmhrNVzie5ekOrKAbIBDvQtleGq6vNFnAJ7gtgkMtVe4397aWWZH69USTCDqAmkTfosYve8OwCzTLpxSDUdkm3sb5RuIyLysvAF0Xa6UgwU6KptAd1IgmyOsIv1R5oqmUDxoKubQTrgNcjzlu4N6ZACsP2yIG_gscKslz6xzy2W1mfiIBQSF_UZUpAJfI7dSzIEXThi6VZzyCAePzqerJTVmLX8l8E-D2uUXW-mNtQ',
    stayPhoto:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    stayName: `Curated Boutique Stay in Central ${cityName}`,
    stayNeighborhood: `Historic District & Cultural Center, ${cityName}`,
    transitProvider: `Standard Direct / 1-Stop Carrier to ${cityName}`,
    localTransitMode: 'City Metro / Rapid Transit & Walkable Promenade',
    places: [
      { title: `${cityName} Old Town & Central Square`, desc: 'Historic heart with open-air plazas, architectural landmarks and cafes', cost: 0, tags: ['Historic', 'Walkable', 'Free'] },
      { title: `${cityName} National Heritage Museum & Art Gallery`, desc: 'Renowned exhibition halls celebrating regional history, art, and craft', cost: 12, tags: ['Culture', 'Exhibits'] },
      { title: `${cityName} Scenic Skyline Panorama`, desc: 'Elevated scenic terrace offering 360° sweeping vistas across the city', cost: 0, tags: ['Scenic', 'Free', 'Sunset'] },
      { title: `${cityName} Historic Public Gardens & Greenways`, desc: 'Tranquil botanical footpaths, sculpted fountains and serene shaded lawns', cost: 0, tags: ['Relaxation', 'Nature', 'Free'] },
      { title: `${cityName} Waterfront / Riverside Promenade`, desc: 'Vibrant pedestrian boulevard with street buskers, pop-up kiosks and evening lights', cost: 0, tags: ['Pedestrian', 'Evening', 'Free'] },
    ],
    experiences: [
      { title: `${cityName} Heritage Walking Tour with Local Historian`, desc: 'Discover hidden courtyard alleyways and untold cultural stories', cost: 15, cat: 'Culture' },
      { title: `${cityName} Traditional Culinary & Market Tasting`, desc: 'Sample regional specialties and street delicacies directly from local vendors', cost: 22, cat: 'Food' },
      { title: `${cityName} Sunset Panoramic Cruise or Lookout`, desc: 'Golden hour vantage point with panoramic views over the surrounding hills', cost: 18, cat: 'Sightseeing' },
    ],
    foods: [
      { dish: `Signature ${cityName} Regional Specialty`, desc: 'Beloved regional stew, roast or specialty prepared with local seasonal produce', price: '$8 – $15' },
      { dish: 'Artisan Street Food & Savory Pastries', desc: 'Freshly baked hand-pies, warm skewers or regional flatbreads from market stalls', price: '$3 – $7' },
      { dish: 'Traditional Confection & Dessert', desc: 'Classic regional dessert served with house-roasted coffee or local herbal tea', price: '$4 – $6' },
    ],
    foodAreas: [
      { area: `${cityName} Central Market Hall`, vibe: 'Vibrant local morning food hub', rec: 'Sample cheeses, baked specialties and seasonal fruits' },
      { area: 'Historic Arts & Theater Quarter', vibe: 'Bustling evening bistros and wine bars', rec: 'Great for alfresco terrace dining and tasting menus' },
      { area: 'Riverfront / Harbor Esplanade', vibe: 'Scenic waterfront casual eateries', rec: 'Enjoy sunset dining with panoramic city skyline reflections' },
    ],
    stayTypes: [
      { type: 'Central Boutique Design Hotel', area: 'Downtown / Old Quarter', price: 75, perks: ['Buffet breakfast included', 'Walk to transit', 'Modern decor'] },
      { type: 'Cozy Neighborhood Guesthouse', area: 'Historic Residential District', price: 50, perks: ['Courtyard garden', 'Quiet street', 'Local recommendations'] },
      { type: 'Modern Self-Catering Studio', area: 'Cultural District', price: 40, perks: ['Equipped kitchenette', 'High-speed Wi-Fi', 'Balcony view'] },
    ],
    localTransit: [
      { mode: 'Multi-Day Public Transit Tourist Pass', desc: 'Unlimited access across city subway lines, trams, and central buses', cost: '$6 – $12 / day' },
      { mode: 'Pedestrian Walking Network', desc: 'Extensive pedestrianized plazas and well-marked walking routes', cost: 'Free' },
      { mode: 'Local Ride-Hailing & Taxis', desc: 'Quick on-demand rides for evening transit or luggage transfers', cost: '$4 – $10 per trip' },
    ],
    cultureTips: [
      { title: 'Local Greeting & Courtesy Etiquette', desc: 'A polite greeting in the local language when entering shops is warmly appreciated', tip: 'Always ask before photographing local market vendors' },
      { title: 'Tipping Norms & Service Charges', desc: 'Check if service charge is already included in your restaurant bill', tip: 'A 5-10% tip for attentive service is standard in casual bistros' },
    ],
    dailyTemplates: [
      {
        title: `Arrival & ${cityName} Welcoming Stroll`,
        morning: { title: `Arrival at ${cityName} & Hotel Check-in`, desc: 'Transit from airport/rail terminal to your accommodation and unpack', cost: 12 },
        afternoon: { title: `${cityName} Historic Plaza & Old Town Walk`, desc: 'Explore the central square, admire landmark facades and grab an espresso', cost: 0 },
        evening: { title: 'Welcome Dinner at Traditional Bistro', desc: 'Taste signature regional dishes and toast your first evening in town', cost: 20 },
        food: { b: 'Transit snack & coffee ($4)', l: 'Central square bistro lunch ($8)', d: 'Welcome dinner tasting plates ($16)', cost: 28, note: 'Includes locally sourced seasonal ingredients' },
        transit: { mode: 'Airport Express & Subway', route: `Terminal → Central ${cityName}`, cost: 8 },
      },
      {
        title: 'Cultural Heritage & Hidden Courtyards',
        morning: { title: `${cityName} Heritage Museum & Architecture`, desc: 'Discover centuries of regional history in a landmark gallery', cost: 12 },
        afternoon: { title: 'Artisan Market & Courtyard Explorations', desc: 'Browse handcrafted goods, local ceramics and fragrant spice stalls', cost: 0 },
        evening: { title: 'Panoramic Hilltop Sunset Lookout', desc: 'Watch golden hour settle over the rooftops followed by tavern dinner', cost: 15 },
        food: { b: 'Bakery pastry & fresh juice ($5)', l: 'Market hall tasting platter ($10)', d: 'Classic regional dinner with dessert ($18)', cost: 33, note: 'Authentic local cuisine tailored to your travel style' },
        transit: { mode: 'City Tram / Metro', route: 'Museum district loop', cost: 4 },
      },
      {
        title: 'Scenic Waterfront & Local Neighborhoods',
        morning: { title: 'Botanical Gardens & Morning Coffee', desc: 'Peaceful morning walk through shaded pavilions and fountains', cost: 0 },
        afternoon: { title: 'Creative Quarter & Boutiques', desc: 'Independent bookstores, contemporary craft studios and open-air cafes', cost: 6 },
        evening: { title: 'Waterfront Sunset Promenade & Farewell Feast', desc: 'Breezy stroll along the water followed by relaxed outdoor dining', cost: 22 },
        food: { b: 'Cafe breakfast bowl ($6)', l: 'Casual street cafe lunch ($10)', d: 'Waterfront sunset seafood / specialty dinner ($20)', cost: 36, note: 'Scenic outdoor dining experience' },
        transit: { mode: 'Public Transit Pass', route: 'Riverfront & neighborhood lines', cost: 4 },
      },
    ],
  };
}

// Destination Selector helper
function getProfileForDestination(destination: string): DestinationProfile {
  const lower = destination.toLowerCase();
  if (lower.includes('bali') || lower.includes('indonesia')) return DESTINATION_PROFILES.bali;
  if (lower.includes('tokyo') || lower.includes('japan') || lower.includes('kyoto')) return DESTINATION_PROFILES.tokyo;
  if (lower.includes('prague') || lower.includes('czech')) return DESTINATION_PROFILES.prague;
  if (lower.includes('lisbon') || lower.includes('portugal') || lower.includes('porto')) return DESTINATION_PROFILES.lisbon;
  return getGenericProfile(destination);
}

// Generate a rich, mathematically consistent, dynamic trip plan
export function generateTripPlan(query: TripQuery, isSaved = false): TripPlan {
  const profile = getProfileForDestination(query.destination);
  const targetBudget = Math.max(150, query.budget || 1200);
  const days = Math.max(1, query.durationDays || 7);
  const travelers = Math.max(1, query.travelers || 2);
  const currency = query.currency || 'USD';
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const startingLocation = query.startingLocation || 'New York, USA';

  // Accurate Category Cost Modeling based on Real Economic Tiers
  // 1. Accommodation ($ per night * nights)
  const nights = Math.max(1, days - 1);
  let baseNightRate = 50;
  if (query.travelStyle === 'budget') {
    baseNightRate = profile.costTier === 'expensive' ? 55 : profile.costTier === 'moderate' ? 40 : 25;
  } else if (query.travelStyle === 'premium') {
    baseNightRate = profile.costTier === 'expensive' ? 260 : profile.costTier === 'moderate' ? 180 : 120;
  } else {
    // Comfort
    baseNightRate = profile.costTier === 'expensive' ? 120 : profile.costTier === 'moderate' ? 75 : 50;
  }
  const stayCost = Math.round(baseNightRate * nights);

  // 2. Transportation from Starting Location (Flights / Regional Rail)
  let baseFlightPerPerson = 200;
  const startLower = startingLocation.toLowerCase();
  const destLower = query.destination.toLowerCase();
  const isDomesticOrShortHaul =
    (startLower.includes('usa') && destLower.includes('usa')) ||
    (startLower.includes('europe') && destLower.includes('europe')) ||
    (startLower.includes('uk') && destLower.includes('europe'));

  if (isDomesticOrShortHaul) {
    baseFlightPerPerson = query.travelStyle === 'budget' ? 110 : query.travelStyle === 'premium' ? 320 : 180;
  } else {
    baseFlightPerPerson = query.travelStyle === 'budget' ? 240 : query.travelStyle === 'premium' ? 680 : 380;
  }
  const flightCost = Math.round(baseFlightPerPerson * travelers);

  // 3. Food and Dining ($ per person per day * travelers * days)
  let dailyFoodPerPerson = 25;
  if (query.travelStyle === 'budget') {
    dailyFoodPerPerson = profile.costTier === 'expensive' ? 28 : profile.costTier === 'moderate' ? 20 : 14;
  } else if (query.travelStyle === 'premium') {
    dailyFoodPerPerson = profile.costTier === 'expensive' ? 95 : profile.costTier === 'moderate' ? 70 : 45;
  } else {
    // Comfort
    dailyFoodPerPerson = profile.costTier === 'expensive' ? 48 : profile.costTier === 'moderate' ? 32 : 22;
  }
  const diningCost = Math.round(dailyFoodPerPerson * travelers * days);

  // 4. Activities and Sightseeing ($ per person per day * travelers * days)
  let dailyActivityPerPerson = 12;
  if (query.travelStyle === 'budget') {
    dailyActivityPerPerson = 6;
  } else if (query.travelStyle === 'premium') {
    dailyActivityPerPerson = 35;
  } else {
    dailyActivityPerPerson = 15;
  }
  const actCost = Math.round(dailyActivityPerPerson * travelers * days);

  // 5. Local Transportation ($ per day * days)
  let dailyLocalTransit = 6;
  if (query.travelStyle === 'budget') {
    dailyLocalTransit = 4;
  } else if (query.travelStyle === 'premium') {
    dailyLocalTransit = 28;
  } else {
    dailyLocalTransit = 10;
  }
  const transitCost = Math.round(dailyLocalTransit * days);

  // 6. Miscellaneous / Emergency Cushion
  const bufferCost = Math.max(25, Math.round(targetBudget * 0.04));

  // Precise Total Calculation
  let estTotal = flightCost + stayCost + diningCost + actCost + transitCost + bufferCost;

  // Check Over-budget state
  const isOverBudget = estTotal > targetBudget;
  const budgetDeficit = isOverBudget ? estTotal - targetBudget : 0;
  const surplus = isOverBudget ? targetBudget - estTotal : targetBudget - estTotal;
  const percentAllocated = Math.round((estTotal / targetBudget) * 100);
  const dailyAverage = Math.round(estTotal / days);
  const perPerson = Math.round(estTotal / travelers);

  // Category shares
  const flightShare = Math.round((flightCost / estTotal) * 100);
  const stayShare = Math.round((stayCost / estTotal) * 100);
  const diningShare = Math.round((diningCost / estTotal) * 100);
  const actShare = Math.round((actCost / estTotal) * 100);
  const transitShare = Math.round((transitCost / estTotal) * 100);
  const bufferShare = Math.max(1, 100 - (flightShare + stayShare + diningShare + actShare + transitShare));

  // Dynamic Itemized Breakdown
  const items: BudgetItem[] = [
    {
      id: 'flight',
      category: 'flights',
      title: 'Transportation & Inbound Transit',
      subtitle: `${startingLocation.split(',')[0]} → ${query.destination.split(',')[0]} (${travelers} Pax)`,
      amount: flightCost,
      sharePercent: flightShare,
      details: `${profile.transitProvider} • Roundtrip (${travelers} travelers)`,
      badge: isOverBudget ? 'Review Alternative' : 'Best Value Match',
      actionLabel: 'Swap Flight',
    },
    {
      id: 'stay',
      category: 'stay',
      title: 'Accommodation',
      subtitle: `${nights} Nights • ${profile.stayNeighborhood}`,
      amount: stayCost,
      sharePercent: stayShare,
      details: `${profile.stayName} (${symbol}${baseNightRate}/night avg)`,
      actionLabel: 'Change Stay',
      imageUrl: profile.stayPhoto,
      rating: 4.9,
      tags: ['Verified Clean', 'Central Location', 'High Rating'],
    },
    {
      id: 'dining',
      category: 'dining',
      title: 'Food & Dining Experience',
      subtitle: `${days} Days • Curated Culinary Plan`,
      amount: diningCost,
      sharePercent: diningShare,
      details: `Covers breakfasts, local authentic lunches & dinners for ${travelers} guests.`,
      actionLabel: 'Adjust Plan',
    },
    {
      id: 'activities',
      category: 'activities',
      title: 'Activities & Sightseeing',
      subtitle: `${query.interests.slice(0, 3).join(', ')} Highlights`,
      amount: actCost,
      sharePercent: actShare,
      details: `Top landmarks, cultural entry passes & curated self-guided highlights.`,
      actionLabel: 'Manage',
      tags: profile.places.slice(0, 3).map((p) => p.title),
    },
    {
      id: 'local_transit',
      category: 'local_transit',
      title: 'Local Transportation',
      subtitle: `${profile.localTransitMode}`,
      amount: transitCost,
      sharePercent: transitShare,
      details: `Covers metro passes, local bus rides & short ride-hails for ${days} days.`,
    },
    {
      id: 'buffer',
      category: 'buffer',
      title: 'Miscellaneous & Emergency Reserve',
      subtitle: 'Safety Cushion & Incidentals',
      amount: bufferCost,
      sharePercent: bufferShare,
      details: 'Unforeseen fees, local gratuities, emergency cash reserve.',
    },
  ];

  // Accommodations Previews
  const accommodations: AccommodationPreview[] = profile.stayTypes.map((st, i) => ({
    name: st.type,
    pricePerNight: st.price,
    rating: 4.8 + i * 0.1,
    imageUrl: i === 0 ? profile.stayPhoto : profile.heroImage,
    location: `${st.area}, ${profile.country}`,
    type: st.type,
  }));

  // Smart Budget Swaps (Step 4: Concrete savings in all 5 areas)
  const staySaving = Math.round(stayCost * 0.35);
  const flightSaving = Math.round(flightCost * 0.25);
  const diningSaving = Math.round(diningCost * 0.30);
  const actSaving = Math.round(actCost * 0.45);
  const transitSaving = Math.round(transitCost * 0.35);

  const swapOptions: BudgetSwapOption[] = [
    {
      id: 'swap-stay',
      category: 'stay',
      currentTitle: `${profile.stayName} (${symbol}${baseNightRate}/nt)`,
      currentCost: stayCost,
      newTitle: `Boutique Guesthouse & Heritage Homestay (${symbol}${Math.round(baseNightRate * 0.65)}/nt)`,
      newCost: stayCost - staySaving,
      savingsAmount: staySaving,
      details: `Switch from full-service hotel to a highly rated central guesthouse in ${profile.stayTypes[1]?.area || 'Central District'} with breakfast included.`,
      selected: isOverBudget,
    },
    {
      id: 'swap-flight',
      category: 'flights',
      currentTitle: `Direct Transit (${symbol}${flightCost})`,
      currentCost: flightCost,
      newTitle: `1-Stop Transit or Off-Peak Rail (${symbol}${flightCost - flightSaving})`,
      newCost: flightCost - flightSaving,
      savingsAmount: flightSaving,
      details: 'Opt for a single short 1.5h layover or off-peak departure time on eco-tier airline.',
      selected: isOverBudget,
    },
    {
      id: 'swap-dining',
      category: 'dining',
      currentTitle: `Full Restaurant Dining Plan (${symbol}${diningCost})`,
      currentCost: diningCost,
      newTitle: `Curated Local Market & Trattoria Trail (${symbol}${diningCost - diningSaving})`,
      newCost: diningCost - diningSaving,
      savingsAmount: diningSaving,
      details: `Enjoy authentic, hygienic food markets, local taverns & street food specialties at 30% lower cost.`,
      selected: false,
    },
    {
      id: 'swap-activities',
      category: 'activities',
      currentTitle: `Guided Group & Commercial Passes (${symbol}${actCost})`,
      currentCost: actCost,
      newTitle: `Self-Guided Scenic Trail & Free Landmark Passes (${symbol}${actCost - actSaving})`,
      newCost: actCost - actSaving,
      savingsAmount: actSaving,
      details: `Replace expensive third-party agency tours with self-guided GPS audio routes and free museum days.`,
      selected: false,
    },
    {
      id: 'swap-transit',
      category: 'local_transit',
      currentTitle: `Ride-Hails & Taxis (${symbol}${transitCost})`,
      currentCost: transitCost,
      newTitle: `Multi-Day Unlimited Public Transit Card (${symbol}${transitCost - transitSaving})`,
      newCost: transitCost - transitSaving,
      savingsAmount: transitSaving,
      details: `Use official unlimited metro/tram card for fast, eco-friendly transit across the entire city.`,
      selected: false,
    },
  ];

  const swaps: TripSwap[] = swapOptions.map((opt) => ({
    id: opt.id,
    category: opt.category as any,
    categoryLabel: opt.category.replace('_', ' ').toUpperCase(),
    title: opt.newTitle,
    currentPlanTitle: opt.currentTitle,
    currentPlanCost: opt.currentCost,
    swapPlanTitle: opt.newTitle,
    swapPlanCost: opt.newCost,
    savings: opt.savingsAmount,
    highlights: [opt.details],
    applied: false,
  }));

  // Day-by-Day Itineraries generation (Step 5: Realistic, non-repeating, with Morning, Afternoon, Evening, Food, Transit, Cost)
  const dailyItineraries: DailyItinerary[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 14);

  for (let d = 1; d <= days; d++) {
    const curDate = new Date(baseDate);
    curDate.setDate(curDate.getDate() + (d - 1));
    const dateFormatted = curDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Rotate through template days or generate specialized days
    const tmplIdx = (d - 1) % profile.dailyTemplates.length;
    const tmpl = profile.dailyTemplates[tmplIdx];

    // Day theme
    let dayTitle = `Day ${d}: ${tmpl.title}`;
    if (d === 1) dayTitle = `Day 1: Arrival, Check-in & Orientation`;
    else if (d === days) dayTitle = `Day ${d}: Farewell Discoveries & Departure Transfer`;
    else if (d === 4 && days >= 6) dayTitle = `Day 4: Scenic Excursion & Nature Trail`;
    else if (d === 5 && days >= 7) dayTitle = `Day 5: Culinary Masterclass & Market Walk`;

    const morningAct: DailyActivity = {
      time: '09:00 AM',
      title: d === 1 ? tmpl.morning.title : d === days ? `Morning Stroll & Keepsake Shopping` : tmpl.morning.title,
      description: tmpl.morning.desc,
      cost: tmpl.morning.cost,
      costLabel: tmpl.morning.cost > 0 ? `~${symbol}${tmpl.morning.cost}` : 'Free Entry',
      category: 'sightseeing',
      isFree: tmpl.morning.cost === 0,
    };

    const afternoonAct: DailyActivity = {
      time: '02:00 PM',
      title: tmpl.afternoon.title,
      description: tmpl.afternoon.desc,
      cost: tmpl.afternoon.cost,
      costLabel: tmpl.afternoon.cost > 0 ? `~${symbol}${tmpl.afternoon.cost}` : 'Free Stroll',
      category: 'activity',
      isFree: tmpl.afternoon.cost === 0,
    };

    const eveningAct: DailyActivity = {
      time: '06:30 PM',
      title: d === days ? 'Airport Transit & Departure Flight' : tmpl.evening.title,
      description: d === days ? 'Prompt transfer to the international departure hall.' : tmpl.evening.desc,
      cost: d === days ? 15 : tmpl.evening.cost,
      costLabel: tmpl.evening.cost > 0 ? `~${symbol}${tmpl.evening.cost}` : 'Free Walk',
      category: 'relax',
      isFree: tmpl.evening.cost === 0,
    };

    const dailyMealsCost = Math.round(tmpl.food.cost * (travelers > 1 ? 1.4 : 1));
    const dailyTransitCost = tmpl.transit.cost;
    const dayEstCost = morningAct.cost + afternoonAct.cost + eveningAct.cost + dailyMealsCost + dailyTransitCost;

    const allActivities: DailyActivity[] = [
      morningAct,
      {
        time: '12:30 PM',
        title: `Lunch: ${tmpl.food.l}`,
        description: 'Authentic local midday dining with seasonal regional beverages.',
        cost: Math.round(dailyMealsCost * 0.4),
        costLabel: `~${symbol}${Math.round(dailyMealsCost * 0.4)}`,
        category: 'dining',
      },
      afternoonAct,
      eveningAct,
      {
        time: '08:00 PM',
        title: `Dinner: ${tmpl.food.d}`,
        description: `${tmpl.food.note}. Relaxed evening ambiance.`,
        cost: Math.round(dailyMealsCost * 0.6),
        costLabel: `~${symbol}${Math.round(dailyMealsCost * 0.6)}`,
        category: 'dining',
      },
    ];

    dailyItineraries.push({
      dayNumber: d,
      dateStr: `${dateFormatted} • Day ${d}`,
      title: dayTitle,
      estCost: dayEstCost,
      morningActivity: morningAct,
      afternoonActivity: afternoonAct,
      eveningActivity: eveningAct,
      suggestedFood: {
        breakfast: tmpl.food.b,
        lunch: tmpl.food.l,
        dinner: tmpl.food.d,
        estCost: dailyMealsCost,
        details: tmpl.food.note,
      },
      localTransit: {
        mode: tmpl.transit.mode,
        details: tmpl.transit.route,
        estCost: dailyTransitCost,
      },
      activities: allActivities,
    });
  }

  // Destination Recommendations (Step 6: Places, Activities, Local Food, Food Areas, Stays, Transit, Culture)
  const recommendations: DestinationRecommendations = {
    placesToVisit: profile.places.map((p) => ({
      title: p.title,
      description: p.desc,
      estCost: p.cost,
      tags: p.tags,
    })),
    activities: profile.experiences.map((e) => ({
      title: e.title,
      description: e.desc,
      estCost: e.cost,
      category: e.cat,
    })),
    localFood: profile.foods.map((f) => ({
      dish: f.dish,
      description: f.desc,
      estCostRange: f.price,
    })),
    foodAreas: profile.foodAreas.map((fa) => ({
      areaName: fa.area,
      vibe: fa.vibe,
      recommendation: fa.rec,
    })),
    accommodationTypes: profile.stayTypes.map((st) => ({
      type: st.type,
      neighborhood: st.area,
      estPricePerNight: st.price,
      highlights: st.perks,
    })),
    localTransportation: profile.localTransit.map((lt) => ({
      mode: lt.mode,
      description: lt.desc,
      estCost: lt.cost,
    })),
    culturalExperiences: profile.cultureTips.map((ct) => ({
      title: ct.title,
      description: ct.desc,
      tip: ct.tip,
    })),
  };

  return {
    id: `trip-${Date.now()}`,
    query,
    destinationName: query.destination,
    startingLocation,
    subtitle: profile.subtitle,
    country: profile.country,
    weather: profile.weather,
    datesRange: query.datesRange || `${days} Days Journey`,
    heroImage: profile.heroImage,
    totalBudget: targetBudget,
    estimatedTotal: estTotal,
    originalEstimatedTotal: estTotal,
    surplus,
    isOverBudget,
    budgetDeficit,
    percentAllocated,
    dailyAverage,
    perPerson,
    categoryShares: {
      flights: flightShare,
      stays: stayShare,
      dining: diningShare,
      activities: actShare,
      transit: transitShare,
      other: bufferShare,
    },
    smartTip: {
      title: 'Smart Scheduling Recommendation',
      savings: Math.round(flightCost * 0.12),
      description: `Adjusting departure by 24 hours unlocks mid-week off-peak fares, lowering transportation by an estimated ${symbol}${Math.round(flightCost * 0.12)}.`,
      applied: false,
    },
    items,
    dailyItineraries,
    accommodations,
    recommendations,
    swaps,
    swapOptions,
    appliedOptimizations: [],
    isSaved,
    createdAt: new Date().toISOString(),
  };
}
