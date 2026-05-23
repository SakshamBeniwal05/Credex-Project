import React from 'react';

export default function Footer() {
  // Localized Constants & Design System Assets
  const ASSETS = {
    LOGO: "{{DATA:IMAGE:IMAGE_15}}",
  };

  return (
    <footer className="bg-white border-t-4 border-black pt-20 pb-12 px-8 text-black selection:bg-[#2563eb] selection:text-white antialiased">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          {/* Identity Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src={ASSETS.LOGO} alt="Logo" className="w-8 h-8" />
              <span className="font-black text-2xl uppercase tracking-tighter">Logo</span>
            </div>
            <p className="font-bold text-neutral-600 uppercase text-sm leading-tight">
              The leading AI spend management platform for modern teams and solo creators.
            </p>
            {/* Inline Instance of Status Component */}
            <div className="flex items-center gap-2 bg-[#fcf5cc] border-2 border-black px-3 py-1 w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">Spend Health: Optimal</span>
            </div>
          </div>
          
          {/* Column A */}
          <div>
            <h4 className="font-black uppercase mb-6 text-[#2563eb] underline decoration-2">Product</h4>
            <ul className="flex flex-col gap-3 font-bold uppercase text-sm">
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Infrastructure Engine</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Pricing Database</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">API Cost Calculators</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Security Whitepaper</a></li>
            </ul>
          </div>

          {/* Column B */}
          <div>
            <h4 className="font-black uppercase mb-6 text-[#2563eb] underline decoration-2">Resources</h4>
            <ul className="flex flex-col gap-3 font-bold uppercase text-sm">
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Guide</a></li>
            </ul>
          </div>

          {/* Column C */}
          <div>
            <h4 className="font-black uppercase mb-6 text-[#2563eb] underline decoration-2">Legal</h4>
            <ul className="flex flex-col gap-3 font-bold uppercase text-sm">
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Data Governance</a></li>
            </ul>
          </div>

        </div>
        
        {/* Baseline System Metrics Block */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-black border-dashed gap-6">
          <p className="font-bold uppercase text-xs text-neutral-500">
            © 2026 AI Infrastructure Platform. Built for teams optimizing the intelligence layer.
          </p>
          <div className="flex gap-6 font-black uppercase text-xs">
            <a href="#" className="hover:text-[#2563eb] transition-colors tracking-widest">Twitter</a>
            <a href="#" className="hover:text-[#2563eb] transition-colors tracking-widest">LinkedIn</a>
            <a href="#" className="hover:text-[#2563eb] transition-colors tracking-widest">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}