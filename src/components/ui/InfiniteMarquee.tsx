'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const roles = [
    'AI AUGMENTED DEVELOPER',
    'FULL-STACK DEVELOPER',
    'BLOCKCHAIN DEVELOPER',
    'MOBILE APP DEVELOPER',
    'WEB3 DEVELOPER',
    'UI/UX ENTHUSIAST',
]

export default function InfiniteMarquee() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = useState(1920)

    useEffect(() => {
        if (containerRef.current) {
            // Measure the width of one set of items
            const firstChild = containerRef.current.firstElementChild as HTMLElement
            if (firstChild) {
                setContentWidth(firstChild.scrollWidth)
            }
        }
    }, [])

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-y border-white/5">
            <div ref={containerRef} className="flex py-6">
                <motion.div
                    animate={{ x: [0, -contentWidth] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 25,
                            ease: 'linear',
                        },
                    }}
                    className="flex gap-12 shrink-0 will-change-transform"
                >
                    {[...roles, ...roles].map((role, i) => (
                        <div key={i} className="flex items-center gap-12 shrink-0">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                                {role}
                            </span>
                            <span className="text-cyan-400 text-3xl">✦</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    animate={{ x: [0, -contentWidth] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 25,
                            ease: 'linear',
                        },
                    }}
                    className="flex gap-12 shrink-0 will-change-transform"
                >
                    {[...roles, ...roles].map((role, i) => (
                        <div key={`dup-${i}`} className="flex items-center gap-12 shrink-0">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                                {role}
                            </span>
                            <span className="text-cyan-400 text-3xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
