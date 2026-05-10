const PricingCard = ({ data }: { data: any }) => {

    const hasMonthly = data?.price_monthly != null;
    const hasTokenPricing = data?.input_per_1M != null || data?.output_per_1M != null;

    return (
        <div className="rounded-2xl p-6 w-72 flex flex-col gap-4">

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
            {hasMonthly ? (
                // ── Monthly price
                <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold">${data.price_monthly}</span>
                    <span className="text-[#918e86] text-sm mb-2">/mo</span>
                </div>
            ) : hasTokenPricing ? (
                // ── Token pricing
                <div className="flex flex-col gap-1">
                    {data?.input_per_1M != null && (
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold">${data.input_per_1M}</span>
                            <span className="text-[#918e86] text-xs mb-1.5">/ 1M tokens sent</span>
                        </div>
                    )}
                    {data?.output_per_1M != null && (
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold">${data.output_per_1M}</span>
                            <span className="text-[#918e86] text-xs mb-1.5">/ 1M tokens received</span>
                        </div>
                    )}
                </div>
            ) : (
                // ── No pricing data
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold">Custom</span>
                    <span className="text-[#918e86] text-sm mb-2">pricing</span>
                </div>
            )}

            {/* Notes */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                    <span>{data?.notes}</span>
                </div>
            </div>

        </div>
    );
};

export default PricingCard;