
export default function Navbar() {
    // Localized Constants & Design System Assets
    const ASSETS = {
        LOGO: "{{DATA:IMAGE:IMAGE_15}}",
    };

    return (
        <nav className="flex justify-between items-center py-6 px-8 border-b-2 border-black bg-white sticky top-0 z-50 text-black selection:bg-[#2563eb] selection:text-white antialiased">
            <div className="flex items-center gap-2">
                {/* <img src={ASSETS.LOGO} alt="Logo" className="w-8 h-8" /> */}
                <span className="font-black text-xl tracking-tighter uppercase">Logo AI Auditor</span>
            </div>

            <div className="hidden md:flex gap-8 font-bold uppercase text-sm">
                <a href="#HowItWorks" className="hover:text-[#2563eb] transition-colors">How It Works</a>
                <a href="#features" className="hover:text-[#2563eb] transition-colors">Features</a>
                <a href="#faq" className="hover:text-[#2563eb] transition-colors">FAQ</a>
            </div>
        </nav>
    );
}