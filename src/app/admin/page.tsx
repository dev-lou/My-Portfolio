'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, Award, Layers, TrendingUp, Clock, Plus } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface Stats {
    projects: number
    certificates: number
    techStack: number
}

const quickActions = [
    { name: 'Add Project', href: '/admin/projects', icon: FolderKanban, color: 'from-purple-500 to-violet-500' },
    { name: 'Add Certificate', href: '/admin/certificates', icon: Award, color: 'from-pink-500 to-rose-500' },
    { name: 'Add Tech', href: '/admin/techstack', icon: Layers, color: 'from-emerald-500 to-teal-500' },
]

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ projects: 0, certificates: 0, techStack: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const [projectsRes, certsRes, techRes] = await Promise.all([
                    supabase.from('projects').select('id', { count: 'exact', head: true }),
                    supabase.from('certificates').select('id', { count: 'exact', head: true }),
                    supabase.from('tech_stack').select('id', { count: 'exact', head: true }),
                ])

                setStats({
                    projects: projectsRes.count || 0,
                    certificates: certsRes.count || 0,
                    techStack: techRes.count || 0,
                })
            } catch (error) {
                console.log('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const statCards = [
        { name: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-purple-400', bg: 'from-purple-500/10 to-violet-500/10' },
        { name: 'Certificates', value: stats.certificates, icon: Award, color: 'text-pink-400', bg: 'from-pink-500/10 to-rose-500/10' },
        { name: 'Tech Stack', value: stats.techStack, icon: Layers, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-teal-500/10' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome back! Here&apos;s an overview of your portfolio.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl bg-gradient-to-br ${stat.bg} border border-white/5`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {loading ? '...' : stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.name}</div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={action.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Link
                                href={action.href}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                                    <Plus className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                        {action.name}
                                    </div>
                                    <div className="text-sm text-gray-500">Add new item</div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Clock className="w-12 h-12 text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No recent activity</h3>
                        <p className="text-gray-500 max-w-sm">
                            Start by adding your first project, certificate, or tech stack item.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
