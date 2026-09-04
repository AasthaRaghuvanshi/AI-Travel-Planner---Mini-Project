import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { generateTripPlan } from './src/data/mockTrips';
import { TripQuery, TripPlan, User } from './src/types';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  avatarUrl: string;
  createdAt: string;
}

interface StoredTrip {
  id: string;
  userId: string;
  plan: TripPlan;
  createdAt: string;
  updatedAt: string;
}

interface DatabaseSchema {
  users: StoredUser[];
  trips: StoredTrip[];
  sessions: Record<string, string>; // token -> userId
}

// In-memory + file-backed database
const DB_FILE = path.join(process.cwd(), 'database.json');

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error reading database file, initializing empty store:', err);
  }

  // Initial seed with demo curator user
  const demoSalt = crypto.randomBytes(16).toString('hex');
  const demoHash = crypto.scryptSync('curator123', demoSalt, 64).toString('hex');
  const defaultUser: StoredUser = {
    id: 'user_curator_1',
    name: 'Emma Watson',
    email: 'emma@tripwise.editorial',
    passwordHash: demoHash,
    salt: demoSalt,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp0AZ60wR7b3n6TmZD42P6BmACTKxfdbHhVJhEp3EakT_FmHH6_f-Yz4zV8-FSmpOv-az58a92cBd1F6AS3ZrdHGokuz2KBjIsAGZOveRtQWPn0Y5fc19eQjuLJC1Jv2aAK6yl5flfoZcGw05npNKbVVm6e_8oesyUdh3WWUiPTCyUlIuGupqqHO48LJnmkHhCE0-KWS4RXD6buNV_wHmvOxAOHwRLtM6FK6g9Q0B6ZTtFDMvEWGhK0Q',
    createdAt: new Date().toISOString(),
  };

  const initialDb: DatabaseSchema = {
    users: [defaultUser],
    trips: [],
    sessions: {},
  };
  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(db: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database file:', err);
  }
}

const db = loadDatabase();

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function getAuthenticatedUser(req: express.Request): StoredUser | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  const userId = db.sessions[token];
  if (!userId) return null;
  return db.users.find((u) => u.id === userId) || null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // ---------------- AUTH ENDPOINTS ----------------

  // Register new account
  app.post('/api/auth/register', (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existing = db.users.find((u) => u.email === normalizedEmail);
      if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }

      const salt = crypto.randomBytes(16).toString('hex');
      const passwordHash = hashPassword(password, salt);
      const newUser: StoredUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        salt,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=1a1a1a&textColor=ffffff`,
        createdAt: new Date().toISOString(),
      };

      db.users.push(newUser);

      // Create session token
      const token = crypto.randomBytes(32).toString('hex');
      db.sessions[token] = newUser.id;
      saveDatabase(db);

      const userResponse: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        createdAt: newUser.createdAt,
      };

      return res.status(201).json({ user: userResponse, token });
    } catch (err: any) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Failed to create account' });
    }
  });

  // Login
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = db.users.find((u) => u.email === normalizedEmail);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const computedHash = hashPassword(password, user.salt);
      if (computedHash !== user.passwordHash) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate session token
      const token = crypto.randomBytes(32).toString('hex');
      db.sessions[token] = user.id;
      saveDatabase(db);

      const userResponse: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      };

      return res.json({ user: userResponse, token });
    } catch (err: any) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Failed to log in' });
    }
  });

  // Current session user
  app.get('/api/auth/me', (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
    return res.json({ user: userResponse });
  });

  // Logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      delete db.sessions[token];
      saveDatabase(db);
    }
    return res.json({ success: true });
  });

  // ---------------- USER TRIPS (DATABASE LAYER) ----------------

  // Fetch saved trips for current user
  app.get('/api/trips', (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to access saved trips' });
    }

    const userTrips = db.trips
      .filter((t) => t.userId === user.id)
      .map((t) => t.plan);

    return res.json({ trips: userTrips });
  });

  // Save or update trip for current user
  app.post('/api/trips', (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to save trip' });
    }

    const plan: TripPlan = req.body?.plan;
    if (!plan || !plan.id) {
      return res.status(400).json({ error: 'Valid trip plan data is required' });
    }

    const existingIndex = db.trips.findIndex((t) => t.id === plan.id && t.userId === user.id);
    const now = new Date().toISOString();
    const updatedPlan: TripPlan = {
      ...plan,
      isSaved: true,
      savedAt: now,
    };

    if (existingIndex >= 0) {
      db.trips[existingIndex] = {
        id: plan.id,
        userId: user.id,
        plan: updatedPlan,
        createdAt: db.trips[existingIndex].createdAt,
        updatedAt: now,
      };
    } else {
      db.trips.unshift({
        id: plan.id,
        userId: user.id,
        plan: updatedPlan,
        createdAt: now,
        updatedAt: now,
      });
    }

    saveDatabase(db);
    return res.json({ success: true, plan: updatedPlan });
  });

  // Delete trip for current user
  app.delete('/api/trips/:id', (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const tripId = req.params.id;
    const initialLen = db.trips.length;
    db.trips = db.trips.filter((t) => !(t.id === tripId && t.userId === user.id));

    if (db.trips.length === initialLen) {
      return res.status(404).json({ error: 'Trip not found or unauthorized' });
    }

    saveDatabase(db);
    return res.json({ success: true });
  });

  // Public shared trip retrieval
  app.get('/api/public-trips/:id', (req, res) => {
    const tripId = req.params.id;
    const trip = db.trips.find((t) => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Shared trip not found' });
    }
    // Return sanitized public representation without private userId
    return res.json({ plan: trip.plan });
  });

  // AI Trip Planning endpoint
  app.post('/api/generate-trip', async (req, res) => {
    try {
      const query: TripQuery = req.body?.query || req.body;
      if (!query || !query.destination) {
        return res.status(400).json({ error: 'Destination is required' });
      }

      // Generate baseline verified plan first (guarantees mathematical consistency & fallback safety)
      const basePlan: TripPlan = generateTripPlan(query);

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return baseline dynamic plan if Gemini API key is not configured
        return res.json({ plan: basePlan, source: 'engine' });
      }

      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `You are a world-class bespoke travel concierge and financial itinerary planner.
Create a hyper-realistic, culturally authentic trip itinerary and curated recommendations for:
Destination: ${query.destination}
Starting Location: ${query.startingLocation || 'New York'}
Total Budget: ${query.budget} ${query.currency}
Travelers: ${query.travelers}
Duration: ${query.durationDays} Days
Travel Style: ${query.travelStyle}
Interests: ${query.interests?.join(', ') || 'Culture, Food, Nature'}
Pace: ${query.tripPace}

Return ONLY valid JSON matching this schema:
{
  "subtitle": "A short, evocative 1-sentence description of the journey",
  "weather": "e.g., 24°C Sunny with sea breeze",
  "dailyItineraries": [
    {
      "dayNumber": 1,
      "title": "Short title for Day 1",
      "morning": { "title": "Morning activity title", "desc": "Sensory, vivid details", "cost": 10 },
      "afternoon": { "title": "Afternoon activity title", "desc": "Sensory details", "cost": 15 },
      "evening": { "title": "Evening activity title", "desc": "Sensory details", "cost": 25 },
      "suggestedFood": {
        "breakfast": "e.g. Fresh pastries & flat white",
        "lunch": "e.g. Local noodle bistro",
        "dinner": "e.g. Candlelit seafood grill",
        "details": "e.g. Authentic neighborhood favorites"
      },
      "localTransit": {
        "mode": "e.g. Metro Line & Scenic Walk",
        "details": "e.g. Central line direct from hotel",
        "cost": 5
      }
    }
  ],
  "recommendations": {
    "placesToVisit": [
      { "title": "Name", "description": "Why visit", "estCost": 10, "tags": ["Iconic", "Scenic"] }
    ],
    "activities": [
      { "title": "Name", "description": "What you do", "estCost": 20, "category": "Culture" }
    ],
    "localFood": [
      { "dish": "Dish name", "description": "Ingredients & flavor profile", "estCostRange": "$5 – $12" }
    ],
    "foodAreas": [
      { "areaName": "Area name", "vibe": "Ambiance", "recommendation": "Top dish or street" }
    ],
    "accommodationTypes": [
      { "type": "Style name", "neighborhood": "Quarter", "estPricePerNight": 75, "highlights": ["Perk 1", "Perk 2"] }
    ],
    "localTransportation": [
      { "mode": "Transit name", "description": "How to use", "estCost": "$5 / day" }
    ],
    "culturalExperiences": [
      { "title": "Tradition or Etiquette", "description": "Description", "tip": "Practical advice" }
    ]
  }
}
Generate exactly ${Math.min(query.durationDays, 7)} daily itinerary items.
Do not invent specific real-world phone numbers or strict opening hours; mark information as authentic estimates.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text?.trim();
        if (rawText) {
          const aiData = JSON.parse(rawText);

          // Merge AI enrichment into baseline plan while preserving exact mathematical consistency
          if (aiData.subtitle) basePlan.subtitle = aiData.subtitle;
          if (aiData.weather) basePlan.weather = aiData.weather;

          if (aiData.recommendations?.placesToVisit?.length) {
            basePlan.recommendations.placesToVisit = aiData.recommendations.placesToVisit;
          }
          if (aiData.recommendations?.activities?.length) {
            basePlan.recommendations.activities = aiData.recommendations.activities;
          }
          if (aiData.recommendations?.localFood?.length) {
            basePlan.recommendations.localFood = aiData.recommendations.localFood;
          }
          if (aiData.recommendations?.foodAreas?.length) {
            basePlan.recommendations.foodAreas = aiData.recommendations.foodAreas;
          }
          if (aiData.recommendations?.accommodationTypes?.length) {
            basePlan.recommendations.accommodationTypes = aiData.recommendations.accommodationTypes;
          }
          if (aiData.recommendations?.localTransportation?.length) {
            basePlan.recommendations.localTransportation = aiData.recommendations.localTransportation;
          }
          if (aiData.recommendations?.culturalExperiences?.length) {
            basePlan.recommendations.culturalExperiences = aiData.recommendations.culturalExperiences;
          }

          // Merge AI daily itinerary entries into base plan
          if (Array.isArray(aiData.dailyItineraries)) {
            aiData.dailyItineraries.forEach((aiDay: any, idx: number) => {
              if (basePlan.dailyItineraries[idx]) {
                if (aiDay.title) basePlan.dailyItineraries[idx].title = aiDay.title;
                if (aiDay.morning?.title) {
                  basePlan.dailyItineraries[idx].morningActivity.title = aiDay.morning.title;
                  basePlan.dailyItineraries[idx].morningActivity.description = aiDay.morning.desc || basePlan.dailyItineraries[idx].morningActivity.description;
                }
                if (aiDay.afternoon?.title) {
                  basePlan.dailyItineraries[idx].afternoonActivity.title = aiDay.afternoon.title;
                  basePlan.dailyItineraries[idx].afternoonActivity.description = aiDay.afternoon.desc || basePlan.dailyItineraries[idx].afternoonActivity.description;
                }
                if (aiDay.evening?.title) {
                  basePlan.dailyItineraries[idx].eveningActivity.title = aiDay.evening.title;
                  basePlan.dailyItineraries[idx].eveningActivity.description = aiDay.evening.desc || basePlan.dailyItineraries[idx].eveningActivity.description;
                }
                if (aiDay.suggestedFood?.breakfast) {
                  basePlan.dailyItineraries[idx].suggestedFood.breakfast = aiDay.suggestedFood.breakfast;
                  basePlan.dailyItineraries[idx].suggestedFood.lunch = aiDay.suggestedFood.lunch;
                  basePlan.dailyItineraries[idx].suggestedFood.dinner = aiDay.suggestedFood.dinner;
                }
                if (aiDay.localTransit?.mode) {
                  basePlan.dailyItineraries[idx].localTransit.mode = aiDay.localTransit.mode;
                  basePlan.dailyItineraries[idx].localTransit.details = aiDay.localTransit.details;
                }
              }
            });
          }

          return res.json({ plan: basePlan, source: 'gemini' });
        }
      } catch (aiErr) {
        console.warn('Gemini generation error, falling back to dynamic engine:', aiErr);
      }

      return res.json({ plan: basePlan, source: 'engine' });
    } catch (err: any) {
      console.error('Server error generating trip:', err);
      res.status(500).json({ error: err?.message || 'Failed to generate trip plan' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TripWise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
