# Pricing Data Sources

All pricing data in Credex comes from official vendor sources. This document lists the sources and verification dates.

## Data Verification

Last updated: **2025-05-12**

---

## 1. Cursor

- **Free Tier:** $0/month
- **Pro:** $20/month ($16/month annual) — 5 monthly credits
- **Pro+:** $60/month ($48/month annual) — 15 monthly credits
- **Ultra:** $200/month ($160/month annual) — 60 monthly credits
- **Teams:** $40/month ($32/month annual) per user
- **Enterprise:** Custom pricing

**Official Source:** [cursor.com/pricing](https://cursor.com/pricing) — verified 2025-05-12  
**Reference:** Pro includes frontier models, MCPs, cloud agents, unlimited Tab completions. Teams tier enables SSO and centralized billing.

---

## 2. GitHub Copilot

- **Free:** $0/month — Limited completions & chat
- **Pro:** $10/month — Unlimited completions, premium model access
- **Pro+:** $39/month — Full model access including Claude Opus & o3
- **Business:** $19/month per user (org-wide pooled credits)
- **Enterprise:** $39/month per user (requires GitHub Enterprise Cloud)

**Official Source:** [github.com/features/copilot/pricing](https://github.com/features/copilot/pricing) — verified 2025-05-12  
**Reference:** Pro+ now includes access to Claude Opus and o3-mini reasoning model. Business tier offers SSO and IP indemnity.

---

## 3. Claude (Anthropic Web Interface)

- **Free:** $0/month — Daily message caps
- **Pro:** $20/month — 5x usage, Claude Opus access, Claude Code CLI
- **Max 5x:** $100/month — 5x Pro usage limits
- **Max 20x:** $200/month — 20x Pro usage limits
- **Team:** $25/month per seat — Shared projects, admin controls
- **Enterprise:** Custom pricing — 500K context, SSO/SCIM, HIPAA compliance

**Official Source:** [claude.ai/pricing](https://claude.ai/pricing) — verified 2025-05-12  
**Reference:** Max tiers provide highest usage limits for power users. Team tier simplifies multi-user licensing.

---

## 4. Anthropic API

Pricing per 1 million tokens (input | output):

- **Haiku 4.5:** $1.00 | $5.00 per 1M tokens
- **Sonnet 4.6:** $3.00 | $15.00 per 1M tokens
- **Opus 4.6:** $5.00 | $25.00 per 1M tokens

**Official Source:** [anthropic.com/pricing](https://anthropic.com/pricing) — verified 2025-05-12  
**Reference:** Haiku is fastest and most compact (best for simple tasks). Sonnet offers best balance. Opus is most powerful.

---

## 5. ChatGPT (OpenAI Web Interface)

- **Free:** $0/month — GPT-5.3 with ads (US only). International: Limited usage
- **Go:** $8/month — Ad-supported for international users
- **Plus:** $20/month — No ads, GPT-5.4, 40 messages/3hrs on flagship model
- **Pro:** $100/month — 5x usage vs Plus
- **Team:** $30/month per user ($25/month annual) — Shared workspace, higher limits
- **Enterprise:** Custom pricing

**Official Source:** [chatgpt.com/pricing](https://chatgpt.com/pricing) — verified 2025-05-12  
**Reference:** Go tier launched as affordable option for non-US users. Pro positioned as direct competitor to Claude Max 5x. Team tier now supports annual discounts.

---

## 6. OpenAI API

Pricing per 1 million tokens (input | output):

- **GPT-5.4 Nano:** $0.20 | $0.80 per 1M tokens
- **GPT-5.4 Mini:** $0.75 | $3.00 per 1M tokens
- **GPT-5.4:** $5.00 | $20.00 per 1M tokens
- **GPT-5.4 Pro:** $21.00 | $168.00 per 1M tokens (Extended thinking)
- **Batch API:** 50% discount on all models — 24hr async processing

**Official Source:** [openai.com/api/pricing](https://openai.com/api/pricing) — verified 2025-05-12  
**Reference:** Nano is cheapest proprietary model. Batch API available for cost-sensitive workloads with 24-hour turnaround.

---

## 7. Google Gemini

### Gemini Web Interface

- **Free:** $0/month — Gemini 3 Flash, Deep Research, Gemini Live, 100 video credits/month
- **Google AI Plus:** $7.99/month — Launched Jan 2026 globally
- **Google AI Pro:** $19.99/month — Gemini 3.1 Pro, 1M context, 2TB storage, Deep Research, Gmail/Docs integration
- **Google AI Ultra:** $249.99/month — 30TB storage, Deep Think, Veo 3.1 video, Project Mariner, experimental features

### Gemini API

- **API Flash:** $0.10 | $0.40 per 1M tokens — Gemini 3 Flash (fastest, cheapest)
- **API Pro:** $2.00 | $12.00 per 1M tokens — Gemini 3.1 Pro (up to 200K context)

**Official Source:** [google.com/gemini/pricing](https://google.com/gemini/pricing) — verified 2025-05-12  
**Reference:** Free tier now includes Deep Research and Gemini Live. API Flash is most cost-effective for high-volume simple tasks. API Pro supports extended context windows.

---

## Pricing Model Variations

### Fixed Monthly Plans (Cursor, GitHub Copilot, Claude, ChatGPT)
- Subscription includes monthly credit pool or usage limits
- Annual plans offer 10-20% discount
- Team/Enterprise tiers enable centralized billing

### Pay-As-You-Go APIs (OpenAI, Anthropic, Gemini)
- Charged per 1 million input + output tokens
- No monthly minimum; pay only for usage
- Batch API models offer 50% discount for async tasks

### Freemium Models (All platforms)
- Free tier with limited monthly usage
- Upsell to paid tiers for professionals/teams
- Free tier acts as customer acquisition funnel

---

## Historical Notes

**Cursor:** Pro tier migrated from credit-based to monthly credit pool (May 2025)  
**GitHub Copilot:** Added o3-mini access to Pro+ tier (Jan 2026)  
**Claude:** Launched Team tier with per-seat billing (Mar 2025)  
**OpenAI:** Introduced Batch API for cost-sensitive workloads (2025)  
**Gemini:** Unified pricing between web + API (Jan 2026)

---

## Using This Data in Credex

The [Backend/src/api/model_api_data.js](Backend/src/api/model_api_data.js) file contains the above pricing data in JSON format. When users run an audit:

1. Frontend fetches `/models` endpoint
2. Backend returns all 7 tools with pricing plans
3. User selects 3 tools + team size
4. Gemini analyzes spend patterns using this pricing data
5. API returns score + recommendations

**To update pricing:** Modify `model_api_data.js` with new pricing from official sources above, then redeploy backend.

**Verification frequency:** Monthly check recommended to catch:
- Annual discount changes
- New tier launches
- Price increases/decreases
- Discontinued plans
