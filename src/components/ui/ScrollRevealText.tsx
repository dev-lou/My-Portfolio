'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealTextProps {
    children: string
    className?: string
}

export default function ScrollRevealText({ children, className = '' }: ScrollRevealTextProps) {
    const ref = useRef<HTMLParagraphElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.4']
    })
    
    const words = children.split(' ')
    
    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length
                const end = start + (1 / words.length)
                
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                )
            })}
        </p>
    )
}

interface WordProps {
    children: string
    progress: any
    range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
    const opacity = useTransform(progress, range, [0.3, 1])
    const color = useTransform(progress, range, ['#6B7280', '#FFFFFF'])
    
    return (
        <span className="relative inline-block mr-2">
            <motion.span
                style={{ opacity, color }}
                className="inline-block"
            >
                {children}
            </motion.span>
        </span>
    )
}
