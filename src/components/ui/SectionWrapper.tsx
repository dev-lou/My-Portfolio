'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionWrapperProps {
    children: ReactNode
    zIndex: number
    backgroundColor?: string
}

export default function SectionWrapper({ children, zIndex, backgroundColor = 'bg-black' }: SectionWrapperProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    // Lighter parallax - reduced transform complexity for smoother scrolling
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.15], [30, 0])

    return (
        <motion.div
            ref={sectionRef}
            style={{
                opacity,
                y,
                zIndex,
                willChange: 'opacity, transform',
            }}
            className={`relative ${backgroundColor}`}
        >
            {children}
        </motion.div>
    )
}
