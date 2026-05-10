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
                <form >
                    {models?.map((i:any)=>(
                        <div className="flex gap-10 p-2 items-center">
                            <div className="flex gap-2 flex-col bg-amber-50  w-28 h-28 items-center justify-center p-2 rounded-2xl text-center">
                                <div><img src={i.image} className={`${i.product=="OpenAI API" || i.product === "ChatGPT" ? "w-16" : "w-10"}`} /></div>
                                <div>{i.product}</div>
                            </div>
                            <div className="flex gap-5 items-center overflow-x-scroll">
                                {i.plans?.map((j:any)=>(
                                    <div>
                                        <label htmlFor={j.name}>
                                            <PricingCard data={j}/>
                                        </label>
                                        <input type="checkbox" id={j.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default AuditPage;