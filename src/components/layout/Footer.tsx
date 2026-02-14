'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Facebook, Mail, Heart, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import SlideInButton, { SlideInButtonSmall } from '@/components/ui/SlideInButton'

const socialLinks = [
    { icon: Github, href: 'https://github.com/dev-lou', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lou-vincent-baroro-7b4a9630b/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/LVBaroro', label: 'Facebook' },
    { icon: Mail, href: 'mailto:louvincentj@gmail.com', label: 'Email' },
]

const footerLinks = [
    {
        title: 'Navigation',
        links: [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#web-projects' },
            { name: 'Contact', href: '#contact' },
        ],
    },
    {
        title: 'Sections',
        links: [
            { name: 'Services', href: '#services-slider' },
            { name: 'Tech Stack', href: '#techstack' },
            { name: 'Timeline', href: '#timeline' },
        ],
    },
]

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            const lenis = (window as any).lenis
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.5 })
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

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
    }

    return (
        <footer className="relative bg-black/50 border-t border-white/5 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="#home" className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold gradient-text">
                                Lou Vincent Baroro
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                            Crafting digital experiences with passion and precision.
                            Let&apos;s build something amazing together.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : window.open(link.href, '_blank')}
                                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-gray-400 text-sm flex items-center gap-1 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Lou Vincent Baroro. Made with
                        <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
                        and sleepless nights.
                    </p>

                    {/* Back to Top */}
                    <SlideInButtonSmall
                        onClick={scrollToTop}
                        variant="secondary"
                        icon={<ArrowUp className="w-4 h-4" />}
                        iconPosition="left"
                    >
                        Back to top
                    </SlideInButtonSmall>
                </div>
            </div>
        </footer>
    )
}
