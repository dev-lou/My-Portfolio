'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Rocket, Sparkles, Trophy, Zap, Clock } from 'lucide-react'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import Image from 'next/image'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'

interface TimelineYear {
    year: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    achievements: string[]
    projects: {
        id: number
        title: string
        image: string
        description: string
        tech: string[]
    }[]
}

const timelineData: TimelineYear[] = [
    {
        year: '2021',
        title: 'Foundation Years',
        description: 'Started development journey with PHP, MySQL and basic web technologies.',
        icon: Code,
        achievements: [
            'Learned HTML, CSS, JavaScript fundamentals',
            'Built first PHP CRUD systems',
            'Created student management systems',
            'Learned database design with MySQL'
        ],
        projects: [
            {
                id: 1,
                title: 'Smart Attendance',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
                description: 'Student attendance tracking with reports and subject management',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 2,
                title: 'Grade System',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
                description: 'Multi-role grade management for teachers, students, and admins',
                tech: ['PHP', 'MySQL', 'Bootstrap']
            },
            {
                id: 3,
                title: 'Lost & Found',
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600',
                description: 'Campus item tracking with activity feed and notifications',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 4,
                title: 'Hotel System',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
                description: 'Hotel booking, room management, and income reporting',
                tech: ['PHP', 'MySQL', 'jQuery']
            }
        ]
    },
    {
        year: '2022',
        title: 'Advanced Systems',
        description: 'Expanded into larger enterprise systems, CRMs, and multi-role platforms.',
        icon: Rocket,
        achievements: [
            'Built comprehensive CRM systems',
            'Created accounting and payment systems',
            'Developed enrollment platforms',
            'Learned role-based access control'
        ],
        projects: [
            {
                id: 5,
                title: 'CRMS',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
                description: 'Customer Relationship Management System with API and reporting',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 6,
                title: 'Payment System',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
                description: 'School payment management with accountant, cashier, and student roles',
                tech: ['PHP', 'MySQL', 'Bootstrap']
            },
            {
                id: 7,
                title: 'Enrollment System',
                image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600',
                description: 'Online course enrollment with fee management and student records',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 8,
                title: 'Online Exam',
                image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600',
                description: 'Online examination system with auto-grading and question banks',
                tech: ['PHP', 'MySQL', 'JavaScript']
            }
        ]
    },
    {
        year: '2023',
        title: 'Modern Stack',
        description: 'Transitioned to modern frameworks: React, Next.js, Flutter, and game development.',
        icon: Sparkles,
        achievements: [
            'Learned React and Next.js',
            'Built Flutter mobile applications',
            'Created blockchain simulation app',
            'Built an RPG game with GDevelop'
        ],
        projects: [
            {
                id: 9,
                title: 'ISUFST Connect',
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
                description: 'Campus announcement and communication hub',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 10,
                title: 'LouMeal',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
                description: 'Recipe finder app using TheMealDB API with offline storage',
                tech: ['React Native', 'Expo', 'SQLite']
            },
            {
                id: 11,
                title: 'Fraction',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600',
                description: 'Tokenized real estate blockchain platform with MetaMask integration',
                tech: ['Next.js', 'Web3.js', 'Supabase']
            },
            {
                id: 12,
                title: 'RPG Game',
                image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
                description: 'Pokémon-inspired RPG with tilesets, battles, and exploration',
                tech: ['GDevelop', 'JavaScript', 'Pixel Art']
            }
        ]
    },
    {
        year: '2024',
        title: 'AI & Full-Stack',
        description: 'Focused on AI-powered applications, Python Flask, and cloud deployment.',
        icon: Trophy,
        achievements: [
            'Built AI chatbots with Gemini API',
            'Learned Python Flask for web apps',
            'Mastered cloud hosting (Render, Vercel)',
            'Created healthcare management system'
        ],
        projects: [
            {
                id: 13,
                title: 'ISUFST Clinic',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
                description: 'Healthcare clinic system with queue, inventory, AI chatbot, and analytics',
                tech: ['Python', 'Flask', 'Turso', 'Tailwind']
            },
            {
                id: 14,
                title: 'RiceConnect',
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
                description: 'Agricultural marketplace connecting rice farmers with buyers',
                tech: ['PHP', 'MySQL', 'JavaScript']
            },
            {
                id: 15,
                title: 'CareConnect',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
                description: 'Patient management system with diagnosis, lab results, and history',
                tech: ['PHP', 'MySQL', 'Bootstrap']
            },
            {
                id: 16,
                title: 'Offline POS',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
                description: 'Point-of-sale app that works fully offline with local SQLite',
                tech: ['React Native', 'Expo', 'SQLite']
            }
        ]
    },
    {
        year: '2025',
        title: 'Full-Stack Mastery',
        description: 'Building enterprise Laravel apps, Flutter marketplace, and modern portfolio.',
        icon: Zap,
        achievements: [
            'Built production Laravel e-commerce (cictstore.me)',
            'Created cross-platform Flutter marketplace',
            'Deployed with custom domains and Cloudflare',
            'Built this animated portfolio with Three.js'
        ],
        projects: [
            {
                id: 17,
                title: 'CICTStore',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
                description: 'E-commerce platform with AI chatbot, deployed at cictstore.me',
                tech: ['Laravel 11', 'PostgreSQL', 'Vite']
            },
            {
                id: 18,
                title: 'Baryo Market',
                image: 'https://images.unsplash.com/photo-1555982105-d25af4182e4e?w=600',
                description: 'Local marketplace app for neighborhoods',
                tech: ['Flutter', 'Dart', 'Supabase']
            },
            {
                id: 19,
                title: 'EduTrack',
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
                description: 'Complete education management suite with multi-role dashboards',
                tech: ['PHP', 'MySQL', 'Chart.js']
            },
            {
                id: 20,
                title: 'Lou Portfolio',
                image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600',
                description: 'This portfolio with Three.js, Framer Motion, and GSAP',
                tech: ['Next.js', 'Three.js', 'Framer Motion']
            }
        ]
    }
]

export default function Timeline() {
    const [activeTab, setActiveTab] = useState(0)
    const [selectedProject, setSelectedProject] = useState<number | null>(null)

    return (
        <section
            id="timeline"
            className="relative min-h-screen py-32 bg-gradient-to-b from-[#030712] via-[#0a1628] to-[#030712] overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header with Animations */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <LetterSpawnTitle className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-6">
                            MY JOURNEY
                        </LetterSpawnTitle>
                        
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-12"
                        />
                    </motion.div>
                    
                    <ScrollRevealText className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto">
                        Click on a year to explore projects and achievements from that period. From student projects to production applications deployed worldwide.
                    </ScrollRevealText>
                </div>

                {/* Visual Tabs */}
                <div className="flex justify-center gap-4 mb-16">
                    {timelineData.map((year, index) => (
                        <button
                            key={year.year}
                            onClick={() => setActiveTab(index)}
                            className="relative"
                        >
                            <motion.div
                                className={`relative px-8 py-4 rounded-xl border transition-colors ${
                                    activeTab === index
                                        ? 'border-blue-500 text-white'
                                        : 'border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                            >
                                <span className="text-2xl font-heading font-bold">{year.year}</span>
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-500/20 rounded-xl -z-10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.div>
                        </button>
                    ))}
                </div>

                {/* Projects Grid - Visual Expansion */}
                <AnimatePresence mode="wait">
                    {selectedProject === null ? (
                        <motion.div
                            key={`grid-${activeTab}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                        >
                            {timelineData[activeTab].projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    onClick={() => setSelectedProject(project.id)}
                                    className="group relative aspect-[3/4] bg-[#0a1628] rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer"
                                >
                                    {/* Image Background */}
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />
                                    
                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: false, amount: 0.5 }}
                                            transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
                                        >
                                            <motion.h4
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.08 + 0.4 }}
                                                className="text-xl font-heading font-bold text-white mb-2"
                                            >
                                                {project.title}
                                            </motion.h4>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:opacity-100 transition-opacity"
                                            >
                                                {project.description}
                                            </motion.p>
                                            
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 backdrop-blur-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`expanded-${selectedProject}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="relative max-w-6xl mx-auto"
                            onClick={() => setSelectedProject(null)}
                        >
                            {(() => {
                                const project = timelineData[activeTab].projects.find(p => p.id === selectedProject)
                                if (!project) return null
                                
                                return (
                                    <div className="bg-[#0a1628] rounded-2xl border border-blue-500/30 overflow-hidden">
                                        <div className="relative h-[60vh]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                                            
                                            <div className="absolute bottom-0 left-0 right-0 p-12">
                                                <h3 className="text-5xl font-heading font-bold text-white mb-4">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xl text-gray-300 mb-6 max-w-3xl">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-3">
                                                    {project.tech.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30 backdrop-blur-sm"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                                <button className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
                                                    View Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()}
                            
                            <div className="mt-6 text-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedProject(null)
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    ← Back to grid
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
