# Credex – AI Spend Auditor

**Credex is an AI infrastructure platform that audits your AI tool subscriptions and recommends optimizations to reduce spending.** Users input their current AI tools, team size, and primary use case. The platform analyzes spending patterns against an AI pricing database and returns a **spend health score** (0–100) with per-model recommendations and actionable cost-saving insights.

**Who it's for:** Teams, freelancers, and small companies managing multiple AI subscriptions (ChatGPT, Claude, Copilot, Cursor, Gemini, etc.) who want to eliminate waste and right-size their usage.

---

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- Gemini API key (free tier available)

### Local Development

**Backend setup:**
```bash
cd Backend
npm install
cp .env.example .env
# Add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY
npm run dev  # Runs on http://localhost:3000
```

**Frontend setup:**
```bash
cd Frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

**Test the app:**
1. Navigate to http://localhost:5173
2. Click "Auditor" → select AI tools (e.g., ChatGPT Pro, Claude Pro)
3. Enter team size and use case → Submit
4. View your spend health score and recommendations

---

## Deploy

### Frontend (Vercel)
```bash
cd Frontend
vercel deploy
```

### Backend (Railway / Render)
```bash
# Push to GitHub, connect repo to Railway/Render
# Set env vars in dashboard
# Deploy on push to main
```

**Live URL:** [credex.rocks](https://credex.rocks) *(replace with your deployed URL)*

---

## Architecture

- **Frontend:** React + TypeScript + Vite (type-safe components, Zustand store)
- **Backend:** Express.js with Supabase + Gemini API integration
- **Database:** Supabase PostgreSQL (audits, models, recommendations)
- **AI Engine:** Google Gemini for intelligent spend analysis

---

## Key Decisions

| Decision | Trade-off | Why |
|----------|-----------|-----|
| **Gemini API over GPT** | Fewer models, slower inference | Free tier, acceptable latency for batch audits, cost-effective at scale |
| **Supabase over custom DB** | Vendor lock-in | Fast setup, built-in auth/storage, real-time capabilities, generous free tier |
| **React + Zustand over Next.js** | No SSR/SSG | Smaller bundle, faster iteration, sufficient for this use case, easier DevOps |
| **Mock data for pricing** | Manual maintenance | No API scraping needed, auditable sources, easy to update weekly |
| **TypeScript everywhere** | Build step required | Caught 15+ bugs pre-deploy, IDE autocomplete, maintainability for team |

---

## Project Status

- ✅ Core audit engine
- ✅ 7 AI tools tracked (ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, OpenAI API, Anthropic API)
- ✅ Full type safety (TypeScript)
- ⏳ Deployed (awaiting live URL)
- 🔮 Week 2: User accounts, spend history, alerts

---

## Stack

```
Frontend: React 18 + TypeScript + Vite + Tailwind + React Hook Form + Zustand
Backend: Node.js + Express + Supabase + Gemini API
Infra: Vercel (FE) + Railway/Render (BE)
```

---

## Support

For questions or feature requests, open an issue on [GitHub](https://github.com/SakshamBeniwal05/Credex-Project).
