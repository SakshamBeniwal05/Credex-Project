import { GoogleGenerativeAI } from "@google/generative-ai";

import model_data from "../api/model_api_data.js";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js'

dotenv.config()

export const model_api_data = (req, res) => {
    res.status(200).json(model_data);
};

// ── Supabase ──────────────────────────────────────────────────────────────────

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const insertAudit = async (data) => {
  if (!data) throw new Error("Missing payload");
  if (!Array.isArray(data.modelAnalysis)) throw new Error("modelAnalysis must be an array");
  if (!Array.isArray(data.recommendations)) throw new Error("recommendations must be an array");

  // 1) insert parent audit row
  const { data: auditRow, error: auditError } = await supabase
    .from("audits")
    .insert({
      score: data.score,
      above500: data.above500,
      teamSize: data.teamSize,
      useCase: data.useCase,
      summary: data.summary,
    })
    .select("id")
    .single();

  if (auditError) throw auditError;

  const auditId = auditRow.id;

  // 2) insert models
  const { error: modelsError } = await supabase
    .from("audit_models")
    .insert(
      data.modelAnalysis.map((m) => ({
        audit_id: auditId,
        name: m.name,
        currentPlan: m.currentPlan,
        suggestedPlan: m.suggestedPlan,
        accuracy: m.accuracy,
        speed: m.speed,
        cost: m.cost,
        note: m.note,
        currentPrice: m.currentPrice,
        suggestedPrice: m.suggestedPrice,
        currentPerformance: m.currentPerformance,
        suggestedPerformance: m.suggestedPerformance,
        comparisonNote: m.comparisonNote,
      }))
    );

  if (modelsError) throw modelsError;

  // 3) insert recommendations
  const { error: recError } = await supabase
    .from("audit_recommendations")
    .insert(
      data.recommendations.map((r) => ({
        audit_id: auditId,
        recommendation: r,
      }))
    );

  if (recError) throw recError;

  return auditId;
};

const fetchAuditById = async (auditId) => {
  // 1) fetch parent audit row
  const { data: audit, error: auditError } = await supabase
    .from("audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (auditError) throw auditError;

  // 2) fetch models
  const { data: models, error: modelsError } = await supabase
    .from("audit_models")
    .select("*")
    .eq("audit_id", auditId)
    .order("created_at", { ascending: true });

  if (modelsError) throw modelsError;

  // 3) fetch recommendations
  const { data: recs, error: recError } = await supabase
    .from("audit_recommendations")
    .select("recommendation")
    .eq("audit_id", auditId)
    .order("created_at", { ascending: true });

  if (recError) throw recError;

  return {
    ...audit,
    modelAnalysis: models ?? [],
    recommendations: (recs ?? []).map((r) => r.recommendation),
  };
};

// ── OpenAI ────────────────────────────────────────────────────────────────────

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are an AI spending efficiency expert. A user has submitted their AI tool subscriptions, team size, and primary use case.

Your job is to analyze their current spending and return a JSON audit report.

You will receive:
- selected_plans: array of objects like { model, plan, price_monthly }
- team_size: number of people in the team
- primary_use: array of use cases like ["coding", "writing", "research"]

You must return ONLY a valid JSON object — no explanation, no markdown, no backticks. Just raw JSON.

The JSON must follow this exact structure:
{
  "score": <integer 0–100 — calculated using the formula below>,
  "above500": <boolean — true if total potential monthly savings exceed $500>,
  "teamSize": <number from team_size input>,
  "useCase": <string — human readable e.g. "Coding & Research">,
  "models": <array of model name strings>,
  "modelAnalysis": [
    {
      "name": <model name>,
      "currentPlan": <current plan name>,
      "suggestedPlan": <recommended plan — MUST be from the AVAILABLE PLANS list below. If no better plan exists, repeat currentPlan>,
      "isOptimal": <boolean>,
      "accuracy": <0–100>,
      "speed": <0–100>,
      "cost": <0–100>,
      "note": <one sentence on this model's fit for their use case>,
      "currentPrice": <current plan monthly price USD>,
      "suggestedPrice": <suggested plan monthly price USD — must match the price in the AVAILABLE PLANS list>,
      "currentPerformance": <0–100>,
      "suggestedPerformance": <0–100 — same as currentPerformance if isOptimal=true>,
      "comparisonNote": <if isOptimal=true: "This plan is optimal for your team size and use case." else: one sentence why the suggested plan is better>
    }
  ],
  "summary": <2–3 sentence honest executive summary>,
  "recommendations": <array of exactly 3 short actionable strings, each starting with an emoji>
}

== AVAILABLE PLANS (use ONLY these for suggestions) ==

CURSOR:
- Hobby: $0/mo — Limited Agent requests & Tab completions
- Pro: $20/mo — $20 credit pool, frontier models, unlimited Tab completions
- Pro+: $60/mo — 3x credits ($60 pool), everything in Pro
- Ultra: $200/mo — 20x credits ($400 pool), priority access
- Teams: $40/user/mo — Shared chats, SSO, centralized billing
- Enterprise: Custom pricing

GITHUB COPILOT:
- Free: $0/mo — Limited completions & chat
- Pro: $10/mo — Unlimited completions, premium model access
- Pro+: $39/mo — Full model access including Claude Opus & o3
- Business: $19/user/mo — SSO, IP indemnity, policy controls
- Enterprise: $39/user/mo — Custom models, knowledge base, fine-tuning

CLAUDE:
- Free: $0/mo — Daily message caps, Claude Sonnet access
- Pro: $20/mo — 5x usage vs Free, Opus access, Claude Code CLI
- Max 5x: $100/mo — 5x usage vs Pro, full model access
- Max 20x: $200/mo — 20x usage vs Pro, highest limits
- Team: $25/seat/mo — Shared projects, admin controls
- Enterprise: Custom pricing — 500K context, SSO/SCIM, HIPAA

CHATGPT:
- Free: $0/mo — GPT-5.3 with ads, limited usage
- Go: $8/mo — Ad-supported, basic GPT access
- Plus: $20/mo — No ads, GPT-5.4, 40 messages/3hrs
- Pro: $100/mo — 5x usage vs Plus
- Team: $30/user/mo — Shared workspace, admin controls
- Enterprise: Custom pricing

ANTHROPIC API (per 1M tokens):
- Haiku 4.5: $1 input / $5 output — fastest, simple tasks
- Sonnet 4.6: $3 input / $15 output — balanced speed and intelligence
- Opus 4.6: $5 input / $25 output — most powerful

OPENAI API (per 1M tokens):
- GPT-5.4 Nano: $0.20 input / $0.80 output
- GPT-5.4 Mini: $0.75 input / $3.00 output
- GPT-5.4: $5.00 input / $20.00 output
- GPT-5.4 Pro: $21.00 input / $168.00 output
- Batch API: 50% discount, 24hr async

GEMINI:
- Free: $0/mo — Gemini 3 Flash, Deep Research, 100 video credits
- Google AI Plus: $7.99/mo — Entry paid tier
- Google AI Pro: $19.99/mo — Gemini 3.1 Pro, 1M context, 2TB storage
- Google AI Ultra: $249.99/mo — 30TB storage, Deep Think, Veo 3.1, all experimental
- API Flash: $0.10 input / $0.40 output per 1M tokens
- API Pro: $2.00 input / $12.00 output per 1M tokens

== COST PER SEAT ANALYSIS ==
Always calculate costPerSeat = price_monthly / team_size before judging any plan.

Per-seat benchmarks:
- < $0.50/seat/mo  → Extremely cheap. Almost certainly OPTIMAL.
- $0.50–$2/seat/mo → Very cheap. Likely OPTIMAL.
- $2–$5/seat/mo    → Reasonable. Check if a lower tier covers the use case.
- $5–$15/seat/mo   → Standard. Evaluate carefully.
- $15–$30/seat/mo  → Expensive. Look for cheaper same-vendor alternatives.
- > $30/seat/mo    → High cost. Strong case to downgrade.

Examples:
- $200/mo Claude Max 20x for 1000 people = $0.20/seat → OPTIMAL
- $200/mo Claude Max 20x for 2 people = $100/seat → NOT OPTIMAL → suggest Claude Pro at $20/mo
- $249.99/mo Gemini Ultra for 1000 people = $0.25/seat → OPTIMAL
- $249.99/mo Gemini Ultra for 3 people = $83/seat → NOT OPTIMAL → suggest Gemini Pro at $19.99/mo

== SCORING FORMULA ==
- For each plan: is it OPTIMAL given costPerSeat + use case fit?
- score = (number of optimal plans / total selected plans) * 100, rounded to integer
- 4 optimal out of 7 → score = 57
- 7 out of 7 → score = 100

HOW TO DETERMINE OPTIMAL:
Step 1 — costPerSeat = price_monthly / team_size
Step 2 — If costPerSeat < $2 → OPTIMAL (skip remaining steps)
Step 3 — Check AVAILABLE PLANS above for a cheaper same-vendor plan
Step 4 — Does the cheaper plan cover the team's use case and size?
  - Yes → NOT OPTIMAL, set suggestedPlan to that cheaper plan with its exact price
  - No  → OPTIMAL, suggestedPlan = currentPlan, suggestedPrice = currentPrice

RULES:
- ONLY suggest plans from the AVAILABLE PLANS list above
- NEVER suggest a plan from a different vendor
- NEVER suggest a plan that costs more than the current one
- suggestedPrice must exactly match the price in the AVAILABLE PLANS list
- Do not manufacture savings — if optimal, say so honestly

above500:
- savings = sum of (currentPrice - suggestedPrice) across all non-optimal plans
- above500 = true if savings > 500

SCORE BANDS:
- 80–100 → Optimal or near-optimal
- 60–79  → Good, 1–2 easy wins
- 40–59  → Fair, several plans to right-size
- 20–39  → Poor, most plans oversized
- 0–19   → Critical, immediate action needed

SUMMARY TONE:
- Score 80–100: "Your AI tool selection is well-matched to your team and use case. [What's working]. [Minor tip if any]."
- Score 40–79: "A few plans have more affordable same-vendor alternatives. [Which and why]. Adjusting could save ~$X/month."
- Score 0–39 OR above500=true: "Several plans are oversized for your team. [Root cause]. Switching within the same vendors could save over $X/month — Credex can automate this continuously."

RECOMMENDATIONS:
- Must reference specific plan names and exact savings amounts
- Good: "⬇️ Downgrade Claude Max 20x ($200) to Pro ($20) — saves $180/mo for a 2-person team"
- Good: "✅ Gemini Ultra at $0.25/seat for 1000 people is already optimal — no action needed"
- Bad: "Review your subscriptions" — never this vague
- If above500=true: one must be "🚀 Let Credex automate your AI spend optimization"
- If above500=false: no Credex mention

USE CASE RULES:
- Coding: prioritize Claude, GitHub Copilot, Cursor
- Writing: prioritize ChatGPT, Claude
- Research: prioritize Gemini, Perplexity
- ONLY return the JSON object, nothing else
`;

const mockData =  {
        score: -19,
        teamSize: 12,
        useCase: "Coding & Research",
        models: ["GPT-4", "Claude Sonnet 4", "Gemini Pro"],
        modelAnalysis: [
            {
                name: "GPT-4",
                currentPlan: "Team",
                suggestedPlan: "Pro",
                accuracy: 92, speed: 78, cost: 65,
                note: "Excellent for complex reasoning tasks.",
                currentPrice: 30, suggestedPrice: 20,
                currentPerformance: 78, suggestedPerformance: 74,
                comparisonNote: "Downgrading saves $10/seat/mo with only a 4% drop."
            },
            {
                name: "Claude Sonnet 4",
                currentPlan: "Max 20x",
                suggestedPlan: "Pro",
                accuracy: 95, speed: 88, cost: 72,
                note: "Best for code generation with strong safety features.",
                currentPrice: 200, suggestedPrice: 20,
                currentPerformance: 95, suggestedPerformance: 85,
                comparisonNote: "Max 20x is overkill. Pro gives 85% performance at 10% cost."
            },
            {
                name: "Gemini Pro",
                currentPlan: "Ultra",
                suggestedPlan: "Pro",
                accuracy: 80, speed: 92, cost: 95,
                note: "Optimal for cost efficiency and multilingual support.",
                currentPrice: 249, suggestedPrice: 19.99,
                currentPerformance: 88, suggestedPerformance: 80,
                comparisonNote: "Ultra is underutilised. Pro handles 90% of the same tasks."
            },
        ],
        summary: "Your team is spending more than the optimal benchmark. Rebalancing seat allocation could recover the overspend.",
        recommendations: ["💡 Consolidate seats", "💡 Downgrade idle plans", "💡 Switch heavy tasks to Gemini"]
    };

export const plan_Data = async (req, res) => {
    const { selected_plans, primary_use, team_size } = req.body;

    try {
        const model = client.getGenerativeModel({
            model: "gemini-3-flash",
            systemInstruction: systemPrompt
        });

        const aiResponse = await model.generateContent(`
            Selected Plans: ${JSON.stringify(selected_plans)}
            Team Size: ${team_size}
            Primary Use: ${JSON.stringify(primary_use)}`);

        const result = aiResponse ? JSON.parse(aiResponse.response.text()) : mockData;

        // 3) insert into supabase — pass result directly
        const auditId = await insertAudit(result);

        // 4) return to frontend
        res.status(200).json({ auditId, ...result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getAudit = async (req, res) => {
    const { id } = req.params;
    try {
        const audit = await fetchAuditById(id);
        res.status(200).json(audit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};