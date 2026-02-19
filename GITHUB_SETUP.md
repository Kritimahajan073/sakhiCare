# GitHub Setup Guide - Step by Step

## Step 1: Create GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up" in the top right
3. Follow the signup process

## Step 2: Create a New Repository on GitHub

1. **Log in** to your GitHub account
2. Click the **"+" icon** in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `sakhicare` (or any name you like)
   - **Description**: "Women wellness tracking app - PCOD journey tracker"
   - **Visibility**: Choose **Public** (free) or **Private** (if you have GitHub Pro)
   - **IMPORTANT**: Do NOT check "Add a README file" (we already have one)
   - **IMPORTANT**: Do NOT add .gitignore or license (we already have them)
5. Click **"Create repository"**

## Step 3: Copy Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions. You'll see a URL like:

- HTTPS: `https://github.com/YOUR_USERNAME/sakhicare.git`
- SSH: `git@github.com:YOUR_USERNAME/sakhicare.git`

**Copy the HTTPS URL** (it's easier for beginners)

## Step 4: Connect Your Local Code to GitHub

Open your terminal in the project folder (`/Users/kriti/Desktop/sakhicare`) and run:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/sakhicare.git
```

**Example**: If your username is `kriti123`, the command would be:
```bash
git remote add origin https://github.com/kriti123/sakhicare.git
```

## Step 5: Push Your Code

Run this command to push your code:

```bash
git push -u origin main
```

**What happens:**
- GitHub will ask for your username and password
- For password, use a **Personal Access Token** (not your GitHub password)
  - See "Step 6" below for how to create one

## Step 6: Create Personal Access Token (Required for HTTPS)

GitHub requires a Personal Access Token instead of your password:

1. Go to GitHub → Click your **profile picture** (top right)
2. Click **"Settings"**
3. Scroll down → Click **"Developer settings"** (left sidebar)
4. Click **"Personal access tokens"** → **"Tokens (classic)"**
5. Click **"Generate new token"** → **"Generate new token (classic)"**
6. Fill in:
   - **Note**: "SakhiCare Project"
   - **Expiration**: Choose 90 days or No expiration
   - **Scopes**: Check **"repo"** (this gives full repository access)
7. Click **"Generate token"**
8. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
9. When you run `git push`, use:
   - **Username**: Your GitHub username
   - **Password**: Paste the token you just copied

## Step 7: Verify Your Push

After pushing, refresh your GitHub repository page. You should see:
- All your files
- README.md
- Your commit message
- All the code we built!

## Alternative: Using GitHub Desktop (Easier GUI Method)

If you prefer a visual interface:

1. Download **GitHub Desktop** from https://desktop.github.com
2. Install and sign in with your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Browse to `/Users/kriti/Desktop/sakhicare`
5. Click **"Publish repository"** button
6. Choose repository name and visibility
7. Click **"Publish repository"**

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/sakhicare.git
```

### Error: "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check that the token has "repo" scope enabled

### Error: "Repository not found"
- Double-check your GitHub username in the URL
- Make sure the repository exists on GitHub

## Next Steps After Pushing

1. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add `MONGODB_URI` in Environment Variables
   - Deploy!

2. **Share your code**:
   - Share the GitHub repository URL with others
   - Collaborate with team members

3. **Continue development**:
   - Make changes locally
   - Commit: `git add .` then `git commit -m "your message"`
   - Push: `git push`
