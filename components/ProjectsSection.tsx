'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

const RADIUS = 300
const CARD_W = 272
const CARD_H = 360
const AUTO_SPEED = 0.007

export default function ProjectsSection() {
  const [angle, setAngle] = useState(0)
  const angleRef = useRef(0)
  const velRef = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const rafRef = useRef(0)
  const isInView = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const count = projects.length
  const STEP = 360 / count

  // ── RAF loop ──────────────────────────────────
  useEffect(() => {
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16, 3)
      last = now
      if (!isDragging.current) {
        if (Math.abs(velRef.current) > 0.02) {
          velRef.current *= Math.pow(0.91, dt)
          angleRef.current += velRef.current * dt
        } else {
          velRef.current = 0
          if (isInView.current && hovered === null)
            angleRef.current += AUTO_SPEED * dt
        }
        setAngle(angleRef.current)
      }
      const best = projects.reduce((bi, _, i) => {
        const cosI = Math.cos(((angleRef.current + i * STEP) * Math.PI) / 180)
        const cosB = Math.cos(((angleRef.current + bi * STEP) * Math.PI) / 180)
        return cosI > cosB ? i : bi
      }, 0)
      setActiveIdx(best)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovered, STEP])

  // ── IntersectionObserver ──────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { isInView.current = e.isIntersecting }, { threshold: 0.25 })
    if (stageRef.current) obs.observe(stageRef.current)
    return () => obs.disconnect()
  }, [])

  // ── Keyboard ─────────────────────────────────
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { velRef.current -= 3; e.preventDefault() }
      if (e.key === 'ArrowRight') { velRef.current += 3; e.preventDefault() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  // ── Drag ─────────────────────────────────────
  const onPD = (e: React.PointerEvent) => {
    isDragging.current = true; lastX.current = e.clientX; velRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPM = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastX.current
    velRef.current = dx * 0.22
    angleRef.current += velRef.current
    setAngle(angleRef.current)
    lastX.current = e.clientX
  }
  const onPU = () => { isDragging.current = false }

  // ── Snap ─────────────────────────────────────
  const snapTo = useCallback((i: number) => {
    const target = -i * STEP
    const cur = angleRef.current
    let diff = ((target - cur) % 360 + 540) % 360 - 180
    velRef.current = 0
    angleRef.current = cur + diff
    setAngle(angleRef.current)
  }, [STEP])

  const goNext = () => snapTo((activeIdx + 1) % count)
  const goPrev = () => snapTo((activeIdx - 1 + count) % count)

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 10, padding: 'clamp(80px,10vw,140px) 0' }}>

      {/* header */}
      <div style={{ padding: '0 clamp(24px,7vw,100px)', marginBottom: 'clamp(40px,5vw,64px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10,
          fontSize:'0.7rem', fontWeight:700, letterSpacing:'3px',
          textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.5rem)', fontWeight:900, letterSpacing:'-2px', lineHeight:1.0 }}>
          מוצרים שאנשים{' '}
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            באמת משתמשים בהם.
          </span>
        </h2>
      </div>

      <p style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.68rem',
        letterSpacing:'2px', textTransform:'uppercase', marginBottom:40 }}>
        גרור · חצים ← → · לחץ על פרויקט
      </p>

      {/* ── CAROUSEL WRAPPER ─────────────────────── */}
      <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>

        {/* LEFT arrow */}
        <button onClick={goPrev} style={arrowStyle('right')}>→</button>

        {/* 3D STAGE — fixed height, perspective centered */}
        <div
          ref={stageRef}
          onPointerDown={onPD} onPointerMove={onPM}
          onPointerUp={onPU}   onPointerLeave={onPU}
          style={{
            width: '100%', height: 480,
            perspective: 1000,
            perspectiveOrigin: '50% 50%',
            position: 'relative',
            overflow: 'visible',
            cursor: isDragging.current ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          {projects.map((p, i) => {
            const a     = ((angle + i * STEP) % 360 + 360) % 360
            const rad   = (a * Math.PI) / 180
            const x     = Math.sin(rad) * RADIUS
            const z     = Math.cos(rad) * RADIUS
            const depth = z / RADIUS
            const scale  = 0.5 + depth * 0.5
            const opacity = Math.max(0.06, 0.2 + depth * 0.8)
            const zIdx   = Math.round((depth + 1) * 100)
            const isFront = depth > 0.86
            const isHov  = hovered === i

            return (
              <div key={p.id}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                onClick={() => isFront ? (p.link && window.open(p.link,'_blank')) : snapTo(i)}
                style={{
                  position: 'absolute',
                  width: CARD_W, height: CARD_H,
                  // CENTER card in the stage: offset by half card size + translate
                  left: '50%', top: '50%',
                  marginLeft: -CARD_W / 2,
                  marginTop:  -CARD_H / 2,
                  transform: `translateX(${x}px) translateZ(${z}px) scale(${isHov && isFront ? scale * 1.05 : scale})`,
                  zIndex: isHov ? 300 : zIdx,
                  opacity,
                  transition: isDragging.current ? 'opacity 0.1s' : 'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease',
                  cursor: isFront ? (p.link ? 'pointer' : 'default') : 'pointer',
                  borderRadius: 22, overflow: 'hidden',
                  border: isFront ? `1px solid ${p.color}88` : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: isFront
                    ? `0 0 0 1px ${p.color}22, 0 28px 70px ${p.color}55, inset 0 1px 0 rgba(255,255,255,0.1)`
                    : '0 8px 32px rgba(0,0,0,0.5)',
                  background: `linear-gradient(160deg, ${p.gradientFrom}20 0%, rgba(4,7,15,0.97) 65%)`,
                }}
              >
                {/* scanlines */}
                <div style={{ position:'absolute',inset:0,zIndex:3,pointerEvents:'none',borderRadius:22,
                  backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px)' }} />

                {/* corner accents */}
                {[
                  {top:0,right:0,borderTop:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 22px 0 0'},
                  {top:0,left:0, borderTop:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`, borderRadius:'22px 0 0 0'},
                  {bottom:0,right:0,borderBottom:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 0 22px 0'},
                  {bottom:0,left:0, borderBottom:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`, borderRadius:'0 0 0 22px'},
                ].map((s,ci) => (
                  <div key={ci} style={{ position:'absolute',width:20,height:20,
                    opacity:isFront?(isHov?1:0.7):0.12, transition:'opacity 0.3s', ...s }} />
                ))}

                {/* HUD top */}
                <div style={{ position:'absolute',top:0,left:0,right:0,zIndex:4,padding:'11px 15px',
                  display:'flex',justifyContent:'space-between',alignItems:'center',
                  background:'linear-gradient(to bottom, rgba(4,7,15,0.85), transparent)' }}>
                  <span style={{ fontSize:'0.58rem',fontWeight:700,letterSpacing:'2px',
                    textTransform:'uppercase',color:p.color,opacity:isFront?1:0.4 }}>{p.tag}</span>
                  <div style={{ width:6,height:6,borderRadius:'50%',background:p.color,
                    opacity:isFront?1:0.2,
                    animation:isFront?'pulse-glow 1.8s ease-in-out infinite':'none',
                    boxShadow:isFront?`0 0 8px ${p.color}`:'none' }} />
                </div>

                {/* image */}
                <div style={{ position:'relative',height:168,overflow:'hidden' }}>
                  <img src={p.images[0]} alt={p.name} draggable={false}
                    style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',pointerEvents:'none',
                      filter:isFront?'brightness(1)':'brightness(0.35) saturate(0.4)',
                      transition:'filter 0.45s ease' }}
                    onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${p.id}/560/380`}} />
                  <div style={{ position:'absolute',inset:0,
                    background:'linear-gradient(to bottom,transparent 20%,rgba(4,7,15,0.98) 100%)' }} />
                  {isHov && isFront && (
                    <div style={{ position:'absolute',inset:0,
                      background:`linear-gradient(135deg,${p.color}22,transparent 55%)`,
                      animation:'fadeUp 0.35s ease' }} />
                  )}
                </div>

                {/* body */}
                <div style={{ padding:'12px 16px 16px',position:'relative',zIndex:2 }}>
                  <div style={{ fontSize:'1.7rem',marginBottom:4,lineHeight:1 }}>{p.emoji}</div>
                  <h3 style={{ fontSize:'1.15rem',fontWeight:900,letterSpacing:'-0.5px',
                    marginBottom:4,color:'var(--text-primary)' }}>{p.name}</h3>
                  <p style={{ color:p.color,fontSize:'0.72rem',fontWeight:600,marginBottom:8 }}>{p.tagline}</p>
                  <p style={{ color:'var(--text-secondary)',fontSize:'0.75rem',lineHeight:1.6,marginBottom:12,
                    display:'-webkit-box',WebkitLineClamp:2,
                    WebkitBoxOrient:'vertical' as const,overflow:'hidden' }}>{p.desc}</p>

                  <div style={{ display:'flex',gap:5,marginBottom:12 }}>
                    {p.stats.slice(0,3).map(s=>(
                      <div key={s.label} style={{ flex:1,textAlign:'center',
                        background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',
                        borderRadius:8,padding:'6px 3px' }}>
                        <div style={{ fontWeight:800,fontSize:'0.76rem',color:p.color }}>{s.value}</div>
                        <div style={{ fontSize:'0.5rem',color:'var(--text-muted)',marginTop:1,letterSpacing:'0.5px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {isFront && p.link ? (
                    <div style={{ textAlign:'center',padding:'8px',
                      background:`${p.color}18`,border:`1px solid ${p.color}44`,
                      borderRadius:10,color:p.color,fontSize:'0.76rem',fontWeight:700,
                      animation:'pulse-glow 2.5s ease-in-out infinite' }}>בקר באתר →</div>
                  ) : !isFront ? (
                    <div style={{ textAlign:'center',color:'var(--text-muted)',fontSize:'0.65rem',letterSpacing:'1px' }}>לחץ לסיבוב</div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT arrow */}
        <button onClick={goNext} style={arrowStyle('left')}>←</button>
      </div>

      {/* dot nav */}
      <div style={{ display:'flex',gap:12,justifyContent:'center',marginTop:40,alignItems:'center' }}>
        {projects.map((p,i) => (
          <button key={i} onClick={()=>snapTo(i)} style={{
            width:i===activeIdx?32:8,height:8,borderRadius:4,
            background:i===activeIdx?p.color:'rgba(255,255,255,0.12)',
            border:'none',cursor:'pointer',padding:0,
            transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow:i===activeIdx?`0 0 14px ${p.color}99`:'none',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-glow{0%,100%{opacity:0.55}50%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </section>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    flexShrink: 0,
    width: 52, height: 52, borderRadius: '50%',
    background: 'rgba(4,7,15,0.85)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: 'var(--text-primary)' as any, fontSize: '1.2rem',
    cursor: 'pointer', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    margin: side === 'left' ? '0 0 0 16px' : '0 16px 0 0',
    zIndex: 10,
    position: 'relative' as any,
  }
}
