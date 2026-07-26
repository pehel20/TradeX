require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/UserModel");

const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenAI } = require('@google/genai');

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const verifyUser = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());


app.get('/allHoldings', verifyUser, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allPositions', verifyUser, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", verifyUser, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    let holding = await HoldingsModel.findOne({ name });

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({ message: "Stock not found" });
      }

      if (holding.qty < qty) {
        return res.status(400).json({
          message: "Not enough quantity to sell",
        });
      }

      holding.qty -= Number(qty);
      
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    if (mode === "BUY") {
      if (holding) {
        const totalCost =
          holding.avg * holding.qty + price * qty;

        const totalQty = holding.qty + Number(qty);

        holding.avg = totalCost / totalQty; 
        holding.qty = totalQty;

        await holding.save();
      } else {
        await HoldingsModel.create({
          name,
          qty: Number(qty),
          avg: price,
          price,
          net: "+0%",
          day: "+0%",
        });
      }
    }

    let newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    res.json({ message: "Order successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/allOrders", verifyUser, async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching orders");
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "Signup successful" });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "SECRET_KEY",
    { expiresIn: "365d" }
  );

  res.json({ token });
});

// Helper: wait for ms milliseconds
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ---------- Local Knowledge Base Fallback ----------
// When the Gemini API quota is exhausted, the bot falls back to these
// pre-built responses so users always get a useful answer.
const knowledgeBase = [
  {
    keywords: ["tcs", "tata consultancy"],
    reply: "**TCS (Tata Consultancy Services)** is one of India's largest IT services companies and a Sensex/Nifty heavyweight.\n\n- **Sector:** Information Technology\n- **Market Cap:** Large Cap (~₹13-14 lakh crore)\n- **Key Strengths:** Strong order book, consistent dividends, global client base across BFSI, retail, and manufacturing\n- **Things to Watch:** Rupee movement, US/EU tech spending trends, and quarterly deal wins\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["reliance", "ril"],
    reply: "**Reliance Industries (RIL)** is India's largest company by market cap, with diversified businesses.\n\n- **Sector:** Conglomerate (O&G, Telecom, Retail, Digital)\n- **Key Segments:** Jio (telecom), Reliance Retail, O2C (petrochemicals), and New Energy\n- **Strengths:** Dominant market position in telecom & retail, aggressive expansion into green energy\n- **Things to Watch:** Jio tariff hikes, retail IPO plans, and new energy investments\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["infosys", "infy"],
    reply: "**Infosys** is India's second-largest IT services company, known for strong governance and digital transformation expertise.\n\n- **Sector:** Information Technology\n- **Market Cap:** Large Cap\n- **Strengths:** Strong digital revenue mix, consistent margins, and robust deal pipeline\n- **Things to Watch:** Attrition rates, large deal TCV, and guidance revisions\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["hdfc", "hdfc bank"],
    reply: "**HDFC Bank** is India's largest private sector bank and a key Nifty constituent.\n\n- **Sector:** Banking & Financial Services\n- **Strengths:** Best-in-class asset quality (low NPAs), strong deposit franchise, wide branch network\n- **Post-Merger:** Absorbed HDFC Ltd, becoming one of the world's largest banks by market cap\n- **Things to Watch:** Credit growth, NIM trends, and deposit mobilization post-merger\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["buy", "sell", "order", "how to trade", "place order"],
    reply: "Here's how to place a trade on TradeX:\n\n- **Buy:** Go to your Dashboard, find the stock you want, and click the **Buy** button. Enter quantity and price, then confirm.\n- **Sell:** Navigate to your **Holdings**, find the stock, and click **Sell**. Enter the quantity to sell.\n- **Orders:** View all your past orders under the **Orders** tab in the dashboard.\n- **Tip:** Always check the current price before placing an order!\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["holdings", "portfolio", "my stocks"],
    reply: "Your **Holdings** show all the stocks you currently own on TradeX.\n\n- Navigate to **Dashboard → Holdings** to see your complete portfolio\n- Each holding shows: stock name, quantity, average buy price, current price, and P&L\n- **Green** values indicate profit, **red** indicates loss\n- You can sell directly from the holdings page\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["position", "positions", "intraday"],
    reply: "**Positions** show your active intraday and short-term trades on TradeX.\n\n- Go to **Dashboard → Positions** to see open positions\n- Each position shows: product type, name, qty, avg price, current price, day change, and net change\n- Positions differ from holdings — they track short-term trades\n- Close positions before market close for intraday trades\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["nifty", "sensex", "index", "market"],
    reply: "**Nifty 50** and **Sensex** are India's two key stock market indices.\n\n- **Nifty 50:** Tracks the top 50 companies on NSE (National Stock Exchange)\n- **Sensex:** Tracks the top 30 companies on BSE (Bombay Stock Exchange)\n- Both are market-cap weighted and serve as barometers of overall market health\n- **Tip:** When these indices are green, the broader market is generally bullish\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["mutual fund", "mf", "sip"],
    reply: "**Mutual Funds** pool money from investors to invest in stocks, bonds, or other assets.\n\n- **SIP (Systematic Investment Plan):** Invest a fixed amount monthly — great for beginners\n- **Types:** Equity MF (stocks), Debt MF (bonds), Hybrid (mix), Index Funds (track Nifty/Sensex)\n- **Benefits:** Diversification, professional management, and low minimum investment\n- **Tip:** For long-term wealth building, index funds with low expense ratios are popular choices\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["what is", "explain", "meaning", "define"],
    reply: "I'd love to explain that in detail! Here are some common trading concepts:\n\n- **P&L:** Profit and Loss — the difference between your buy and current/sell price\n- **Market Cap:** Total value of a company's shares (share price × total shares)\n- **Volume:** Number of shares traded in a day — high volume = high interest\n- **PE Ratio:** Price-to-Earnings ratio — helps judge if a stock is overvalued or undervalued\n\nAsk me about a specific term and I'll break it down!\n\n*Note: This is a cached response. Live AI responses will resume once API quota resets.*"
  },
  {
    keywords: ["hello", "hi", "hey", "help"],
    reply: "Hello! 👋 I'm TradeBot, your trading assistant.\n\nHere's what I can help you with:\n- **Stock info:** Ask about any stock (e.g., \"Tell me about TCS\")\n- **Trading:** How to buy/sell, place orders\n- **Portfolio:** Understanding your holdings & positions\n- **Concepts:** P&L, market cap, SIP, mutual funds, and more\n\nJust type your question!\n\n*Note: Running in offline mode. Live AI responses will resume once API quota resets.*"
  }
];

function getLocalFallbackReply(message) {
  const msg = message.toLowerCase();
  
  // Try to match against knowledge base entries
  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (msg.includes(keyword)) {
        return entry.reply;
      }
    }
  }

  // Generic fallback if no keyword matches
  return "Thanks for your question! I'm currently running in **offline mode** because the AI API quota has been reached.\n\nHere are things I can still help with:\n- **Stock info:** TCS, Reliance, Infosys, HDFC Bank\n- **Platform help:** Holdings, Positions, Orders\n- **Concepts:** Nifty, Sensex, Mutual Funds, SIP, trading basics\n\nTry asking about one of these topics, or wait a bit for the live AI to come back online! 🕐";
}

// ---------- Chat Endpoint ----------
app.post("/chat", async (req, res) => {
  const { message, history } = req.body;
  try {
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_KEY_HERE" || process.env.GEMINI_API_KEY === "") {
      return res.json({ reply: getLocalFallbackReply(message) });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const contents = history.map(h => ({
      role: h.role, 
      parts: [{ text: h.content }]
    }));
    contents.push({ role: "user", parts: [{ text: message }] });

    const systemInstruction = "You are TradeBot, an AI assistant inside a simulated, educational TradeX trading platform built as a student project. This is not real financial advice. You are fully allowed to discuss stocks, suggest stocks based on general market trends, explain trading concepts, and help with platform navigation (Holdings, Positions, Orders, Funds). Response style: always start with a direct 1-sentence answer to the question, then follow up with 2-4 short bullet points covering the key supporting details. Never write a bare one-liner with no explanation, and never write long paragraphs. Keep it balanced — informative but concise. Never refuse stock or trading questions.";

    // Use a single lightweight model to conserve free-tier quota.
    // Retry once with backoff on rate-limit errors, then fall back to local knowledge base.
    const modelName = 'gemini-2.0-flash-lite';
    const MAX_RETRIES = 2;
    let lastError = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          const delayMs = 3000;
          console.log(`Rate-limited, retrying in ${delayMs / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
          await sleep(delayMs);
        }
        
        console.log(`Calling model: ${modelName} (attempt ${attempt + 1})`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: { systemInstruction }
        });

        const replyText = response.text || (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) || "I received an empty response. Please try again.";
        return res.json({ reply: replyText });
      } catch (apiErr) {
        lastError = apiErr;
        const errMsg = apiErr.message || "";
        console.error(`Attempt ${attempt + 1} failed:`, errMsg);
        
        // For auth errors, fail immediately — no point retrying
        if (errMsg.includes("401") || errMsg.includes("403") || errMsg.includes("API_KEY")) {
          break;
        }
        continue;
      }
    }

    // API failed — use local knowledge base fallback instead of showing an error
    console.log("API unavailable, using local fallback for:", message);
    return res.json({ reply: getLocalFallbackReply(message) });

  } catch (err) {
    console.error("Chat error:", err);
    // Even on unexpected errors, return a useful response
    return res.json({ reply: getLocalFallbackReply(req.body.message || "") });
  }
});

app.listen(PORT, () => {
  console.log("App started");
  mongoose.connect(uri);
  console.log("DB connected");
});
