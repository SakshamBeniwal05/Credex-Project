import type { FC } from 'react'
import HeroSection from '../components/page_component/Home_Page_Component/Hero'
import How_It_Works from '../components/page_component/Home_Page_Component/How_It_Works'
import FeaturesGrid from '../components/page_component/Home_Page_Component/Feature'
import SEOAndFAQ from '../components/page_component/Home_Page_Component/SEO_FAQ'
import Footer from '../components/page_component/Home_Page_Component/Footer'

const Home: FC = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <div className="w-3/4 relative">
                    <div
                        className="fixed inset-0 z-0"
                        style={{
                            backgroundImage: `
                            linear-gradient(to right, #d1d5db 1px, transparent 1px),
                            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
                        `,
                            backgroundSize: "32px 32px",
                            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 70%)",
                            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 70%)",
                        }}
                    />
                    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-10">
                        <HeroSection />
                        <How_It_Works/>
                        <FeaturesGrid/>
                        <SEOAndFAQ/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home