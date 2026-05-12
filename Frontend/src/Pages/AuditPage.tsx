import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← add this
import { api_data_store } from "../store/api_data.jsx";
import { useForm } from "react-hook-form";
import PricingCard from "../components/ui/Pricing_Card.js";

const AuditPage = () => {

    const navigate = useNavigate(); // ← add this
    const purpose = ["Coding", "Writing", "Research"]

    const saved = JSON.parse(localStorage.getItem("selected_plans") || "[]");
    const saved_team_size = localStorage.getItem("team_size") || "";
    const saved_primary_use = JSON.parse(localStorage.getItem("primary_use") || "[]");

    const { models, checkmodels, auditor } = api_data_store();
    const { register, handleSubmit, watch } = useForm({
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
    }, []);

    useEffect(() => {
        if (selected) localStorage.setItem("selected_plans", JSON.stringify(selected));
        if (team_size) localStorage.setItem("team_size", team_size);
        if (primary_use) localStorage.setItem("primary_use", JSON.stringify(primary_use));
    }, [selected, team_size, primary_use]);

    // ── handle submit → wait for auditor → navigate ──
    const onSubmit = async (data: any) => {
        const auditId = await auditor(data);  // ← wait for api + db
        if (auditId) navigate(`/Result/${auditId}`); // ← then navigate
    };

    return (
        <div className="h-screen flex justify-center">
            <div className="w-2/3 my-5">
                <form onSubmit={handleSubmit(onSubmit)}> {/* ← onSubmit not auditor */}

                    {/* ── Section 1: Models ── */}
                    <div className="text-lg font-bold text-[#111] mb-3">
                        Tools you're subscribed to
                    </div>
                    {models?.map((i: any) => (
                        <div key={i.id} className="flex gap-10 p-2 items-center">
                            <div className="flex gap-2 flex-col bg-[#fcf5cc] w-28 h-28 items-center justify-center p-2 rounded-2xl text-center">
                                <div>
                                    <img src={i.image} className={`${i.product === "OpenAI API" || i.product === "ChatGPT" ? "w-16" : "w-10"}`} />
                                </div>
                                <div>{i.product}</div>
                            </div>
                            <div className="flex gap-5 items-center overflow-x-scroll">
                                {i.plans?.map((j: any) => (
                                    <div key={j.id} className="relative">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            value={JSON.stringify({ model: i.product, plan: j.name, price_monthly: j.price_monthly ?? "Custom" })}
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
                        {purpose.map((use) => (
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
                            className="block bg-[#fcf5cc] hover:bg-[#e6e0bb] w-76 p-2 rounded-3xl font-bold active:scale-95 transition-all duration-150"
                            type="submit"
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