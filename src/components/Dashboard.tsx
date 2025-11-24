'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { TrackData, ChartData, TableData } from '@/utils/data';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { Menu, ChevronDown, Music, ArrowDown, Search, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
                <HeroSection />

                <CountryMapSection />

                <ChartSection title="Month Wise Revenue Trend" subtitle="Revenue vs Activity Period">
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

                <ChartSection title="DSP Reports" subtitle="Revenue vs Store Name">
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

                <ChartSection title="Streaming Trend" subtitle="Quantity and Revenue">
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

                <ChartSection title="Caller Tune Overview" subtitle="JioTunes, airtel and VI Callertune">
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

                <TableSection title="Artist" data={artistData} columns={['Artist', 'Revenue', 'Total']} />
                <TableSection title="Album" data={albumData} columns={['Release', 'Artist', 'Project Code', 'Revenue', 'Total']} />

                <BannerSection />

                <FooterSection />

            </main>
        </div>
    );
}

function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#FFF8E7] flex flex-col items-center justify-center"
        >
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center shadow-2xl mb-8"
            >
                <Music className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-slate-800 tracking-widest"
            >
                LOADING DASHBOARD
            </motion.h2>
            <div className="w-48 h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-orange-500"
                />
            </div>
        </motion.div>
    )
}

function FixedBackground() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#FFF8E7]">
            <motion.div
                style={{ y: y1, rotate }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-300/20 blur-[100px]"
            />
            <motion.div
                style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-300/20 blur-[100px]"
            />
            <motion.div
                style={{ scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]) }}
                className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-purple-300/20 blur-[120px]"
            />
        </div>
    )
}

function Navbar() {
    const [isReportsOpen, setIsReportsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                    OTT
                </div>
                <span className="font-bold text-slate-800 text-sm tracking-wide">OTT Solutions</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
                <a href="#" className="text-orange-500 font-semibold">Home</a>

                <div className="relative group">
                    <div
                        className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors"
                        onMouseEnter={() => setIsReportsOpen(true)}
                        onMouseLeave={() => setIsReportsOpen(false)}
                    >
                        Reports <ChevronDown className="w-4 h-4" />
                    </div>
                    {isReportsOpen && (
                        <div
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                            onMouseEnter={() => setIsReportsOpen(true)}
                            onMouseLeave={() => setIsReportsOpen(false)}
                        >
                            <div className="py-2">
                                <a href="#" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">DSP</a>
                                <a href="#" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Caller Tune</a>
                                <a href="#" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Artist</a>
                                <a href="#" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Album</a>
                                <a href="#" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Track</a>
                            </div>
                        </div>
                    )}
                </div>

                <a href="#" className="hover:text-orange-500 transition-colors">Repertoire</a>
                <a href="#" className="hover:text-orange-500 transition-colors">New Songs Release</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Resource</a>
                <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
                <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors">Account <ChevronDown className="w-4 h-4" /></div>
            </div>

            <div className="md:hidden">
                <Menu className="w-6 h-6 text-slate-700" />
            </div>
        </nav>
    )
}

function HeroSection() {
    const title = "Live Dashboard";
    const letters = Array.from(title);

    return (
        <section className="sticky top-0 h-screen flex flex-col items-center justify-center z-0">
            <motion.div
                className="text-center z-10"
            >
                <h1 className="text-6xl md:text-9xl font-light mb-12 text-slate-900 tracking-tighter flex overflow-hidden">
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2.5 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                            className={letter === " " ? "mr-4" : ""}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center cursor-pointer"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-slate-900 rounded-full flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/20">
                        <Music className="w-12 h-12 text-white" />
                    </div>
                    <span className="font-bold text-orange-500 tracking-[0.3em] text-xl">TUNE O</span>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 4, duration: 2, repeat: Infinity }}
                className="absolute bottom-12 text-slate-400 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <ArrowDown className="w-4 h-4" />
            </motion.div>
        </section>
    )
}

function CountryMapSection() {
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

function ChartSection({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
            <motion.div
                style={{ opacity, scale, y }}
                className="w-full max-w-6xl px-4 pointer-events-auto"
            >
                <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white/50">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-2">{title}</h2>
                        <p className="text-xl text-slate-500 font-light">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </motion.div>
        </section>
    )
}

function TableSection({ title, data, columns }: { title: string, data: TableData[], columns: string[] }) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center z-10 pointer-events-none py-20">
            <div className="w-full max-w-6xl px-4 pointer-events-auto">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-2">{title}</h2>
                        <div className="w-16 h-1 bg-slate-800 mx-auto mt-4"></div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="bg-white border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                            <span>entries per page</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Search:</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-white border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-100/50 border-b border-blue-200">
                                    {columns.map((col, i) => (
                                        <th key={i} className="px-6 py-4 font-bold text-slate-700">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{row.name}</td>
                                        {row.code && <td className="px-6 py-4 text-slate-600">{row.code}</td>}
                                        {!row.code && columns.includes('Artist') && <td className="px-6 py-4 text-slate-600"></td>}

                                        <td className="px-6 py-4 text-slate-600">{row.revenue.toFixed(3)}</td>
                                        <td className="px-6 py-4 text-slate-600">{row.total.toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm text-slate-600">
                        <div>
                            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function BannerSection() {
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

function FooterSection() {
    return (
        <footer className="bg-white py-12 px-8 border-t border-slate-200 z-20 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-4 text-sm text-slate-600">
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-orange-500">Home</a>
                        <a href="#" className="hover:text-orange-500">Reports</a>
                        <a href="#" className="hover:text-orange-500">Repertoire</a>
                        <a href="#" className="hover:text-orange-500">New Songs Release</a>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-orange-500">Resource</a>
                        <a href="#" className="hover:text-orange-500">Contact</a>
                        <a href="#" className="hover:text-orange-500">Account</a>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg mb-2">
                        OTT
                    </div>
                    <span className="text-xs font-bold text-orange-500">OTT Solutions</span>
                </div>

                <div className="text-right text-sm text-slate-600">
                    <p className="font-bold text-slate-800 mb-1">OTT Solutions Private Limited</p>
                    <p className="flex items-center justify-end gap-2"><Phone className="w-3 h-3" /> +913335109301</p>
                </div>
            </div>
        </footer>
    )
}
