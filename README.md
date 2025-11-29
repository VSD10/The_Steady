<div align="center">


# THESTEADY
### *Financial Stability for the Gig Economy*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://react.dev/)


</div>

---

## 🚨 The Problem
**Gig workers face a unique financial crisis:**
- **Income Volatility**: Earnings fluctuate daily, making budgeting impossible.
- **The "Rich Day" Trap**: High-earning days often lead to overspending, leaving nothing for lean days.
- **Lack of Safety Net**: No employer-provided benefits, insurance, or paid leave.
- **Cognitive Overload**: Managing finances across multiple platforms (Uber, Zomato, Swiggy) is exhausting.

## 💡 The Solution: THESTEADY
**THESTEADY** is an AI-powered financial companion designed specifically for the irregular income patterns of gig workers. It acts as a buffer between volatile earnings and daily spending, smoothing out the financial ride.

### Core Philosophy: "The Shadow Wallet"
The app introduces the concept of a **Shadow Wallet**—an invisible savings layer. When a user has a high-earning day, the "excess" income is automatically moved to the Shadow Wallet. The user only sees a "Safe-to-Spend" balance, preventing lifestyle inflation and building a safety net without willpower.

---

## 📱 Detailed Workflow & Features

### 1. 📊 The Command Center (Dashboard)
The dashboard is the worker's daily briefing.
- **"Safe-to-Spend" Balance**: The primary number displayed is NOT the total bank balance, but what is safe to spend today.
- **Smart Alerts**: "Good Day Tomorrow" predictions help workers plan their shifts.
- **Quick Actions**: One-tap access to savings goals and earnings entry.

### 2. 🛡️ The Shadow Wallet (Invisible Savings)
This is the heart of the application.
- **Auto-Skimming**: If daily earnings exceed a threshold (e.g., ₹2000), 50% of the surplus is hidden away.
- **Friction-Based Access**: Unlocking the Shadow Wallet requires conscious action (and a "guilt" prompt), discouraging impulsive withdrawals.
- **Emergency Fund**: Builds silently in the background.

### 3. 🧠 Smart Modes (Psychological Anchoring)
The app adapts to the user's current financial reality:
- **🟢 Abundance Mode**: When ahead of goals. Encourages saving and investing.
- **🟡 Steady Mode**: Standard operation. Balanced advice.
- **🔴 Survival Mode**: When funds are low. Locks non-essential features, highlights cheap food options, and aggressively restricts the "Safe-to-Spend" number.

### 4. 📈 Predictive Analytics
- **Income Forecasting**: Uses historical data to predict future earnings.
- **Shift Optimization**: Suggests the best days and times to work based on past trends.

### 5. 🤖 AI Financial Coach (Gemini Powered)
A 24/7 chat assistant that understands the context of gig work.
- **Context-Aware**: Knows the user's current "Mode" and balance.
- **Actionable Advice**: "You're ₹500 short for the bike EMI. Work 2 extra hours on Friday night."
- **Emotional Support**: Encourages workers during low-earning streaks.

---

## 🛠️ Technical Architecture

The application is built for speed, reliability, and mobile-first usage.

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + Vite | High-performance UI rendering. |
| **Styling** | Tailwind CSS | Custom, responsive design system. |
| **State Mgmt** | React Context API | Managing global state (Wallet, Theme, User Data). |
| **AI Engine** | Google Gemini API | Natural language processing for the Chat Assistant. |
| **Routing** | React Router DOM | Seamless client-side navigation. |
| **Visualization** | Recharts | Interactive financial charts. |

---

## 🚀 Installation & Setup

Follow these steps to get THESTEADY running on your local machine for the hackathon demo.

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/thesteady.git
   cd thesteady
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Launch the App**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

---

## 🔮 Future Roadmap

- [ ] **Bank Integration**: Real-time connection via Account Aggregator framework.
- [ ] **Community Challenges**: Gamified saving streaks with other riders.
- [ ] **Micro-Insurance**: One-tap purchase of daily accident cover.
- [ ] **Voice Interface**: Hands-free interaction for riders while driving.

---

<div align="center">
Built with ❤️ for the Gig Economy
</div>
