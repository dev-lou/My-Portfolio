'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Save, Loader2, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/lib/types'
import ImageUpload from '@/components/admin/ImageUpload'

export default function SettingsAdmin() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        avatar_url: '',
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .single()

            if (error && error.code !== 'PGRST116') throw error

            if (data) {
                setFormData({
                    name: data.name || '',
                    title: data.title || '',
                    bio: data.bio || '',
                    email: data.email || '',
                    avatar_url: data.avatar_url || '',
                })
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            // Check if profile exists
            const { data: existing } = await supabase
                .from('profiles')
                .select('id')
                .single()

            if (existing) {
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        ...formData,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', existing.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('profiles')
                    .insert([formData])

                if (error) throw error
            }

            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (error) {
            console.error('Error saving profile:', error)
            alert('Failed to save profile')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">Manage your profile information</p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            {formData.avatar_url ? (
                                <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-gray-500" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <ImageUpload
                                currentImage={formData.avatar_url}
                                onUpload={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
                                folder="profile"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Professional Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                            placeholder="Full-Stack Developer"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none"
                            placeholder="hello@example.com"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 outline-none resize-none"
                            placeholder="Tell visitors about yourself..."
                        />
                    </div>
                </div>

                {/* Submit */}
                <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : saved ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </motion.button>
            </form>
        </div>
    )
}
