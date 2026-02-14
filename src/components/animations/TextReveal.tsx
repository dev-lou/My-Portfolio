'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

interface TextRevealProps {
    children: ReactNode
    className?: string
}

// Split text into words and animate each on scroll
export function TextRevealByWord({ children, className = '' }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.9', 'start 0.25'],
    })

    const text = typeof children === 'string' ? children : ''
    const words = text.split(' ')

    return (
        <div ref={containerRef} className={className}>
            <p className="flex flex-wrap">
                {words.map((word, i) => {
                    const start = i / words.length
                    const end = start + 1 / words.length
                    return (
                        <Word key={i} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </Word>
                    )
                })}
            </p>
        </div>
    )
}

interface WordProps {
    children: ReactNode
    progress: MotionValue<number>
    range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
    const opacity = useTransform(progress, range, [0.2, 1])
    const y = useTransform(progress, range, [20, 0])
    
    return (
        <motion.span 
            style={{ opacity, y }} 
            className="mr-[0.25em] mt-[0.1em] inline-block"
        >
            {children}
        </motion.span>
    )
}

// Character by character reveal
export function TextRevealByChar({ children, className = '' }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.9', 'start 0.3'],
    })

    const text = typeof children === 'string' ? children : ''
    const chars = text.split('')

    return (
        <div ref={containerRef} className={className}>
            <p className="flex flex-wrap">
                {chars.map((char, i) => {
                    const start = i / chars.length
                    const end = start + 1 / chars.length
                    return (
                        <Char key={i} progress={scrollYProgress} range={[start, end]}>
                            {char === ' ' ? '\u00A0' : char}
                        </Char>
                    )
                })}
            </p>
        </div>
    )
}

interface CharProps {
    children: ReactNode
    progress: MotionValue<number>
    range: [number, number]
}

function Char({ children, progress, range }: CharProps) {
    const opacity = useTransform(progress, range, [0.1, 1])
    const blur = useTransform(progress, range, [4, 0])
    
    return (
        <motion.span 
            style={{ 
                opacity,
                filter: useTransform(blur, (v) => `blur(${v}px)`)
            }} 
            className="inline-block"
        >
            {children}
        </motion.span>
    )
}

// Fade up reveal for paragraphs
interface FadeUpProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function FadeUpOnScroll({ children, className = '', delay = 0 }: FadeUpProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.95', 'start 0.6'],
    })
    
    const y = useTransform(scrollYProgress, [0, 1], [60, 0])
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const springY = useSpring(y, { stiffness: 100, damping: 30 })

    return (
        <motion.div
            ref={ref}
            style={{ y: springY, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Mask reveal effect
interface MaskRevealProps {
    children: ReactNode
    className?: string
}

export function MaskReveal({ children, className = '' }: MaskRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.4'],
    })
    
    const clipPath = useTransform(
        scrollYProgress,
        [0, 1],
        ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
    )

    return (
        <motion.div
            ref={ref}
            style={{ clipPath }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
