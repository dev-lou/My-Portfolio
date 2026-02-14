'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, Layers, GripVertical } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { TechStack } from '@/lib/types'
import ImageUpload from '@/components/admin/ImageUpload'

const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Other' },
]

export default function TechStackAdmin() {
    const [techStack, setTechStack] = useState<TechStack[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTech, setEditingTech] = useState<TechStack | null>(null)
    const [saving, setSaving] = useState(false)
    const [filterCategory, setFilterCategory] = useState<string>('all')

    const [formData, setFormData] = useState({
        name: '',
        icon_url: '',
        category: 'frontend' as TechStack['category'],
        proficiency: 80,
        display_order: 0,
    })

    useEffect(() => {
        fetchTechStack()
    }, [])

    const fetchTechStack = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('tech_stack')
                .select('*')
                .order('display_order')

            if (error) throw error
            setTechStack(data || [])
        } catch (error) {
            console.error('Error fetching tech stack:', error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = (tech?: TechStack) => {
        if (tech) {
            setEditingTech(tech)
            setFormData({
                name: tech.name,
                icon_url: tech.icon_url || '',
                category: tech.category,
                proficiency: tech.proficiency,
                display_order: tech.display_order,
            })
        } else {
            setEditingTech(null)
            setFormData({
                name: '',
                icon_url: '',
                category: 'frontend',
                proficiency: 80,
                display_order: techStack.length,
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingTech(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (editingTech) {
                const { error } = await supabase
                    .from('tech_stack')
                    .update(formData)
                    .eq('id', editingTech.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('tech_stack')
                    .insert([formData])

                if (error) throw error
            }

            await fetchTechStack()
            closeModal()
        } catch (error) {
            console.error('Error saving tech:', error)
            alert('Failed to save technology')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this technology?')) return

        try {
            const { error } = await supabase
                .from('tech_stack')
                .delete()
                .eq('id', id)

            if (error) throw error
            await fetchTechStack()
        } catch (error) {
            console.error('Error deleting tech:', error)
            alert('Failed to delete technology')
        }
    }

    const filteredTech = filterCategory === 'all'
        ? techStack
        : techStack.filter(tech => tech.category === filterCategory)

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'frontend': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
            case 'backend': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            case 'database': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            case 'tools': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tech Stack</h1>
                    <p className="text-gray-400">Manage your technology skills and tools</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl"
                >
                    <Plus className="w-5 h-5" />
                    Add Technology
                </motion.button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterCategory === 'all'
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    All ({techStack.length})
                </button>
                {categories.map(cat => {
                    const count = techStack.filter(t => t.category === cat.value).length
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setFilterCategory(cat.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterCategory === cat.value
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {cat.label} ({count})
                        </button>
                    )
                })}
            </div>

            {/* Tech Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
                </div>
            ) : filteredTech.length === 0 ? (
                <div className="text-center py-20">
                    <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No technologies found</p>
                    <button
                        onClick={() => openModal()}
                        className="text-pink-400 hover:text-pink-300"
                    >
                        Add your first technology
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredTech.map((tech, index) => (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-3 mx-auto">
                                {tech.icon_url ? (
                                    <img src={tech.icon_url} alt={tech.name} className="w-8 h-8 object-contain" />
                                ) : (
                                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        {tech.name.charAt(0)}
                                    </span>
                                )}
                            </div>

                            {/* Name & Category */}
                            <h3 className="text-center text-white font-medium mb-1 line-clamp-1">{tech.name}</h3>
                            <div className="flex justify-center mb-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs border ${getCategoryColor(tech.category)}`}>
                                    {tech.category}
                                </span>
                            </div>

                            {/* Proficiency */}
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                    style={{ width: `${tech.proficiency}%` }}
                                />
                            </div>
                            <span className="block text-center text-xs text-gray-500 mt-1">{tech.proficiency}%</span>

                            {/* Actions (on hover) */}
                            <div className="absolute inset-0 rounded-xl bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                <button
                                    onClick={() => openModal(tech)}
                                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(tech.id)}
                                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-[#0f0f0f] rounded-2xl border border-white/10"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold text-white">
                                    {editingTech ? 'Edit Technology' : 'Add New Technology'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Technology Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500 outline-none"
                                        placeholder="React"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as typeof formData.category }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-pink-500 outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Proficiency ({formData.proficiency}%)
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.proficiency}
                                        onChange={(e) => setFormData(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Icon Image
                                    </label>
                                    <ImageUpload
                                        currentImage={formData.icon_url}
                                        onUpload={(url) => setFormData(prev => ({ ...prev, icon_url: url }))}
                                        folder="techstack"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium disabled:opacity-50"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {editingTech ? 'Save Changes' : 'Add Technology'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
