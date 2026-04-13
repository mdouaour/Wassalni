# 🚗 WASALNI — Algerian Ride Sharing Platform

A mobile-first web application that connects drivers with empty seats to passengers traveling between Algerian cities. Save money, reduce traffic, and travel together.

## Features

- **Ride Creation** — Drivers can publish intercity trips with departure/destination cities, date, time, seats, and price
- **Ride Search** — Passengers can search rides by city, date, and price filters
- **Booking System** — Reserve seats with one click, manage bookings, cancel if needed
- **Trust & Safety** — Rate drivers and passengers, leave reviews
- **Mobile-First** — Optimized for all screen sizes with low-bandwidth support
- **Authentication** — Secure signup/login with role-based access (user, driver, admin)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS, React Router, Zustand |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Hosting | Vercel (frontend), Supabase (backend) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdouaour/Wassalni.git
   cd Wassalni
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in the Supabase SQL Editor
   - Copy `.env.example` to `.env` and fill in your Supabase URL and anon key:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Running Tests

```bash
npm run test
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login, Register, ProtectedRoute
│   ├── booking/        # BookingCard
│   ├── common/         # Button, Input, CitySelect, StarRating, etc.
│   ├── layout/         # Navbar, Footer, Layout
│   ├── ratings/        # RatingForm, RatingList
│   └── rides/          # RideCard, RideSearchForm, RideCreateForm
├── hooks/              # Custom React hooks
├── lib/
│   ├── constants.js    # Cities, statuses, roles
│   ├── helpers.js      # Utility functions
│   └── supabase.js     # Supabase client
├── pages/              # Route pages
├── stores/             # Zustand state management
│   ├── authStore.js
│   ├── bookingStore.js
│   ├── ratingStore.js
│   └── rideStore.js
├── test/               # Test files
├── App.jsx             # Router configuration
├── index.css           # Global styles + Tailwind
└── main.jsx            # Entry point
supabase/
└── schema.sql          # Database schema with RLS policies
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
3. Deploy — Vercel auto-detects Vite and builds the project

### Backend (Supabase)

The backend runs on Supabase's free tier with:
- PostgreSQL database with Row Level Security
- JWT-based authentication
- Automatic REST API generation

## Database Security

All tables use Row Level Security (RLS) policies:
- Users can only update their own profile
- Only drivers can create rides
- Users can only manage their own bookings
- Ratings prevent self-rating
- Drivers can view bookings for their rides

## License

MIT