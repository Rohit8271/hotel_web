# 🏨 Hotel ABCE — Booking Web Application

A full-stack hotel booking application for **Hotel ABCE**, Garhwa, Jharkhand, India.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express.js (MVC) |
| Frontend | React.js + Tailwind CSS (Vite) |
| Database | Supabase (PostgreSQL) |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Routing | react-router-dom |

---

## 📁 Project Structure

```
Hotel_website/
├── backend/
│   ├── server.js                  # Express entry point
│   ├── .env                       # Environment variables (not committed)
│   ├── .env.example               # Environment template
│   └── src/
│       ├── config/
│       │   └── supabase.js        # Supabase client singleton
│       ├── middleware/
│       │   └── errorHandler.js    # Centralized error handling
│       ├── models/
│       │   ├── roomModel.js       # DB queries for rooms
│       │   └── bookingModel.js    # DB queries + overlap detection
│       ├── services/
│       │   └── bookingService.js  # Business logic + validation
│       ├── controllers/
│       │   ├── roomController.js
│       │   └── bookingController.js
│       └── routes/
│           ├── roomRoutes.js
│           └── bookingRoutes.js
│
├── frontend/
│   ├── .env                       # VITE_API_BASE_URL
│   ├── tailwind.config.js         # Custom color palette
│   └── src/
│       ├── api/
│       │   ├── axiosInstance.js   # Axios base config
│       │   ├── roomsApi.js
│       │   └── bookingsApi.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── RoomCard.jsx
│       │   ├── BookingModal.jsx
│       │   ├── FilterBar.jsx
│       │   ├── StatusBadge.jsx
│       │   └── BookingTable.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── RoomsPage.jsx
│           └── AdminPage.jsx
│
├── supabase_schema.sql            # Run this to set up the database
└── README.md
```

---

## ⚙️ Setup & Local Development

### Prerequisites
- Node.js v18+
- A [Supabase](https://supabase.com) account (free tier is fine)

---

### 1. Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your project dashboard
3. Paste the contents of `supabase_schema.sql` and click **Run**
4. Run this to disable Row Level Security (required for the anon key to work):
   ```sql
   ALTER TABLE rooms DISABLE ROW LEVEL SECURITY;
   ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
   ```
5. Copy your **Project URL** and **anon/public API key** from **Settings → API**

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env from template
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=8000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
```

> ⚠️ **macOS users:** Port 5000 is used by AirPlay Receiver. Use port 8000 or higher.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The `frontend/.env` is already configured for local development:
```env
VITE_API_BASE_URL=/api
```

The Vite dev server proxies `/api` requests to `http://localhost:8000` automatically.

---

### 4. Run Both Servers

Open two terminal windows:

```bash
# Terminal 1 — Backend API
cd Hotel_website/backend
node server.js
# → 🏨 Hotel ABCE API running on http://localhost:8000

# Terminal 2 — Frontend
cd Hotel_website/frontend
npm run dev
# → VITE ready on http://localhost:5173
```

Open your browser: **http://localhost:5173**

---

## 🌐 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, room types, features, testimonials, CTA |
| `/rooms` | Rooms | Responsive grid with filters and booking modal |
| `/admin` | Admin | Booking dashboard with stats and full table |

---

## 🔌 REST API Reference

### Rooms

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/rooms` | List all rooms |
| `GET` | `/api/rooms?type=Deluxe` | Filter by type |
| `GET` | `/api/rooms?minPrice=2000&maxPrice=4000` | Filter by price range |
| `GET` | `/api/health` | Health check |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create a booking (with overlap check) |
| `GET` | `/api/bookings` | List all bookings (admin) |

#### POST /api/bookings — Request Body
```json
{
  "room_id": 1,
  "name": "Rohit Kumar",
  "phone": "9876543210",
  "email": "rohit@example.com",
  "check_in": "2025-06-01",
  "check_out": "2025-06-04"
}
```

#### Booking Overlap Logic
A booking is **rejected** (`409 Conflict`) if any existing confirmed booking satisfies:
```
existing.check_in < new_check_out  AND  existing.check_out > new_check_in
```

---

## 🗄️ Database Schema

### `rooms`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | Auto-increment |
| name | TEXT | e.g. "Room 101" |
| type | TEXT | Standard / Deluxe / Premium |
| price | NUMERIC(10,2) | Per night in INR |
| description | TEXT | Room description |
| image_url | TEXT | Optional image |
| created_at | TIMESTAMPTZ | Auto |

### `bookings`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | Auto-increment |
| room_id | INT FK | References rooms(id) |
| name | TEXT | Guest name |
| phone | TEXT | Guest phone |
| email | TEXT | Guest email (lead) |
| check_in | DATE | YYYY-MM-DD |
| check_out | DATE | YYYY-MM-DD, must be > check_in |
| status | TEXT | confirmed / cancelled |
| created_at | TIMESTAMPTZ | Auto |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Gold | `#C9A84C` | Primary actions, accents |
| Navy | `#1A1A2E` | Navbar, headers, dark sections |
| Cream | `#F5F0E8` | Page backgrounds |
| Charcoal | `#2D2D2D` | Body text |

Fonts: **Inter** (UI) + **Playfair Display** (headings/serif)

---

## 🚀 Deployment Notes

### Backend (Railway / Render / Fly.io)
1. Set environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT`
2. Set `FRONTEND_URL` in `.env` to your deployed frontend URL (for CORS)
3. Start command: `node server.js`

### Frontend (Vercel / Netlify)
1. Set `VITE_API_BASE_URL=https://your-backend-url.com/api`
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 📝 Notes

- **No authentication** — Admin panel at `/admin` is publicly accessible
- Every booking automatically stores guest contact info as a **lead**
- The app is designed for 30 rooms across 3 types (10 each)
