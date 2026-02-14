'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Calendar, Moon, Code, Target, Zap, GraduationCap } from 'lucide-react'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'
import TextPressure from '@/components/ui/TextPressure'

const stats = [
    { icon: Code, value: '40+', label: 'Projects Built' },
    { icon: Moon, value: '∞', label: 'Sleepless Nights' },
    { icon: GraduationCap, value: '3rd Year', label: 'IT Student' },
    { icon: Target, value: '100%', label: 'Project Success' },
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    // Simplified parallax for performance
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.85])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden"
        >
            {/* Background with Parallax */}
            <motion.div
                style={{ y: backgroundY, opacity }}
                className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5"
            />
            <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]"
            />

            {/* Decorative Grid Lines */}
            <div
                className="absolute inset-0 opacity-20"
            >
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header with Animations */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        {/* Main Title with Letter Spawn Animation */}
                        <LetterSpawnTitle className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-6">
                            ABOUT ME
                        </LetterSpawnTitle>

                        {/* Accent Line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-12"
                        />
                    </motion.div>

                    {/* Description with Scroll Reveal Animation */}
                    <div className="max-w-5xl mx-auto">
                        <ScrollRevealText className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center">
                            As an AI augmented developer, I build fully functional websites with advanced effects and modern designs, focusing on creativity, usability, and a smooth user experience.
                        </ScrollRevealText>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative sticky top-32"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Decorative Elements - static borders instead of constantly rotating */}
                            <div className="absolute inset-0 rounded-3xl border border-dashed border-blue-500/20" />
                            <div className="absolute inset-4 rounded-3xl border border-cyan-500/15" />

                            {/* Main Image Container - Larger and clearer */}
                            <div className="absolute inset-6 rounded-2xl overflow-hidden border border-blue-500/20 bg-[#0a1628]">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Lou Vincent Baroro"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Lighter gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/30 via-transparent to-transparent" />
                                </div>

                                {/* Floating Info Cards - positioned outside photo to not cover face */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="absolute -left-4 bottom-8 px-4 py-3 rounded-xl glass-card"
                                >
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-white">Passi City, Philippines</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="absolute -right-4 bottom-20 px-4 py-3 rounded-xl glass-card"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm text-white">Available Now</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <div className="space-y-12">
                        {/* Story Paragraphs */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-2xl md:text-3xl font-bold text-white"
                            >
                                The journey so far
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-gray-300 leading-relaxed text-lg"
                            >
                                I&apos;m a 3rd-year IT student from Passi City, Iloilo, Philippines, and I&apos;ve been building real-world projects since my first year. From PHP school systems to full-stack Next.js apps, AI chatbots, and blockchain simulations — I learn by shipping. Every sleepless night taught me more than any textbook.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-2xl md:text-3xl font-bold text-white"
                            >
                                Beyond the code
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-gray-300 leading-relaxed text-lg"
                            >
                                When I&apos;m not coding, I&apos;m exploring AI tools, experimenting with new frameworks, or pushing commits at 3 AM. I thrive on turning ideas into polished products and I&apos;m always open to freelance work and collaborations.
                            </motion.p>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="p-5 rounded-xl glass-card group cursor-default"
                                >
                                    <stat.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:text-cyan-400 transition-colors" />
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
