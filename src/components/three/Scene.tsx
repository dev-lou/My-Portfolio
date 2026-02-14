'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticleField from './ParticleField'

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <ParticleField />
                </Suspense>
            </Canvas>
        </div>
    )
}
