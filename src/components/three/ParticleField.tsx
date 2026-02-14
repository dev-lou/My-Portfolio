'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null)
    const geometryRef = useRef<THREE.BufferGeometry>(null)
    const particleCount = 800

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30

            // Colors (purple to pink gradient)
            const t = Math.random()
            colors[i * 3] = 0.486 + t * 0.44 // R: purple to pink
            colors[i * 3 + 1] = 0.227 - t * 0.1 // G
            colors[i * 3 + 2] = 0.929 - t * 0.37 // B
        }

        return [positions, colors]
    }, [])

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                'position',
                new THREE.BufferAttribute(positions, 3)
            )
            geometryRef.current.setAttribute(
                'color',
                new THREE.BufferAttribute(colors, 3)
            )
        }
    }, [positions, colors])

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
