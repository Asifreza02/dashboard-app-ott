'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ChartSectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    id?: string;
}

export default function ChartSection({ title, subtitle, children, id }: ChartSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id={id} ref={ref} className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
            <motion.div
                style={{ opacity, scale, y }}
                className="w-full max-w-6xl px-4 pointer-events-auto"
            >
                <div className="bg-white/40 backdrop-blur-xl p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/50">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">{title}</h2>
                        <p className="text-sm md:text-xl text-slate-500 font-light">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </motion.div>
        </section>
    )
}
