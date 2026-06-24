'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { projects, Project } from '@/lib/projects'
import ProjectModal from './ProjectModal'

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) meshRef.current.rotation.y = t * 0.3
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.04
      glowRef.current.scale.setScalar(s)
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </Float>
  )
}

function OrbitRing({ radius, opacity = 0.13 }: { radius: number; opacity?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Planet({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef  = useRef<THREE.Mesh>(null)
  const glowRef  = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const color = new THREE.Color(project.colorHex)

  useFrame((_, delta) => {
    angleRef.current += project.orbitSpeed * delta * 0.5
    const a = angleRef.current, r = project.orbitRadius
    if (groupRef.current) {
      groupRef.current.position.set(Math.cos(a) * r, Math.sin(a * 0.35) * 0.7, Math.sin(a) * r)
    }
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.9
    if (glowRef.current) {
      const s = 1 + Math.sin(Date.now() * 0.003) * 0.08
      glowRef.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}
        scale={hovered ? 1.4 : 1}
        onClick={() => onSelect(project)}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[project.size, 32, 32]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.45}
          roughness={0.2} metalness={0.75}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[project.size * (hovered ? 2.2 : 1.8), 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.12 : 0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function Scene({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight color="#00e5ff" intensity={3} distance={40} position={[0,0,0]} />
      <pointLight color="#ff6b35" intensity={1.2} distance={25} position={[10,5,0]} />
      <pointLight color="#7c3aed" intensity={0.8} distance={20} position={[-8,-3,5]} />
      <Stars radius={90} depth={60} count={4000} factor={3} saturation={0} fade speed={0.4} />
      <Sun />
      {projects.map(p => <OrbitRing key={p.id+'-r'} radius={p.orbitRadius} />)}
      {projects.map(p => <Planet key={p.id} project={p} onSelect={onSelect} />)}
      <OrbitControls
        enableZoom={false} enablePan={false}
        autoRotate autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.6}
      />
    </>
  )
}

export default function OrbitScene() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="orbit" style={{ position: 'relative', height: '100vh', zIndex: 10 }}>
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
        <p style={{ color: 'var(--grey)', fontSize: '0.82rem', maxWidth: 200, lineHeight: 1.5 }}>
          לחצו על כוכב לכת לפרטים
        </p>
      </div>

      {/* Bottom project pills */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 12, zIndex: 20, flexWrap: 'wrap', justifyContent: 'center',
        padding: '0 20px',
      }}>
        {projects.map(p => (
          <button key={p.id} onClick={() => setSelected(p)} style={{
            background: 'rgba(8,14,31,0.8)',
            border: `1px solid ${p.color}44`,
            borderRadius: 24, padding: '8px 18px',
            display: 'flex', alignItems: 'center', gap: 8,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}22`; e.currentTarget.style.borderColor = p.color }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(8,14,31,0.8)'; e.currentTarget.style.borderColor = `${p.color}44` }}
          >
            <span style={{ fontSize: '1rem' }}>{p.icon}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--grey)', fontFamily: 'inherit' }}>{p.name}</span>
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [0, 3, 16], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene onSelect={setSelected} />
      </Canvas>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
