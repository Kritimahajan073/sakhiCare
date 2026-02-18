# SakhiCare Setup Guide

## Environment Variables

### 1. Create `.env.local` file

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Set MongoDB URI

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (or use existing)
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `sakhicare` (or your preferred database name)
7. Paste it in `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sakhicare?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

If you have MongoDB running locally:

```env
MONGODB_URI=mongodb://localhost:27017/sakhicare
```

### 3. Verify Setup

After setting `MONGODB_URI`, restart your dev server:

```bash
npm run dev
```

The app should now connect to MongoDB without errors.

## Vercel Deployment

When deploying to Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `MONGODB_URI` with your MongoDB connection string
4. Select environments: **Production**, **Preview**, and **Development**
5. Redeploy your application

## Troubleshooting

### Error: "Please set MONGODB_URI"

- Make sure `.env.local` exists in the project root
- Check that `MONGODB_URI` is set (no typos)
- Restart the dev server after changing `.env.local`
- For Vercel: Ensure the environment variable is set in project settings

### MongoDB Connection Issues

- Verify your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (or your server IP)
- Check that your database user has read/write permissions
- Ensure the connection string format is correct
