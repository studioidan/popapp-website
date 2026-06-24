'use client'
import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'
import { projects, Project } from '@/lib/projects'
import ProjectModal from './ProjectModal'

/* ── Sun (centre) ───────────────────────── */
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#00e5ff" emissive="#00e5ff"
          emissiveIntensity={0.7} roughness={0.1} metalness={0.9}
        />
      </mesh>
      {/* outer glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      {/* label */}
      <mesh position={[0, -1.8, 0]}>
        <planeGeometry args={[3, 0.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </Float>
  )
}

/* ── Orbit ring ─────────────────────────── */
function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0.13} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ── Planet ─────────────────────────────── */
function Planet({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angleRef.current += project.orbitSpeed * delta * 0.5
    const a = angleRef.current
    const r = project.orbitRadius
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(a) * r,
        Math.sin(a * 0.35) * 0.6,
        Math.sin(a) * r
      )
    }
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.8
  })

  const color = new THREE.Color(project.colorHex)

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        scale={hovered ? 1.35 : 1}
        onClick={() => onSelect(project)}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[project.size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.0 : 0.4}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      {/* glow when hovered */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[project.size * 1.7, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}

/* ── Scene ──────────────────────────────── */
function Scene({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight color="#00e5ff" intensity={2.5} distance={35} position={[0, 0, 0]} />
      <pointLight color="#ff6b35" intensity={1.0} distance={20} position={[8, 4, 0]} />
      <Stars radius={80} depth={60} count={3000} factor={3} saturation={0} fade speed={0.5} />

      <Sun />
      {projects.map(p => (
        <OrbitRing key={p.id + '-ring'} radius={p.orbitRadius} />
      ))}
      {projects.map(p => (
        <Planet key={p.id} project={p} onSelect={onSelect} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.6}
      />
    </>
  )
}

/* ── Exported section ───────────────────── */
export default function OrbitScene() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="orbit" style={{ position: 'relative', height: '100vh', zIndex: 10 }}>
      {/* Section label */}
      <div style={{
        position: 'absolute', top: 48, right: '8vw', zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--cyan)',
        }}>
          <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
          פרויקטים נבחרים
        </div>
        <p style={{ color: 'var(--grey)', fontSize: '0.85rem', maxWidth: 220, lineHeight: 1.5 }}>
          לחצו על כוכב לכת לפרטים
        </p>
      </div>

      {/* Project name labels */}
      <div style={{
        position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 32, zIndex: 20,
      }}>
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--grey)', fontFamily: 'inherit' }}>{p.name}</span>
          </button>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 3, 16], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene onSelect={setSelected} />
      </Canvas>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
