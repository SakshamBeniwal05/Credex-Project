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

## Day 6 — 2025-05-12 (Monday)

### Session 1 — 12:00 AM to 8:00 AM  
**Hours worked:** 8

### Session 2 — 2:00 PM to 10:00 PM  
**Hours worked:** 8

### Total Hours Worked: 16

---

## What I did:

### Backend Debugging & Supabase Fixes
- Debugged critical Supabase URL bug:
  - Backend was passing full REST path:
    ```txt
    https://projectname.supabase.co/rest/v1/...
    ```
    instead of only:
    ```txt
    https://projectname.supabase.co
    ```
    into `Supabase.createClient()`

- **Bug discovery process:**
  - Audit insertion was working correctly
  - Fetch operations were returning empty results with no explicit error
  - Tested direct Supabase client queries independently
  - Traced issue to malformed client initialization URL

- **Hypothesis tested:**
  - Replaced incorrect URL handling with proper `process.env.SUPABASE_URL`
  - Reinitialized client using only the project base URL

- **Resolution:**
  - Successfully fixed audit insertion + retrieval flow
  - Verified complete end-to-end database operations

---

### Frontend Development & Type Safety
Built the complete frontend system using React + TypeScript:

- `AuditPage.tsx`
  - Form component with:
    - AI model selection
    - Team size input
    - Workflow/use-case inputs
    - React Hook Form integration

- `FinalPage.tsx`
  - Results dashboard
  - Dynamic score-based coloring:
    - Green
    - Blue
    - Amber
    - Orange
    - Red

- `Pricing_Card.tsx`
  - Reusable pricing display component
  - Standardized plan visualization

- Zustand store (`api_data.tsx`)
  - Centralized state management
  - Async API handling
  - Type-safe store methods

- Created centralized type system (`types/index.ts`)
  - Built 10 interfaces covering:
    - Audit results
    - Pricing data
    - API payloads
    - Recommendation structures
    - Form types

- Added `localStorage` persistence
  - Allows form recovery after accidental refresh/close

---

### Testing & Type Validation
- Verified **zero TypeScript errors** across frontend files
- Fixed:
  - Button disabled state logic
  - Missing `AuditResult` properties
  - Unused variables and incorrect typings
- Tested complete flow:
  - Form submission
  - API call
  - Gemini processing
  - Database storage
  - Audit retrieval
  - Frontend rendering

---

### Documentation & Project Preparation
- Created comprehensive `README.md`
  - Quick start instructions
  - Deployment setup
  - Architecture decisions
  - Environment variable setup

- Started preparing complete documentation package:
  - `README.md`
  - `ARCHITECTURE.md`
  - `DEVLOG.md`
  - `REFLECTION.md`
  - `TESTS.md`
  - `PRICING_DATA.md`
  - `PROMPTS.md`
  - `.github/workflows`

- Maintained Git development history:
  - 8 commits tracked between May 11–12

---

## Additional Workflow Improvements
- Designed UI flows first in Figma before implementation
- Used Claude to help generate/refine the `FinalPage` structure using the Figma blueprint
- Reused architecture and reusable patterns from my previous Curator application
- Used AI tools mainly for:
  - Verification
  - Debugging
  - Reviewing implementation decisions
- Maintained manual control over:
  - Architecture
  - Business logic
  - Security decisions
  - Final code validation

---

## What I learned:
- The importance of parameter formatting in external library APIs
- React Hook Form integration with TypeScript
- Zustand for lightweight scalable state management
- Centralized type systems reduce runtime bugs significantly
- TypeScript strict mode catches subtle logic issues during compilation
- End-to-end testing validates the complete stack, not just isolated components
- Documentation quality is almost as important as implementation quality

---

## Blockers / what I'm stuck on:
None currently resolved.

---

## Plan for tomorrow:
- Complete remaining documentation files
- Deploy frontend to Vercel
- Deploy backend to Railway/Render
- Finalize production-ready MVP build

## Summary Statistics
- **Total hours worked:** ~30 hours
- **Days with work:** 6 days (Day 3 skipped)
- **Key milestones:** Project initialization, Supabase setup, Gemini integration, type safety implementation, documentation
- **Technologies learned:** Supabase relationships, Gemini API prompting, React Hook Form, Zustand, TypeScript strict mode
- **Bugs resolved:** 1 critical (Supabase URL parameter), 3 type errors
