import { useEffect } from "react";
import { api_data_store } from "../store/api_data.jsx";
import { useForm } from "react-hook-form";
import PricingCard from "../components/ui/Pricing_Card.js";

const AuditPage = () => {
    const { models, checkmodels, auditor } = api_data_store();

    useEffect(() => {
        checkmodels();
    }, []);

    const { register, handleSubmit } = useForm()

    return (
        <div className="h-screen flex justify-center">
            <div className="w-2/3 my-5">
                <form onSubmit={handleSubmit(auditor)} >
                    {models?.map((i: any) => (
                        <div className="flex gap-10 p-2 items-center">
                            <div className="flex gap-2 flex-col bg-[#fcf5cc]  w-28 h-28 items-center justify-center p-2 rounded-2xl text-center">
                                <div><img src={i.image} className={`${i.product == "OpenAI API" || i.product === "ChatGPT" ? "w-16" : "w-10"}`} /></div>
                                <div>{i.product}</div>
                            </div>
                            <div className="flex gap-5 items-center overflow-x-scroll">
                                {i.plans?.map((j: any) => (
                                    <div key={j.id} className="relative">
                                        <input type="checkbox" className="peer hidden" value={JSON.stringify({ model: i.product, plan: j.name, price_monthly: j.price_monthly ?? "Custom" })} id={j.id}  {...register("selected_plans")} />
                                        <label className="cursor-pointer peer-checked:text-white transition-all duration-300 peer-checked:bg-blue-600 block bg-[#fcf5cc]  rounded-2xl" htmlFor={j.id}>
                                            <PricingCard data={j} />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className={`bg-accent w-76 p-2 rounded-3xl font-bold active:scale-95 active:bg-accent/75 disabled:bg-accent/70 disabled:text disabled:scale-100`} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AuditPage;