'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Home, User, Zap, Code, Smartphone, History, Briefcase, Award, Mail } from 'lucide-react'

const sections = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'services-slider', icon: Zap, label: 'Services' },
    { id: 'web-projects', icon: Code, label: 'Web' },
    { id: 'mobile-projects', icon: Smartphone, label: 'Mobile' },
    { id: 'timeline', icon: History, label: 'Journey' },
    { id: 'techstack', icon: Briefcase, label: 'Stack' },
    { id: 'certificates', icon: Award, label: 'Certs' },
    { id: 'contact', icon: Mail, label: 'Contact' },
]

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    const [activeSection, setActiveSection] = useState('home')
    const [hoveredDot, setHoveredDot] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            const ids = sections.map(s => s.id)
            for (const id of [...ids].reverse()) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 200) {
                        setActiveSection(id)
                        break
                    }
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
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
        <>
            {/* Top bar - still visible on mobile */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 origin-left z-[200]"
                style={{ scaleX: scaleY }}
            />

            {/* Vertical dot timeline - desktop only */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-1">
                {/* Vertical line track */}
                <div className="absolute top-0 bottom-0 w-px bg-white/10 rounded-full" />
                
                {/* Progress fill */}
                <motion.div
                    className="absolute top-0 w-px bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full origin-top"
                    style={{ scaleY, height: '100%' }}
                />

                {/* Section dots */}
                {sections.map((section, i) => {
                    const Icon = section.icon
                    const isActive = activeSection === section.id
                    const activeIdx = sections.findIndex(s => s.id === activeSection)
                    const isPast = i <= activeIdx

                    return (
                        <div key={section.id} className="relative z-10 my-2">
                            <button
                                onClick={() => scrollTo(section.id)}
                                onMouseEnter={() => setHoveredDot(section.id)}
                                onMouseLeave={() => setHoveredDot(null)}
                                className="relative flex items-center justify-center"
                                data-magnetic
                            >
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1 : 0.7,
                                        opacity: isPast ? 1 : 0.4,
                                    }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                        isActive
                                            ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                                            : isPast
                                            ? 'bg-blue-500/30 border border-blue-500/50'
                                            : 'bg-white/5 border border-white/10'
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isActive || isPast ? 'text-white' : 'text-gray-500'}`} />
                                </motion.div>
                            </button>

                            {/* Label tooltip */}
                            <AnimatePresence>
                                {hoveredDot === section.id && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -8 }}
                                        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                                    >
                                        <div className="bg-[#0a1628]/90 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs text-white font-medium backdrop-blur-sm">
                                            {section.label}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
