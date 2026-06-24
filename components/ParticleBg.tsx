'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; r: number
  dx: number; dy: number; o: number
}

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    let particles: Particle[] = []
    let animId: number

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = Array.from({ length: Math.floor((W * H) / 9000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        dx: (Math.random() - 0.5) * 0.12,
        dy: (Math.random() - 0.5) * 0.12,
        o: Math.random() * 0.45 + 0.1,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x = (p.x + p.dx + W) % W
        p.y = (p.y + p.dy + H) % H
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${p.o})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize(); draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    }} />
  )
}
