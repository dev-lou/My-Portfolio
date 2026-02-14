'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TextPressureProps {
    text: string
    className?: string
    fontWeight?: number
    minWeight?: number
    maxWeight?: number
}

export default function TextPressure({ 
    text,
    className = '',
    fontWeight = 400,
    minWeight = 100,
    maxWeight = 900
}: TextPressureProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [charWeights, setCharWeights] = useState<number[]>(
        new Array(text.length).fill(fontWeight)
    )

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top

            const chars = container.querySelectorAll('.pressure-char')
            const newWeights: number[] = []

            chars.forEach((char, i) => {
                const charRect = (char as HTMLElement).getBoundingClientRect()
                const charX = charRect.left - rect.left + charRect.width / 2
                const charY = charRect.top - rect.top + charRect.height / 2

                const distance = Math.sqrt(
                    Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2)
                )

                const maxDistance = 150
                const influence = Math.max(0, 1 - distance / maxDistance)
                const weight = fontWeight + (maxWeight - fontWeight) * influence

                newWeights[i] = Math.min(maxWeight, Math.max(minWeight, weight))
            })

            setCharWeights(newWeights)
        }

        const handleMouseLeave = () => {
            setCharWeights(new Array(text.length).fill(fontWeight))
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [text, fontWeight, minWeight, maxWeight])

    return (
        <div ref={containerRef} className={`cursor-default ${className}`}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    className="pressure-char inline-block"
                    style={{
                        fontWeight: charWeights[i],
                        fontVariationSettings: `'wght' ${charWeights[i]}`,
                    }}
                    animate={{ fontWeight: charWeights[i] }}
                    transition={{ duration: 0.1 }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    )
}
