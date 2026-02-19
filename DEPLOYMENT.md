# Deployment Guide

This guide covers deploying SakhiCare's MERN stack (MongoDB, Express, React/Next.js, Node.js) to production.

## Overview

- **Frontend (Next.js):** Deploy to Vercel (recommended) or any Node.js host
- **Backend (Express API):** Deploy to Railway, Render, Fly.io, or any Node.js host
- **Database:** MongoDB Atlas (already set up)

---

## Option 1: Vercel (Frontend) + Railway (Backend) — Recommended

### Step 1: Deploy Backend to Railway

1. **Sign up/Login:** Go to [railway.app](https://railway.app) and sign in with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `sakhicare` repository
   - Select "Add Service" → "Empty Service"

3. **Configure Service:**
   - In the service settings, set:
     - **Root Directory:** `server`
     - **Build Command:** (leave empty, or `npm install`)
     - **Start Command:** `npm start`
   - Or use Railway's automatic detection (it should detect Node.js)

4. **Set Environment Variables:**
   - In Railway dashboard → Variables tab, add:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=4000
     CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
     NODE_ENV=production
     ```
   - Railway will auto-assign a public URL (e.g., `https://sakhicare-api.up.railway.app`)

5. **Deploy:**
   - Railway will auto-deploy on push to main branch
   - Or click "Deploy" manually
   - Copy the public URL (e.g., `https://your-api.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Sign up/Login:** Go to [vercel.com](https://vercel.com) and sign in with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your `sakhicare` repository
   - Vercel will auto-detect Next.js

3. **Configure Build Settings:**
   - **Root Directory:** Leave as `.` (root)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Set Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables, add:
     ```
     NEXT_PUBLIC_GRAPHQL_URI=https://your-api.up.railway.app/graphql
     ```
   - Replace `your-api.up.railway.app` with your Railway API URL

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy
   - You'll get a URL like `https://sakhicare.vercel.app`

6. **Update Backend CORS:**
   - Go back to Railway → Variables
   - Update `CLIENT_ORIGIN` to your Vercel URL:
     ```
     CLIENT_ORIGIN=https://sakhicare.vercel.app
     ```
   - Redeploy the backend service

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Deploy Backend to Render

1. **Sign up:** Go to [render.com](https://render.com) and sign in with GitHub

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name:** `sakhicare-api`
     - **Root Directory:** `server`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Set Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=10000
   CLIENT_ORIGIN=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
   - Render uses port 10000 by default (or `$PORT` env var)

4. **Deploy:**
   - Render will build and deploy
   - You'll get a URL like `https://sakhicare-api.onrender.com`
   - Update Vercel's `NEXT_PUBLIC_GRAPHQL_URI` to `https://sakhicare-api.onrender.com/graphql`

---

## Option 3: Both on Railway

You can deploy both frontend and backend to Railway:

1. **Backend Service:** Follow Step 1 above (root: `server`)

2. **Frontend Service:**
   - Add another service in the same Railway project
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Set `NEXT_PUBLIC_GRAPHQL_URI` to your backend service URL

---

## Environment Variables Summary

### Backend (Railway/Render/etc.)

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sakhicare?retryWrites=true&w=majority
PORT=4000
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_GRAPHQL_URI=https://your-api-domain.railway.app/graphql
```

---

## MongoDB Atlas Setup (if not done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (if needed)
3. **Network Access:** Add `0.0.0.0/0` (allow from anywhere) or your hosting IPs
4. **Database Access:** Create a user with read/write permissions
5. **Connection String:** Copy from "Connect" → "Connect your application"
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

---

## Post-Deployment Checklist

- [ ] Backend is accessible at `https://your-api.com/graphql`
- [ ] Test GraphQL endpoint: Visit `https://your-api.com/graphql` (should show GraphQL Playground or error page)
- [ ] Frontend `NEXT_PUBLIC_GRAPHQL_URI` points to backend URL
- [ ] Backend `CLIENT_ORIGIN` matches frontend URL (for CORS)
- [ ] MongoDB Atlas network access allows your hosting IPs
- [ ] Test the app: Create a daily record, check routine, etc.

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_ORIGIN` in backend matches your frontend URL exactly (including `https://`)
- Check browser console for CORS errors

### GraphQL Connection Failed
- Verify `NEXT_PUBLIC_GRAPHQL_URI` is set correctly in Vercel
- Check backend logs (Railway/Render dashboard) for errors
- Test backend URL directly: `curl https://your-api.com/graphql`

### MongoDB Connection Errors
- Verify `MONGODB_URI` is correct in backend env vars
- Check MongoDB Atlas Network Access allows `0.0.0.0/0` (or your host IPs)
- Verify database user has correct permissions

### Build Failures
- Check build logs in Vercel/Railway dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## Custom Domain (Optional)

### Backend (Railway)
- Railway → Service → Settings → Generate Domain (or add custom domain)

### Frontend (Vercel)
- Vercel → Project → Settings → Domains → Add your domain
- Update DNS records as instructed
- Update `CLIENT_ORIGIN` in backend to match new domain

---

## Continuous Deployment

Both Vercel and Railway auto-deploy on push to `main` branch (default). To deploy:
1. Push changes to GitHub
2. Vercel/Railway will auto-build and deploy
3. Update env vars if needed (no redeploy required for env changes in Railway)

---

## Cost Estimates

- **Vercel:** Free tier (hobby) — sufficient for most projects
- **Railway:** Free tier (500 hours/month) or $5/month for more
- **Render:** Free tier (spins down after inactivity) or $7/month for always-on
- **MongoDB Atlas:** Free tier (512MB) — sufficient for development/small apps

---

## Alternative Hosting Options

- **Backend:** Fly.io, Heroku, DigitalOcean App Platform, AWS Elastic Beanstalk
- **Frontend:** Netlify, Cloudflare Pages, AWS Amplify
