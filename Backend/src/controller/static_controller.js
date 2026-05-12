import Anthropic from "@anthropic-ai/sdk";
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
    // 1) insert parent audit row
    const { data: auditRow, error: auditError } = await supabase
        .from('audits')
        .insert({
            score: data.score,
            teamSize: data.teamSize,
            useCase: data.useCase,
            summary: data.summary
        })
        .select('id')
        .single();
    if (auditError) throw auditError;

    const auditId = auditRow.id;

    // 2) insert models
    const { error: modelsError } = await supabase
        .from('audit_models')
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
                comparisonNote: m.comparisonNote
            }))
        );
    if (modelsError) throw modelsError;

    // 3) insert recommendations
    const { error: recError } = await supabase
        .from('audit_recommendations')
        .insert(
            data.recommendations.map((r) => ({
                audit_id: auditId,
                recommendation: r
            }))
        );
    if (recError) throw recError;

    return auditId;
};

const fetchAuditById = async (auditId) => {
    // 1) fetch parent audit row
    const { data: audit, error: auditError } = await supabase
        .from('audits')
        .select('*')
        .eq('id', auditId)
        .single();
    if (auditError) throw auditError;

    // 2) fetch models
    const { data: models, error: modelsError } = await supabase
        .from('audit_models')
        .select('*')
        .eq('audit_id', auditId);
    if (modelsError) throw modelsError;

    // 3) fetch recommendations
    const { data: recommendations, error: recError } = await supabase
        .from('audit_recommendations')
        .select('recommendation')
        .eq('audit_id', auditId);
    if (recError) throw recError;

    // 4) combine and return
    return {
        ...audit,
        modelAnalysis: models,
        recommendations: recommendations.map((r) => r.recommendation)
    };
};

// ── OpenAI ────────────────────────────────────────────────────────────────────

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const systemPrompt = `
You are an AI spending audit expert. A user has submitted their AI tool subscriptions, team size, and primary use case.

Your job is to analyze their current spending and return a JSON object with optimization recommendations.

You will receive:
- selected_plans: array of objects like { model, plan, price_monthly }
- team_size: number of people in the team
- primary_use: array of use cases like ["coding", "writing", "research"]

You must return ONLY a valid JSON object — no explanation, no markdown, no backticks. Just raw JSON.

The JSON must follow this exact structure:
{
  "score": <number — negative means overspending, positive means efficient. e.g. -19 means 19% overspend>,
  "teamSize": <number from team_size input>,
  "useCase": <string — human readable version of primary_use array e.g. "Coding & Research">,
  "models": <array of model name strings from selected_plans>,
  "modelAnalysis": [
    {
      "name": <model name string>,
      "currentPlan": <current plan name from selected_plans>,
      "suggestedPlan": <better plan name you recommend based on team size and use case>,
      "accuracy": <number 0-100 — how accurate this model is for the given use case>,
      "speed": <number 0-100 — how fast this model responds>,
      "cost": <number 0-100 — cost efficiency score, higher means better value>,
      "note": <one sentence about this model's strengths for the given use case>,
      "currentPrice": <monthly price of current plan in USD>,
      "suggestedPrice": <monthly price of suggested plan in USD>,
      "currentPerformance": <number 0-100 — performance score of current plan>,
      "suggestedPerformance": <number 0-100 — performance score of suggested plan>,
      "comparisonNote": <one sentence explaining why the suggested plan is better for this team>
    }
  ],
  "summary": <2-3 sentence executive summary of the overall audit findings and recommendations>,
  "recommendations": <array of 3 short actionable strings starting with a relevant emoji>
}

Rules:
- score must be a negative number if the team is overspending, positive if well optimized
- suggestedPlan must be a real plan that actually exists for that model
- suggestedPrice must be the real price of the suggestedPlan
- currentPrice must match the price_monthly from selected_plans
- base all suggestions on the team_size and primary_use provided
- if team_size is small (under 10) suggest lower tier plans
- if team_size is large (over 50) enterprise plans may be justified
- for coding use case prioritize Claude and GitHub Copilot recommendations
- for writing use case prioritize ChatGPT and Claude recommendations
- for research use case prioritize Gemini and Perplexity recommendations
- ONLY return the JSON object, nothing else
`;

export const plan_Data = async (req, res) => {
    const { selected_plans, primary_use, team_size } = req.body;

    try {
        const aiResponse = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{
                role: "user",
                content: `
            Selected Plans: ${JSON.stringify(selected_plans)}
            Team Size: ${team_size}
            Primary Use: ${JSON.stringify(primary_use)}
        `
            }]
        });

        const result = JSON.parse(aiResponse.content[0].text);

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