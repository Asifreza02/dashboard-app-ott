'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { TrackData, ChartData } from '@/utils/data';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { AnimatePresence } from 'framer-motion';

// Component imports
import Preloader from './Preloader';
import FixedBackground from './FixedBackground';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CountryMapSection from './CountryMapSection';
import ChartSection from './ChartSection';
import TableSection from './TableSection';
import BannerSection from './BannerSection';
import FooterSection from './FooterSection';

interface DashboardProps {
    data: TrackData[];
    revenueTrend: ChartData[];
    streamingTrend: ChartData[];
    callerTuneData: any[];
}

export default function Dashboard({ data, revenueTrend, streamingTrend, callerTuneData }: DashboardProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Aggregate Real Data for DSP Reports
    const dspData = useMemo(() => {
        const pData: Record<string, number> = { 'Airtel': 0, 'JioSaavn': 0, 'Wynk': 0 };
        data.forEach(d => {
            if (pData[d.platform] !== undefined) {
                pData[d.platform] += d.revenue;
            }
        });
        return Object.entries(pData).map(([name, value]) => ({ name, value }));
    }, [data]);

    // Aggregate Artist Data
    const artistData = useMemo(() => {
        const aData: Record<string, number> = {};
        data.forEach(d => {
            if (d.artistName) {
                aData[d.artistName] = (aData[d.artistName] || 0) + d.revenue;
            }
        });
        return Object.entries(aData)
            .map(([name, revenue]) => ({ name, revenue, total: revenue }))
            .sort((a, b) => b.revenue - a.revenue);
    }, [data]);

    // Aggregate Album Data
    const albumData = useMemo(() => {
        const aData: Record<string, number> = {};
        data.forEach(d => {
            if (d.albumName) {
                aData[d.albumName] = (aData[d.albumName] || 0) + d.revenue;
            }
        });
        return Object.entries(aData)
            .map(([name, revenue]) => ({ name, revenue, total: revenue, code: `OTTSCD${Math.floor(Math.random() * 5000) + 1000}` }))
            .sort((a, b) => b.revenue - a.revenue);
    }, [data]);

    return (
        <div className="font-sans text-slate-800 min-h-screen relative overflow-x-hidden bg-[#FFF8E7]">
            <AnimatePresence>
                {loading && <Preloader />}
            </AnimatePresence>

            <FixedBackground />
            <Navbar />

            <main className="relative z-10">
                <HeroSection id="home" />



                <ChartSection id="revenue" title="Month Wise Revenue Trend" subtitle="Revenue vs Activity Period">
                    <div className="h-[50vh] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6B7280" strokeOpacity={0.2} />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} stroke="#4B5563" />
                                <YAxis stroke="#4B5563" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                                <Bar dataKey="revenue" fill="#4285F4" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartSection>

                <ChartSection id="dsp" title="DSP Reports" subtitle="Revenue vs Store Name">
                    <div className="h-[50vh] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dspData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6B7280" strokeOpacity={0.2} />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} stroke="#4B5563" />
                                <YAxis stroke="#4B5563" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                                <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartSection>

                <ChartSection id="streaming" title="Streaming Trend" subtitle="Quantity and Revenue">
                    <div className="h-[60vh] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={streamingTrend}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                                    outerRadius={220}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {streamingTrend.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartSection>

                <ChartSection id="caller-tune" title="Caller Tune Overview" subtitle="JioTunes, airtel and VI Callertune">
                    <div className="flex justify-center gap-8 mb-8 text-sm font-medium">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FBBC04]"></div> VI Callertune</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EA4335]"></div> airtel</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4285F4]"></div> JioTunes</div>
                    </div>
                    <div className="h-[50vh] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={callerTuneData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6B7280" strokeOpacity={0.2} />
                                <XAxis dataKey="name" hide />
                                <YAxis stroke="#4B5563" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                                <Bar dataKey="vi" stackId="a" fill="#FBBC04" />
                                <Bar dataKey="airtel" stackId="a" fill="#EA4335" />
                                <Bar dataKey="jio" stackId="a" fill="#4285F4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartSection>

                <CountryMapSection id="country-map" />

                <TableSection id="artist" title="Artist" data={artistData} columns={['Artist', 'Revenue', 'Total']} />
                <TableSection id="album" title="Album" data={albumData} columns={['Release', 'Artist', 'Project Code', 'Revenue', 'Total']} />

                <BannerSection />

                <FooterSection id="contact" />

            </main>
        </div>
    );
}
