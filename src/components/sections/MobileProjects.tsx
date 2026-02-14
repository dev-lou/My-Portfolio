'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Smartphone, ChevronDown, MousePointerClick } from 'lucide-react'
import Image from 'next/image'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import TiltCard from '@/components/ui/TiltCard'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'

// Real mobile/desktop projects
const placeholderProjects: Project[] = [
    {
        id: '1',
        title: 'Baryo Market',
        description: 'Local neighborhood marketplace app built with Flutter and Supabase. Features product listings, chat, order management, and cross-platform support for iOS, Android, and Web.',
        category: 'mobile',
        thumbnail_url: 'https://images.unsplash.com/photo-1555982105-d25af4182e4e?w=600',
        gallery_images: [],
        tech_used: ['Flutter', 'Dart', 'Supabase', 'Cross-Platform'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2025-01-01',
        display_order: 1,
    },
    {
        id: '2',
        title: 'LouMeal',
        description: 'Recipe finder mobile app using TheMealDB API. Browse recipes by category, search by ingredient, save favorites offline with SQLite, and enjoy smooth animations.',
        category: 'mobile',
        thumbnail_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
        gallery_images: [],
        tech_used: ['React Native', 'Expo', 'SQLite', 'REST API'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2024-03-01',
        display_order: 2,
    },
    {
        id: '3',
        title: 'Offline POS System',
        description: 'Point-of-sale mobile app that works completely offline with local SQLite database. Inventory tracking, receipt generation, and sales reports — no internet needed.',
        category: 'mobile',
        thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
        gallery_images: [],
        tech_used: ['React Native', 'Expo', 'SQLite', 'Offline-First'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2024-05-01',
        display_order: 3,
    },
    {
        id: '4',
        title: 'RPG Adventure Game',
        description: 'A Pokémon-inspired RPG game with custom tilesets, turn-based battles, gym battles, and exploration. Built entirely with visual game development tools.',
        category: 'mobile',
        thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
        gallery_images: [],
        tech_used: ['GDevelop', 'JavaScript', 'Pixel Art', 'Game Design'],
        live_url: null,
        github_url: null,
        created_at: '2023-06-01',
        display_order: 4,
    },
]

export default function MobileProjects() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [projects, setProjects] = useState<Project[]>(placeholderProjects)
    const [currentIndex, setCurrentIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    })

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('category', 'mobile')
                    .order('display_order')

                if (error) throw error
                if (data && data.length > 0) {
                    setProjects(data as Project[])
                }
            } catch (error) {
                // Silently use placeholder data if Supabase is not configured
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // Map scroll progress (0 to 1) to card index (0 to projects.length - 1)
            const progress = Math.max(0, Math.min(1, (latest - 0.2) / 0.6))
            const newIndex = Math.floor(progress * projects.length)
            const boundedIndex = Math.max(0, Math.min(newIndex, projects.length - 1))
            
            if (boundedIndex !== currentIndex) {
                setCurrentIndex(boundedIndex)
            }
        })

        return () => unsubscribe()
    }, [scrollYProgress, currentIndex, projects.length])

    const getCardPosition = (index: number) => {
        const position = (index - currentIndex + projects.length) % projects.length
        return position
    }

    return (
        <section
            ref={sectionRef}
            id="mobile-projects"
            className="relative bg-gradient-to-b from-[#030712] via-[#0a1628] to-[#030712]"
            style={{ height: `${Math.max(projects.length * 80, 300)}vh` }}
        >
            {/* Sticky Pinned Container */}
            <div className="sticky top-0 h-screen flex items-center">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10 w-full">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Smartphone className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">Mobile Development</span>
                        </div>
                        <LetterSpawnTitle className="text-5xl md:text-7xl mb-6">MOBILE APPS</LetterSpawnTitle>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
                            Scroll to shuffle through mobile applications
                        </p>
                        
                        {/* Scroll Instruction with Animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="flex items-center gap-2 text-blue-400/80 text-sm"
                            >
                                <MousePointerClick className="w-4 h-4" />
                                <span>Scroll down to explore</span>
                            </motion.div>
                            <ChevronDown className="w-5 h-5 text-blue-400/60" />
                        </motion.div>
                        
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex justify-center"
                        >
                            <ChevronDown className="w-6 h-6 text-blue-400" />
                        </motion.div>
                    </motion.div>

                    {/* Card Stack Container */}
                    <div className="relative h-[600px] max-w-md mx-auto">
                        <AnimatePresence mode="popLayout">
                            {projects.map((project, index) => {
                                const position = getCardPosition(index)
                                const isVisible = position < 3

                                if (!isVisible) return null

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                        animate={{
                                            scale: 1 - position * 0.05,
                                            y: position * 20,
                                            zIndex: 100 - position,
                                            opacity: position === 0 ? 1 : 0.5,
                                            rotateZ: position === 0 ? 0 : position * 2
                                        }}
                                        exit={{ scale: 0.8, opacity: 0, x: -200 }}
                                        transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                                        className="absolute inset-0"
                                        style={{ transformOrigin: 'center bottom' }}
                                    >
                                        <TiltCard className="w-full h-full rounded-2xl" tiltIntensity={5}>
                                        <div className="relative w-full h-full bg-[#0a1628] rounded-2xl border border-blue-500/20 overflow-hidden shadow-2xl">
                                            {/* Card Image */}
                                            <div className="relative h-3/5">
                                                <Image
                                                    src={project.thumbnail_url || '/placeholder.png'}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 448px"
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
                                            </div>

                                            {/* Card Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <h3 className="text-3xl font-heading font-bold text-white mb-3">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                
                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tech_used.slice(0, 4).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Links */}
                                                <div className="flex gap-3">
                                                    {project.github_url && (
                                                        <a
                                                            href={project.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white text-sm transition-colors"
                                                        >
                                                            <Github className="w-4 h-4" />
                                                            Code
                                                        </a>
                                                    )}
                                                    {project.live_url && (
                                                        <a
                                                            href={project.live_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Scroll Indicator */}
                                            {position === 0 && currentIndex < projects.length - 1 && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30"
                                                >
                                                    <span className="text-blue-400 text-sm">Scroll to shuffle</span>
                                                    <ChevronDown className="w-4 h-4 text-blue-400" />
                                                </motion.div>
                                            )}
                                        </div>
                                        </TiltCard>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>

                        {/* Progress Indicator */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {projects.map((_, index) => (
                                <div
                                    key={index}
                                    className={`transition-all ${
                                        index === currentIndex
                                            ? 'w-8 h-2 bg-blue-500'
                                            : 'w-2 h-2 bg-white/30'
                                    } rounded-full`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
