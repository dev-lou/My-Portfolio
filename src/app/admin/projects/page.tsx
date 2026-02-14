'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, ExternalLink, Github, Search, Filter } from 'lucide-react'
import { supabase, BUCKET_NAME } from '@/lib/supabase'
import { Project } from '@/lib/types'
import ImageUpload from '@/components/admin/ImageUpload'

export const dynamic = 'force-dynamic'

const categories = [
    { value: 'website', label: 'Website' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'game', label: 'Game' },
]

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [saving, setSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState<string>('all')

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'website' as 'website' | 'mobile' | 'game',
        thumbnail_url: '',
        gallery_images: [] as string[],
        tech_used: [] as string[],
        live_url: '',
        github_url: '',
        display_order: 0,
    })

    const [techInput, setTechInput] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order')

            if (error) throw error
            setProjects(data || [])
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = (project?: Project) => {
        if (project) {
            setEditingProject(project)
            setFormData({
                title: project.title,
                description: project.description || '',
                category: project.category,
                thumbnail_url: project.thumbnail_url || '',
                gallery_images: project.gallery_images || [],
                tech_used: project.tech_used || [],
                live_url: project.live_url || '',
                github_url: project.github_url || '',
                display_order: project.display_order,
            })
        } else {
            setEditingProject(null)
            setFormData({
                title: '',
                description: '',
                category: 'website',
                thumbnail_url: '',
                gallery_images: [],
                tech_used: [],
                live_url: '',
                github_url: '',
                display_order: projects.length,
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingProject(null)
        setTechInput('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (editingProject) {
                const { error } = await supabase
                    .from('projects')
                    .update(formData)
                    .eq('id', editingProject.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([formData])

                if (error) throw error
            }

            await fetchProjects()
            closeModal()
        } catch (error) {
            console.error('Error saving project:', error)
            alert('Failed to save project')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id)

            if (error) throw error
            await fetchProjects()
        } catch (error) {
            console.error('Error deleting project:', error)
            alert('Failed to delete project')
        }
    }

    const addTech = () => {
        if (techInput.trim() && !formData.tech_used.includes(techInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tech_used: [...prev.tech_used, techInput.trim()],
            }))
            setTechInput('')
        }
    }

    const removeTech = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            tech_used: prev.tech_used.filter(t => t !== tech),
        }))
    }

    const addGalleryImage = (url: string) => {
        if (url && formData.gallery_images.length < 5) {
            setFormData(prev => ({
                ...prev,
                gallery_images: [...prev.gallery_images, url],
            }))
        }
    }

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.filter((_, i) => i !== index),
        }))
    }

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === 'all' || project.category === filterCategory
        return matchesSearch && matchesCategory
    })

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'website': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
            case 'mobile': return 'bg-pink-500/10 text-pink-400 border-pink-500/20'
            case 'game': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-gray-400">Manage your portfolio projects</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </motion.button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    />
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 mb-4">No projects found</p>
                    <button
                        onClick={() => openModal()}
                        className="text-purple-400 hover:text-purple-300"
                    >
                        Add your first project
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                {project.thumbnail_url ? (
                                    <img
                                        src={project.thumbnail_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white/20">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openModal(project)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
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
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#0f0f0f] rounded-2xl border border-white/10 my-8"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold text-white">
                                    {editingProject ? 'Edit Project' : 'Add New Project'}
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
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                                        placeholder="My Awesome Project"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'website' | 'mobile' | 'game' }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none resize-none"
                                        placeholder="Describe your project..."
                                    />
                                </div>

                                {/* Thumbnail */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Thumbnail Image
                                    </label>
                                    <ImageUpload
                                        currentImage={formData.thumbnail_url}
                                        onUpload={(url) => setFormData(prev => ({ ...prev, thumbnail_url: url }))}
                                        folder="projects/thumbnails"
                                    />
                                </div>

                                {/* Gallery Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Gallery Images (max 5)
                                    </label>
                                    <div className="grid grid-cols-5 gap-2 mb-2">
                                        {formData.gallery_images.map((img, index) => (
                                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                                                >
                                                    <X className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {formData.gallery_images.length < 5 && (
                                        <ImageUpload
                                            onUpload={addGalleryImage}
                                            folder="projects/gallery"
                                        />
                                    )}
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Tech Stack
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.tech_used.map(tech => (
                                            <span
                                                key={tech}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-sm"
                                            >
                                                {tech}
                                                <button type="button" onClick={() => removeTech(tech)}>
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                            className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none text-sm"
                                            placeholder="Add technology..."
                                        />
                                        <button
                                            type="button"
                                            onClick={addTech}
                                            className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* URLs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Live URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.live_url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.github_url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
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
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium disabled:opacity-50"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {editingProject ? 'Save Changes' : 'Create Project'}
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
