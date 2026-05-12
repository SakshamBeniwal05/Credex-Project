import type { FC } from 'react'
import { Link } from 'react-router-dom'
import Skeleton_Doc from '../components/ui/Skeleton_Doc'

const Home: FC = () => {
    return (
        <div>
            <div className="min-h-screen w-full bg-[#f9fafb] relative">

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
                <div className="relative z-10">
                    <div id="Hero" className="flex items-center justify-center flex-col gap-12 py-32">
                        <div id="Hero_Title" className="md:text-6xl text-5xl font-semibold text-wrap p-2 w-2/3 text-center">
                            We care about your spendings, so Spend Smart
                        </div>
                        <div id="Hero_Buttons">
                            <Link to={'/auditPage'}>
                                <button className="text-2xl p-4 bg-amber-400 rounded-2xl hover:text-white hover:bg-amber-500 hover:scale-105 transition-transform duration-150 drop-shadow-lg">
                                    Auditor
                                </button>
                            </Link>
                        </div>
                        <div className='bg-linear-to-b from-transparent to-white'>
                            <Skeleton_Doc />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home