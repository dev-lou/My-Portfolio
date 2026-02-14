export interface Profile {
    id: string
    name: string
    title: string
    bio: string
    email: string
    avatar_url: string | null
    updated_at: string
}

export interface Project {
    id: string
    title: string
    description: string
    category: 'website' | 'mobile' | 'game'
    thumbnail_url: string | null
    gallery_images: string[]
    tech_used: string[]
    live_url: string | null
    github_url: string | null
    created_at: string
    display_order: number
}

export interface Certificate {
    id: string
    title: string
    issuer: string
    image_url: string | null
    date_earned: string
    created_at: string
}

export interface TechStack {
    id: string
    name: string
    icon_url: string | null
    category: 'frontend' | 'backend' | 'mobile' | 'desktop' | 'database' | 'cloud' | 'tools' | 'other'
    proficiency: number
    display_order: number
}
