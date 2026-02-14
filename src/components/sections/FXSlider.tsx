'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Smartphone, Globe, Palette, Database, Zap } from 'lucide-react'
import Image from 'next/image'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'

interface ServiceSlide {
    id: number
    title: string
    description: string
    features: string[]
    image: string
    color: string
    icon: React.ComponentType<{ className?: string }>
}

const services: ServiceSlide[] = [
    {
        id: 1,
        title: 'AI AUGMENTED DEV',
        description: 'Building intelligent applications powered by AI and modern frameworks',
        features: ['Gemini AI Integration', 'AI Chatbots', 'Smart Automation', 'Machine Learning', 'API Integration'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600',
        color: 'from-purple-500 to-pink-500',
        icon: Zap
    },
    {
        id: 2,
        title: 'FULL-STACK WEB',
        description: 'Creating production-ready web applications with modern technologies',
        features: ['React & Next.js', 'PHP & Laravel Blade', 'SEO Optimized', 'Cloudflare CDN', 'Domain Management'],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600',
        color: 'from-blue-500 to-cyan-500',
        icon: Globe
    },
    {
        id: 3,
        title: 'DESKTOP & MOBILE',
        description: 'Cross-platform applications for Windows and mobile devices',
        features: ['C# Windows Forms', 'Flutter Apps', 'React Native', 'Chat Applications', 'Native Performance'],
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600',
        color: 'from-green-500 to-emerald-500',
        icon: Smartphone
    },
    {
        id: 4,
        title: 'ENTERPRISE SYSTEMS',
        description: 'Custom CRM and management systems for businesses and schools',
        features: ['Accounting Systems', 'School Management', 'Attendance Tracking', 'Grades Management', 'Lost & Found Systems'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600',
        color: 'from-orange-500 to-red-500',
        icon: Database
    },
    {
        id: 5,
        title: 'CLOUD & HOSTING',
        description: 'Deploying and managing applications across multiple platforms',
        features: ['Vercel & Netlify', 'Render Hosting', 'InfinityFree', 'Supabase & Neon', 'SQLite Database'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600',
        color: 'from-cyan-500 to-blue-500',
        icon: Code
    }
]

export default function ServicesSlider() {
    const [currentIndex, setCurrentIndex] = useState(2)

    const leftItems = services.slice(0, currentIndex).reverse()
    const rightItems = services.slice(currentIndex + 1)

    return (
        <section
            id="services-slider"
            className="relative h-screen overflow-hidden"
        >
            {/* Instruction Hint */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full"
            >
                <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white/60 text-sm"
                >
                    ← Click text to explore
                </motion.div>
                <span className="text-white/40">|</span>
                <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="text-white/60 text-sm"
                >
                    or use arrows →
                </motion.div>
            </motion.div>
            {/* Background Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={services[currentIndex].image}
                        alt={services[currentIndex].title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${services[currentIndex].color} opacity-20`} />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
                {/* Left Side - Previous Items */}
                <motion.div 
                    className="hidden md:flex flex-col gap-3 items-start"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {leftItems.map((service, index) => (
                        <motion.button
                            key={service.id}
                            onClick={() => setCurrentIndex(services.indexOf(service))}
                            className="text-left text-white/40 hover:text-white transition-all duration-300 cursor-pointer group relative"
                            whileHover={{ x: 10, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`${index === 0 ? 'text-lg font-semibold' : 'text-sm'} relative`}>
                                {index === 0 && (
                                    <motion.span
                                        animate={{ x: [-3, 0, -3] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="inline-block"
                                    >
                                        ← 
                                    </motion.span>
                                )}
                                {service.title}
                            </span>
                            {index === 0 && (
                                <motion.div
                                    className="absolute inset-0 -z-10 bg-white/5 rounded-lg blur"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Center - Current Service */}
                <div className="flex flex-col items-center gap-8 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8">
                                    {(() => {
                                        const IconComponent = services[currentIndex].icon
                                        return <IconComponent className="w-10 h-10 text-white" />
                                    })()}
                                </div>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-wider mb-4">
                                    {services[currentIndex].title}
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                                    {services[currentIndex].description}
                                </p>
                                
                                {/* Features List */}
                                <div className="flex flex-wrap justify-center gap-3">
                                    {services[currentIndex].features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-4">
                        <span className="text-white/60 text-lg font-mono">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full bg-gradient-to-r ${services[currentIndex].color}`}
                                initial={{ width: '0%' }}
                                animate={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <span className="text-white/60 text-lg font-mono">
                            {String(services.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex md:hidden gap-2 mt-4">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-white scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side - Next Items */}
                <motion.div 
                    className="hidden md:flex flex-col gap-3 items-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {rightItems.map((service, index) => (
                        <motion.button
                            key={service.id}
                            onClick={() => setCurrentIndex(services.indexOf(service))}
                            className="text-right text-white/40 hover:text-white transition-all duration-300 cursor-pointer group relative"
                            whileHover={{ x: -10, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`${index === 0 ? 'text-lg font-semibold' : 'text-sm'} relative`}>
                                {service.title}
                                {index === 0 && (
                                    <motion.span
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="inline-block"
                                    >
                                         →
                                    </motion.span>
                                )}
                            </span>
                            {index === 0 && (
                                <motion.div
                                    className="absolute inset-0 -z-10 bg-white/5 rounded-lg blur"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
