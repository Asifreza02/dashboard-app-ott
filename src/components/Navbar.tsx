'use client';

import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const [isReportsOpen, setIsReportsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                    OTT
                </div>
                <span className="font-bold text-slate-800 text-sm tracking-wide">OTT Solutions</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
                <a href="#home" className="text-orange-500 font-semibold">Home</a>

                <div
                    className="relative group"
                    onMouseEnter={() => setIsReportsOpen(true)}
                    onMouseLeave={() => setIsReportsOpen(false)}
                >
                    <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors py-4">
                        Reports <ChevronDown className="w-4 h-4" />
                    </div>
                    {isReportsOpen && (
                        <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="py-2">
                                <a href="#dsp" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">DSP</a>
                                <a href="#caller-tune" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Caller Tune</a>
                                <a href="#artist" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Artist</a>
                                <a href="#album" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Album</a>
                                <a href="#album" className="block px-4 py-2 hover:bg-orange-50 text-slate-700">Track</a>
                            </div>
                        </div>
                    )}
                </div>

                <a href="#artist" className="hover:text-orange-500 transition-colors">Repertoire</a>
                <a href="#streaming" className="hover:text-orange-500 transition-colors">New Songs Release</a>
                <a href="#country-map" className="hover:text-orange-500 transition-colors">Resource</a>
                <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
                <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors">Account <ChevronDown className="w-4 h-4" /></div>
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="w-6 h-6 text-slate-700" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 md:hidden">
                    <a href="#home" className="text-orange-500 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                    <div className="flex flex-col gap-2">
                        <span className="font-medium text-slate-700">Reports</span>
                        <div className="pl-4 flex flex-col gap-2 text-sm text-slate-600">
                            <a href="#dsp" onClick={() => setIsMobileMenuOpen(false)}>DSP</a>
                            <a href="#caller-tune" onClick={() => setIsMobileMenuOpen(false)}>Caller Tune</a>
                            <a href="#artist" onClick={() => setIsMobileMenuOpen(false)}>Artist</a>
                            <a href="#album" onClick={() => setIsMobileMenuOpen(false)}>Album</a>
                        </div>
                    </div>
                    <a href="#artist" className="text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Repertoire</a>
                    <a href="#streaming" className="text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>New Songs Release</a>
                    <a href="#country-map" className="text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Resource</a>
                    <a href="#contact" className="text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                </div>
            )}
        </nav>
    )
}
