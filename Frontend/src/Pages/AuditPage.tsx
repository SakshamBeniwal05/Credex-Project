import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_data_store } from "../store/api_data";
import { useForm } from "react-hook-form";
import PricingCard from "../components/ui/Pricing_Card";
import type { AuditFormData, Model, Plan } from "../types";

const AuditPage = () => {
    const navigate = useNavigate();
    const purpose: string[] = ["Coding", "Writing", "Research"];

    const [status, setStatus] = useState<"idle" | "loading" | "error" | "retry">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const saved = JSON.parse(localStorage.getItem("selected_plans") || "[]");
    const saved_team_size = localStorage.getItem("team_size") || "";
    const saved_primary_use = JSON.parse(localStorage.getItem("primary_use") || "[]");

    const { models, checkmodels, auditor } = api_data_store();
    const { register, handleSubmit, watch } = useForm<AuditFormData>({
        defaultValues: {
            selected_plans: saved,
            team_size: saved_team_size,
            primary_use: saved_primary_use
        }
    });

    const selected = watch("selected_plans");
    const team_size = watch("team_size");
    const primary_use = watch("primary_use");

    useEffect(() => {
        checkmodels();
    }, [checkmodels]);

    useEffect(() => {
        if (selected) localStorage.setItem("selected_plans", JSON.stringify(selected));
        if (team_size) localStorage.setItem("team_size", String(team_size));
        if (primary_use) localStorage.setItem("primary_use", JSON.stringify(primary_use));
    }, [selected, team_size, primary_use]);

    const onSubmit = async (data: AuditFormData) => {
        // Strip any plans with non-numeric prices (e.g. Enterprise "Custom" plans)
        const cleanedPlans = (data.selected_plans ?? []).filter((p: any) => {
            const parsed = typeof p === "string" ? JSON.parse(p) : p;
            return typeof parsed.price_monthly === "number" && !isNaN(parsed.price_monthly);
        });
        data = { ...data, selected_plans: cleanedPlans };

        setStatus("loading");
        setErrorMsg("");
        try {
            const auditId = await auditor(data);
            if (auditId) {
                navigate(`/Result/${auditId}`);
            } else {
                setStatus("error");
                setErrorMsg("This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.");
            }
        } catch (err: any) {
            if (err?.status === 503 || err?.message?.includes("503")) {
                setStatus("retry");
                setErrorMsg("AI is too busy right now. Please retry in a moment.");
            } else if (err?.status === 429) {
                setStatus("retry");
                setErrorMsg("Rate limit reached. Please wait a moment and retry.");
            } else {
                setStatus("error");
                setErrorMsg(err?.message || "An unexpected error occurred.");
            }
        }
    };

    // ── Loading screen ──
    if (status === "loading") return (
        <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-[#e5e5e0] border-t-amber-400 rounded-full animate-spin" />
                <div className="text-lg font-bold text-[#111]">Preparing your audit...</div>
                <div className="text-sm text-[#999] text-center max-w-xs">
                    We're analyzing your AI subscriptions and calculating optimization opportunities.
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-64">
                {["Analyzing selected plans", "Calculating optimal spend", "Generating recommendations"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#fcf5cc] border border-amber-300 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
                        </div>
                        <div className="text-xs text-[#888]">{step}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ── Retry screen (503 / rate limit) ──
    if (status === "retry") return (
        <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-5">
            <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8 max-w-sm w-full flex flex-col items-center gap-4 text-center">
                <div className="text-4xl">⏳</div>
                <div className="text-lg font-bold text-[#111]">AI is a little busy</div>
                <div className="text-sm text-[#888]">{errorMsg}</div>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setErrorMsg("");
                    }}
                    className="bg-[#fcf5cc] hover:bg-[#e6e0bb] border border-[#e5e5e0] px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 w-full"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    // ── Error screen ──
    if (status === "error") return (
        <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-5">
            <div className="bg-white border border-[#e5e5e0] rounded-2xl p-8 max-w-sm w-full flex flex-col items-center gap-4 text-center">
                <div className="text-4xl">❌</div>
                <div className="text-lg font-bold text-[#111]">Something went wrong</div>
                <div className="text-sm text-[#888]">{errorMsg}</div>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setErrorMsg("");
                    }}
                    className="bg-[#fcf5cc] hover:bg-[#e6e0bb] border border-[#e5e5e0] px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 w-full"
                >
                    Go back & retry
                </button>
            </div>
        </div>
    );

    // ── Main form ──
    return (
        <div className="h-screen flex justify-center">
            <div className="w-2/3 my-5">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* ── Section 1: Models ── */}
                    <div className="text-lg font-bold text-[#111] mb-3">
                        Tools you're subscribed to
                    </div>
                    {models?.map((i: Model) => (
                        <div key={i.id} className="flex gap-10 p-2 items-center">
                            <div className="flex gap-2 flex-col bg-[#fcf5cc] w-28 h-28 items-center justify-center p-2 rounded-2xl text-center">
                                <div>
                                    <img
                                        src={i.image}
                                        alt={i.product}
                                        className={`${i.product === "OpenAI API" || i.product === "ChatGPT" ? "w-16" : "w-10"}`}
                                    />
                                </div>
                                <div>{i.product}</div>
                            </div>
                            <div className="flex gap-5 items-center overflow-x-scroll">
                                {i.plans
                                    ?.filter((j: Plan) => typeof j.price_monthly === "number")
                                    .map((j: Plan) => (
                                        <div key={j.id} className="relative">
                                            <input
                                                type="checkbox"
                                                className="peer hidden"
                                                value={JSON.stringify({ model: i.product, plan: j.name, price_monthly: j.price_monthly })}
                                                id={j.id}
                                                {...register("selected_plans")}
                                            />
                                            <label
                                                className="cursor-pointer peer-checked:text-white transition-all duration-300 peer-checked:bg-blue-600 block bg-[#fcf5cc] rounded-2xl"
                                                htmlFor={j.id}
                                            >
                                                <PricingCard data={j} />
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}

                    {/* ── Section 2: Team Size ── */}
                    <div className="text-lg font-bold text-[#111] mb-3 mt-8">
                        How big is your team?
                    </div>
                    <div>
                        <input
                            type="number"
                            min={1}
                            placeholder="Team member count"
                            {...register("team_size")}
                            className="bg-[#fcf5cc] border border-[#e5e5e0] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400"
                        />
                    </div>

                    {/* ── Section 3: Use Case ── */}
                    <div className="text-lg font-bold text-[#111] mb-3 mt-8">
                        What do you primarily use AI for?
                    </div>
                    <div className="flex gap-2">
                        {purpose.map((use: string) => (
                            <div key={use}>
                                <input
                                    type="checkbox"
                                    id={use}
                                    value={use}
                                    className="peer hidden"
                                    {...register("primary_use")}
                                />
                                <label htmlFor={use} className="px-4 py-2.5 bg-[#fcf5cc] border border-[#e5e5e0] rounded-xl text-sm font-medium peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all duration-200 cursor-pointer">
                                    {use}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* ── Submit ── */}
                    <div className="flex items-center justify-center p-5">
                        <button
                            className="block bg-[#fcf5cc] hover:bg-[#e6e0bb] w-76 p-2 rounded-3xl font-bold active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={status !== "idle"}
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AuditPage;