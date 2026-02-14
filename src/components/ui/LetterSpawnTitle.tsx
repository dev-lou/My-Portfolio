'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface LetterSpawnTitleProps {
    children?: string
    text?: string
    className?: string
}

export default function LetterSpawnTitle({ children, text, className = '' }: LetterSpawnTitleProps) {
    const ref = useRef<HTMLHeadingElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.5']
    })
    
    const content = text || children || ''
    const letters = content.split('')
    
    return (
        <h2 ref={ref} className={className}>
            {letters.map((letter, index) => {
                const start = index / letters.length
                const end = start + (1 / letters.length)
                
                return (
                    <Letter 
                        key={index} 
                        progress={scrollYProgress} 
                        range={[start, end]}
                    >
                        {letter}
                    </Letter>
                )
            })}
        </h2>
    )
}

interface LetterProps {
    children: string
    progress: any
    range: [number, number]
}

function Letter({ children, progress, range }: LetterProps) {
    const opacity = useTransform(progress, range, [0, 1])
    const y = useTransform(progress, range, [20, 0])
    const scale = useTransform(progress, range, [0.8, 1])
    
    return (
        <motion.span
            style={{ opacity, y, scale }}
            className="inline-block"
        >
            {children === ' ' ? '\u00A0' : children}
        </motion.span>
    )
}
