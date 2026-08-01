# TradeX — Full-Stack Stock Trading Platform

**A Production-Style Stock Trading Simulation with Real-Time Portfolio Management, AI-Powered ChatBot, and Multi-App Architecture**

> **Disclaimer:** This is an educational portfolio project built to demonstrate full-stack web development concepts through a real-world stock trading workflow. No real money or actual stock market transactions are involved.

---

## 📖 Project Overview

TradeX is a full-stack stock trading simulation platform built from scratch with React and Node.js — modeled after platforms like Zerodha, Groww, and Upstox that power millions of trades daily in India.

When a user signs up, they get access to a professional-grade trading dashboard where they can browse a watchlist of Indian stocks, place buy/sell orders, track their holdings and positions, view portfolio charts, and get real-time assistance from an AI-powered chatbot — all backed by a secure REST API with JWT authentication and MongoDB persistence.

The platform is split into three independently deployable applications: a **public-facing landing site** (product pages, pricing, support portal), a **trading dashboard** (watchlist, orders, holdings, positions, funds), and a **backend API** (authentication, order execution, portfolio management, AI chatbot). All three communicate via environment-configured URLs and share a single MongoDB database.

---

## ✨ Core Features

- **User Authentication:** Secure signup and login with bcrypt password hashing and JWT token-based sessions. Tokens are passed between the frontend and dashboard apps via URL parameters and stored in localStorage.

- **Buy & Sell Orders:** Place market orders from the watchlist with a draggable order window. Buy orders create or update holdings with weighted average cost recalculation. Sell orders validate quantity and auto-remove zero-quantity holdings.

- **Portfolio Holdings:** View all owned stocks with instrument name, quantity, average cost, LTP (Last Traded Price), current value, P&L, net change, and day change — with color-coded profit/loss indicators.

- **Positions Tracking:** Monitor active intraday and short-term positions with product type, quantity, average price, current price, and daily P&L.

- **Order History:** Complete audit trail of all executed orders with instrument, quantity, price, and mode (BUY/SELL).

- **Interactive Watchlist:** Browse 9 pre-loaded Indian stocks (INFY, TCS, RELIANCE, WIPRO, etc.) with live percentage changes, up/down indicators, and hover-activated Buy/Sell/Analytics action buttons via Material UI tooltips.

- **Portfolio Visualisation:** Bar chart for holdings distribution and doughnut chart for watchlist composition, powered by Chart.js and react-chartjs-2.

- **AI-Powered ChatBot (TradeBot):** Floating chat assistant available on every page, powered by Google Gemini AI (`gemini-2.0-flash-lite`). Supports multi-turn conversations with chat history, markdown formatting, and a typing indicator animation. Falls back gracefully to a local knowledge base (11 topic categories) when the API quota is exhausted.

- **Multi-App Architecture:** Three independent React/Express apps deployed separately on Vercel (frontend + dashboard) and Render (backend), linked via environment variables.

- **Responsive Landing Site:** Full marketing website with Home, About, Products, Pricing, Support, Signup, and Login pages — with conditional Navbar/Footer rendering on auth pages.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER'S BROWSER                                │
│                                                                        │
│   ┌──────────────────────┐          ┌──────────────────────────────┐   │
│   │   Frontend (React)   │──login──▶│      Dashboard (React)       │   │
│   │   Landing / Auth     │  token   │  Watchlist / Orders / Charts │   │
│   │   Port 3000          │  via URL │  Port 3001                   │   │
│   └──────────┬───────────┘          └──────────────┬───────────────┘   │
│              │                                      │                  │
│              │  Axios + JWT Bearer                   │  Axios + JWT    │
│              ▼                                      ▼                  │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │                    Backend API (Express)                         │ │
│   │                    Port 3002                                     │ │
│   │                                                                  │ │
│   │  POST /signup          POST /login          POST /newOrder       │ │
│   │  GET  /allHoldings     GET  /allPositions    GET  /allOrders     │ │
│   │  POST /chat (Gemini AI + Local Fallback)                        │ │
│   └──────────────────────────────┬───────────────────────────────────┘ │
│                                  │                                     │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     MongoDB Atlas           │
                    │                             │
                    │  Collections:               │
                    │  ├── users                  │
                    │  ├── holdings               │
                    │  ├── positions              │
                    │  └── orders                 │
                    └─────────────────────────────┘
```

### Authentication Flow

```
User visits Frontend  ──▶  Clicks Login  ──▶  POST /login (email + password)
                                                      │
                                              bcrypt.compare()
                                                      │
                                              JWT signed (365d expiry)
                                                      │
                                              ◀── { token } ──
                                                      │
                        Redirect to Dashboard?token=<JWT>
                                                      │
                        Dashboard reads token from URL ──▶ localStorage
                        Cleans URL bar for security
                                                      │
                        All API calls include: Authorization: Bearer <token>
```

---

## 🔄 Application Modules

### Module 1 — Landing Site (Frontend)
Public-facing website with 7 pages: Homepage (Hero, Awards, Stats, Pricing, Education, OpenAccount), About, Products, Pricing, Support Portal (with ticket creation categories), Signup, and Login. Includes a floating AI ChatBot on every page. Navbar and Footer are conditionally hidden on auth pages.

### Module 2 — Trading Dashboard
Authenticated trading interface with 6 views: Summary (equity margin + holdings P&L overview), Orders (full order history table), Holdings (portfolio table + bar chart), Positions (active trades table), Funds (margin details + equity breakdown), and Apps. Includes a sidebar Watchlist with live stock data, doughnut chart, and hover-to-trade action buttons. Floating AI ChatBot for in-app assistance.

### Module 3 — Backend API
Express.js REST API with 7 endpoints: signup, login, CRUD for holdings/positions/orders, and an AI chat endpoint. JWT middleware protects all trading endpoints. CORS configured via environment variable for multi-origin access. Gemini AI integration with retry logic (exponential backoff) and automatic fallback to a local knowledge base with 11 pre-built topic categories.

---

## 💻 Tech Stack

### Frontend (Landing Site)
| Technology | Purpose |
|---|---|
| React 19 | Component-based UI framework |
| React Router v7 | Client-side routing (7 pages) |
| Axios | HTTP client for API calls |
| Bootstrap 5 | Responsive layout and components |
| Create React App | Build toolchain |

### Dashboard (Trading Interface)
| Technology | Purpose |
|---|---|
| React 19 | Component-based UI framework |
| React Router v7 | Client-side routing (6 views) |
| Material UI (MUI) v7 | Tooltips, icons, transitions |
| Chart.js + react-chartjs-2 | Bar chart (holdings) + Doughnut chart (watchlist) |
| Axios | HTTP client for API calls |
| Create React App | Build toolchain |

### Backend (API Server)
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API framework |
| MongoDB + Mongoose 9 | NoSQL database and ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing (10 salt rounds) |
| Google Gemini AI | AI chatbot responses (`gemini-2.0-flash-lite`) |
| CORS | Multi-origin access control |
| dotenv | Environment variable management |

### Infrastructure
| Technology | Purpose |
|---|---|
| Vercel | Frontend + Dashboard hosting (static React builds) |
| Render | Backend API hosting (Node.js web service) |
| MongoDB Atlas | Managed cloud database (free tier) |
| GitHub | Source control + CI/CD trigger |

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Landing Site | https://tradex-frontend-blue.vercel.app |
| 📊 Trading Dashboard | https://tradex-dashboard-eight.vercel.app |
| 🔌 Backend API | https://tradex-backend-acbi.onrender.com |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier) or local MongoDB
- Google Gemini API key (optional — chatbot falls back to local knowledge base)

### 1. Clone the Repository
```bash
git clone https://github.com/pehel20/TradeX.git
cd TradeX
```

### 2. Configure Environment Variables

**Backend** — create `backend/.env`:
```env
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<any-strong-random-string>
GEMINI_API_KEY=<your-google-gemini-api-key>   # optional
PORT=3002
```

**Frontend** — create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_DASHBOARD_URL=http://localhost:3001
```

**Dashboard** — create `dashboard/.env`:
```env
REACT_APP_API_URL=http://localhost:3002
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### 3. Start the Backend
```bash
cd backend
npm install
npm run dev
```
The API server starts on `http://localhost:3002`. Verify with:
```bash
curl http://localhost:3002
# → {"status":"TradeX API is running"}
```

### 4. Start the Frontend
```bash
cd frontend
npm install
npm start
```
Opens on `http://localhost:3000`.

### 5. Start the Dashboard
```bash
cd dashboard
npm install
npm start
```
Opens on `http://localhost:3001`.

### 6. Local Endpoints
| Endpoint | URL |
|---|---|
| Landing Site | http://localhost:3000 |
| Trading Dashboard | http://localhost:3001 |
| Backend API | http://localhost:3002 |

---

## 📡 API Reference

### Sign Up
```bash
curl -X POST http://localhost:3002/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "pehel",
    "email": "pehel@example.com",
    "password": "securepass123"
  }'
```
Response:
```json
{ "message": "Signup successful" }
```

### Login
```bash
curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pehel@example.com",
    "password": "securepass123"
  }'
```
Response:
```json
{ "token": "eyJhbGciOiJIUzI1NiIs..." }
```

### Place an Order
```bash
curl -X POST http://localhost:3002/newOrder \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "name": "TCS",
    "qty": 5,
    "price": 3194.80,
    "mode": "BUY"
  }'
```
Response:
```json
{ "message": "Order successful" }
```

### Get All Holdings
```bash
curl http://localhost:3002/allHoldings \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Get All Positions
```bash
curl http://localhost:3002/allPositions \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Get All Orders
```bash
curl http://localhost:3002/allOrders \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Chat with TradeBot
```bash
curl -X POST http://localhost:3002/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about TCS",
    "history": []
  }'
```
Response:
```json
{
  "reply": "**TCS (Tata Consultancy Services)** is one of India's largest IT services companies..."
}
```

---

## 📁 Project Structure

```
TradeX/
├── frontend/                          # Landing site (React — port 3000)
│   ├── public/
│   │   └── media/                     # Logo, hero images, award badges
│   ├── src/
│   │   ├── index.js                   # App entry — BrowserRouter + Layout
│   │   ├── index.css                  # Global styles
│   │   └── landing_page/
│   │       ├── Navbar.js              # Sticky nav with React Router links
│   │       ├── Footer.js              # Detailed footer with disclaimers
│   │       ├── ChatBot.js             # Floating AI chat (Gemini-powered)
│   │       ├── ChatBot.css            # Chat window styles
│   │       ├── OpenAccount.js         # CTA component
│   │       ├── NotFound.js            # 404 page
│   │       ├── home/                  # Hero, Awards, Stats, Pricing, Education
│   │       ├── about/                 # About page (Hero, Team, etc.)
│   │       ├── products/              # Products page
│   │       ├── pricing/               # Pricing page
│   │       ├── support/               # Support portal (Hero, CreateTicket)
│   │       ├── signup/                # Signup form
│   │       └── login/                 # Login form (redirects to dashboard)
│   ├── vercel.json                    # SPA rewrites for Vercel
│   └── package.json
│
├── dashboard/                         # Trading dashboard (React — port 3001)
│   ├── public/
│   │   └── logo.png                   # Dashboard logo
│   ├── src/
│   │   ├── index.js                   # App entry
│   │   ├── index.css                  # Dashboard styles (12KB)
│   │   ├── components/
│   │   │   ├── Home.js                # Root — token extraction + auth guard
│   │   │   ├── TopBar.js              # Top navigation bar
│   │   │   ├── Menu.js                # Nav links + profile dropdown + logout
│   │   │   ├── Dashboard.js           # Route config (6 views)
│   │   │   ├── WatchList.js           # Sidebar — stock list + doughnut chart
│   │   │   ├── Summary.js             # Equity margin + holdings P&L
│   │   │   ├── Orders.js              # Order history table (from API)
│   │   │   ├── Holdings.js            # Holdings table + bar chart (from API)
│   │   │   ├── Positions.js           # Active positions table (from API)
│   │   │   ├── Funds.js               # Margin & fund details
│   │   │   ├── Apps.js                # Apps section
│   │   │   ├── BuyActionWindow.js     # Draggable buy/sell order modal
│   │   │   ├── BuyActionWindow.css    # Order window styles
│   │   │   ├── GeneralContext.js      # React Context for buy/sell window state
│   │   │   ├── DoughnutChart.js       # Chart.js doughnut wrapper
│   │   │   ├── VerticalGraph.js       # Chart.js bar chart wrapper
│   │   │   ├── ChatBot.js             # Floating AI chat (same as frontend)
│   │   │   └── ChatBot.css            # Chat window styles
│   │   └── data/
│   │       └── data.js                # Static watchlist + sample holdings/positions
│   ├── vercel.json                    # SPA rewrites for Vercel
│   └── package.json
│
├── backend/                           # REST API (Express — port 3002)
│   ├── index.js                       # Express app — routes, CORS, Gemini AI, knowledge base
│   ├── middleware/
│   │   └── auth.js                    # JWT verification middleware
│   ├── model/
│   │   ├── UserModel.js               # Mongoose model — users
│   │   ├── HoldingsModel.js           # Mongoose model — holdings
│   │   ├── PositionsModel.js          # Mongoose model — positions
│   │   └── OrdersModel.js             # Mongoose model — orders
│   ├── schemas/
│   │   ├── HoldingsSchema.js          # name, qty, avg, price, net, day
│   │   ├── PositionsSchema.js         # product, name, qty, avg, price, net, day, isLoss
│   │   └── OrdersSchema.js            # name, qty, price, mode
│   ├── .env.example                   # Environment variable template
│   └── package.json
│
├── .gitignore                         # node_modules, .env, build, dist, .DS_Store
└── README.md                          # This file
```

---

## 🧠 Design Decisions

### Why three separate apps instead of a monolith?
The frontend (landing/marketing site) and the dashboard (authenticated trading UI) serve fundamentally different purposes. Keeping them as independent React apps allows independent deployments, separate build configurations, and mirrors how production trading platforms like Zerodha separate their public site from their trading terminal (Kite). It also prevents the dashboard's heavier dependencies (MUI, Chart.js) from bloating the lightweight landing page bundle.

### Why JWT token passing via URL parameter?
Since the frontend and dashboard are hosted on different Vercel domains, they cannot share `localStorage` or cookies. After login, the frontend redirects to `dashboard.vercel.app?token=<JWT>`. The dashboard extracts the token from the URL, saves it to `localStorage`, and immediately cleans the URL bar via `window.history.replaceState()` for security. This is a common pattern for cross-domain authentication without shared cookies.

### Why a local knowledge base fallback for the chatbot?
The Gemini AI free tier has strict rate limits. Rather than showing error messages when the quota is exhausted, the chatbot falls back to a curated knowledge base of 11 topic categories (covering major Indian stocks, platform navigation, trading concepts, and more). Users always get a useful response — the experience degrades gracefully rather than breaking.

### Why Gemini Flash Lite instead of a larger model?
`gemini-2.0-flash-lite` is the most cost-effective model in the Gemini API family. For a chatbot answering stock-related questions in 2–4 bullet points, it provides sufficient quality while maximising the number of free-tier requests per day. The retry logic (2 attempts with 3-second backoff) handles transient rate-limit errors before falling back to the local knowledge base.

### Why weighted average cost recalculation on buy?
When a user buys more of a stock they already hold, the system recalculates the average cost using: `newAvg = (oldAvg × oldQty + newPrice × newQty) / totalQty`. This matches how real brokerages compute average cost for tax purposes and P&L reporting. Selling validates available quantity and auto-deletes the holding document when quantity reaches zero.

### Why environment-variable-based URL configuration?
All cross-app URLs (`REACT_APP_API_URL`, `REACT_APP_DASHBOARD_URL`, `REACT_APP_FRONTEND_URL`) are injected at build time via environment variables. This means the same codebase works for local development (localhost ports) and production (Vercel/Render URLs) without any code changes — just different `.env` files.

