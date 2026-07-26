# TradeX — Stock Trading Platform

A full-stack stock trading simulation platform built with React and Node.js.

## Project Structure

```
TradeX/
├── frontend/     → Landing page, Login, Signup (React — port 3000)
├── dashboard/    → Trading dashboard, Holdings, Orders (React — port 3001)
├── backend/      → REST API, Auth, MongoDB (Express — port 3002)
```

## Quick Start (Local Development)

### 1. Backend
```bash
cd backend
npm install
# Create .env file (see .env.example for required variables)
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Dashboard
```bash
cd dashboard
npm install
npm start
```

## Deployment Guide

### Step 1: Deploy Backend (Render)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo (`pehel20/TradeX`)
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   | Variable | Value |
   |---|---|
   | `MONGO_URL` | Your MongoDB connection string |
   | `GEMINI_API_KEY` | Your Google Gemini API key |
   | `JWT_SECRET` | Any strong random string |
5. Deploy → Copy the live URL (e.g., `https://tradex-api.onrender.com`)

### Step 2: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
4. Add Environment Variables:
   | Variable | Value |
   |---|---|
   | `REACT_APP_API_URL` | Your Render backend URL from Step 1 |
   | `REACT_APP_DASHBOARD_URL` | Your dashboard Vercel URL (from Step 3) |
5. Deploy → Copy the live URL

### Step 3: Deploy Dashboard (Vercel)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import the same GitHub repo again
3. Configure:
   - **Root Directory:** `dashboard`
   - **Framework Preset:** Create React App
4. Add Environment Variables:
   | Variable | Value |
   |---|---|
   | `REACT_APP_API_URL` | Your Render backend URL from Step 1 |
   | `REACT_APP_FRONTEND_URL` | Your frontend Vercel URL from Step 2 |
5. Deploy

### Step 4: Update Cross-References

After all 3 are deployed, go back and update:
- **Frontend** on Vercel → Add/update `REACT_APP_DASHBOARD_URL` with the dashboard URL
- **Redeploy** the frontend so it picks up the new variable

> **Note:** Vercel environment variables are baked in at build time. After changing any `REACT_APP_*` variable, you must redeploy.

## Tech Stack

- **Frontend:** React, React Router, Axios, Bootstrap
- **Dashboard:** React, Material UI, Chart.js, Axios
- **Backend:** Express, MongoDB/Mongoose, JWT, bcrypt, Google Gemini AI
