const FinalPage = () => {

    const data = {
        score: -19,
        teamSize: 12,
        useCase: "Coding & Research",
        models: ["GPT-4", "Claude Sonnet 4", "Gemini Pro"],
        modelAnalysis: [
            {
                name: "GPT-4",
                currentPlan: "Team",
                suggestedPlan: "Pro",
                accuracy: 92,
                speed: 78,
                cost: 65,
                note: "Excellent for complex reasoning tasks with high accuracy on technical documentation.",
                currentPrice: 30,
                suggestedPrice: 20,
                currentPerformance: 78,
                suggestedPerformance: 74,
                comparisonNote: "Downgrading from Team to Pro saves $10/seat/mo with only a 4% performance drop — worth it for teams under 15."
            },
            {
                name: "Claude Sonnet 4",
                currentPlan: "Max 20x",
                suggestedPlan: "Pro",
                accuracy: 95,
                speed: 88,
                cost: 72,
                note: "Best performance on code generation and analysis with strong safety features.",
                currentPrice: 200,
                suggestedPrice: 20,
                currentPerformance: 95,
                suggestedPerformance: 85,
                comparisonNote: "Max 20x is overkill for most teams. Pro gives 85% of the performance at 10% of the cost."
            },
            {
                name: "Gemini Pro",
                currentPlan: "Ultra",
                suggestedPlan: "Pro",
                accuracy: 80,
                speed: 92,
                cost: 95,
                note: "Optimal for cost efficiency and speed with strong multilingual support.",
                currentPrice: 249,
                suggestedPrice: 19.99,
                currentPerformance: 88,
                suggestedPerformance: 80,
                comparisonNote: "Ultra plan features are underutilised for coding/research teams. Pro handles 90% of the same tasks."
            },
        ],
        summary: "Based on comprehensive evaluation across multiple dimensions, the audit reveals your team is currently spending more than the optimal benchmark for your use case. Rebalancing seat allocation and downgrading underutilised enterprise tiers could recover the overspend.",
        recommendations: [
            "💡 Consolidate seats",
            "💡 Downgrade idle plans",
            "💡 Switch heavy tasks to Gemini"
        ]
    };

    const isPositive = data.score > 0;

    return (
        <div className="min-h-screen bg-[#f5f5f0] flex justify-center py-10 px-4">
            <div className="w-full max-w-[900px] flex flex-col gap-5">

                {/* ── Section 1: Score ── */}
                <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8 flex gap-6 items-stretch">
                    <div className={`${isPositive ? "bg-green-100 border-green-300" : "bg-[#fcf5cc] border-amber-300"} border rounded-2xl p-6 flex flex-col justify-center items-center min-w-[200px]`}>
                        <div className={`text-8xl font-extrabold leading-none ${isPositive ? "text-green-600" : "text-amber-500"}`}>
                            {data.score > 0 ? `+${data.score}` : data.score}%
                        </div>
                        <div className="text-xs text-[#888] mt-2 font-medium text-center">Overall Spend Score</div>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                        <div>
                            <div className="text-xs text-[#999] font-medium uppercase tracking-widest mb-1">Audit Summary</div>
                            <div className="text-xl font-bold text-[#111] leading-snug">
                                {isPositive
                                    ? "You're spending efficiently — well optimized."
                                    : `You're spending ${Math.abs(data.score)}% more than needed for your team size.`
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <div className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                👥 {data.teamSize} members
                            </div>
                            <div className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                🎯 {data.useCase}
                            </div>
                            {data.models.map((m) => (
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
                        {data.modelAnalysis.map((m) => (
                            <div key={m.name} className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-2xl p-5">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="font-bold text-[#111] text-sm">{m.name}</div>
                                            <div className="bg-white border border-[#e5e5e0] rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-[#555]">
                                                {m.currentPlan}
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#888] leading-relaxed">{m.note}</div>
                                    </div>
                                    <div className="flex gap-4 flex-shrink-0">
                                        {[
                                            { label: "Accuracy", val: m.accuracy },
                                            { label: "Speed", val: m.speed },
                                            { label: "Cost Eff.", val: m.cost },
                                        ].map((metric) => (
                                            <div key={metric.label} className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] text-[#999] font-medium">{metric.label}</div>
                                                <div className="w-2 h-16 bg-[#e5e5e0] rounded-full relative overflow-hidden">
                                                    <div
                                                        className="absolute bottom-0 w-full bg-blue-500 rounded-full"
                                                        style={{ height: `${metric.val}%` }}
                                                    />
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

                    {/* Legend */}
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
                        {data.modelAnalysis.map((m) => (
                            <div key={m.name} className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-2xl p-5">

                                {/* Model header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="font-bold text-[#111] text-sm">{m.name}</div>
                                    <div className="text-[10px] text-[#999]">
                                        <span className="text-red-400 font-semibold">{m.currentPlan}</span>
                                        <span className="mx-1">→</span>
                                        <span className="text-green-600 font-semibold">{m.suggestedPlan}</span>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-end">

                                    {/* Graph 1 — Performance */}
                                    <div className="flex-1">
                                        <div className="text-[10px] text-[#999] font-medium mb-2 uppercase tracking-wider">Performance</div>
                                        <div className="flex items-end gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-red-400">{m.currentPerformance}%</div>
                                                <div
                                                    className="w-10 bg-red-400 rounded-t-lg"
                                                    style={{ height: `${m.currentPerformance * 1.2}px` }}
                                                />
                                                <div className="text-[9px] text-[#999]">{m.currentPlan}</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-green-600">{m.suggestedPerformance}%</div>
                                                <div
                                                    className="w-10 bg-green-500 rounded-t-lg"
                                                    style={{ height: `${m.suggestedPerformance * 1.2}px` }}
                                                />
                                                <div className="text-[9px] text-[#999]">{m.suggestedPlan}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px bg-[#e5e5e0] self-stretch" />

                                    {/* Graph 2 — Price */}
                                    <div className="flex-1">
                                        <div className="text-[10px] text-[#999] font-medium mb-2 uppercase tracking-wider">Price / mo</div>
                                        <div className="flex items-end gap-3">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-red-400">${m.currentPrice}</div>
                                                <div
                                                    className="w-10 bg-red-400 rounded-t-lg"
                                                    style={{ height: `${Math.min(m.currentPrice * 0.6, 140)}px` }}
                                                />
                                                <div className="text-[9px] text-[#999]">{m.currentPlan}</div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="text-[10px] font-bold text-green-600">${m.suggestedPrice}</div>
                                                <div
                                                    className="w-10 bg-green-500 rounded-t-lg"
                                                    style={{ height: `${Math.min(m.suggestedPrice * 0.6, 140)}px` }}
                                                />
                                                <div className="text-[9px] text-[#999]">{m.suggestedPlan}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px bg-[#e5e5e0] self-stretch" />

                                    {/* Description */}
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
                    <p className="text-sm text-[#555] leading-relaxed">{data.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {data.recommendations.map((r) => (
                            <div key={r} className="bg-white border border-[#e5e5e0] rounded-full px-4 py-1.5 text-xs font-semibold text-[#555]">
                                {r}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FinalPage;