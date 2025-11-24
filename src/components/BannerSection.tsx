'use client';

import React from 'react';

export default function BannerSection() {
    return (
        <section className="sticky top-0 h-[50vh] flex flex-col items-center justify-center z-10 bg-[#FFF8E7] overflow-hidden">
            <h2 className="text-5xl font-normal mb-12">Tune O</h2>
            <div className="flex w-full h-40">
                <div className="flex-1 bg-[#FF6B6B] flex items-center justify-center border-r border-black/10">
                    <div className="w-20 h-10 bg-white/20 rounded-full"></div>
                </div>
                <div className="flex-1 bg-[#FF8787] flex items-center justify-center border-r border-black/10">
                    <div className="w-2 h-full bg-black/20 mx-2"></div>
                    <div className="w-2 h-full bg-black/20 mx-2"></div>
                </div>
                <div className="flex-1 bg-[#FFE066] flex items-center justify-center border-r border-black/10">
                    <div className="w-20 h-20 rounded-full border-4 border-black/80 flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                </div>
                <div className="flex-1 bg-[#FF6B6B] flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 border-4 border-black/80"></div>
                </div>
            </div>
        </section>
    )
}
