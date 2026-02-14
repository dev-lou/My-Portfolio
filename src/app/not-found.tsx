'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
            <div className="noise-overlay" />

            <div className="relative z-10 text-center px-6">
                {/* Glitch 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative mb-8"
                >
                    <h1 className="text-[10rem] sm:text-[14rem] font-heading font-bold leading-none tracking-tight bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                    {/* Glow behind */}
                    <div className="absolute inset-0 text-[10rem] sm:text-[14rem] font-heading font-bold leading-none tracking-tight text-blue-500/10 blur-2xl select-none flex items-center justify-center">
                        404
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-4 mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Page not found
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto text-lg">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl font-medium transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </motion.div>

                {/* Decorative scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                    animate={{ y: [-200, 200] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        </div>
    )
}
