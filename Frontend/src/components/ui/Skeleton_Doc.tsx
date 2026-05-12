import type { FC } from 'react'

const Skeleton_Doc: FC = () => {
    return (
        <div>
            <div className="p-6 space-y-8 animate-pulse bg-gray-100 rounded-2xl h-[600px]">

                {/* Top Hero Section */}
                <div className="flex gap-6">
                    {/* Hero Savings Card (Top Left) */}
                    <div className="w-1/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div> {/* Label */}
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-blue-100 rounded-full"></div> {/* Percentage Circle */}
                            <div className="space-y-2">
                                <div className="h-8 w-20 bg-gray-300 rounded"></div> {/* Large % Value */}
                                <div className="h-4 w-32 bg-gray-200 rounded"></div> {/* Currency Value */}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="flex-1 grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i: number) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 h-32">
                                <div className="h-3 w-16 bg-gray-200 rounded mb-4"></div>
                                <div className="h-6 w-12 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Graph Section */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Large Trend Graph */}
                    <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200 h-64 relative">
                        <div className="h-4 w-40 bg-gray-200 rounded mb-8"></div>
                        {/* Fake Graph Lines */}
                        <div className="absolute inset-x-6 bottom-12 h-[1px] bg-gray-100"></div>
                        <div className="flex items-end justify-between h-32 px-4">
                            {[40, 70, 45, 90, 65, 80, 30].map((h: number, i: number) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-8 bg-gray-100 rounded-t"></div>
                            ))}
                        </div>
                    </div>

                    {/* Small Comparison/Donut Graph */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 h-64 flex flex-col items-center justify-center">
                        <div className="h-32 w-32 rounded-full border-8 border-gray-100 mb-4"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton_Doc