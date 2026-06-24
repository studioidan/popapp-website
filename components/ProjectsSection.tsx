'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

const RADIUS = 340
const CARD_W = 280
const CARD_H = 360
const AUTO_SPEED = 0.012 // degrees per frame when scrolling page

export default function ProjectsSection() {
  const [angle, setAngle] = useState(0)
  const angleRef = useRef(0)
  const velRef = useRef(0)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const rafRef = useRef(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useRef(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number|null>(null)

  const count = projects.length
  const STEP = 360 / count

  // ── inertia + auto-rotate when in view ──────────────────
  useEffect(() => {
    let lastTime = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 16, 3)
      lastTime = now

      if (!dragging.current) {
        // inertia
        if (Math.abs(velRef.current) > 0.01) {
          velRef.current *= Math.pow(0.93, dt)
          angleRef.current += velRef.current * dt
        } else {
          velRef.current = 0
          // gentle auto-rotate when section is visible and not hovering
          if (isInView.current && hoveredIdx === null) {
            angleRef.current += AUTO_SPEED * dt
          }
        }
        setAngle(angleRef.current)
      }

      // update active
      const norm = ((-angleRef.current % 360) + 360) % 360
      const idx = Math.round(norm / STEP) % count
      setActiveIdx((idx + count) % count)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [count, hoveredIdx])

  // ── IntersectionObserver — track if carousel is in view ──
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { isInView.current = e.isIntersecting }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // ── keyboard ──────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { velRef.current -= 4; e.preventDefault() }
      if (e.key === 'ArrowRight') { velRef.current += 4; e.preventDefault() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ── drag ──────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    lastX.current = e.clientX
    velRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    velRef.current = dx * 0.28
    angleRef.current += velRef.current
    setAngle(angleRef.current)
    lastX.current = e.clientX
  }
  const onPointerUp = () => { dragging.current = false }

  // ── snap to card ─────────────────────────────────────────
  const snapTo = useCallback((i: number) => {
    const target = -i * STEP
    const cur = angleRef.current % 360
    let diff = ((target - cur) % 360 + 540) % 360 - 180
    velRef.current = 0
    angleRef.current += diff
    setAngle(angleRef.current)
  }, [STEP])

  // ── compute per-card values ──────────────────────────────
  const getCard = (i: number) => {
    const a = ((angle + i * STEP) % 360 + 360) % 360
    const rad = (a * Math.PI) / 180
    const x = Math.sin(rad) * RADIUS
    const z = Math.cos(rad) * RADIUS
    const depth = z / RADIUS          // -1 … 1
    const scale = 0.55 + depth * 0.45
    const opacity = Math.max(0.08, 0.3 + depth * 0.7)
    const zIdx = Math.round((depth + 1) * 50)
    const isFront = depth > 0.85
    return { x, z, scale, opacity, zIdx, isFront, depth }
  }

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 10,
      padding: 'clamp(80px,10vw,140px) 0' }}>

      {/* header */}
      <div style={{ padding: '0 clamp(24px,7vw,100px)', marginBottom: 'clamp(48px,6vw,80px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10,
          fontSize:'0.7rem', fontWeight:700, letterSpacing:'3px',
          textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.5rem)', fontWeight:900,
          letterSpacing:'-2px', lineHeight:1.0 }}>
          מוצרים שאנשים{' '}
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            באמת משתמשים בהם.
          </span>
        </h2>
      </div>

      {/* hint */}
      <p style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.7rem',
        letterSpacing:'2px', textTransform:'uppercase', marginBottom:48 }}>
        גרור · חצים ← → · לחץ על פרויקט
      </p>

      {/* 3D stage */}
      <div ref={sectionRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          position: 'relative', height: 500,
          perspective: 1100, perspectiveOrigin: '50% 48%',
          cursor: dragging.current ? 'grabbing' : 'grab',
          userSelect: 'none', overflow: 'visible',
        }}
      >
        {/* ring origin */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 0, height: 0,
          transformStyle: 'preserve-3d',
        }}>
          {projects.map((p, i) => {
            const { x, z, scale, opacity, zIdx, isFront, depth } = getCard(i)
            const isHov = hoveredIdx === i

            return (
              <div key={p.id}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => isFront ? window.open(p.link, '_blank') : snapTo(i)}
                style={{
                  position: 'absolute',
                  width: CARD_W, height: CARD_H,
                  marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2,
                  transform: `translateX(${x}px) translateZ(${z}px) scale(${isHov && isFront ? scale * 1.06 : scale})`,
                  zIndex: isHov ? 200 : zIdx,
                  opacity,
                  transition: dragging.current ? 'none' : 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
                  cursor: isFront ? (p.link ? 'pointer' : 'default') : 'pointer',
                  borderRadius: 22,
                  overflow: 'hidden',
                  // space-age frame
                  border: isFront
                    ? `1px solid ${p.color}88`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isFront
                    ? `0 0 0 1px ${p.color}22, 0 32px 80px ${p.color}44, inset 0 1px 0 rgba(255,255,255,0.1)`
                    : '0 8px 32px rgba(0,0,0,0.5)',
                  background: `linear-gradient(160deg, ${p.gradientFrom}18 0%, rgba(4,7,15,0.95) 60%)`,
                  backdropFilter: 'blur(2px)',
                }}
              >
                {/* scanline overlay */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                  borderRadius: 22,
                }} />

                {/* corner accents — space frame */}
                {[
                  { top:0, right:0, borderTop:`2px solid ${p.color}`, borderRight:`2px solid ${p.color}`, borderRadius:'0 22px 0 0' },
                  { top:0, left:0,  borderTop:`2px solid ${p.color}`, borderLeft:`2px solid ${p.color}`,  borderRadius:'22px 0 0 0' },
                  { bottom:0, right:0, borderBottom:`2px solid ${p.color}`, borderRight:`2px solid ${p.color}`, borderRadius:'0 0 22px 0' },
                  { bottom:0, left:0,  borderBottom:`2px solid ${p.color}`, borderLeft:`2px solid ${p.color}`,  borderRadius:'0 0 0 22px' },
                ].map((s, ci) => (
                  <div key={ci} style={{
                    position: 'absolute', width: 22, height: 22,
                    opacity: isFront ? (isHov ? 1 : 0.7) : 0.2,
                    transition: 'opacity 0.3s',
                    ...s,
                  }} />
                ))}

                {/* top HUD bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
                  padding: '12px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: `linear-gradient(to bottom, rgba(4,7,15,0.8), transparent)`,
                }}>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase', color: p.color, opacity: isFront ? 1 : 0.5,
                  }}>{p.tag}</span>
                  {/* blinking dot */}
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: p.color,
                    opacity: isFront ? 1 : 0.3,
                    animation: isFront ? 'pulse-glow 1.8s ease-in-out infinite' : 'none',
                    boxShadow: `0 0 6px ${p.color}`,
                  }} />
                </div>

                {/* image */}
                <div style={{ position: 'relative', height: 175, overflow: 'hidden' }}>
                  <img src={p.images[0]} alt={p.name} draggable={false}
                    style={{ width:'100%', height:'100%', objectFit:'cover',
                      display:'block', pointerEvents:'none',
                      filter: isFront ? 'none' : 'brightness(0.5) saturate(0.6)',
                      transition: 'filter 0.4s ease',
                    }}
                    onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/560/380` }}
                  />
                  {/* gradient fade */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 30%, rgba(4,7,15,0.98) 100%)`,
                  }} />
                  {/* glow streak on hover */}
                  {isHov && isFront && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(135deg, ${p.color}22, transparent 50%)`,
                      animation: 'fadeUp 0.4s ease',
                    }} />
                  )}
                </div>

                {/* body */}
                <div style={{ padding: '14px 18px 18px', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: '2rem', marginBottom: 6, lineHeight: 1 }}>{p.emoji}</div>
                  <h3 style={{
                    fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.5px',
                    marginBottom: 4, color: 'var(--text-primary)',
                  }}>{p.name}</h3>
                  <p style={{
                    color: p.color, fontSize: '0.74rem', fontWeight: 600,
                    marginBottom: 10, letterSpacing: '0.2px',
                  }}>{p.tagline}</p>
                  <p style={{
                    color: 'var(--text-secondary)', fontSize: '0.78rem',
                    lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                    marginBottom: 14,
                  }}>{p.desc}</p>

                  {/* stats */}
                  <div style={{ display:'flex', gap:6, marginBottom: 14 }}>
                    {p.stats.slice(0,3).map(s => (
                      <div key={s.label} style={{
                        flex:1, textAlign:'center',
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.06)',
                        borderRadius:8, padding:'7px 4px',
                      }}>
                        <div style={{ fontWeight:800, fontSize:'0.8rem', color:p.color }}>{s.value}</div>
                        <div style={{ fontSize:'0.55rem', color:'var(--text-muted)', marginTop:1, letterSpacing:'0.5px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA — front only */}
                  {isFront && p.link && (
                    <div style={{
                      textAlign:'center', padding:'9px',
                      background:`${p.color}18`,
                      border:`1px solid ${p.color}44`,
                      borderRadius:10,
                      color:p.color, fontSize:'0.8rem', fontWeight:700,
                      letterSpacing:'0.5px',
                      animation: 'pulse-glow 2.5s ease-in-out infinite',
                    }}>
                      בקר באתר →
                    </div>
                  )}
                  {!isFront && (
                    <div style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.7rem', letterSpacing:'1px' }}>
                      לחץ לסיבוב
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* arrow buttons */}
        {[
          { dir: -1, label: '→', side: 'right' },
          { dir:  1, label: '←', side: 'left'  },
        ].map(({ dir, label, side }) => (
          <button key={side}
            onClick={() => { velRef.current += dir * -5 }}
            style={{
              position:'absolute', top:'50%', transform:'translateY(-50%)',
              [side]: 'clamp(8px,3vw,40px)', zIndex:300,
              width:48, height:48, borderRadius:'50%',
              background:'rgba(4,7,15,0.7)', backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'var(--text-primary)', fontSize:'1.1rem',
              cursor:'pointer', fontFamily:'inherit',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow=`0 0 20px rgba(0,229,255,0.2)` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.boxShadow='none' }}
          >{label}</button>
        ))}
      </div>

      {/* dot nav */}
      <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:48, alignItems:'center' }}>
        {projects.map((p, i) => (
          <button key={i} onClick={() => snapTo(i)} style={{
            width: i===activeIdx ? 32 : 8, height:8, borderRadius:4,
            background: i===activeIdx ? p.color : 'rgba(255,255,255,0.12)',
            border:'none', cursor:'pointer', padding:0,
            transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: i===activeIdx ? `0 0 12px ${p.color}88` : 'none',
          }} />
        ))}
      </div>
    </section>
  )
}
