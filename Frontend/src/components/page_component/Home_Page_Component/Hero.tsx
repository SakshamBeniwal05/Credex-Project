import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div>
            <div id="Hero" className="flex items-center justify-center flex-col gap-12 pt-32">
                <div id="Hero_Title" className="md:text-8xl text-5xl font-[650] text-wrap p-2 text-center w-full">
                    Eliminate AI Waste
                </div>
                <div className='text-4xl font-medium text-center'>
                    Al Spend Auditor to optimize costs for teams
                    and freelancers. Find hidden savings.
                </div>
                <div id="Hero_Buttons">
                    <Link to={'/auditPage'}>
                        <button className="text-2xl p-4 bg-[#FEC123] rounded-2xl hover:text-white hover:bg-[#3182CE] hover:scale-105 transition-transform duration-150 drop-shadow-lg active:scale-95">
                            Auditor
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero