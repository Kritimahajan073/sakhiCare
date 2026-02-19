# SakhiCare

Women wellness tracking app — PCOD journey, routine, and health in one place.

**Stack (MERN):** **M**ongoDB · **E**xpress · **R**eact (Next.js) · **N**ode.js

- **Client:** Next.js (App Router), React, Apollo Client, Tailwind CSS
- **Server:** Node.js, Express, Apollo Server (GraphQL), MongoDB

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Environment**

   - **Client:** Copy `.env.example` to `.env` in the project root. Optionally set `NEXT_PUBLIC_GRAPHQL_URI` (defaults to `http://localhost:4000/graphql` in dev).
   - **Server:** Copy `server/.env.example` to `server/.env`. Set `MONGODB_URI` (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas) connection string). Optionally set `PORT` (default 4000) and `CLIENT_ORIGIN` (default `http://localhost:3000`).

3. **Run** (you need both the API and the client for the app to work)

   - **Option A — one command (recommended):**
     ```bash
     npm run dev:all
     ```
   - **Option B — two terminals:**
     ```bash
     npm run dev:server   # API at http://localhost:4000/graphql
     npm run dev         # Client at http://localhost:3000
     ```

   Open [http://localhost:3000](http://localhost:3000). The app talks to the Express API at `http://localhost:4000/graphql`.

## Project structure

- **`server/`** — Backend (Express + GraphQL + MongoDB)
  - `src/index.js` — Express app, Apollo Server, CORS, cookie-parser
  - `src/db.js` — MongoDB connection
  - `src/graphql/schema.js` — GraphQL type definitions
  - `src/graphql/resolvers.js` — GraphQL resolvers
  - `src/daily-record.js`, `src/routine.js` — Data layer
  - `src/auth-anonymous.js` — Cookie-based anonymous user ID
- **`app/`** — Next.js routes (dashboard, daily record, routine, insights, history, settings)
- **`lib/`** — Client-only: Apollo Client, GraphQL queries, constants, routine labels
- **`components/`** — Reusable UI
- **`types/`** — Shared TypeScript types
- **`hooks/`** — React hooks (e.g. useDailyRecord, useRoutineCheck)

## Deploy

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for a complete deployment guide.

**Quick summary:**
- **Frontend:** Deploy to [Vercel](https://vercel.com) (recommended for Next.js)
- **Backend:** Deploy to [Railway](https://railway.app) or [Render](https://render.com)
- **Database:** MongoDB Atlas (already configured)

Set environment variables:
- **Backend:** `MONGODB_URI`, `CLIENT_ORIGIN` (your frontend URL)
- **Frontend:** `NEXT_PUBLIC_GRAPHQL_URI` (your backend API URL)

## Build

```bash
npm run build
npm run start
```

(Start the API separately in production: `cd server && npm start`.)
