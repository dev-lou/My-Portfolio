'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Typed from 'typed.js'
import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import SlideInButton from '@/components/ui/SlideInButton'
import TextPressure from '@/components/ui/TextPressure'

interface HeroProps {
    isLoading: boolean
}

export default function Hero({ isLoading }: HeroProps) {
    const typedRef = useRef<HTMLSpanElement>(null)
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    // Lighter scroll effects for smoother performance
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    useEffect(() => {
        if (isLoading) return

        const timer = setTimeout(() => {
            if (typedRef.current) {
                const typed = new Typed(typedRef.current, {
                    strings: [
                        'AI Augmented Developer',
                        'Full-Stack Developer',
                        'Blockchain Developer',
                        'Mobile App Developer',
                        'Building Intelligent Solutions',
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|',
                })

                return () => typed.destroy()
            }
        }, 1200)

        return () => clearTimeout(timer)
    }, [isLoading])

    const scrollToAbout = () => {
        const el = document.getElementById('about')
        if (el && typeof window !== 'undefined') {
            const lenis = (window as any).lenis
            if (lenis) {
                lenis.scrollTo(el, { offset: 0, duration: 1.5 })
            } else {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />

            {/* Floating Elements - static for performance */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl opacity-40" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl opacity-30" />

            {/* Main Content */}
            <motion.div
                style={{
                    opacity,
                    y,
                    willChange: 'opacity, transform',
                }}
                className="container mx-auto px-6 lg:px-12 relative z-10"
            >
                <div className="max-w-6xl">
                    <div className="space-y-8">
                        {/* Tag */}
                        {!isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <span className="tag">
                                    Available for work
                                </span>
                            </motion.div>
                        )}

                        {/* Name - Large Typography */}
                        <div className="relative z-20 space-y-2">
                            {!isLoading && (
                                <>
                                    <motion.div
                                        layoutId="first-name"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        <h1 className="text-hero text-white">
                                            <TextPressure>LOU VINCENT</TextPressure>
                                        </h1>
                                    </motion.div>

                                    <motion.div
                                        layoutId="last-name"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <h1 className="text-hero text-cyan-400">
                                            <TextPressure>BARORO</TextPressure>
                                        </h1>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Typed Animation */}
                        {!isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-xl sm:text-2xl md:text-3xl text-gray-400 h-10 font-light"
                            >
                                <span ref={typedRef}></span>
                            </motion.div>
                        )}

                        {/* Description */}
                        {!isLoading && (
                            <motion.div
                                className="max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                    I craft exceptional digital experiences that merge stunning design with powerful functionality. Specializing in modern web technologies to help businesses stand out in the digital landscape.
                                </p>
                            </motion.div>
                        )}

                        {/* CTA Buttons */}
                        {!isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="flex flex-wrap gap-4 pt-4"
                            >
                                <SlideInButton
                                    variant="primary"
                                    onClick={() => {
                                        const el = document.getElementById('web-projects')
                                        if (el && typeof window !== 'undefined') {
                                            const lenis = (window as any).lenis
                                            if (lenis) {
                                                lenis.scrollTo(el, { offset: 0, duration: 1.5 })
                                            } else {
                                                el.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }
                                    }}
                                    icon={<ArrowRight className="w-4 h-4" />}
                                >
                                    View My Work
                                </SlideInButton>
                                <SlideInButton
                                    variant="secondary"
                                    onClick={() => {
                                        const el = document.getElementById('contact')
                                        if (el && typeof window !== 'undefined') {
                                            const lenis = (window as any).lenis
                                            if (lenis) {
                                                lenis.scrollTo(el, { offset: 0, duration: 1.5 })
                                            } else {
                                                el.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }
                                    }}
                                >
                                    Get In Touch
                                </SlideInButton>
                                <SlideInButton
                                    variant="secondary"
                                    onClick={() => {
                                        window.open('/resume.pdf', '_blank')
                                    }}
                                    icon={<Download className="w-4 h-4" />}
                                >
                                    Resume
                                </SlideInButton>
                            </motion.div>
                        )}

                        {/* Stats Row */}
                        {!isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex gap-12 pt-8 border-t border-white/5"
                            >
                                {[
                                    { value: '3+', label: 'Years Coding' },
                                    { value: '40+', label: 'Projects Built' },
                                    { value: '30+', label: 'Happy Clients' },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                onClick={scrollToAbout}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
                    <div className="w-6 h-10 border border-gray-600 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.button>
        </section>
    )
}
