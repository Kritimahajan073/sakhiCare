# SakhiCare

Women wellness tracking app — period, mood, and health in one place.

**Stack:** Next.js (App Router), Node.js, MongoDB, Tailwind CSS.

## Getting started

1. **Install and run**

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

2. **Environment variables**

   - Copy `.env.example` to `.env.local`
   - Set `MONGODB_URI` (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)

## Deploy on Vercel

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), **Import** the project.
3. Add **Environment Variables** in Project Settings:
   - `MONGODB_URI` = your MongoDB connection string (e.g. Atlas)
   - Add it for **Production**, and optionally **Preview** and **Development**.
4. Deploy. Vercel will build and run `next build` and `next start` automatically.

No extra config is required; Next.js is detected by Vercel by default.

## Project structure

- `app/` — Routes (App Router): `page.tsx`, `layout.tsx`, `dashboard/`
- `lib/` — DB and utilities: `db.ts` (MongoDB client)
- `components/` — Reusable UI
- `types/` — Shared TypeScript types

## Build

```bash
npm run build
npm run start
```
