'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FuturisticSectionHeaderProps {
    title: string
    subtitle?: string
    description?: string
    icon?: LucideIcon
    align?: 'left' | 'center'
}

export default function FuturisticSectionHeader({
    title,
    subtitle,
    description,
    icon: Icon,
    align = 'center'
}: FuturisticSectionHeaderProps) {
    const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

    return (
        <div className={`flex flex-col ${alignClass} mb-20`}>
            {/* Icon Badge */}
            {Icon && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                </motion.div>
            )}

            {/* Main Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative mb-6"
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.9] mb-4">
                    {title}
                </h2>
                
                {/* Accent Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 ${align === 'center' ? 'mx-auto' : ''}`}
                />
            </motion.div>

            {/* Subtitle */}
            {subtitle && (
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-gray-400 mb-6"
                >
                    {subtitle}
                </motion.h3>
            )}

            {/* Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-4xl ${align === 'center' ? 'mx-auto' : ''}`}
                >
                    <span className="text-white">{description.split('.')[0]}.</span>
                    <span className="text-gray-400/80">{description.substring(description.indexOf('.') + 1)}</span>
                </motion.p>
            )}
        </div>
    )
}
