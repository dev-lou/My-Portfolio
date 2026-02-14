'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code, Briefcase, Smartphone, History, Award, Mail, Zap, Menu, X } from 'lucide-react'

const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Services', href: '#services-slider', icon: Zap },
    { name: 'Web', href: '#web-projects', icon: Code },
    { name: 'Mobile', href: '#mobile-projects', icon: Smartphone },
    { name: 'Journey', href: '#timeline', icon: History },
    { name: 'Stack', href: '#techstack', icon: Briefcase },
    { name: 'Certs', href: '#certificates', icon: Award },
    { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('home')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.replace('#', ''))
            for (const section of sections.reverse()) {
                const el = document.getElementById(section)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Close mobile menu on scroll
    useEffect(() => {
        if (!mobileOpen) return
        const close = () => setMobileOpen(false)
        window.addEventListener('scroll', close, { once: true })
        return () => window.removeEventListener('scroll', close)
    }, [mobileOpen])

    const scrollToSection = (href: string) => {
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (el && typeof window !== 'undefined') {
            const lenis = (window as any).lenis
            if (lenis) {
                lenis.scrollTo(el, { offset: 0, duration: 1.5 })
            } else {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setMobileOpen(false)
    }

    return (
        <>
            {/* ===== MOBILE NAV ONLY ===== */}
            {/* Desktop navigation is handled by ScrollProgress timeline */}

            {/* Hamburger button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-6 right-6 z-[101] lg:hidden w-12 h-12 rounded-xl bg-[#0a1628]/90 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center shadow-2xl"
                data-magnetic
            >
                <AnimatePresence mode="wait">
                    {mobileOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X className="w-5 h-5 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Menu className="w-5 h-5 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Full-screen mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] lg:hidden bg-[#030712]/95 backdrop-blur-2xl"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
                            {navItems.map((item, index) => {
                                const Icon = item.icon
                                const isActive = activeSection === item.href.replace('#', '')

                                return (
                                    <motion.button
                                        key={item.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        onClick={() => scrollToSection(item.href)}
                                        className={`flex items-center gap-4 w-full max-w-xs px-6 py-4 rounded-2xl transition-all duration-300 ${
                                            isActive
                                                ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                            isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-white/5'
                                        }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-lg font-medium">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobileActive"
                                                className="ml-auto w-2 h-2 rounded-full bg-blue-500"
                                            />
                                        )}
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
