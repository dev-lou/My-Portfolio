'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'

// Layout Components
import SplashScreen from '@/components/layout/SplashScreen'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// Section Components
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import TechStack from '@/components/sections/TechStack'
import WebProjects from '@/components/sections/WebProjects'
import MobileProjects from '@/components/sections/MobileProjects'
import Timeline from '@/components/sections/Timeline'
import ServicesSlider from '@/components/sections/FXSlider'
import Certificates from '@/components/sections/Certificates'
import Contact from '@/components/sections/Contact'

// Animation Components
import GridHoverEffect from '@/components/animations/GridHoverEffect'
import SectionWrapper from '@/components/ui/SectionWrapper'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor from '@/components/ui/CustomCursor'
import {
  MeshGradientBg,
  CircuitBoardBg,
  AuroraBg,
  FloatingCodeBg,
  ScanLineBg,
  PerspectiveGridBg,
  WavePatternBg,
  HexagonBg,
} from '@/components/animations/SectionBackgrounds'

// Dynamic import for Three.js (client-side only)
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />

      {/* Grid Hover Effect Background */}
      <GridHoverEffect
        gridSize={50}
        glowColor="rgba(59, 130, 246, 0.15)"
      />

      {/* Splash Screen with AnimatePresence */}
      <AnimatePresence mode="popLayout">
        {isLoading && <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      {!isLoading && <ScrollProgress />}

      {/* Navigation - Always rendered, shows after splash */}
      {!isLoading && <Navigation />}

      {/* Three.js Background */}
      <Scene />

      {/* Main Content - Stacking Storytelling Effect */}
      <main className="relative">
        {/* Hero - Base layer */}
        <div className="relative z-10">
          <Hero isLoading={isLoading} />
        </div>

        {/* Infinite Marquee - Role Carousel */}
        <div className="relative z-15">
          <InfiniteMarquee />
        </div>

        {/* Each section stacks on top with smooth transitions */}
        <SectionWrapper zIndex={20} backgroundColor="bg-gradient-to-b from-black via-gray-900 to-black">
          <MeshGradientBg />
          <About />
        </SectionWrapper>

        <SectionWrapper zIndex={30} backgroundColor="bg-gradient-to-b from-black via-blue-950/20 to-black">
          <PerspectiveGridBg />
          <ServicesSlider />
        </SectionWrapper>

        <SectionWrapper zIndex={40} backgroundColor="bg-gradient-to-b from-black via-cyan-950/20 to-black">
          <ScanLineBg />
          <WebProjects />
        </SectionWrapper>

        <SectionWrapper zIndex={50} backgroundColor="bg-gradient-to-b from-black via-purple-950/20 to-black">
          <WavePatternBg />
          <MobileProjects />
        </SectionWrapper>

        <SectionWrapper zIndex={60} backgroundColor="bg-gradient-to-b from-black via-indigo-950/20 to-black">
          <FloatingCodeBg />
          <Timeline />
        </SectionWrapper>

        <SectionWrapper zIndex={70} backgroundColor="bg-gradient-to-b from-black via-teal-950/20 to-black">
          <CircuitBoardBg />
          <TechStack />
        </SectionWrapper>

        <SectionWrapper zIndex={80} backgroundColor="bg-gradient-to-b from-black via-violet-950/20 to-black">
          <HexagonBg />
          <Certificates />
        </SectionWrapper>

        <SectionWrapper zIndex={90} backgroundColor="bg-gradient-to-b from-black via-gray-900 to-black">
          <AuroraBg />
          <Contact />
        </SectionWrapper>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
