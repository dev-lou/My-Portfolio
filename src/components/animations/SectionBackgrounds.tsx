'use client'

import { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ===== MESH GRADIENT (About) =====
export function MeshGradientBg() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
                    style={{ top: '10%', left: '20%', background: 'rgba(59,130,246,0.3)' }}
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -60, 40, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
                    style={{ bottom: '20%', right: '15%', background: 'rgba(6,182,212,0.25)' }}
                    animate={{
                        x: [0, -60, 50, 0],
                        y: [0, 50, -30, 0],
                        scale: [1, 0.85, 1.15, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
                    style={{ top: '50%', left: '50%', background: 'rgba(139,92,246,0.2)' }}
                    animate={{
                        x: [0, 100, -80, 0],
                        y: [0, -80, 60, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
        </div>
    )
}

// ===== CIRCUIT BOARD (TechStack) =====
export function CircuitBoardBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()

        // Generate circuit nodes
        const nodeCount = 40
        const nodes: { x: number; y: number; connections: number[] }[] = []
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                connections: [],
            })
        }

        // Connect nearby nodes
        nodes.forEach((node, i) => {
            nodes.forEach((other, j) => {
                if (i === j) return
                const dist = Math.hypot(node.x - other.x, node.y - other.y)
                if (dist < 200 && node.connections.length < 3) {
                    node.connections.push(j)
                }
            })
        })

        let pulseProgress = 0
        let animId: number

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            pulseProgress = (pulseProgress + 0.003) % 1

            // Draw connections
            nodes.forEach((node, i) => {
                node.connections.forEach((j) => {
                    const other = nodes[j]
                    ctx.beginPath()
                    ctx.moveTo(node.x, node.y)

                    // Right-angle lines for circuit look
                    const midX = node.x + (other.x - node.x) * 0.5
                    ctx.lineTo(midX, node.y)
                    ctx.lineTo(midX, other.y)
                    ctx.lineTo(other.x, other.y)

                    ctx.strokeStyle = 'rgba(59,130,246,0.08)'
                    ctx.lineWidth = 1
                    ctx.stroke()

                    // Animated pulse along path
                    const t = (pulseProgress + i * 0.02) % 1
                    let px: number, py: number
                    if (t < 0.33) {
                        const lt = t / 0.33
                        px = node.x + (midX - node.x) * lt
                        py = node.y
                    } else if (t < 0.66) {
                        const lt = (t - 0.33) / 0.33
                        px = midX
                        py = node.y + (other.y - node.y) * lt
                    } else {
                        const lt = (t - 0.66) / 0.34
                        px = midX + (other.x - midX) * lt
                        py = other.y
                    }

                    ctx.beginPath()
                    ctx.arc(px, py, 2, 0, Math.PI * 2)
                    ctx.fillStyle = 'rgba(6,182,212,0.4)'
                    ctx.fill()
                })
            })

            // Draw nodes
            nodes.forEach((node) => {
                ctx.beginPath()
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(59,130,246,0.15)'
                ctx.fill()

                ctx.beginPath()
                ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(6,182,212,0.3)'
                ctx.fill()
            })

            animId = requestAnimationFrame(draw)
        }

        draw()

        const handleResize = () => {
            resizeCanvas()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        />
    )
}

// ===== AURORA BOREALIS (Contact) =====
export function AuroraBg() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute w-full h-[60%] bottom-0 opacity-20"
                style={{
                    background:
                        'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.15) 30%, rgba(6,182,212,0.1) 50%, rgba(139,92,246,0.1) 70%, transparent 100%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    skewX: [-3, 3, -3],
                    scaleY: [1, 1.15, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute w-[80%] h-[40%] bottom-[10%] left-[10%] opacity-15"
                style={{
                    background:
                        'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.2) 40%, rgba(59,130,246,0.15) 100%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    skewX: [2, -4, 2],
                    x: [-20, 40, -20],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute w-[60%] h-[30%] bottom-[20%] right-[5%] opacity-10"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(139,92,246,0.25), transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    y: [0, -30, 0],
                    scaleX: [1, 1.3, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    )
}

// ===== FLOATING CODE (Timeline) =====
export function FloatingCodeBg() {
    const codeSnippets = useMemo(
        () => [
            'const app = express()',
            'npm install',
            'git commit -m "feat"',
            'SELECT * FROM',
            'function build() {',
            'import React',
            '<div className=',
            'flutter run',
            'docker compose up',
            'export default',
            'async/await',
            '.then(res =>',
            'useState()',
            'deploy --prod',
        ],
        []
    )

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
            {codeSnippets.map((snippet, i) => (
                <motion.div
                    key={i}
                    className="absolute text-blue-400 font-mono text-sm whitespace-nowrap"
                    style={{
                        left: `${(i * 17) % 90}%`,
                        top: `${(i * 23) % 90}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 6 + (i % 4) * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    {snippet}
                </motion.div>
            ))}
        </div>
    )
}

// ===== SCAN LINE / GLITCH (WebProjects) =====
export function ScanLineBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Horizontal scan lines */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)',
                }}
            />
            {/* Moving scan line */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                animate={{ top: ['-1%', '101%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
}

// ===== GRID PATTERN (Services/FXSlider) =====
export function PerspectiveGridBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    perspective: '500px',
                    transform: 'perspective(500px) rotateX(60deg) scale(2.5)',
                    transformOrigin: 'center top',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>
    )
}

// ===== DNA HELIX / WAVE (MobileProjects) =====
export function WavePatternBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 800" preserveAspectRatio="none">
                <motion.path
                    d="M0,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400"
                    stroke="rgba(59,130,246,0.5)"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{
                        d: [
                            'M0,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400',
                            'M0,400 C200,500 400,300 600,400 C800,500 1000,300 1200,400',
                            'M0,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                    d="M0,400 C200,500 400,300 600,400 C800,500 1000,300 1200,400"
                    stroke="rgba(6,182,212,0.4)"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{
                        d: [
                            'M0,400 C200,500 400,300 600,400 C800,500 1000,300 1200,400',
                            'M0,400 C200,300 400,500 600,400 C800,300 1000,500 1200,400',
                            'M0,400 C200,500 400,300 600,400 C800,500 1000,300 1200,400',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </svg>
            {/* Floating dots on the waves */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-blue-500/20"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: '50%',
                    }}
                    animate={{
                        y: [-30, 30, -30],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

// ===== HEXAGON GRID (Certificates) =====
export function HexagonBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path
                            d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                            fill="none"
                            stroke="rgba(59,130,246,0.4)"
                            strokeWidth="0.5"
                        />
                        <path
                            d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
                            fill="none"
                            stroke="rgba(6,182,212,0.3)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
        </div>
    )
}
