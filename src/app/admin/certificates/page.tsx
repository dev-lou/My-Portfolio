'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, Award, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Certificate } from '@/lib/types'
import ImageUpload from '@/components/admin/ImageUpload'

export default function CertificatesAdmin() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCert, setEditingCert] = useState<Certificate | null>(null)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        image_url: '',
        date_earned: '',
    })

    useEffect(() => {
        fetchCertificates()
    }, [])

    const fetchCertificates = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .order('date_earned', { ascending: false })

            if (error) throw error
            setCertificates(data || [])
        } catch (error) {
            console.error('Error fetching certificates:', error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = (cert?: Certificate) => {
        if (cert) {
            setEditingCert(cert)
            setFormData({
                title: cert.title,
                issuer: cert.issuer || '',
                image_url: cert.image_url || '',
                date_earned: cert.date_earned,
            })
        } else {
            setEditingCert(null)
            setFormData({
                title: '',
                issuer: '',
                image_url: '',
                date_earned: new Date().toISOString().split('T')[0],
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCert(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (editingCert) {
                const { error } = await supabase
                    .from('certificates')
                    .update(formData)
                    .eq('id', editingCert.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('certificates')
                    .insert([formData])

                if (error) throw error
            }

            await fetchCertificates()
            closeModal()
        } catch (error) {
            console.error('Error saving certificate:', error)
            alert('Failed to save certificate')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return

        try {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('id', id)

            if (error) throw error
            await fetchCertificates()
        } catch (error) {
            console.error('Error deleting certificate:', error)
            alert('Failed to delete certificate')
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Certificates</h1>
                    <p className="text-gray-400">Manage your certifications and credentials</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl"
                >
                    <Plus className="w-5 h-5" />
                    Add Certificate
                </motion.button>
            </div>

            {/* Certificates Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
            ) : certificates.length === 0 ? (
                <div className="text-center py-20">
                    <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No certificates yet</p>
                    <button
                        onClick={() => openModal()}
                        className="text-emerald-400 hover:text-emerald-300"
                    >
                        Add your first certificate
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                                {cert.image_url ? (
                                    <img
                                        src={cert.image_url}
                                        alt={cert.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Award className="w-16 h-16 text-emerald-400/30" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatDate(cert.date_earned)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openModal(cert)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cert.id)}
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
                                    {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
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
                                        Certificate Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 outline-none"
                                        placeholder="AWS Solutions Architect"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Issuing Organization
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.issuer}
                                        onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 outline-none"
                                        placeholder="Amazon Web Services"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Date Earned
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date_earned}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date_earned: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Certificate Image
                                    </label>
                                    <ImageUpload
                                        currentImage={formData.image_url}
                                        onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                                        folder="certificates"
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
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium disabled:opacity-50"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {editingCert ? 'Save Changes' : 'Add Certificate'}
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
