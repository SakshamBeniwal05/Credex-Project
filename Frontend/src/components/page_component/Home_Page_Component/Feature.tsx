

export default function FeaturesGrid() {
  const benefits = [
    {
      title: "Dynamic Cost Engine",
      tag: "⚡ COST ENGINE",
      desc: "We track real-time pricing configurations for platforms like ChatGPT, Claude, and Cursor to instantly catch hidden premium subscription hikes."
    },
    {
      title: "Secure Usage Profiling",
      tag: "🛡️ PRIVACY FIRST",
      desc: "Reassure teams that usage metrics are analyzed abstractly without requiring master API keys or exposing sensitive workflow files."
    },
    {
      title: "Efficiency Algorithms",
      tag: "📊 ALGORITHMS ENGINE",
      desc: "Detail how our 0-100 baseline calculates optimal seat allocation and model-switching strategies for massive efficiency gains."
    }
  ];

  return (
   <section id="features" className="py-24 px-8 bg-white border-b-2 border-black text-black selection:bg-[#2563eb] selection:text-white antialiased">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((step, i) => (
          /* Inline Instance of Independent Brutalist Card Frame */
          <div 
            key={i} 
            className="bg-[#fcf5cc] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5 transition-all p-6 flex flex-col gap-4 group"
          >
            <div className="mb-6">
              <span className="bg-black text-white p-2 font-mono text-xs tracking-wider">
                {step.tag}
              </span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">{step.title}</h3>
            <p className="font-medium leading-relaxed text-neutral-900">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}