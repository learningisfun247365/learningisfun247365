# WatchList - Shared Movie & TV Show Tracker

## Overview
A collaborative watchlist web application designed for couples to track movies and TV shows they want to watch together. Features automatic metadata fetching from OMDb API, individual priority ratings, progress tracking, and smart shared recommendations.

## Project Architecture

### Tech Stack
- **Frontend**: React + TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (via Neon)
- **Authentication**: Replit Auth (OpenID Connect)
- **External API**: OMDb API for movie/TV show metadata

### Key Features
1. **Two-User Authentication** - Replit Auth with session management
2. **Automatic Metadata Fetching** - Search titles, auto-fetch poster, runtime, genre, plot from OMDb
3. **Individual Priority Ratings** - Each user rates titles as High/Medium/Low
4. **Progress Tracking** - Track viewing status (Unwatched/Watching/Watched) with episode tracking for TV shows
5. **Shared Priority Score** - 🔥 MUST WATCH badge when both users rate a title High
6. **Joint Watch Status** - ⚠️ SPOILER ALERT warning when users have different progress
7. **Gallery View** - Poster-focused card layout with visual status indicators
8. **Filtering System** - Filter by Must Watch, Movies/TV Shows, Streaming Service, Watch Status

## Database Schema

### users
- id (varchar, PK) - User ID from Replit Auth
- email, firstName, lastName, profileImageUrl
- createdAt, updatedAt

### watchlistEntries
- id (varchar, PK)
- title, type (movie/series), posterUrl, runtime, genre, imdbId, plot
- streamingService
- addedById (FK to users)
- userAPriority, userBPriority (high/medium/low)
- userAProgress, userBProgress (tracking status)
- createdAt, updatedAt

### sessions
- sid (PK) - Session ID
- sess (jsonb) - Session data
- expire - Expiration timestamp

## API Endpoints

### Authentication
- `GET /api/login` - Start Replit Auth login flow
- `GET /api/callback` - OAuth callback handler
- `GET /api/logout` - End session and redirect
- `GET /api/auth/user` - Get current authenticated user

### Watchlist
- `GET /api/watchlist` - Get all watchlist entries
- `POST /api/watchlist` - Add new title (requires imdbId, optional streamingService)
- `PATCH /api/watchlist/:id` - Update entry priorities/progress
- `DELETE /api/watchlist/:id` - Remove entry

### Search
- `GET /api/search-movies?query=...` - Search OMDb for titles

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `SESSION_SECRET` - Session encryption key (auto-configured)
- `OMDB_API_KEY` - OMDb API key (user-provided secret)
- `ISSUER_URL` - OAuth issuer (auto-configured by Replit Auth)
- `REPL_ID` - Replit application ID (auto-configured)

## Development

### Running the App
```bash
npm run dev  # Starts Express + Vite dev server on port 5000
```

### Database Migrations
```bash
npm run db:push        # Push schema changes to database
npm run db:push --force # Force push if needed
```

## User Flow

1. **Landing Page** - New visitors see feature highlights and "Get Started" button
2. **Login** - Click button → redirected to Replit Auth → authenticate with Google/GitHub/etc
3. **Home Page** - View watchlist in gallery layout with poster images
4. **Add Title** - Click + button → search for title → auto-fetch metadata → optionally add streaming service → save
5. **Set Preferences** - Click any card → set your priority (High/Medium/Low) and progress → save
6. **Filter & Discover** - Use filter bar to find Must Watch titles, filter by type/service/status
7. **Shared Recommendations** - See 🔥 MUST WATCH badge when both users rate a title High
8. **Track Progress** - Get ⚠️ SPOILER ALERT when one user is ahead to avoid spoilers

## Design Guidelines
- **Poster-Focused** - Poster images are the primary visual element
- **Status Badges** - Prominent badges for Must Watch, Spoiler Alert, Completed, Ready to Watch
- **Typography** - Inter for body text, Poppins for headings
- **Colors** - Follows Shadcn design tokens with elevation system for interactions
- **Layout** - Responsive grid: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop)

## Recent Changes
- 2024-11-23: Initial MVP implementation with all core features
- Complete database schema with users, sessions, watchlist entries
- Replit Auth integration with session management
- OMDb API integration for automatic metadata fetching
- Full CRUD operations for watchlist management
- Gallery view with filtering and status indicators
- Priority rating and progress tracking system
