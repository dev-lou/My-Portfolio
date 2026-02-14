'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const trailX = useMotionValue(-100)
    const trailY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
    const trailSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 }

    const smoothX = useSpring(cursorX, springConfig)
    const smoothY = useSpring(cursorY, springConfig)
    const smoothTrailX = useSpring(trailX, trailSpringConfig)
    const smoothTrailY = useSpring(trailY, trailSpringConfig)

    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isMagnetic, setIsMagnetic] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)
    const magneticRef = useRef<DOMRect | null>(null)

    useEffect(() => {
        // Detect touch devices
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouchDevice(isTouch)
        if (isTouch) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            trailX.set(e.clientX)
            trailY.set(e.clientY)

            if (!isVisible) setIsVisible(true)

            // Check magnetic elements
            const magneticEls = document.querySelectorAll('[data-magnetic]')
            let foundMagnetic = false

            magneticEls.forEach((el) => {
                const rect = el.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const distX = e.clientX - centerX
                const distY = e.clientY - centerY
                const distance = Math.sqrt(distX * distX + distY * distY)
                const threshold = Math.max(rect.width, rect.height) * 0.8

                if (distance < threshold) {
                    foundMagnetic = true
                    magneticRef.current = rect
                    // Pull cursor toward center
                    const pull = 0.3
                    cursorX.set(e.clientX + (centerX - e.clientX) * pull)
                    cursorY.set(e.clientY + (centerY - e.clientY) * pull)
                }
            })

            setIsMagnetic(foundMagnetic)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('input') ||
                target.closest('textarea') ||
                target.closest('[data-cursor-hover]')
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('input') ||
                target.closest('textarea') ||
                target.closest('[data-cursor-hover]')
            ) {
                setIsHovering(false)
            }
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', moveCursor)
        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [cursorX, cursorY, trailX, trailY, isVisible])

    if (isTouchDevice) return null

    return (
        <>
            {/* Hide default cursor globally */}
            <style jsx global>{`
                * { cursor: none !important; }
            `}</style>

            {/* Trail / outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: smoothTrailX,
                    y: smoothTrailY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 60 : isMagnetic ? 50 : 40,
                        height: isHovering ? 60 : isMagnetic ? 50 : 40,
                        opacity: isVisible ? (isClicking ? 0.6 : 0.4) : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="rounded-full border border-white/50"
                    style={{
                        background: isHovering
                            ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
                            : 'transparent',
                    }}
                />
            </motion.div>

            {/* Core dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isClicking ? 6 : isHovering ? 4 : 8,
                        height: isClicking ? 6 : isHovering ? 4 : 8,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="rounded-full bg-white"
                    style={{
                        boxShadow: '0 0 10px rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.3)',
                    }}
                />
            </motion.div>
        </>
    )
}
