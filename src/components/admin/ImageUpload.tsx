'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Loader2, CheckCircle } from 'lucide-react'
import { supabase, BUCKET_NAME } from '@/lib/supabase'

interface ImageUploadProps {
    onUpload: (url: string) => void
    currentImage?: string | null
    folder?: string
}

export default function ImageUpload({ onUpload, currentImage, folder = 'images' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(currentImage || null)
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (file: File) => {
        if (!file) return

        setUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${folder}/${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true,
                })

            if (uploadError) throw uploadError

            const { data: urlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(fileName)

            setPreview(urlData.publicUrl)
            onUpload(urlData.publicUrl)
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Show local preview
            const reader = new FileReader()
            reader.onload = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)

            handleUpload(file)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)

        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)

            handleUpload(file)
        }
    }

    const removeImage = () => {
        setPreview(null)
        onUpload('')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
            />

            {preview ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <label
                            htmlFor="image-upload"
                            className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium cursor-pointer hover:bg-white/20 transition-colors"
                        >
                            Change
                        </label>
                        <button
                            onClick={removeImage}
                            className="px-4 py-2 bg-red-500/20 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                        </div>
                    )}
                </div>
            ) : (
                <label
                    htmlFor="image-upload"
                    onDragOver={(e) => {
                        e.preventDefault()
                        setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer ${dragOver
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-white/10'
                        }`}
                >
                    {uploading ? (
                        <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                    ) : (
                        <>
                            <Upload className="w-10 h-10 text-gray-500 mb-3" />
                            <p className="text-sm text-gray-400 mb-1">Drag and drop or click to upload</p>
                            <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
                        </>
                    )}
                </label>
            )}
        </div>
    )
}
