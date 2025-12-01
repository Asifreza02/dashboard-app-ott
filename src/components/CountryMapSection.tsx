'use client';

import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryData = [
    { code: "IND", id: "356", value: 120 },
    { code: "USA", id: "840", value: 20 },
    { code: "CAN", id: "124", value: 10 },
    { code: "BRA", id: "076", value: 30 },
    { code: "RUS", id: "643", value: 15 },
    { code: "CHN", id: "156", value: 25 },
    { code: "AUS", id: "036", value: 18 },
    { code: "GBR", id: "826", value: 22 },
    { code: "FRA", id: "250", value: 12 },
    { code: "DEU", id: "276", value: 16 },
    { code: "JPN", id: "392", value: 14 },
    { code: "ZAF", id: "710", value: 8 },
];

const colorScale = scaleLinear<string>()
    .domain([0, 120])
    .range(["#EA4335", "#34A853"]); // Red to Green

export default function CountryMapSection({ id }: { id?: string }) {
    return (
        <section id={id} className="relative w-full py-20 flex flex-col items-center justify-center z-10">
            <div className="w-full max-w-6xl px-4">
                <div className="bg-white/40 backdrop-blur-xl p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/50">
                    <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-800 mb-8">Country Trend</h2>
                    <div className="w-full h-[60vh] flex items-center justify-center bg-white/50 rounded-2xl overflow-hidden relative">
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
                            <ZoomableGroup center={[0, 20]}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }: { geographies: any[] }) =>
                                        geographies.map((geo: any) => {
                                            const d = countryData.find((s) => s.id === geo.id);
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={d ? colorScale(d.value) : "#F5F4F6"}
                                                    stroke="#D6D6DA"
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { fill: d ? colorScale(d.value) : "#EAEAEC", outline: "none", opacity: 0.8 },
                                                        pressed: { outline: "none" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>

                        {/* Legend */}
                        <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-4 bg-gradient-to-r from-[#EA4335] to-[#34A853] rounded-full"></div>
                                <span className="text-xs font-bold text-slate-600">0 - 120.081</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
