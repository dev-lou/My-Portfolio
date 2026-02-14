'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface TextPressureProps {
    children: string
    className?: string
}

export default function TextPressure({ children, className = '' }: TextPressureProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const letters = children.split('')

    return (
        <span className={`inline-flex ${className}`} style={{ whiteSpace: 'nowrap' }}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                        scale: hoveredIndex === index ? 1.2 : 1,
                        y: hoveredIndex === index ? -8 : 0,
                        rotate: hoveredIndex === index ? Math.random() * 8 - 4 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 15,
                    }}
                    className="inline-block origin-bottom"
                    style={{
                        willChange: 'transform',
                        minWidth: letter === ' ' ? '0.25em' : 'auto',
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </span>
    )
}
