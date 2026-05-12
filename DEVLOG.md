# Development Log

## Day 1 — 2025-05-07 (Thursday)
**Hours worked:** 0.5  
**What I did:** Project was assigned. Decided not to start immediately due to upcoming exams.

**What I learned:** Need to balance exam preparation with project timeline.

**Blockers / what I'm stuck on:** Exam schedule conflicting with project deadline.

**Plan for tomorrow:** Complete exams, then begin research and exploration phase.

---

## Day 2 — 2025-05-08 (Friday)
**Hours worked:** 4  
**What I did:** Completed exams. Spent time researching AI tool pricing models, subscription tiers across 7 platforms (Cursor, GitHub Copilot, Claude, ChatGPT, OpenAI API, Anthropic API, Gemini). Explored Supabase as database solution and studied Express.js for backend architecture.

**What I learned:** 
- AI tools have complex pricing with monthly vs annual discounts, token-based APIs, and team plans
- Supabase PostgreSQL is fast to set up with good documentation
- Building an audit system requires aggregating data from multiple sources

**Blockers / what I'm stuck on:** Understanding how to design a schema that handles pricing variations across different plan types (fixed monthly vs per-token billing).

**Plan for tomorrow:** Start backend setup with Express, initialize database schema design.

---

## Day 3 — 2025-05-09 (Saturday)
**Hours worked:** 0  
**What I did:** Emergency trip came up; no development work done.

**What I learned:** N/A

**Blockers / what I'm stuck on:** N/A

**Plan for tomorrow:** Make up for lost time. Start project initialization.

---

## Day 4 — 2025-05-10 (Sunday)
**Hours worked:** 6  
**What I did:** 
- Initialized project structure: Backend (Express, Node.js) and Frontend (React + TypeScript + Vite)
- Set up Supabase PostgreSQL with 3 tables: audits, audit_models, audit_recommendations
- Configured environment variables for backend (.env with SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY)
- Created API route structure: GET /models, POST /audit, GET /audit/:id
- Decided to put backend separate to handle API keys securely (not expose them to frontend)

**What I learned:** 
- Express + Supabase is a great minimal stack for rapid backend development
- CORS configuration is critical when frontend and backend are separate
- Using environment variables keeps sensitive keys (Gemini API, Supabase keys) safe

**Blockers / what I'm stuck on:** Supabase client initialization syntax and proper TypeScript typing.

**Plan for tomorrow:** Build audit engine logic and integrate Gemini API for AI analysis.

---

## Day 5 — 2025-05-11 (Monday)
**Hours worked:** 8  
**What I did:**
- Built the core audit engine in static_controller.js with Gemini API integration
- Implemented `insertAudit()` function to store parent audit record + models + recommendations (3 table inserts)
- Created `fetchAuditById()` function to retrieve complete audit history with relationships
- Implemented the AI analysis system: Gemini analyzes selected tools + team size + use case, returns score (0-100), model recommendations, and optimization suggestions
- Built REST endpoints: `model_api_data()` returns 7 AI tools, `auditor()` POST endpoint triggers audit, `fetcher()` GET endpoint retrieves results
- Watched YouTube tutorials by Piyush Garg on Supabase and AI agents to understand best practices

**What I learned:**
- Supabase relationships through audit_id foreign keys
- Crafting effective system prompts for Gemini to return structured JSON
- Promise handling and async/await patterns in Node.js
- Three-table insert pattern for relational data

**Blockers / what I'm stuck on:** Getting Gemini to return consistent JSON structure; some requests returned markdown instead of JSON.

**Plan for tomorrow:** Debug Gemini response parsing and start building the frontend form.

---

## Day 6 — 2025-05-12 (Monday, afternoon)
**Hours worked:** 7  
**What I did:**
- Debugged critical Supabase URL bug: Backend was passing full path (`https://projectname.supabase.co/rest/v1/...`) instead of just project URL (`https://projectname.supabase.co`) to Supabase.create()
  - **Bug discovery process:** Audit was inserting successfully but fetch was returning no results. Tested with direct Supabase client calls. Realized the URL was malformed.
  - **Hypothesis tested:** Changed parameter from `SUPABASE_URL` in route handlers to just `process.env.SUPABASE_URL` in client initialization
  - **Resolution:** Fixed and verified audit insertion + retrieval now works end-to-end
- Built complete frontend with TypeScript for type safety:
  - AuditPage.tsx: Form component with model selection, team size, use case inputs using React Hook Form
  - FinalPage.tsx: Results display with score-based coloring (green/blue/amber/orange/red)
  - Pricing_Card.tsx: Reusable component for pricing plan display
  - Zustand store (api_data.tsx): Type-safe state management with async methods
- Created centralized type definitions (types/index.ts) with 10 interfaces covering all data flows
- Implemented localStorage persistence for form data recovery
- Fixed type errors: Button disabled logic, missing AuditResult properties, unused variables

**What I learned:**
- The importance of parameter naming in library APIs (Supabase.create() expects just URL, not full path)
- React Hook Form integration with TypeScript
- Zustand for lightweight state management
- Centralized type definitions eliminate runtime errors and enable IDE autocomplete

**Blockers / what I'm stuck on:** None currently resolved.

**Plan for tomorrow:** Deploy to production (Vercel frontend, Railway/Render backend) and prepare documentation.

---

## Day 7 — 2025-05-13 (Tuesday)
**Hours worked:** 5  
**What I did:**
- Verified zero TypeScript type errors across all 8 frontend files
- Tested end-to-end flow: Form submission → API call → Gemini analysis → Database storage → Results retrieval
- Created comprehensive README.md with quick start instructions, deployment guides, and decision rationale
- Started documentation package preparation (README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, PRICING_DATA, PROMPTS, .github/workflows)
- Set up Git commits tracking development progress (8 commits from May 11-12)

**What I learned:**
- TypeScript strict mode catches subtle bugs at compile time
- End-to-end testing with real API calls validates all layers of the stack
- Documentation is as important as code for project evaluation

**Blockers / what I'm stuck on:** None at this moment.

**Plan for tomorrow:** Complete remaining documentation files and deploy.

---

## Summary Statistics
- **Total hours worked:** ~30 hours
- **Days with work:** 6 days (Day 3 skipped)
- **Key milestones:** Project initialization, Supabase setup, Gemini integration, type safety implementation, documentation
- **Technologies learned:** Supabase relationships, Gemini API prompting, React Hook Form, Zustand, TypeScript strict mode
- **Bugs resolved:** 1 critical (Supabase URL parameter), 3 type errors
