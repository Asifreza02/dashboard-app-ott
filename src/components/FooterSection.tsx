'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export default function FooterSection({ id }: { id?: string }) {
    return (
        <footer id={id} className="bg-white py-12 px-8 border-t border-slate-200 z-20 relative">
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
