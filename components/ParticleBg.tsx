'use client'
import { useEffect, useRef } from 'react'

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W=0, H=0, animId: number
    type P = { x:number;y:number;r:number;dx:number;dy:number;o:number }
    let particles: P[] = []
    function resize() {
      W = canvas!.width  = window.innerWidth
      H = canvas!.height = window.innerHeight
      particles = Array.from({ length: Math.floor((W*H)/12000) }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        r: Math.random()*1.0+0.2,
        dx: (Math.random()-0.5)*0.08, dy: (Math.random()-0.5)*0.08,
        o: Math.random()*0.3+0.05,
      }))
    }
    function draw() {
      ctx.clearRect(0,0,W,H)
      for (const p of particles) {
        p.x=(p.x+p.dx+W)%W; p.y=(p.y+p.dy+H)%H
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,229,255,${p.o})`; ctx.fill()
      }
      animId=requestAnimationFrame(draw)
    }
    window.addEventListener('resize', resize)
    resize(); draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />
}
