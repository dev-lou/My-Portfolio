'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import SlideInButton from '@/components/ui/SlideInButton'
import LetterSpawnTitle from '@/components/ui/LetterSpawnTitle'
import ScrollRevealText from '@/components/ui/ScrollRevealText'
import FuturisticSectionHeader from '@/components/ui/FuturisticSectionHeader'

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            // Store in Supabase (you can also integrate EmailJS here)
            const { error } = await supabase.from('messages').insert([formData])

            if (error) throw error
            setStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Error sending message:', error)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'louvincentj@gmail.com', href: 'mailto:louvincentj@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+63 970 598 2023', href: 'tel:+639705982023' },
        { icon: MapPin, label: 'Location', value: 'Passi City, Iloilo, Philippines', href: null },
    ]

    return (
        <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
            {/* Background with Parallax */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.08),transparent_40%)]" />

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
                            LET'S CONNECT
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
                        Have a project in mind or just want to chat about technology? I'm always open to discussing new opportunities and collaborations.
                    </ScrollRevealText>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-2xl glass-card">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((info) => (
                                    <motion.div 
                                        key={info.label} 
                                        className="flex items-start gap-4 group"
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <info.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-white hover:text-blue-400 transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-white">{info.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Card */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                        >
                            <h4 className="text-xl font-bold text-white mb-3">Open for opportunities</h4>
                            <p className="text-gray-400 leading-relaxed">
                                I&apos;m currently available for freelance work and interesting project collaborations.
                                If you have a project that needs my expertise, let&apos;s talk!
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-card space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <SlideInButton
                                type="submit"
                                disabled={status === 'loading'}
                                variant="primary"
                                fullWidth
                                icon={
                                    status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                    status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                    status === 'error' ? <AlertCircle className="w-5 h-5" /> :
                                    <Send className="w-5 h-5" />
                                }
                                iconPosition="left"
                            >
                                {status === 'loading' ? 'Sending...' :
                                    status === 'success' ? 'Message Sent!' :
                                        status === 'error' ? 'Failed to Send' : 'Send Message'}
                            </SlideInButton>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
