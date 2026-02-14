'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Folder } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'
import SlideInButton from '@/components/ui/SlideInButton'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'
import TextPressure from '@/components/ui/TextPressure'

// Placeholder data
const placeholderProjects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
        category: 'website',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        live_url: 'https://example.com',
        github_url: 'https://github.com',
        created_at: '2024-01-01',
        display_order: 1,
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and instant transfers.',
        category: 'mobile',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['React Native', 'Node.js', 'MongoDB'],
        live_url: null,
        github_url: 'https://github.com',
        created_at: '2024-02-01',
        display_order: 2,
    },
    {
        id: '3',
        title: 'Space Adventure Game',
        description: 'An immersive 3D space exploration game with procedurally generated planets.',
        category: 'game',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['Unity', 'C#', 'Blender'],
        live_url: 'https://example.com',
        github_url: null,
        created_at: '2024-03-01',
        display_order: 3,
    },
    {
        id: '4',
        title: 'SaaS Dashboard',
        description: 'Analytics dashboard for SaaS applications with real-time metrics and reporting.',
        category: 'website',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['React', 'D3.js', 'Firebase'],
        live_url: 'https://example.com',
        github_url: 'https://github.com',
        created_at: '2024-04-01',
        display_order: 4,
    },
    {
        id: '5',
        title: 'Fitness Tracker',
        description: 'Cross-platform fitness app with workout tracking, diet planning, and social features.',
        category: 'mobile',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['Flutter', 'Dart', 'GraphQL'],
        live_url: null,
        github_url: 'https://github.com',
        created_at: '2024-05-01',
        display_order: 5,
    },
    {
        id: '6',
        title: 'Puzzle Platform',
        description: 'Mind-bending puzzle game with innovative mechanics and beautiful visuals.',
        category: 'game',
        thumbnail_url: null,
        gallery_images: [],
        tech_used: ['Godot', 'GDScript'],
        live_url: 'https://example.com',
        github_url: 'https://github.com',
        created_at: '2024-06-01',
        display_order: 6,
    },
]

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'website', label: 'Websites' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'game', label: 'Games' },
]

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(placeholderProjects)
    const [activeCategory, setActiveCategory] = useState('all')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('display_order')

                if (error) throw error
                if (data && data.length > 0) {
                    setProjects(data)
                }
            } catch (error) {
                console.log('Using placeholder projects data')
            }
        }

        fetchProjects()
    }, [])

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'website':
                return 'from-blue-500 to-cyan-500'
            case 'mobile':
                return 'from-cyan-500 to-teal-500'
            case 'game':
                return 'from-teal-500 to-emerald-500'
            default:
                return 'from-gray-500 to-gray-600'
        }
    }

    const getCategoryBadgeColor = (category: string) => {
        switch (category) {
            case 'website':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            case 'mobile':
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
            case 'game':
                return 'bg-teal-500/10 text-teal-400 border-teal-500/20'
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }

    return (
        <section id="projects" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
            {/* Background with Parallax */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

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
                            WEB PROJECTS
                        </LetterSpawnTitle>
                        
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-12"
                        />
                    </motion.div>
                    
                    <ScrollRevealText className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto">
                        Explore my portfolio of cutting-edge web applications built with modern technologies and best practices for optimal performance and user experience.
                    </ScrollRevealText>
                </div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'glass-card hover:bg-white/10'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid - Bento Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                                onClick={() => {
                                    setSelectedProject(project)
                                    setActiveImageIndex(0)
                                }}
                                className="group relative cursor-pointer"
                            >
                                <motion.div 
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative overflow-hidden rounded-2xl glass-card h-full min-h-[320px]"
                                >
                                    {/* Thumbnail */}
                                    {project.thumbnail_url ? (
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${getCategoryColor(project.category)} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border w-fit mb-3 ${getCategoryBadgeColor(project.category)}`}>
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            {project.description}
                                        </p>
                                        
                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                            {project.tech_used.slice(0, 3).map((tech) => (
                                                <span key={tech} className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech_used.length > 3 && (
                                                <span className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-400">
                                                    +{project.tech_used.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Placeholder Icon */}
                                    {!project.thumbnail_url && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className={`font-bold bg-gradient-to-r ${getCategoryColor(project.category)} bg-clip-text text-transparent ${index === 0 ? 'text-9xl' : 'text-6xl'}`}>
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Left - Image Gallery */}
                                <div className="relative bg-black/50">
                                    {/* Main Image */}
                                    <div className="aspect-square md:aspect-auto md:h-full relative">
                                        {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 ? (
                                            <img
                                                src={selectedProject.gallery_images[activeImageIndex]}
                                                alt={`${selectedProject.title} - Image ${activeImageIndex + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : selectedProject.thumbnail_url ? (
                                            <img
                                                src={selectedProject.thumbnail_url}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(selectedProject.category)} opacity-30 flex items-center justify-center`}>
                                                <span className="text-8xl font-bold text-white/20">
                                                    {selectedProject.title.charAt(0)}
                                                </span>
                                            </div>
                                        )}

                                        {/* Navigation Arrows */}
                                        {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setActiveImageIndex(prev => prev === 0 ? selectedProject.gallery_images!.length - 1 : prev - 1)}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setActiveImageIndex(prev => prev === selectedProject.gallery_images!.length - 1 ? 0 : prev + 1)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnail Navigation */}
                                    {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                            <div className="flex gap-2 justify-center">
                                                {selectedProject.gallery_images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setActiveImageIndex(index)}
                                                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === index
                                                                ? 'border-blue-500 scale-110'
                                                                : 'border-transparent opacity-50 hover:opacity-100'
                                                            }`}
                                                    >
                                                        <img
                                                            src={selectedProject.gallery_images![index]}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right - Details */}
                                <div className="p-8 flex flex-col">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border w-fit mb-4 ${getCategoryBadgeColor(selectedProject.category)}`}>
                                        {selectedProject.category}
                                    </span>

                                    <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>

                                    <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                                        {selectedProject.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech_used.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        {selectedProject.live_url && (
                                            <SlideInButton
                                                href={selectedProject.live_url}
                                                variant="primary"
                                                icon={<ExternalLink className="w-4 h-4" />}
                                                iconPosition="left"
                                            >
                                                Live Demo
                                            </SlideInButton>
                                        )}
                                        {selectedProject.github_url && (
                                            <SlideInButton
                                                href={selectedProject.github_url}
                                                variant="secondary"
                                                icon={<Github className="w-4 h-4" />}
                                                iconPosition="left"
                                            >
                                                Source Code
                                            </SlideInButton>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
