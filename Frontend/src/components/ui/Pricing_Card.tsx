
import React from 'react';
const PricingCard = ({ data }) => {
    return (
        // Main background wrapper (mimicking the image's background)
        <div className="bg-amber-50 rounded-2xl p-6 w-72 flex flex-col gap-4">

            {/* Top row */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-bold text-lg">{data?.name}</div>
                    <div className="text-[#918e86] text-sm">For teams that need more.</div>
                </div>
                <div className="border border-[#5e5d58] text-xs px-3 py-1 rounded-full">
                    Popular
                </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-1">
                <span className="text-5xl font-bold">{data?.price_monthly == null ? "No-Data" : data.price_monthly}</span>
                <span className="text-[#918e86] text-sm mb-2">/mo</span>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                    <span>{data.notes}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span>{data?.input_per_1M}</span>
                </div> <div className="flex items-center gap-2 text-sm">
                    <span>{data?.output_per_1M}</span>
                </div>
            </div>

        </div>
    );
};

export default PricingCard;