'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
    const containerRef = useRef<HTMLElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !horizontalRef.current) return

            const panels = gsap.utils.toArray<HTMLElement>('.story-panel')
            
            // Calculate total width
            const totalWidth = horizontalRef.current.scrollWidth
            const windowWidth = window.innerWidth
            
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    pinSpacing: false,
                    snap: {
                        snapTo: 1 / (panels.length - 1),
                        duration: 0.5,
                        ease: 'power1.inOut'
                    },
                    end: () => `+=${totalWidth - windowWidth + 1000}`,
                    anticipatePin: 1,
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const stories = [
        {
            id: 1,
            title: 'The Beginning',
            subtitle: '// WHERE IT ALL STARTED',
            icon: '🚀',
            description: 'Started my journey in web development with a passion for creating beautiful and functional user interfaces. Learning the fundamentals and building my first projects.',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            borderGradient: 'from-blue-500/30 to-cyan-500/30'
        },
        {
            id: 2,
            title: 'The Growth',
            subtitle: '// EXPANDING HORIZONS',
            icon: '💻',
            description: 'Diving deeper into modern frameworks and technologies. Mastering React, Next.js, and TypeScript. Building real-world applications and solving complex problems.',
            gradient: 'from-purple-500/20 to-pink-500/20',
            borderGradient: 'from-purple-500/30 to-pink-500/30'
        },
        {
            id: 3,
            title: 'The Innovation',
            subtitle: '// PUSHING BOUNDARIES',
            icon: '⚡',
            description: 'Exploring cutting-edge technologies and animation libraries. Creating immersive experiences with Three.js, GSAP, and Framer Motion. Always learning and evolving.',
            gradient: 'from-pink-500/20 to-orange-500/20',
            borderGradient: 'from-pink-500/30 to-orange-500/30'
        },
        {
            id: 4,
            title: 'The Future',
            subtitle: '// WHAT\'S NEXT',
            icon: '🎯',
            description: 'Committed to continuous growth and excellence. Building amazing products, contributing to open source, and helping others on their journey. The best is yet to come.',
            gradient: 'from-green-500/20 to-teal-500/20',
            borderGradient: 'from-green-500/30 to-teal-500/30'
        }
    ]

    return (
        <section
            id="story"
            ref={containerRef}
            className="relative h-screen overflow-hidden bg-black"
            style={{ zIndex: 3 }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Horizontal Scroll Container */}
            <div ref={horizontalRef} className="flex h-full items-center">
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className="story-panel flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16"
                    >
                        <div className="max-w-3xl w-full">
                            {/* Story Card */}
                            <div className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${story.gradient} backdrop-blur-xl border border-white/10 shadow-2xl`}>
                                {/* Border Glow */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${story.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`} />
                                
                                {/* Icon */}
                                <div className="text-6xl md:text-8xl mb-6 animate-float">
                                    {story.icon}
                                </div>

                                {/* Subtitle */}
                                <p className="text-pink-400 text-xs md:text-sm font-mono tracking-widest mb-3 uppercase">
                                    {story.subtitle}
                                </p>

                                {/* Title */}
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    {story.title}
                                </h2>

                                {/* Description */}
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                    {story.description}
                                </p>

                                {/* Progress Indicator */}
                                <div className="flex gap-2 mt-8">
                                    {stories.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 rounded-full transition-all duration-300 ${
                                                i === index
                                                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                                                    : 'w-4 bg-white/20'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Scroll Hint (only on first panel) */}
                            {index === 0 && (
                                <div className="text-center mt-8 text-gray-400 text-sm font-mono animate-pulse">
                                    ← Scroll to explore my journey →
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
