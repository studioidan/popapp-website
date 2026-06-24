'use client'
import { useEffect, useRef } from 'react'

export default function ParticleBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if(!c) return
    const ctx = c.getContext('2d')!
    let W=0,H=0,id:number
    type P={x:number;y:number;r:number;dx:number;dy:number;o:number}
    let ps:P[]=[]
    function resize(){
      W=c!.width=window.innerWidth; H=c!.height=window.innerHeight
      ps=Array.from({length:Math.floor(W*H/14000)},()=>({
        x:Math.random()*W, y:Math.random()*H,
        r:Math.random()*0.8+0.2,
        dx:(Math.random()-.5)*0.06, dy:(Math.random()-.5)*0.06,
        o:Math.random()*0.22+0.04,
      }))
    }
    function draw(){
      ctx.clearRect(0,0,W,H)
      for(const p of ps){
        p.x=(p.x+p.dx+W)%W; p.y=(p.y+p.dy+H)%H
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,229,255,${p.o})`; ctx.fill()
      }
      id=requestAnimationFrame(draw)
    }
    window.addEventListener('resize',resize); resize(); draw()
    return()=>{ window.removeEventListener('resize',resize); cancelAnimationFrame(id) }
  },[])
  return <canvas ref={ref} style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }} />
}
