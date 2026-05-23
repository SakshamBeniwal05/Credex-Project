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

    // ── GUARD: STATIONERY LOADING STATE ──
    if (!result) return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-6 text-black font-sans">
            <div className="bg-[#fcf5cc] border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center font-mono">
                <div className="w-8 h-8 border-4 border-black border-t-[#2563eb] animate-spin mx-auto mb-4" />
                <div className="text-xs font-black uppercase tracking-widest">LOADING AUDIT RESULT METRICS...</div>
            </div>
        </div>
    );

    const printdoc = () => {
        window.print();
    };

    // ── DATA SHAPE NORMALIZATION ──
    const data = (result?.result ?? result) as Partial<AuditResult>;

    const models: string[] = data?.models ?? [];
    const modelAnalysis: ModelAnalysis[] = data?.modelAnalysis ?? [];
    const recommendations: string[] = data?.recommendations ?? [];

    const getTeamSize = (): number | undefined => data?.teamSize ?? (data?.team_size as number | undefined);
    const getUseCase = (): string | undefined => data?.useCase ?? data?.use_case;

    const score = data?.score ?? 0;

    // Localized Brutalist Color Tokens
    const scoreColor =
        score >= 80 ? "text-neutral-950" :
            score >= 60 ? "text-neutral-950" :
                score >= 40 ? "text-neutral-950" :
                    score >= 20 ? "text-neutral-950" : "text-neutral-950";

    const scoreBg =
        score >= 80 ? "bg-emerald-400" :
            score >= 60 ? "bg-cyan-400" :
                score >= 40 ? "bg-[#fbbf24]" :
                    score >= 20 ? "bg-orange-400" : "bg-rose-500";

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
        <div className="min-h-screen bg-transparent text-black font-sans relative selection:bg-[#2563eb] selection:text-white antialiased py-12 px-4">
            {/* Structural Graph Blueprint Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none print:hidden"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="w-full max-w-[900px] mx-auto flex flex-col gap-8 relative z-10">

                {/* ── PROMOTIONAL ENGAGEMENT BANNER ── */}
                {data?.above500 && (
                    <div className="bg-[#fcf5cc] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 bg-black text-white px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest">
                            LEAVING FUNDS ON TABLE
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <div className="font-black text-xl uppercase tracking-tight">
                                Credex can automate your AI spend optimization and save you $500+/mo
                            </div>
                            <div className="text-sm font-medium text-neutral-800 leading-relaxed">
                                Let Credex continuously monitor, right-size, and optimize your AI subscriptions — automatically.
                            </div>
                        </div>
                        <Link to="https://credex.rocks/" className="w-full md:w-auto shrink-0 print:hidden">
                            <button className="w-full md:w-auto bg-[#2563eb] text-white border-2 border-black font-black uppercase text-xs tracking-wider px-5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                Capture savings →
                            </button>
                        </Link>
                    </div>
                )}

                {/* ── SECTION 1: MASTER LEDGER REPORT INDEX & SCORE ── */}
                <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 items-stretch">

                    {/* Left Score Box */}
                    <div className={`${scoreBg} border-2 border-black p-6 flex flex-col justify-center items-center min-w-[200px] gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center`}>
                        <div className={`text-7xl font-black tracking-tighter leading-none ${scoreColor}`}>
                            {score}
                        </div>
                        <div className="bg-white border-2 border-black font-mono text-xs font-black uppercase px-2.5 py-0.5 mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {scoreLabel}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-black mt-2 font-bold opacity-80">
                            SPEND HEALTH INDEX
                        </div>
                    </div>

                    {/* Right Informational Metadata block */}
                    <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                            <div className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">
                                AUDIT SUMMARY REPORT //
                            </div>
                            <div className="text-2xl font-black uppercase tracking-tight leading-snug">
                                {scoreSummary}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <div className="bg-[#fcf5cc] border-2 border-black px-3 py-1 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                👥 {getTeamSize()} Members Allocation
                            </div>
                            <div className="bg-[#fcf5cc] border-2 border-black px-3 py-1 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                🎯 Use-Case: {getUseCase()}
                            </div>
                            {models.map((m: string) => (
                                <div key={m} className="bg-white border-2 border-black px-3 py-1 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    📦 {m}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── SECTION 2: VECTOR PERFORMANCE BREAKDOWN MATRIX ── */}
                <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">
                        ANALYTICAL BREAKDOWN MATRIX //
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-1">
                        Model Performance Analysis
                    </h2>
                    <p className="text-xs font-mono text-neutral-600 uppercase mb-6 border-b-2 border-black pb-4 border-dashed">
                        Isolated validation parameters mapped against active subscription metrics
                    </p>

                    <div className="flex flex-col gap-6">
                        {modelAnalysis.map((m: ModelAnalysis) => (
                            <div key={m.name} className="bg-[#fcf5cc] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-start justify-between gap-6 flex-wrap">

                                    <div className="flex-1 min-w-[250px]">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <div className="font-black text-xl uppercase tracking-tight">{m.name}</div>
                                            <div className="bg-white border-2 border-black px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                Active: {m.currentPlan ?? m.current_plan}
                                            </div>
                                        </div>
                                        <p className="text-xs font-medium text-neutral-800 leading-relaxed bg-white/60 p-3 border border-black/20 font-mono">
                                            {m.note}
                                        </p>
                                    </div>

                                    {/* Geometric Performance Bars */}
                                    <div className="flex gap-6 shrink-0 pt-2 mx-auto lg:mx-0">
                                        {[
                                            { label: "ACCURACY", val: m.accuracy },
                                            { label: "SPEED", val: m.speed },
                                            { label: "COST EFF.", val: m.cost },
                                        ].map((metric: PerformanceMetric) => (
                                            <div key={metric.label} className="flex flex-col items-center gap-1.5 w-14">
                                                <div className="text-[9px] font-mono font-black tracking-tighter text-neutral-500">{metric.label}</div>
                                                <div className="w-4 h-16 bg-white border-2 border-black relative overflow-hidden shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    <div className="absolute bottom-0 w-full bg-[#2563eb] border-t border-black" style={{ height: `${metric.val}%` }} />
                                                </div>
                                                <div className="text-[10px] font-mono font-black">{metric.val}%</div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 3: BRUTALIST GRID COMPARISON GRAPH CHART ── */}
                <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">
                        OPTIMIZATION OVERLAY COMPARISON //
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-1">
                        Performance & Price Comparison
                    </h2>
                    <p className="text-xs font-mono text-neutral-600 uppercase mb-4 border-b-2 border-black pb-4 border-dashed">
                        Current licensing boundaries measured against systemic alternate nodes
                    </p>

                    <div className="flex gap-4 mb-6 font-mono text-xs font-black">
                        <div className="flex items-center gap-2 bg-rose-200 border border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-3 h-3 bg-rose-500 border border-black" />
                            <span className="uppercase">CURRENT SYSTEM PLAN</span>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-200 border border-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-3 h-3 bg-emerald-400 border border-black" />
                            <span className="uppercase">SUGGESTED MATRIX PLAN</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {modelAnalysis.map((m: ModelAnalysis) => (
                            <div key={m.name} className="bg-[#fcf5cc] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center gap-2 mb-4 border-b border-black pb-2 border-dashed flex-wrap">
                                    <div className="font-black text-base uppercase tracking-tight">{m.name}</div>
                                    <div className="font-mono text-[10px] font-black uppercase bg-white border border-black px-1.5">
                                        <span className="text-rose-600">{m.currentPlan ?? m.current_plan}</span>
                                        <span className="mx-1">→</span>
                                        <span className="text-emerald-600">{m.suggestedPlan ?? m.suggested_plan}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-6 items-stretch">

                                    {/* Performance Dual Columns */}
                                    <div className="flex-1 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                                        <div className="text-[9px] font-mono font-black text-neutral-500 uppercase tracking-wider mb-2">INTELLIGENCE VOLUME</div>
                                        <div className="flex items-end gap-4 h-24 pt-4 justify-around">
                                            <div className="flex flex-col items-center gap-1 w-12">
                                                <div className="text-[10px] font-mono font-black text-rose-600">{(m.currentPerformance ?? m.currentPerformance)}%</div>
                                                <div className="w-8 bg-rose-400 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" style={{ height: `${Math.max((m.currentPerformance ?? m.currentPerformance) * 0.7, 8)}px` }} />
                                                <div className="text-[8px] font-mono text-neutral-500 truncate w-full text-center uppercase">CURRENT</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 w-12">
                                                <div className="text-[10px] font-mono font-black text-emerald-600">{m.suggestedPerformance}%</div>
                                                <div className="w-8 bg-emerald-400 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" style={{ height: `${Math.max(m.suggestedPerformance * 0.7, 8)}px` }} />
                                                <div className="text-[8px] font-mono text-neutral-500 truncate w-full text-center uppercase">SUGGESTED</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Dual Columns */}
                                    <div className="flex-1 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                                        <div className="text-[9px] font-mono font-black text-neutral-500 uppercase tracking-wider mb-2">RUN RATE OVERHEAD / MO</div>
                                        <div className="flex items-end gap-4 h-24 pt-4 justify-around">
                                            <div className="flex flex-col items-center gap-1 w-12">
                                                <div className="text-[10px] font-mono font-black text-rose-600">${m.currentPrice}</div>
                                                <div className="w-8 bg-rose-400 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" style={{ height: `${Math.max(Math.min(m.currentPrice * 0.5, 75), 8)}px` }} />
                                                <div className="text-[8px] font-mono text-neutral-500 truncate w-full text-center uppercase">CURRENT</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 w-12">
                                                <div className="text-[10px] font-mono font-black text-emerald-600">${m.suggestedPrice}</div>
                                                <div className="w-8 bg-emerald-400 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" style={{ height: `${Math.max(Math.min(m.suggestedPrice * 0.5, 75), 8)}px` }} />
                                                <div className="text-[8px] font-mono text-neutral-500 truncate w-full text-center uppercase">SUGGESTED</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actionable Insights Text */}
                                    <div className="flex-1 bg-white p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center">
                                        <p className="text-xs font-mono font-bold text-neutral-800 leading-relaxed">
                                            {m.comparisonNote}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 4: SYSTEM EXECUTIVE SUMMARY LEDGER DOCUMENT ── */}
                <div className="bg-[#fcf5cc] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                    <div className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">
                        FORMAL SYSTEM CLOSURE //
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                        Executive Summary
                    </h2>
                    <p className="text-sm font-medium leading-relaxed bg-white border-2 border-black p-4 shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.05)] font-mono">
                        {data?.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {recommendations.map((r: string) => (
                            <div key={r} className="bg-black text-white border border-black px-3 py-1 text-xs font-mono font-bold uppercase tracking-wide">
                                🔍 {r}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── TERMINAL PRINT/OUTPUT ENVELOPE CONTROLS ── */}
                <div className="flex items-center justify-center p-5 border-t-4 border-black border-dashed print:hidden">
                    <button
                        onClick={printdoc}
                        type="button"
                        className="w-full md:w-76 bg-[#fbbf24] text-black border-4 border-black font-black uppercase text-lg tracking-wider py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:bg-[#fcf5cc] transition-all"
                    >
                        Print Ledger Manifest
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FinalPage;