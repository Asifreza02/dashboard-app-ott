'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export default function Preloader() {
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
