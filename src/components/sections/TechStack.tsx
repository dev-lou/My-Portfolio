'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { TechStack as TechStackType } from '@/lib/types'
import { Layers } from 'lucide-react'
import Image from 'next/image'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'
import TextPressure from '@/components/ui/TextPressure'

// Placeholder data for when Supabase is not configured
const placeholderTech: TechStackType[] = [
    // Frontend
    { id: '1', name: 'HTML', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', category: 'frontend', proficiency: 95, display_order: 1 },
    { id: '2', name: 'CSS', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', category: 'frontend', proficiency: 95, display_order: 2 },
    { id: '3', name: 'JavaScript', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', category: 'frontend', proficiency: 93, display_order: 3 },
    { id: '4', name: 'TypeScript', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'frontend', proficiency: 90, display_order: 4 },
    { id: '5', name: 'React', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'frontend', proficiency: 95, display_order: 5 },
    { id: '6', name: 'Next.js', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', category: 'frontend', proficiency: 92, display_order: 6 },
    { id: '7', name: 'Vite', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', category: 'frontend', proficiency: 88, display_order: 7 },
    { id: '8', name: 'Tailwind CSS', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend', proficiency: 95, display_order: 8 },
    { id: '9', name: 'Framer Motion', icon_url: 'https://cdn.simpleicons.org/framer', category: 'frontend', proficiency: 88, display_order: 9 },
    { id: '10', name: 'GSAP', icon_url: 'https://cdn.simpleicons.org/greensock/88CE02', category: 'frontend', proficiency: 85, display_order: 10 },
    { id: '11', name: 'Vue.js', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', category: 'frontend', proficiency: 80, display_order: 11 },
    
    // Backend
    { id: '12', name: 'PHP', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', category: 'backend', proficiency: 90, display_order: 12 },
    { id: '13', name: 'Laravel', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', category: 'backend', proficiency: 88, display_order: 13 },
    { id: '14', name: 'Python', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'backend', proficiency: 85, display_order: 14 },
    { id: '15', name: 'Flask', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', category: 'backend', proficiency: 82, display_order: 15 },
    { id: '16', name: 'Node.js', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'backend', proficiency: 80, display_order: 16 },
    { id: '17', name: 'Lua', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg', category: 'backend', proficiency: 75, display_order: 17 },
    
    // Mobile
    { id: '18', name: 'Flutter', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', category: 'mobile', proficiency: 90, display_order: 18 },
    { id: '19', name: 'Dart', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg', category: 'mobile', proficiency: 88, display_order: 19 },
    { id: '20', name: 'React Native', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'mobile', proficiency: 85, display_order: 20 },
    { id: '21', name: 'Expo', icon_url: 'https://cdn.worldvectorlogo.com/logos/expo-1.svg', category: 'mobile', proficiency: 83, display_order: 21 },
    { id: '22', name: 'Android Studio', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg', category: 'mobile', proficiency: 85, display_order: 22 },
    
    // Desktop
    { id: '23', name: 'C#', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', category: 'desktop', proficiency: 92, display_order: 23 },
    { id: '24', name: 'C++', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', category: 'desktop', proficiency: 88, display_order: 24 },
    { id: '25', name: 'Windows Forms', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg', category: 'desktop', proficiency: 90, display_order: 25 },
    { id: '26', name: 'Electron', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg', category: 'desktop', proficiency: 85, display_order: 26 },
    { id: '27', name: 'GDevelop', icon_url: 'https://cdn.simpleicons.org/gdevelop/674EFF', category: 'desktop', proficiency: 75, display_order: 27 },
    
    // Database
    { id: '28', name: 'MySQL', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', category: 'database', proficiency: 90, display_order: 28 },
    { id: '29', name: 'SQLite', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', category: 'database', proficiency: 88, display_order: 29 },
    { id: '30', name: 'Firebase', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', category: 'database', proficiency: 87, display_order: 30 },
    { id: '31', name: 'Supabase', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', category: 'database', proficiency: 85, display_order: 31 },
    { id: '32', name: 'Neon', icon_url: 'https://neon.tech/favicon/favicon.svg', category: 'database', proficiency: 82, display_order: 32 },
    { id: '33', name: 'PostgreSQL', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'database', proficiency: 80, display_order: 33 },
    
    // Cloud & Hosting
    { id: '34', name: 'Vercel', icon_url: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png', category: 'cloud', proficiency: 90, display_order: 34 },
    { id: '35', name: 'Netlify', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg', category: 'cloud', proficiency: 88, display_order: 35 },
    { id: '36', name: 'Render', icon_url: 'https://avatars.githubusercontent.com/u/36424661?s=200&v=4', category: 'cloud', proficiency: 85, display_order: 36 },
    { id: '37', name: 'Cloudflare', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg', category: 'cloud', proficiency: 82, display_order: 37 },
    { id: '38', name: 'InfinityFree', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg', category: 'cloud', proficiency: 80, display_order: 38 },
    
    // Dev Tools
    { id: '39', name: 'Git', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'tools', proficiency: 95, display_order: 39 },
    { id: '40', name: 'VS Code', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', category: 'tools', proficiency: 95, display_order: 40 },
    { id: '41', name: 'Figma', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', category: 'tools', proficiency: 85, display_order: 41 },
]

const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'database', label: 'Database' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'tools', label: 'Tools' },
]

// Animation variants
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
    }
}

export default function TechStack() {
    const [techStack, setTechStack] = useState<TechStackType[]>(placeholderTech)
    const [activeCategory, setActiveCategory] = useState('all')
    const sectionRef = useRef<HTMLElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    useEffect(() => {
        async function fetchTechStack() {
            try {
                const { data, error } = await supabase
                    .from('tech_stack')
                    .select('*')
                    .order('display_order')

                if (error) throw error
                if (data && data.length > 0) {
                    setTechStack(data)
                }
            } catch (error) {
                console.log('Using placeholder tech stack data')
            }
        }

        fetchTechStack()
    }, [])

    const filteredTech = activeCategory === 'all'
        ? techStack
        : techStack.filter(tech => tech.category === activeCategory)
    
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            frontend: 'from-blue-500 to-cyan-500',
            backend: 'from-purple-500 to-pink-500',
            mobile: 'from-green-500 to-emerald-500',
            desktop: 'from-orange-500 to-red-500',
            database: 'from-yellow-500 to-amber-500',
            ai: 'from-violet-500 to-purple-500',
            cloud: 'from-sky-500 to-blue-500',
            tools: 'from-gray-500 to-slate-500',
        }
        return colors[category] || 'from-blue-500 to-cyan-500'
    }

    return (
        <section
            id="techstack"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background with Parallax */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header with Animations */}
                <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <LetterSpawnTitle className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-6">
                                TECH STACK
                            </LetterSpawnTitle>
                            
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-12"
                            />
                        </motion.div>
                        
                        <ScrollRevealText className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto mb-12">
                            A curated collection of technologies, frameworks, and tools I use to bring ideas to life. From frontend to backend, I leverage cutting-edge solutions.
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
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === category.id
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                                        : 'glass-card hover:bg-white/10 hover:scale-105'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Tech Grid */}
                    <motion.div 
                        layout
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    >
                        {filteredTech.map((tech, index) => (
                            <motion.div
                                key={tech.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ 
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 20
                                }}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="relative p-4 rounded-xl glass-card group cursor-pointer"
                            >
                                {/* Category Color Indicator */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(tech.category)} rounded-t-2xl`} />
                                
                                {/* Icon */}
                                <div className="w-12 h-12 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    {tech.icon_url ? (
                                        <Image
                                            src={tech.icon_url}
                                            alt={tech.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-contain filter drop-shadow-lg"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(tech.category)} opacity-20 flex items-center justify-center`}>
                                            <span className="text-3xl font-black gradient-text">
                                                {tech.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Name & Category */}
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:gradient-text transition-all text-center">
                                    {tech.name}
                                </h3>
                                <p className="text-xs text-gray-400 capitalize text-center">{tech.category}</p>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getCategoryColor(tech.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
        </section>
    )
}
