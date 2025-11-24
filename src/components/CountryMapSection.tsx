'use client';

import React from 'react';

export default function CountryMapSection() {
    return (
        <section className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="w-full max-w-6xl px-4 pointer-events-auto">
                <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white/50">
                    <h2 className="text-4xl font-bold text-center text-slate-800 mb-8">Country Trend</h2>
                    <div className="w-full h-[60vh] flex items-center justify-center bg-white/50 rounded-2xl">
                        <svg viewBox="0 0 1000 500" className="w-full h-full opacity-80">
                            <path d="M50,100 Q150,50 250,100 T450,100" fill="none" stroke="#EA4335" strokeWidth="50" opacity="0.7" />
                            <path d="M550,100 Q650,50 750,100 T950,100" fill="none" stroke="#EA4335" strokeWidth="50" opacity="0.4" />
                            <path d="M100,250 Q200,200 300,250 T500,250" fill="none" stroke="#EA4335" strokeWidth="50" opacity="0.9" />
                            <path d="M600,250 Q700,200 800,250 T1000,250" fill="none" stroke="#34A853" strokeWidth="50" />
                            <path d="M200,400 Q300,350 400,400 T600,400" fill="none" stroke="#EA4335" strokeWidth="50" opacity="0.6" />
                            <text x="500" y="480" textAnchor="middle" fill="#666" fontSize="20">World Map Visualization (Mock)</text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
