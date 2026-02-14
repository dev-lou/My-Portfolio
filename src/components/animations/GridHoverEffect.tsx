'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface GridHoverEffectProps {
    gridSize?: number
    glowColor?: string
    className?: string
}

export default function GridHoverEffect({ 
    gridSize = 40, 
    glowColor = 'rgba(59, 130, 246, 0.15)',
    className = '' 
}: GridHoverEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const animationRef = useRef<number | undefined>(undefined)
    const needsDrawRef = useRef(true)
    const staticDrawnRef = useRef(false)

    // Draw only the static grid once, then overlay glow on mouse move
    const drawStatic = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)

        const cols = Math.ceil(width / gridSize)
        const rows = Math.ceil(height / gridSize)

        // Draw subtle grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 0.5
        for (let i = 0; i <= cols; i++) {
            ctx.beginPath()
            ctx.moveTo(i * gridSize, 0)
            ctx.lineTo(i * gridSize, height)
            ctx.stroke()
        }
        for (let j = 0; j <= rows; j++) {
            ctx.beginPath()
            ctx.moveTo(0, j * gridSize)
            ctx.lineTo(width, j * gridSize)
            ctx.stroke()
        }

        // Draw base dots
        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                const x = i * gridSize
                const y = j * gridSize
                ctx.beginPath()
                ctx.arc(x, y, 1, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
                ctx.fill()
            }
        }
        staticDrawnRef.current = true
    }, [gridSize])

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        if (!needsDrawRef.current) {
            animationRef.current = requestAnimationFrame(draw)
            return
        }
        needsDrawRef.current = false

        const { width, height } = canvas
        const { x: mouseX, y: mouseY } = mouseRef.current

        // Redraw static grid
        drawStatic()

        // Only draw glow if mouse is on screen
        if (mouseX > -500 && mouseY > -500) {
            const cols = Math.ceil(width / gridSize)
            const rows = Math.ceil(height / gridSize)

            // Only check grid points near the mouse (performance optimization)
            const maxDistance = 200
            const startCol = Math.max(0, Math.floor((mouseX - maxDistance) / gridSize))
            const endCol = Math.min(cols, Math.ceil((mouseX + maxDistance) / gridSize))
            const startRow = Math.max(0, Math.floor((mouseY - maxDistance) / gridSize))
            const endRow = Math.min(rows, Math.ceil((mouseY + maxDistance) / gridSize))

            for (let i = startCol; i <= endCol; i++) {
                for (let j = startRow; j <= endRow; j++) {
                    const x = i * gridSize
                    const y = j * gridSize
                    const dx = mouseX - x
                    const dy = mouseY - y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const intensity = Math.max(0, 1 - distance / maxDistance)

                    if (intensity > 0) {
                        const glowSize = 3 + intensity * 8
                        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
                        gradient.addColorStop(0, glowColor.replace('0.15', `${0.6 * intensity}`))
                        gradient.addColorStop(1, 'transparent')
                        ctx.beginPath()
                        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
                        ctx.fillStyle = gradient
                        ctx.fill()

                        // Brighter dot at intersection
                        ctx.beginPath()
                        ctx.arc(x, y, 1, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + intensity * 0.3})`
                        ctx.fill()
                    }
                }
            }
        }

        animationRef.current = requestAnimationFrame(draw)
    }, [gridSize, glowColor, drawStatic])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            staticDrawnRef.current = false
            needsDrawRef.current = true
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
            needsDrawRef.current = true
        }

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 }
            needsDrawRef.current = true
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        
        animationRef.current = requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [draw])

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    )
}
