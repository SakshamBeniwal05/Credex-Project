import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api_data_store } from "../store/api_data";
import type { AuditResult, ModelAnalysis, PerformanceMetric } from "../types";

const FinalPage = () => {
    const { result, fetcher } = api_data_store();
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        if (slug) fetcher(slug);
    }, [slug, fetcher]);

    // ── guard ──
    if (!result) return (
        <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
            <div className="text-sm text-[#999]">Loading audit result...</div>
        </div>
    );

    const printdoc = () => {
        window.print()
    }

    // ── handle both shapes ──
    const data = (result?.result ?? result) as Partial<AuditResult>;

    // ── safety checks ──
    const models: string[] = data?.models ?? [];
    const modelAnalysis: ModelAnalysis[] = data?.modelAnalysis ?? [];
    const recommendations: string[] = data?.recommendations ?? [];

    // ── helper function for alternative keys ──
    const getTeamSize = (): number | undefined => data?.teamSize ?? (data?.team_size as number | undefined);
    const getUseCase = (): string | undefined => data?.useCase ?? data?.use_case;

    const score = data?.score ?? 0;

    const scoreColor =
        score >= 80 ? "text-green-600" :
            score >= 60 ? "text-blue-500" :
                score >= 40 ? "text-amber-500" :
                    score >= 20 ? "text-orange-500" : "text-red-500";

    const scoreBg =
        score >= 80 ? "bg-green-100 border-green-300" :
            score >= 60 ? "bg-blue-50 border-blue-200" :
                score >= 40 ? "bg-[#fcf5cc] border-amber-300" :
                    score >= 20 ? "bg-orange-50 border-orange-300" : "bg-red-50 border-red-300";

    const scoreLabel =
        score >= 80 ? "Optimal" :
            score >= 60 ? "Good" :
                score >= 40 ? "Fair" :
                    score >= 20 ? "Poor" : "Critical";

    const scoreSummary =
        score >= 80 ? "You're spending efficiently — well optimized." :
            score >= 60 ? "Good spend health — 1–2 easy wins available." :
                score >= 40 ? "Moderate overspend — worth addressing this month." :
                    score >= 20 ? "Significant overspend — action recommended soon." :
                        "Critical waste — immediate action required.";


    return (
        <div className="min-h-screen bg-[#f5f5f0] flex justify-center py-10 px-4">
            <div className="w-full max-w-[900px] flex flex-col gap-5">

                {(data?.above500) && (
                    <div className="bg-[#111] text-white rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-[#999] uppercase tracking-widest font-medium">You're leaving money on the table</div>
                            <div className="font-bold text-lg">Credex can automate your AI spend optimization and save you $500+/mo</div>
                            <div className="text-sm text-[#aaa]">Let Credex continuously monitor, right-size, and optimize your AI subscriptions — automatically.</div>
                        </div>
                        <Link to={"https://credex.rocks/"}>
                            <button className="bg-amber-400 hover:bg-amber-300 text-[#111] font-bold px-6 py-3 rounded-xl text-sm flex-shrink-0 transition-all duration-150 active:scale-95">
                                Capture savings →
                            </button>
                        </Link>
                    </div>
                )}


                {/* ── Section 1: Score ── */}
                <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8 flex gap-6 items-stretch">

                    {/* Score block */}
                    <div className={`${scoreBg} border rounded-2xl p-6 flex flex-col justify-center items-center min-w-[200px] gap-1`}>
                        <div className={`text-8xl font-extrabold leading-none ${scoreColor}`}>
                            {score}
                        </div>
                        <div className={`text-sm font-bold ${scoreColor}`}>{scoreLabel}</div>
                        <div className="text-xs text-[#888] font-medium text-center">Spend Health Score</div>
                    </div>

                    {/* Info block */}
                    <div className="flex flex-col justify-between flex-1">
                        <div>
                            <div className="text-xs text-[#999] font-medium uppercase tracking-widest mb-1">Audit Summary</div>
                            <div className="text-xl font-bold text-[#111] leading-snug">{scoreSummary}</div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                👥 {getTeamSize()} members
                            </div>
                            <div className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                🎯 {getUseCase()}
                            </div>
                            {models.map((m: string) => (
                                <div key={m} className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                    {m}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── Section 2: Model Performance Breakdown ── */}
                <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8">
                    <div className="text-xs text-[#999] uppercase tracking-widest mb-1 font-medium">Breakdown</div>
                    <div className="text-lg font-bold text-[#111] mb-1">Model Performance Analysis</div>
                    <div className="text-xs text-[#999] mb-5">Current plan performance breakdown</div>
                    <div className="flex flex-col gap-4">
                        {modelAnalysis.map((m: ModelAnalysis) => (
                            <div key={m.name} className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-2xl p-5">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="font-bold text-[#111] text-sm">{m.name}</div>
                                            <div className="bg-white border border-[#e5e5e0] rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-[#555]">
                                                {m.currentPlan ?? m.current_plan}
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#888] leading-relaxed">{m.note}</div>
                                    </div>
                                    <div className="flex gap-4 flex-shrink-0">
                                        {[
                                            { label: "Accuracy", val: m.accuracy },
                                            { label: "Speed", val: m.speed },
                                            { label: "Cost Eff.", val: m.cost },
                                        ].map((metric: PerformanceMetric) => (
                                            <div key={metric.label} className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] text-[#999] font-medium">{metric.label}</div>
                                                <div className="w-2 h-16 bg-[#e5e5e0] rounded-full relative overflow-hidden">
                                                    <div className="absolute bottom-0 w-full bg-blue-500 rounded-full" style={{ height: `${metric.val}%` }} />
                                                </div>
                                                <div className="text-[10px] font-bold text-[#111]">{metric.val}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Section 3: Comparison Chart ── */}
                <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8">
                    <div className="text-xs text-[#999] uppercase tracking-widest mb-1 font-medium">Comparison</div>
                    <div className="text-lg font-bold text-[#111] mb-1">Performance & Price Comparison</div>
                    <div className="text-xs text-[#999] mb-6">Current plan vs suggested plan — per model</div>
                    <div className="flex gap-5 mb-6">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-red-400" />
                            <span className="text-xs text-[#888]">Current plan</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-sm bg-green-500" />
                            <span className="text-xs text-[#888]">Suggested plan</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {modelAnalysis.map((m: ModelAnalysis) => (
                            <div key={m.name} className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="font-bold text-[#111] text-sm">{m.name}</div>
                                    <div className="text-[10px] text-[#999]">
                                        <span className="text-red-400 font-semibold">{m.currentPlan ?? m.current_plan}</span>
                                        <span className="mx-1">→</span>
                                        <span className="text-green-600 font-semibold">{m.suggestedPlan ?? m.suggested_plan}</span>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-end">
                                    <div className="flex-1">
                                        <div className="text-[10px] text-[#999] font-medium mb-2 uppercase tracking-wider">Performance</div>
                                        <div className="flex items-end gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-red-400">{m.currentPerformance ?? m.currentPerformance}%</div>
                                                <div className="w-10 bg-red-400 rounded-t-lg" style={{ height: `${(m.currentPerformance ?? m.currentPerformance) * 1.2}px` }} />
                                                <div className="text-[9px] text-[#999]">{m.currentPlan ?? m.current_plan}</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-green-600">{m.suggestedPerformance}%</div>
                                                <div className="w-10 bg-green-500 rounded-t-lg" style={{ height: `${m.suggestedPerformance * 1.2}px` }} />
                                                <div className="text-[9px] text-[#999]">{m.suggestedPlan ?? m.suggested_plan}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-[#e5e5e0] self-stretch" />
                                    <div className="flex-1">
                                        <div className="text-[10px] text-[#999] font-medium mb-2 uppercase tracking-wider">Price / mo</div>
                                        <div className="flex items-end gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-red-400">${m.currentPrice}</div>
                                                <div className="w-10 bg-red-400 rounded-t-lg" style={{ height: `${Math.min(m.currentPrice * 0.6, 140)}px` }} />
                                                <div className="text-[9px] text-[#999]">{m.currentPlan ?? m.current_plan}</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-green-600">${m.suggestedPrice}</div>
                                                <div className="w-10 bg-green-500 rounded-t-lg" style={{ height: `${Math.min(m.suggestedPrice * 0.6, 140)}px` }} />
                                                <div className="text-[9px] text-[#999]">{m.suggestedPlan ?? m.suggested_plan}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-px bg-[#e5e5e0] self-stretch" />
                                    <div className="flex-1 text-xs text-[#888] leading-relaxed self-center">
                                        {m.comparisonNote}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Section 4: Executive Summary ── */}
                <div className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-2xl p-8">
                    <div className="text-xs text-[#999] uppercase tracking-widest mb-1 font-medium">Summary</div>
                    <div className="text-lg font-bold text-[#111] mb-4">Executive Summary</div>
                    <p className="text-sm text-[#555] leading-relaxed">{data?.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {recommendations.map((r: string) => (
                            <div key={r} className="bg-white border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                {r}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center p-5">
                    <button onClick={printdoc} className="block bg-[#fcf5cc] hover:bg-[#e6e0bb] w-76 p-2 rounded-3xl font-bold active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FinalPage;