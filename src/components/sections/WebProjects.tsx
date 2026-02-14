'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Globe } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import SlideInButton from '@/components/ui/SlideInButton'
import TiltCard from '@/components/ui/TiltCard'

// Real web projects
const placeholderWebProjects: Project[] = [
    {
        id: '1',
        title: 'CICTStore',
        description: 'A modern e-commerce platform for university merchandise with inventory management, order processing, AI-powered chatbot support, and Cloudflare CDN. Deployed with custom domain.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        gallery_images: [],
        tech_used: ['Laravel 11', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Cloudflare'],
        live_url: 'https://cictstore.me',
        github_url: null,
        created_at: '2025-01-01',
        display_order: 1,
    },
    {
        id: '2',
        title: 'Fraction',
        description: 'Tokenized real estate investment platform with blockchain simulation, MetaMask wallet integration, property listings with Leaflet maps, and CoinGecko API for live crypto prices.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        gallery_images: [],
        tech_used: ['Next.js', 'React', 'Supabase', 'Web3.js', 'Leaflet', 'Recharts'],
        live_url: 'https://fraction-lou.vercel.app/',
        github_url: 'https://github.com/dev-lou',
        created_at: '2024-06-01',
        display_order: 2,
    },
    {
        id: '3',
        title: 'ISUFST Clinic',
        description: 'Full-featured healthcare clinic management system with patient records, appointment scheduling, inventory, QR-based queue display, AI chatbot, and analytics dashboard. Deployed on Render.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        gallery_images: [],
        tech_used: ['Python', 'Flask', 'SQLite', 'Turso', 'Tailwind CSS', 'Chart.js'],
        live_url: 'https://isufst-clinic.onrender.com/',
        github_url: null,
        created_at: '2025-02-01',
        display_order: 3,
    },
    {
        id: '4',
        title: 'EduTrack',
        description: 'Comprehensive education management suite with student tracking, grade management, teacher dashboards, and admin reporting. Multi-role system for schools.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
        gallery_images: [],
        tech_used: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2025-01-01',
        display_order: 4,
    },
    {
        id: '5',
        title: 'RiceConnect',
        description: 'Agricultural marketplace connecting rice farmers with buyers. Features seller profiles, variety management, buyer ordering, and role-based access control.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
        gallery_images: [],
        tech_used: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'REST API'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2024-08-01',
        display_order: 5,
    },
    {
        id: '6',
        title: 'Lou Portfolio',
        description: 'This portfolio — a modern creative developer showcase with Three.js particle backgrounds, Framer Motion animations, smooth scroll, and section-based storytelling.',
        category: 'website',
        thumbnail_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
        gallery_images: [],
        tech_used: ['Next.js', 'Three.js', 'Framer Motion', 'GSAP', 'Supabase'],
        live_url: null,
        github_url: 'https://github.com/dev-lou',
        created_at: '2025-02-01',
        display_order: 6,
    },
]

export default function WebProjects() {
    const [projects, setProjects] = useState<Project[]>(placeholderWebProjects)
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    })

    // Moved out of JSX to comply with hooks rules
    // Extended scroll to ensure all 6 cards are fully visible before unpinning
    const horizontalX = useTransform(scrollYProgress, [0, 1], ['0%', '-85%'])
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    useEffect(() => {
        async function fetchWebProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('category', 'website')
                    .order('display_order')

                if (error) throw error
                if (data && data.length > 0) {
                    setProjects(data)
                }
            } catch (error) {
                console.log('Using placeholder web projects')
            }
        }

        fetchWebProjects()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="web-projects"
            className="relative min-h-[600vh]"
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_60%)]" />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                            className="tag mb-6"
                        >
                            <Globe className="w-3 h-3" />
                            Web Development
                        </motion.span>
                        <LetterSpawnTitle className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-wider">
                            MY WEB CREATIONS
                        </LetterSpawnTitle>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            className="text-lg text-gray-400 max-w-2xl"
                        >
                            Full-stack web applications and websites built with modern technologies.
                        </motion.p>
                    </motion.div>

                    {/* Horizontal Scrolling Cards */}
                    <div ref={containerRef} className="overflow-visible">
                        <motion.div 
                            style={{ 
                                x: horizontalX,
                                willChange: 'transform',
                            }}
                            className="flex gap-8 w-max"
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                                    className="w-[600px] flex-shrink-0"
                                >
                                    <TiltCard className="rounded-2xl" tiltIntensity={6}>
                                    <div className="relative p-6 rounded-2xl glass-card group hover:bg-white/5 transition-all duration-300">
                                        {/* Project Image */}
                                        <div className="relative w-full h-[350px] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                                            {project.thumbnail_url ? (
                                                <Image
                                                    src={project.thumbnail_url}
                                                    alt={project.title}
                                                    fill
                                                    sizes="600px"
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Globe className="w-20 h-20 text-blue-400/50" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
                                        </div>

                                        {/* Project Info */}
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech_used?.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Links */}
                                            <div className="flex gap-3 pt-4">
                                                {project.live_url && (
                                                    <SlideInButton
                                                        href={project.live_url}
                                                        variant="primary"
                                                        icon={<ExternalLink className="w-4 h-4" />}
                                                        iconPosition="right"
                                                    >
                                                        Live Demo
                                                    </SlideInButton>
                                                )}
                                                {project.github_url && (
                                                    <SlideInButton
                                                        href={project.github_url}
                                                        variant="secondary"
                                                        icon={<Github className="w-4 h-4" />}
                                                        iconPosition="right"
                                                    >
                                                        Source Code
                                                    </SlideInButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-12 flex items-center gap-4 justify-center">
                        <span className="text-sm text-gray-400">Scroll to explore</span>
                        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                style={{ width: progressWidth }}
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
