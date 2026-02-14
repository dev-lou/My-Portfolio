'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface HorizontalScrollProps {
    children: ReactNode
    className?: string
    speed?: number
}

export default function HorizontalScroll({ 
    children, 
    className = '',
    speed = 1
}: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${50 * speed}%`])
    const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

    return (
        <div ref={containerRef} className={`relative ${className}`} style={{ height: '300vh' }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    ref={scrollRef}
                    style={{ x: smoothX }}
                    className="flex gap-8 pl-[10vw]"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}

// Horizontal scroll with progress indicator
interface HorizontalScrollWithProgressProps {
    children: ReactNode
    className?: string
    title?: string
}

export function HorizontalScrollWithProgress({ 
    children, 
    className = '',
    title = ''
}: HorizontalScrollWithProgressProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const smoothX = useSpring(x, { stiffness: 80, damping: 25 })

    return (
        <div ref={containerRef} className={`relative ${className}`} style={{ height: '400vh' }}>
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-8 left-0 right-0 px-8">
                    <div className="flex items-center gap-4">
                        {title && (
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                {title}
                            </span>
                        )}
                        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                style={{ width: progressWidth }}
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrolling Content */}
                <motion.div
                    style={{ x: smoothX }}
                    className="flex gap-8 pl-[10vw] pt-16"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
