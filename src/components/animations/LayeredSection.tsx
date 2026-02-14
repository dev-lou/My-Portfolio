'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface LayeredSectionProps {
    children: ReactNode
    className?: string
    backgroundColor?: string
    scrollMultiplier?: number
}

// Section that layers over previous content with parallax
export function LayeredSection({ 
    children, 
    className = '',
    backgroundColor = '#050505',
    scrollMultiplier = 1.5
}: LayeredSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

    return (
        <motion.section
            ref={containerRef}
            style={{ 
                y: smoothY, 
                scale,
                backgroundColor 
            }}
            className={`relative ${className}`}
        >
            <motion.div style={{ opacity }}>
                {children}
            </motion.div>
        </motion.section>
    )
}

// Section with sticky header that fades out
interface StickyHeaderSectionProps {
    children: ReactNode
    header: ReactNode
    className?: string
}

export function StickyHeaderSection({ 
    children, 
    header,
    className = '' 
}: StickyHeaderSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
    const contentY = useTransform(scrollYProgress, [0.2, 0.5], ['100%', '0%'])

    return (
        <div ref={containerRef} className={`relative min-h-[200vh] ${className}`}>
            {/* Sticky Header */}
            <motion.div 
                style={{ opacity: headerOpacity, scale: headerScale }}
                className="sticky top-0 h-screen flex items-center justify-center"
            >
                {header}
            </motion.div>
            
            {/* Content that reveals */}
            <motion.div style={{ y: contentY }} className="relative z-10">
                {children}
            </motion.div>
        </div>
    )
}

// Parallax container for depth effects
interface ParallaxContainerProps {
    children: ReactNode
    className?: string
    speed?: number
}

export function ParallaxContainer({ 
    children, 
    className = '',
    speed = 0.5
}: ParallaxContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}

// Scale up reveal section
interface ScaleRevealProps {
    children: ReactNode
    className?: string
}

export function ScaleReveal({ children, className = '' }: ScaleRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

    return (
        <motion.div
            ref={ref}
            style={{ scale: smoothScale, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
