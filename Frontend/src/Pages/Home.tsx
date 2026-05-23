import type { FC } from 'react'
import HeroSection from '../components/page_component/Home_Page_Component/Hero'
import How_It_Works from '../components/page_component/Home_Page_Component/How_It_Works'
import FeaturesGrid from '../components/page_component/Home_Page_Component/Feature'
import SEOAndFAQ from '../components/page_component/Home_Page_Component/SEO_FAQ'
import Footer from '../components/page_component/Home_Page_Component/Footer'
import Navbar from '../components/page_component/Major_Component/Navbar'

const Home: FC = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <div className="w-3/4 relative">
                    <Navbar />
                    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-10">
                        <HeroSection />
                        <How_It_Works />
                        <FeaturesGrid />
                        <SEOAndFAQ />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home