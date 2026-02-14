'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
    children: ReactNode
    className?: string
    tiltIntensity?: number // degrees, default 8
    glareEnabled?: boolean
    scale?: number // hover scale, default 1.02
}

export default function TiltCard({
    children,
    className = '',
    tiltIntensity = 8,
    glareEnabled = true,
    scale = 1.02,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return
            const rect = cardRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            const centerX = x - 0.5
            const centerY = y - 0.5

            setTilt({
                rotateX: -centerY * tiltIntensity * 2,
                rotateY: centerX * tiltIntensity * 2,
            })

            if (glareEnabled) {
                setGlare({
                    x: x * 100,
                    y: y * 100,
                    opacity: 0.15,
                })
            }
        },
        [tiltIntensity, glareEnabled]
    )

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0 })
        setGlare({ x: 50, y: 50, opacity: 0 })
    }, [])

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
            }}
            whileHover={{ scale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
            }}
        >
            {children}

            {/* Light reflection / glare overlay */}
            {glareEnabled && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
                    }}
                />
            )}
        </motion.div>
    )
}
