'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion'
import { Award, X, Calendar, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Certificate } from '@/lib/types'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'

// Placeholder data
const placeholderCertificates: Certificate[] = [
    {
        id: '1',
        title: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        image_url: null,
        date_earned: '2024-01-15',
        created_at: '2024-01-15',
    },
    {
        id: '2',
        title: 'Google Cloud Professional',
        issuer: 'Google',
        image_url: null,
        date_earned: '2023-11-20',
        created_at: '2023-11-20',
    },
    {
        id: '3',
        title: 'Meta Frontend Developer',
        issuer: 'Meta',
        image_url: null,
        date_earned: '2023-09-10',
        created_at: '2023-09-10',
    },
    {
        id: '4',
        title: 'MongoDB Developer',
        issuer: 'MongoDB University',
        image_url: null,
        date_earned: '2023-07-05',
        created_at: '2023-07-05',
    },
]

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
    }
}

export default function Certificates() {
    const sectionRef = useRef<HTMLElement>(null)
    const [certificates, setCertificates] = useState<Certificate[]>(placeholderCertificates)
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

    useEffect(() => {
        async function fetchCertificates() {
            try {
                const { data, error } = await supabase
                    .from('certificates')
                    .select('*')
                    .order('date_earned', { ascending: false })

                if (error) throw error
                if (data && data.length > 0) {
                    setCertificates(data)
                }
            } catch (error) {
                console.log('Using placeholder certificates data')
            }
        }

        fetchCertificates()
    }, [])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        })
    }

    return (
        <section ref={sectionRef} id="certificates" className="relative py-32 overflow-hidden">
            {/* Background with Parallax */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.1),transparent_50%)]" />

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
                            CERTIFICATIONS
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
                        Professional certifications and credentials that validate my expertise. Continuous learning and skill development across multiple domains.
                    </ScrollRevealText>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                            onClick={() => setSelectedCertificate(cert)}
                            className="group relative cursor-pointer"
                        >
                            <motion.div 
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative p-6 rounded-2xl glass-card h-full"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Award className="w-7 h-7 text-cyan-400" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatDate(cert.date_earned)}</span>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCertificate(null)}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                {selectedCertificate.image_url ? (
                                    <Image
                                        src={selectedCertificate.image_url}
                                        alt={selectedCertificate.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <Award className="w-20 h-20 text-cyan-400/50 mx-auto mb-4" />
                                        <span className="text-gray-400">Certificate Preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedCertificate.title}</h2>
                                <p className="text-gray-400 mb-4">{selectedCertificate.issuer}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>Earned {formatDate(selectedCertificate.date_earned)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
