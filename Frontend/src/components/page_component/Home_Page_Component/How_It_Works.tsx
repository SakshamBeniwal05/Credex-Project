export default function How_It_Works() {
  // Localized Constants & Design System Assets

  const steps = [
    {
      title: "Input Tools",
      desc: "Easily connect your current AI tools, team members, and primary usage details.",
      icon: "/pencil.png"
    },
    {
      title: "Analyze Spend",
      desc: "The platform performs a deep analysis against an AI pricing database.",
      icon: "/maginying.png"
    },
    {
      title: "Get Recommendations",
      desc: "Receive a spend health score and actionable insights for cost savings.",
      icon: "/idea.png"
    }
  ];

  return (
    <section id="HowItWorks" className="py-24 px-8 bg-white border-b-2 border-black text-black selection:bg-[#2563eb] selection:text-white antialiased">
      <h2 className="text-4xl font-black uppercase text-center mb-16 italic underline decoration-[#fbbf24] decoration-4">
        How it Works
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          /* Inline Instance of Independent Brutalist Card Frame */
          <div 
            key={i} 
            className="bg-[#fcf5cc] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-0.5  transition-all p-6 flex flex-col gap-4 group"
          >
            <div className="bg-white border-2 border-black p-3 w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#2563eb] transition-colors">
              <img 
                src={step.icon} 
                alt={step.title} 
                className="w-8 h-8 group-hover:invert transition-all" 
              />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">{step.title}</h3>
            <p className="font-medium leading-relaxed text-neutral-900">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}