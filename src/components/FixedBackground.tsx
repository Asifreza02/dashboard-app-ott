'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FixedBackground() {
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
