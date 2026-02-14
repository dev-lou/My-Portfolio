'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [showBlack, setShowBlack] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    // Step 1: Fade content to black
                    setTimeout(() => setShowBlack(true), 200)
                    // Step 2: Start curtain transition
                    setTimeout(() => setIsExiting(true), 800)
                    // Step 3: Complete and show main content
                    setTimeout(onComplete, 2200)
                    return 100
                }
                return prev + 2 // Increment progress (~3 second load)
            })
        }, 30)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center font-display overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            style={{ pointerEvents: 'all' }}
        >
            {/* Main Background */}
            <div className="absolute inset-0 bg-[#030712]" />

            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />

            {/* Content - Fades out before curtain opens */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: showBlack ? 0 : 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Single Line Name */}
                <motion.div
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="text-white">LOU VINCENT </span>
                    <span className="text-cyan-400">BARORO</span>
                </motion.div>

                {/* Progress Bar Container */}
                <motion.div
                    className="w-80 sm:w-96"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {/* Progress Bar Background */}
                    <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        {/* Progress Bar Fill - Gradient */}
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Glow Effect */}
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400/50 via-cyan-400/50 to-blue-300/50 rounded-full blur-md"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Progress Percentage */}
                    <motion.div
                        className="text-center mt-4 text-sm text-gray-400 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {progress}%
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Top Curtain Panel - Slides UP (only visible during transition) */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 z-50"
                style={{ backgroundColor: 'black' }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                    y: isExiting ? '-100%' : 0,
                    opacity: showBlack ? 1 : 0
                }}
                transition={{
                    y: { duration: 1.2, ease: [0.645, 0.045, 0.355, 1] },
                    opacity: { duration: 0.3 }
                }}
            />

            {/* Bottom Curtain Panel - Slides DOWN (only visible during transition) */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 z-50"
                style={{ backgroundColor: 'black' }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                    y: isExiting ? '100%' : 0,
                    opacity: showBlack ? 1 : 0
                }}
                transition={{
                    y: { duration: 1.2, ease: [0.645, 0.045, 0.355, 1] },
                    opacity: { duration: 0.3 }
                }}
            />
        </motion.div>
    )
}
