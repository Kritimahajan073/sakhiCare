# Step-by-Step Deployment Guide

Follow these steps to deploy SakhiCare to production.

---

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ MongoDB Atlas account with a cluster
- ✅ MongoDB connection string ready

---

## Step 1: Deploy Backend (Express API) to Railway

### 1.1 Sign up for Railway
- Go to [railway.app](https://railway.app)
- Click "Start a New Project"
- Sign in with GitHub

### 1.2 Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose your `sakhicare` repository
- Click **"Deploy Now"**

### 1.3 Configure Backend Service
- Railway will create a service automatically
- Click on the service to open settings
- Go to **Settings** tab
- Set **Root Directory** to: `server`
- Set **Start Command** to: `npm start`
- (Build command can be left empty or `npm install`)

### 1.4 Set Environment Variables
- In Railway dashboard, go to **Variables** tab
- Click **"New Variable"** and add these one by one:

```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/sakhicare?retryWrites=true&w=majority
```

```
PORT=4000
```

```
NODE_ENV=production
```

- **Important:** Replace the `MONGODB_URI` with your actual MongoDB Atlas connection string
- Leave `CLIENT_ORIGIN` for now (we'll add it after deploying frontend)

### 1.5 Deploy
- Railway will auto-deploy when you save settings
- Wait for deployment to complete (green checkmark)
- Click **"Settings"** → **"Generate Domain"** to get your API URL
- Copy the URL (e.g., `https://sakhicare-api-production.up.railway.app`)
- **Save this URL** — you'll need it for the frontend!

### 1.6 Test Backend
- Visit: `https://your-api-url.railway.app/graphql`
- You should see a GraphQL error page or Playground (this means it's working!)
- Visit: `https://your-api-url.railway.app/health`
- Should show: `{"status":"ok","service":"sakhicare-api"}`

---

## Step 2: Deploy Frontend (Next.js) to Vercel

### 2.1 Sign up for Vercel
- Go to [vercel.com](https://vercel.com)
- Click **"Sign Up"**
- Sign in with GitHub

### 2.2 Import Project
- Click **"Add New..."** → **"Project"**
- Find and select your `sakhicare` repository
- Click **"Import"**

### 2.3 Configure Project
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `.` (leave as root)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### 2.4 Set Environment Variable
- Before deploying, scroll down to **"Environment Variables"**
- Click **"Add"**
- **Key:** `NEXT_PUBLIC_GRAPHQL_URI`
- **Value:** `https://your-api-url.railway.app/graphql`
  - Replace `your-api-url.railway.app` with your Railway API URL from Step 1.5
- Click **"Add"** to save

### 2.5 Deploy
- Click **"Deploy"** button at the bottom
- Wait for build to complete (2-3 minutes)
- You'll see **"Congratulations!"** when done
- Copy your frontend URL (e.g., `https://sakhicare.vercel.app`)
- **Save this URL** — you'll need it for backend CORS!

---

## Step 3: Connect Frontend to Backend (CORS)

### 3.1 Update Backend CORS
- Go back to **Railway** dashboard
- Open your backend service
- Go to **Variables** tab
- Click **"New Variable"**
- **Key:** `CLIENT_ORIGIN`
- **Value:** `https://your-frontend-url.vercel.app`
  - Replace with your Vercel URL from Step 2.5
- Click **"Add"**

### 3.2 Redeploy Backend
- Railway will auto-redeploy when you add the variable
- Wait for deployment to complete

---

## Step 4: Test Everything

### 4.1 Test Frontend
- Visit your Vercel URL: `https://your-app.vercel.app`
- Try logging in or creating a daily record
- Check browser console (F12) for any errors

### 4.2 Test Backend Connection
- Open browser DevTools (F12) → Network tab
- Try an action (e.g., save a routine check)
- Look for requests to `/graphql`
- Should see `200 OK` status

### 4.3 Common Issues
- **CORS Error:** Make sure `CLIENT_ORIGIN` in Railway matches your Vercel URL exactly (including `https://`)
- **GraphQL Error:** Check that `NEXT_PUBLIC_GRAPHQL_URI` in Vercel points to your Railway API URL + `/graphql`
- **MongoDB Error:** Verify `MONGODB_URI` in Railway is correct and MongoDB Atlas allows connections from anywhere (`0.0.0.0/0`)

---

## Step 5: MongoDB Atlas Network Access (if needed)

If you get MongoDB connection errors:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Network Access"** in left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to propagate

---

## Summary Checklist

- [ ] Backend deployed to Railway
- [ ] Backend URL copied (e.g., `https://xxx.railway.app`)
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied (e.g., `https://xxx.vercel.app`)
- [ ] `NEXT_PUBLIC_GRAPHQL_URI` set in Vercel (points to backend + `/graphql`)
- [ ] `CLIENT_ORIGIN` set in Railway (points to frontend URL)
- [ ] `MONGODB_URI` set in Railway (your MongoDB connection string)
- [ ] Tested: Can access frontend
- [ ] Tested: Can save/create records
- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0`

---

## Quick Reference: URLs You Need

- **Backend API:** `https://your-api.railway.app/graphql`
- **Frontend App:** `https://your-app.vercel.app`
- **Backend Health:** `https://your-api.railway.app/health`

---

## Environment Variables Summary

### Railway (Backend)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sakhicare?retryWrites=true&w=majority
PORT=4000
CLIENT_ORIGIN=https://your-app.vercel.app
NODE_ENV=production
```

### Vercel (Frontend)
```
NEXT_PUBLIC_GRAPHQL_URI=https://your-api.railway.app/graphql
```

---

## Need Help?

- Check Railway logs: Railway dashboard → Service → Deployments → Click deployment → View logs
- Check Vercel logs: Vercel dashboard → Project → Deployments → Click deployment → View build logs
- See full guide: `DEPLOYMENT.md` for troubleshooting and alternatives

---

**That's it! Your app should now be live! 🎉**
