'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProviderProps {
    children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis with lighter scroll feel
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisRef.current = lenis

        // Integrate with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Expose lenis to window for global access
        if (typeof window !== 'undefined') {
            ; (window as any).lenis = lenis
        }

        // Cleanup
        return () => {
            lenis.destroy()
            gsap.ticker.remove(() => { })
            if (typeof window !== 'undefined') {
                delete (window as any).lenis
            }
        }
    }, [])

    return <>{children}</>
}
