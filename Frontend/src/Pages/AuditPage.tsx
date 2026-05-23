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

    const resolvePlanPrice = (j: Plan): number | string => {
        if (typeof j.price_monthly === "number") return j.price_monthly;
        if (j.input_per_1M != null && j.output_per_1M != null) {
            return `$${j.input_per_1M} In / $${j.output_per_1M} Out`;
        }
        return "Custom";
    };

    const onSubmit = async (data: AuditFormData) => {
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

    // ── SCREEN A: STATIONERY SCANNING LOADER ──
    if (status === "loading") return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-6 selection:bg-[#2563eb] selection:text-white text-black font-sans">
            {/* Blueprint Blueprint Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            
            <div className="bg-[#fcf5cc] border-4 border-black p-10 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 text-center">
                <div className="w-16 h-16 border-4 border-black border-t-[#2563eb] rounded-none mx-auto animate-spin mb-6" />
                
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">RUNNING ANALYSIS</h2>
                <p className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-8">
                    Evaluating pricing vectors against resource matrix...
                </p>

                <div className="flex flex-col gap-3 text-left border-t-2 border-black pt-6 font-mono">
                    {["Analyzing selected plans", "Calculating optimal spend", "Generating recommendations"].map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-black bg-white flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-[#2563eb] animate-ping" style={{ animationDelay: `${i * 250}ms` }} />
                            </div>
                            <div className="text-xs font-bold uppercase">{step}...</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // ── SCREEN B: RETRY INDEX PANEL ──
    if (status === "retry") return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-6 text-black font-sans">
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            
            <div className="bg-[#fcf5cc] border-4 border-black p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <span className="inline-block bg-[#fbbf24] border-2 border-black text-xs font-mono font-bold px-3 py-1 uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    STATUS: 503 BUSY
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">SYSTEM INK OVERFLOW</h3>
                <p className="text-sm font-medium mb-6 leading-relaxed bg-white border-2 border-black p-3 font-mono">{errorMsg}</p>
                
                <button
                    onClick={() => { setStatus("idle"); setErrorMsg(""); }}
                    className="w-full bg-[#fbbf24] text-black border-2 border-black font-black uppercase tracking-wider py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
                >
                    Recalibrate & Retry
                </button>
            </div>
        </div>
    );

    // ── SCREEN C: CORE SYSTEM ERROR OVERLAY ──
    if (status === "error") return (
        <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-6 text-black font-sans">
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            
            <div className="bg-[#fcf5cc] border-4 border-black p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <span className="inline-block bg-red-500 text-white border-2 border-black text-xs font-mono font-bold px-3 py-1 uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    FATAL CORRUPTION
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">COMPILATION FAULT</h3>
                <p className="text-sm font-medium mb-6 leading-relaxed bg-white border-2 border-black p-3 font-mono text-red-600">{errorMsg}</p>
                
                <button
                    onClick={() => { setStatus("idle"); setErrorMsg(""); }}
                    className="w-full bg-black text-white border-2 border-black font-black uppercase tracking-wider py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
                >
                    Reset Input Matrix
                </button>
            </div>
        </div>
    );

    // ── MAIN CORE INTERACTIVE AUDIT DOCUMENT ──
    return (
        <div className="min-h-screen bg-white text-black font-sans relative selection:bg-[#2563eb] selection:text-white antialiased pb-20">
            {/* Structural Structural Graph Sheet Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
                
                {/* File Header Block */}
                <div className="border-b-4 border-black pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <span className="bg-[#fbbf24] border-2 border-black text-xs font-mono font-black px-2.5 py-0.5 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            FORM // AUDIT_CORE_v1.0
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">
                            Infrastructure Ledger
                        </h1>
                    </div>
                    <p className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-wider">
                        Date: May 2026 // Location: Local Storage Cache
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                    {/* ── SECTION 1: SUBSCRIPTION INVENTORY MATRIX ── */}
                    <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
                            <span className="bg-black text-white font-mono text-sm w-7 h-7 flex items-center justify-center font-bold">01</span>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                                Subscription Inventory Active Matrix
                            </h2>
                        </div>
                        
                        <div className="space-y-8">
                            {models?.map((i: Model) => (
                                <div key={i.id} className="flex flex-col lg:flex-row gap-6 border-b-2 border-black border-dashed pb-8 last:border-b-0 last:pb-0 items-start lg:items-center">
                                    
                                    {/* Asset Node Label */}
                                    <div className="bg-[#fcf5cc] border-2 border-black w-full lg:w-36 h-24 flex flex-row lg:flex-col gap-3 items-center justify-center p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                        <img
                                            src={i.image}
                                            alt={i.product}
                                            className={`object-contain ${i.product === "OpenAI API" || i.product === "ChatGPT" ? "w-12 h-12" : "w-8 h-8"}`}
                                        />
                                        <div className="font-black uppercase text-xs tracking-tight text-center truncate w-full">
                                            {i.product}
                                        </div>
                                    </div>
                                    
                                    {/* Dynamic Horizontally Swiping Radio Grid */}
                                    <div className="flex gap-4 items-center overflow-x-auto w-full pb-3 scrollbar-thin">
                                        {i.plans?.map((j: Plan) => (
                                            <div key={j.id} className="relative shrink-0">
                                                <input
                                                    type="checkbox"
                                                    className="peer hidden"
                                                    value={JSON.stringify({
                                                        model: i.product,
                                                        plan: j.name,
                                                        price_monthly: resolvePlanPrice(j)
                                                    })}
                                                    id={j.id}
                                                    {...register("selected_plans")}
                                                />
                                                <label
                                                    className="cursor-pointer block transition-all duration-200 bg-[#fcf5cc] border-2 border-black p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] peer-checked:bg-[#2563eb] peer-checked:text-white peer-checked:shadow-none peer-checked:translate-x-[2px] peer-checked:translate-y-[2px]"
                                                    htmlFor={j.id}
                                                >
                                                    <div className="bg-white text-black p-3 border border-black font-medium text-xs peer-checked:border-white">
                                                        <PricingCard data={j} />
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>


                    {/* ── TWO-COLUMN GRID ACCENT PIPELINE ── */}
                    <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* ── SECTION 2: TEAM SCALING PARAMETERS ── */}
                        <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
                                    <span className="bg-black text-white font-mono text-sm w-7 h-7 flex items-center justify-center font-bold">02</span>
                                    <h2 className="text-xl font-black uppercase tracking-tight">
                                        Human Resource Scope
                                    </h2>
                                </div>
                                <p className="text-xs font-mono text-neutral-600 uppercase mb-4 leading-relaxed">
                                    Declare active seat volume allocations to safely normalize concurrent licensing layers.
                                </p>
                            </div>
                            <div className="relative mt-4">
                                <input
                                    type="number"
                                    min={1}
                                    placeholder="Seat Count Instance"
                                    {...register("team_size")}
                                    className="w-full bg-[#fcf5cc] border-2 border-black font-mono font-bold px-4 py-3 text-sm outline-none shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,0.1)] focus:bg-white focus:border-[#2563eb] transition-all"
                                />
                                <span className="absolute right-3 top-3.5 font-mono text-xs text-neutral-400 pointer-events-none">SEATS</span>
                            </div>
                        </div>

                        {/* ── SECTION 3: FUNCTIONAL LOAD UTILIZATION ── */}
                        <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
                                <span className="bg-black text-white font-mono text-sm w-7 h-7 flex items-center justify-center font-bold">03</span>
                                <h2 className="text-xl font-black uppercase tracking-tight">
                                    Primary Vector Focus
                                    </h2>
                            </div>
                            <p className="text-xs font-mono text-neutral-600 uppercase mb-6 leading-relaxed">
                                Isolate operational usage context below to focus model re-routing suggestions.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {purpose.map((use: string) => (
                                    <div key={use} className="relative">
                                        <input
                                            type="checkbox"
                                            id={use}
                                            value={use}
                                            className="peer hidden"
                                            {...register("primary_use")}
                                        />
                                        <label 
                                            htmlFor={use} 
                                            className="inline-block px-5 py-2.5 bg-[#fcf5cc] border-2 border-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] peer-checked:bg-[#2563eb] peer-checked:text-white peer-checked:shadow-none peer-checked:translate-x-[2px] peer-checked:translate-y-[2px]"
                                        >
                                            [{use}]
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ── TERMINAL SUBMIT ENGAGEMENT BAR ── */}
                    <div className="border-t-4 border-black pt-8 flex justify-center">
                        <button
                            className="bg-[#fbbf24] text-black border-4 border-black font-black uppercase text-xl tracking-wider py-4 px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:bg-[#fcf5cc] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto"
                            type="submit"
                            disabled={status !== "idle"}
                        >
                            EXECUTE SUBSCRIPTION AUDIT
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AuditPage;