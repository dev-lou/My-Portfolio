'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion'

// ==================== TYPES ====================
type Direction = 'bottom-top' | 'top-bottom' | 'left-right' | 'right-left'
type Effect = 'blur' | 'color-morph' | 'scramble' | 'typewriter' | 'kerning' | 'chromatic' | 'none'

interface RevealTextProps {
    children: string
    className?: string
    direction?: Direction
    fadeEdge?: number // 0-1, how soft the fade edge is
    effect?: Effect
    // Effect-specific options
    blurIntensity?: number
    colorFrom?: string
    colorTo?: string
    scrambleChars?: string
    kerningFrom?: number
    kerningTo?: number
    chromaticIntensity?: number
    typewriterCaret?: boolean
    // Scroll options
    scrollOffset?: [string, string]
    once?: boolean
    delay?: number
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

// ==================== UTILITIES ====================
const scrambleCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function getRandomChar(charset: string) {
    return charset[Math.floor(Math.random() * charset.length)]
}

function interpolateColor(color1: string, color2: string, progress: number): string {
    // Simple hex color interpolation
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')
    
    const r1 = parseInt(hex1.substring(0, 2), 16)
    const g1 = parseInt(hex1.substring(2, 4), 16)
    const b1 = parseInt(hex1.substring(4, 6), 16)
    
    const r2 = parseInt(hex2.substring(0, 2), 16)
    const g2 = parseInt(hex2.substring(2, 4), 16)
    const b2 = parseInt(hex2.substring(4, 6), 16)
    
    const r = Math.round(r1 + (r2 - r1) * progress)
    const g = Math.round(g1 + (g2 - g1) * progress)
    const b = Math.round(b1 + (b2 - b1) * progress)
    
    return `rgb(${r}, ${g}, ${b})`
}

// ==================== MAIN COMPONENT ====================
export function RevealText({
    children,
    className = '',
    direction = 'bottom-top',
    fadeEdge = 0.3,
    effect = 'none',
    blurIntensity = 10,
    colorFrom = '#4b5563',
    colorTo = '#ffffff',
    scrambleChars = scrambleCharset,
    kerningFrom = 0.2,
    kerningTo = 0,
    chromaticIntensity = 4,
    typewriterCaret = true,
    scrollOffset = ['start 90%', 'start 30%'],
    once = true,
    delay = 0,
    as = 'div',
}: RevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const completedProgress = useMotionValue(1)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: scrollOffset as any,
    })
    
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Track if animation completed for "once" mode
    useEffect(() => {
        if (!once) return
        const unsubscribe = smoothProgress.on('change', (v) => {
            if (v >= 0.99 && !hasAnimated) {
                setHasAnimated(true)
            }
        })
        return () => unsubscribe()
    }, [smoothProgress, once, hasAnimated])

    // Use completed value or live scroll progress
    const progress = hasAnimated ? completedProgress : smoothProgress

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {effect === 'chromatic' ? (
                <ChromaticText
                    text={children}
                    progress={progress}
                    direction={direction}
                    fadeEdge={fadeEdge}
                    intensity={chromaticIntensity}
                    as={as}
                />
            ) : effect === 'scramble' ? (
                <ScrambleText
                    text={children}
                    progress={progress}
                    direction={direction}
                    fadeEdge={fadeEdge}
                    charset={scrambleChars}
                    as={as}
                />
            ) : effect === 'typewriter' ? (
                <TypewriterText
                    text={children}
                    progress={progress}
                    showCaret={typewriterCaret}
                    as={as}
                />
            ) : (
                <StandardReveal
                    text={children}
                    progress={progress}
                    direction={direction}
                    fadeEdge={fadeEdge}
                    effect={effect}
                    blurIntensity={blurIntensity}
                    colorFrom={colorFrom}
                    colorTo={colorTo}
                    kerningFrom={kerningFrom}
                    kerningTo={kerningTo}
                    as={as}
                />
            )}
        </div>
    )
}

// ==================== STANDARD REVEAL ====================
interface StandardRevealProps {
    text: string
    progress: MotionValue<number>
    direction: Direction
    fadeEdge: number
    effect: Effect
    blurIntensity: number
    colorFrom: string
    colorTo: string
    kerningFrom: number
    kerningTo: number
    as: string
}

function StandardReveal({
    text,
    progress,
    direction,
    fadeEdge,
    effect,
    blurIntensity,
    colorFrom,
    colorTo,
    kerningFrom,
    kerningTo,
    as,
}: StandardRevealProps) {
    const words = text.split(' ')
    const Tag = as as any
    
    return (
        <Tag className="flex flex-wrap">
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="mr-[0.25em] inline-block">
                    {word.split('').map((char, charIndex) => {
                        const totalChars = text.replace(/ /g, '').length
                        const charPosition = text.slice(0, text.indexOf(word) + charIndex).replace(/ /g, '').length
                        
                        // Adjust position based on direction
                        let normalizedPosition = charPosition / totalChars
                        if (direction === 'top-bottom' || direction === 'right-left') {
                            normalizedPosition = 1 - normalizedPosition
                        }
                        
                        return (
                            <RevealChar
                                key={charIndex}
                                char={char}
                                progress={progress}
                                position={normalizedPosition}
                                fadeEdge={fadeEdge}
                                direction={direction}
                                effect={effect}
                                blurIntensity={blurIntensity}
                                colorFrom={colorFrom}
                                colorTo={colorTo}
                                kerningFrom={kerningFrom}
                                kerningTo={kerningTo}
                            />
                        )
                    })}
                </span>
            ))}
        </Tag>
    )
}

// ==================== REVEAL CHAR ====================
interface RevealCharProps {
    char: string
    progress: MotionValue<number>
    position: number
    fadeEdge: number
    direction: Direction
    effect: Effect
    blurIntensity: number
    colorFrom: string
    colorTo: string
    kerningFrom: number
    kerningTo: number
}

function RevealChar({
    char,
    progress,
    position,
    fadeEdge,
    direction,
    effect,
    blurIntensity,
    colorFrom,
    colorTo,
    kerningFrom,
    kerningTo,
}: RevealCharProps) {
    const [style, setStyle] = useState<React.CSSProperties>({})
    
    useEffect(() => {
        const unsubscribe = progress.on('change', (p) => {
            // Calculate reveal progress for this character
            const revealStart = position * (1 - fadeEdge)
            const revealEnd = revealStart + fadeEdge
            const charProgress = Math.max(0, Math.min(1, (p - revealStart) / (revealEnd - revealStart)))
            
            const newStyle: React.CSSProperties = {
                opacity: charProgress,
                display: 'inline-block',
            }
            
            // Direction-based transform
            const translateAmount = (1 - charProgress) * 20
            if (direction === 'bottom-top') {
                newStyle.transform = `translateY(${translateAmount}px)`
            } else if (direction === 'top-bottom') {
                newStyle.transform = `translateY(-${translateAmount}px)`
            } else if (direction === 'left-right') {
                newStyle.transform = `translateX(-${translateAmount}px)`
            } else if (direction === 'right-left') {
                newStyle.transform = `translateX(${translateAmount}px)`
            }
            
            // Apply effects
            if (effect === 'blur') {
                newStyle.filter = `blur(${(1 - charProgress) * blurIntensity}px)`
            }
            
            if (effect === 'color-morph') {
                newStyle.color = interpolateColor(colorFrom, colorTo, charProgress)
            }
            
            if (effect === 'kerning') {
                newStyle.letterSpacing = `${kerningFrom + (kerningTo - kerningFrom) * charProgress}em`
            }
            
            setStyle(newStyle)
        })
        
        return () => unsubscribe()
    }, [progress, position, fadeEdge, direction, effect, blurIntensity, colorFrom, colorTo, kerningFrom, kerningTo])
    
    return <span style={style}>{char}</span>
}

// ==================== CHROMATIC ABERRATION ====================
interface ChromaticTextProps {
    text: string
    progress: MotionValue<number>
    direction: Direction
    fadeEdge: number
    intensity: number
    as: string
}

function ChromaticText({ text, progress, direction, fadeEdge, intensity, as }: ChromaticTextProps) {
    const [offsets, setOffsets] = useState({ r: 0, g: 0, b: 0, opacity: 0 })
    const Tag = as as any
    
    useEffect(() => {
        const unsubscribe = progress.on('change', (p) => {
            const inverseProgress = 1 - p
            setOffsets({
                r: inverseProgress * intensity,
                g: 0,
                b: inverseProgress * -intensity,
                opacity: p,
            })
        })
        return () => unsubscribe()
    }, [progress, intensity])
    
    return (
        <Tag className="relative">
            {/* Red channel */}
            <span
                className="absolute inset-0"
                style={{
                    color: 'rgba(255, 0, 0, 0.5)',
                    transform: `translateX(${offsets.r}px)`,
                    opacity: offsets.opacity,
                }}
            >
                {text}
            </span>
            {/* Blue channel */}
            <span
                className="absolute inset-0"
                style={{
                    color: 'rgba(0, 0, 255, 0.5)',
                    transform: `translateX(${offsets.b}px)`,
                    opacity: offsets.opacity,
                }}
            >
                {text}
            </span>
            {/* Main text */}
            <span style={{ opacity: offsets.opacity }}>{text}</span>
        </Tag>
    )
}

// ==================== SCRAMBLE TEXT ====================
interface ScrambleTextProps {
    text: string
    progress: MotionValue<number>
    direction: Direction
    fadeEdge: number
    charset: string
    as: string
}

function ScrambleText({ text, progress, direction, fadeEdge, charset, as }: ScrambleTextProps) {
    // Start with original text to avoid hydration mismatch
    const [displayText, setDisplayText] = useState(text)
    const [opacity, setOpacity] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const Tag = as as any
    
    // Mark as mounted after hydration
    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    useEffect(() => {
        if (!isMounted) return
        
        const unsubscribe = progress.on('change', (p) => {
            setOpacity(p)
            
            const chars = text.split('')
            const revealedCount = Math.floor(p * chars.length)
            
            const newText = chars.map((char, i) => {
                if (char === ' ') return ' '
                if (i < revealedCount) return char
                return getRandomChar(charset)
            }).join('')
            
            setDisplayText(newText)
        })
        return () => unsubscribe()
    }, [progress, text, charset, isMounted])
    
    return (
        <Tag style={{ opacity: isMounted ? opacity : 0 }} className="font-mono" suppressHydrationWarning>
            {displayText}
        </Tag>
    )
}

// ==================== TYPEWRITER TEXT ====================
interface TypewriterTextProps {
    text: string
    progress: MotionValue<number>
    showCaret: boolean
    as: string
}

function TypewriterText({ text, progress, showCaret, as }: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('')
    const [showCaretState, setShowCaretState] = useState(true)
    const Tag = as as any
    
    useEffect(() => {
        const unsubscribe = progress.on('change', (p) => {
            const revealedCount = Math.floor(p * text.length)
            setDisplayText(text.slice(0, revealedCount))
        })
        return () => unsubscribe()
    }, [progress, text])
    
    // Blink caret
    useEffect(() => {
        if (!showCaret) return
        const interval = setInterval(() => {
            setShowCaretState(prev => !prev)
        }, 530)
        return () => clearInterval(interval)
    }, [showCaret])
    
    return (
        <Tag>
            {displayText}
            {showCaret && displayText.length < text.length && (
                <span
                    className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
                    style={{ opacity: showCaretState ? 1 : 0 }}
                />
            )}
        </Tag>
    )
}

// ==================== REVEAL BY WORD ====================
interface RevealByWordProps {
    children: string
    className?: string
    effect?: 'fade' | 'blur' | 'slide' | 'scale'
    direction?: Direction
    staggerDelay?: number
    scrollOffset?: [string, string]
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export function RevealByWord({
    children,
    className = '',
    effect = 'fade',
    direction = 'bottom-top',
    staggerDelay = 0.03,
    scrollOffset = ['start 90%', 'start 40%'],
    as = 'p',
}: RevealByWordProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const words = children.split(' ')
    const Tag = as as any
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: scrollOffset as any,
    })

    return (
        <div ref={containerRef}>
            <Tag className={`flex flex-wrap ${className}`}>
                {words.map((word, i) => (
                    <WordReveal
                        key={i}
                        word={word}
                        index={i}
                        total={words.length}
                        progress={scrollYProgress}
                        effect={effect}
                        direction={direction}
                        staggerDelay={staggerDelay}
                    />
                ))}
            </Tag>
        </div>
    )
}

interface WordRevealProps {
    word: string
    index: number
    total: number
    progress: MotionValue<number>
    effect: 'fade' | 'blur' | 'slide' | 'scale'
    direction: Direction
    staggerDelay: number
}

function WordReveal({ word, index, total, progress, effect, direction, staggerDelay }: WordRevealProps) {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 })
    
    useEffect(() => {
        const unsubscribe = progress.on('change', (p) => {
            const wordStart = (index / total) * 0.7
            const wordEnd = wordStart + 0.3
            const wordProgress = Math.max(0, Math.min(1, (p - wordStart) / (wordEnd - wordStart)))
            
            const newStyle: React.CSSProperties = {
                opacity: wordProgress,
                display: 'inline-block',
                marginRight: '0.25em',
            }
            
            if (effect === 'blur') {
                newStyle.filter = `blur(${(1 - wordProgress) * 8}px)`
            }
            
            if (effect === 'slide' || effect === 'fade') {
                const offset = (1 - wordProgress) * 30
                if (direction === 'bottom-top') {
                    newStyle.transform = `translateY(${offset}px)`
                } else if (direction === 'top-bottom') {
                    newStyle.transform = `translateY(-${offset}px)`
                } else if (direction === 'left-right') {
                    newStyle.transform = `translateX(-${offset}px)`
                } else {
                    newStyle.transform = `translateX(${offset}px)`
                }
            }
            
            if (effect === 'scale') {
                newStyle.transform = `scale(${0.8 + wordProgress * 0.2})`
            }
            
            setStyle(newStyle)
        })
        return () => unsubscribe()
    }, [progress, index, total, effect, direction])
    
    return <span style={style}>{word}</span>
}

// ==================== REVEAL LINE ====================
interface RevealLineProps {
    children: string
    className?: string
    effect?: Effect
    direction?: Direction
    blurIntensity?: number
    colorFrom?: string
    colorTo?: string
    scrollOffset?: [string, string]
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export function RevealLine({
    children,
    className = '',
    effect = 'blur',
    direction = 'bottom-top',
    blurIntensity = 10,
    colorFrom = '#4b5563',
    colorTo = '#ffffff',
    scrollOffset = ['start 85%', 'start 35%'],
    as = 'div',
}: RevealLineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const Tag = as as any
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: scrollOffset as any,
    })
    
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    })
    
    const opacity = useTransform(smoothProgress, [0, 1], [0, 1])
    const blur = useTransform(smoothProgress, [0, 1], [blurIntensity, 0])
    const color = useTransform(smoothProgress, [0, 1], [colorFrom, colorTo])
    
    const y = useTransform(smoothProgress, [0, 1], 
        direction === 'bottom-top' ? [40, 0] : 
        direction === 'top-bottom' ? [-40, 0] : [0, 0]
    )
    const x = useTransform(smoothProgress, [0, 1],
        direction === 'left-right' ? [-40, 0] :
        direction === 'right-left' ? [40, 0] : [0, 0]
    )

    return (
        <div ref={containerRef}>
            <motion.div
                style={{
                    opacity,
                    y,
                    x,
                    filter: effect === 'blur' ? blur.get() ? `blur(${blur.get()}px)` : 'none' : 'none',
                    color: effect === 'color-morph' ? color : undefined,
                }}
            >
                <Tag className={className}>{children}</Tag>
            </motion.div>
        </div>
    )
}

// ==================== SPLIT LINES REVEAL ====================
interface SplitLinesRevealProps {
    children: string
    className?: string
    lineClassName?: string
    effect?: 'blur' | 'slide' | 'fade' | 'scale'
    direction?: Direction
    stagger?: number
    scrollOffset?: [string, string]
}

export function SplitLinesReveal({
    children,
    className = '',
    lineClassName = '',
    effect = 'slide',
    direction = 'bottom-top',
    stagger = 0.1,
    scrollOffset = ['start 85%', 'start 25%'],
}: SplitLinesRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lines = children.split('\n').filter(line => line.trim())
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: scrollOffset as any,
    })

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, i) => (
                <LineReveal
                    key={i}
                    line={line}
                    index={i}
                    total={lines.length}
                    progress={scrollYProgress}
                    effect={effect}
                    direction={direction}
                    className={lineClassName}
                />
            ))}
        </div>
    )
}

interface LineRevealProps {
    line: string
    index: number
    total: number
    progress: MotionValue<number>
    effect: 'blur' | 'slide' | 'fade' | 'scale'
    direction: Direction
    className: string
}

function LineReveal({ line, index, total, progress, effect, direction, className }: LineRevealProps) {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 })
    
    useEffect(() => {
        const unsubscribe = progress.on('change', (p) => {
            const lineStart = (index / total) * 0.6
            const lineEnd = lineStart + 0.4
            const lineProgress = Math.max(0, Math.min(1, (p - lineStart) / (lineEnd - lineStart)))
            
            const newStyle: React.CSSProperties = {
                opacity: lineProgress,
            }
            
            if (effect === 'blur') {
                newStyle.filter = `blur(${(1 - lineProgress) * 6}px)`
            }
            
            if (effect === 'slide' || effect === 'fade') {
                const offset = (1 - lineProgress) * 50
                if (direction === 'bottom-top') {
                    newStyle.transform = `translateY(${offset}px)`
                } else if (direction === 'top-bottom') {
                    newStyle.transform = `translateY(-${offset}px)`
                } else if (direction === 'left-right') {
                    newStyle.transform = `translateX(-${offset}px)`
                } else {
                    newStyle.transform = `translateX(${offset}px)`
                }
            }
            
            if (effect === 'scale') {
                newStyle.transform = `scale(${0.9 + lineProgress * 0.1})`
            }
            
            setStyle(newStyle)
        })
        return () => unsubscribe()
    }, [progress, index, total, effect, direction])
    
    return <div style={style} className={className}>{line}</div>
}

export default RevealText
