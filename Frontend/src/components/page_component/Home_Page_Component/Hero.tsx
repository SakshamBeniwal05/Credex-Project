import { Link } from "react-router-dom";
export default function HeroSection() {
    // Localized Constants & Design System Assets
    const ASSETS = {
        HERO_ILLUSTRATION: "{{DATA:IMAGE:IMAGE_20}}",
    };

    return (
        <section className="relative w-5xl bg-transparent py-20 px-8 border-b-2 border-black overflow-hidden text-black selection:bg-[#2563eb] selection:text-white antialiased">
            {/* Stationery Grid Backdrop Pattern */}

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 flex flex-col">
                    Eliminate <span className="text-[#2563eb] underline decoration-4 underline-offset-8">AI Waste</span>
                </h1>

                <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto text-neutral-800">
                    AI Spend Auditor to optimize costs for teams and freelancers. Find hidden savings in your subscription stack.
                </p>

                {/* Inline Instance of Primary Brutalist Action Button */}
                <Link to={'/auditPage'}>

                    <button className="px-10 py-4 text-lg font-bold uppercase tracking-wider transition-all bg-[#fbbf24] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5">
                        Start Your Audit
                    </button>
                </Link>

                <div className="mt-16 relative">
                    <img
                        src={ASSETS.HERO_ILLUSTRATION}
                        alt="Audit Process Diagram"
                        className="mx-auto w-full max-w-3xl transform rotate-1 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white p-4"
                    />
                </div>
            </div>
        </section>
    );
}