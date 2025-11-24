'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, ArrowDown } from 'lucide-react';

export default function HeroSection() {
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
