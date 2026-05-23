import React, { useState } from 'react';

export default function SEOAndFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    {
      q: "Why am I overspending on AI tools?",
      a: "Many teams face significant overlap between tools like ChatGPT Plus, Gemini, and Cursor. Often, features are redundant across platforms, leading to 'shadow AI' costs that go unnoticed without centralized auditing."
    },
    {
      q: "Is my sensitive data safe during the audit?",
      a: "Absolutely. We only analyze usage metadata and subscription tiers. We never ask for API keys, passwords, or internal proprietary data, ensuring your secrets stay secret."
    },
    {
      q: "Does this work for freelancers or just large teams?",
      a: "Logo is built for everyone. Freelancers often overpay for enterprise-grade features they don't use. We help individual creators right-size their stack just as effectively as large corporations."
    },
    {
      q: "How often is the pricing database updated?",
      a: "Our engine polls provider pricing hourly. When OpenAI drops model costs or Anthropic changes their tier structure, your audit health score reflects those changes immediately."
    }
  ];

  return (
    <section id="faq" className="py-24 px-8 bg-white border-b-2 border-black text-black selection:bg-[#2563eb] selection:text-white antialiased">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left Column: Sticky Index Layout */}
        <div className="sticky top-32 h-fit">
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">
            Everything You Need to Know About <span className="text-[#2563eb] italic">AI Over-Subscription</span>
          </h2>
          <p className="text-xl font-medium border-l-4 border-black pl-6 py-2 text-neutral-800">
            Our guide to navigating the complex landscape of AI infrastructure costs and subscription management.
          </p>
        </div>
        
        {/* Right Column: Highlighting Accordions */}
        <div className="flex flex-col gap-1 border-t-2 border-black">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b-2 border-black">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-6 flex justify-between items-center text-left hover:bg-neutral-50 transition-colors px-4"
              >
                <span className="text-xl font-black uppercase tracking-tight">{faq.q}</span>
                <span className="text-3xl font-light">{openIndex === i ? '−' : '+'}</span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100 bg-[#fbbf24] p-6 border-2 border-black mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'max-h-0 opacity-0'}`}>
                <p className="text-lg font-bold leading-relaxed text-black">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}