'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

const RADIUS = 320
const CARD_W = 280
const CARD_H = 370
const AUTO_SPEED = 0.008

export default function ProjectsSection() {
  const [angle, setAngle] = useState(0)
  const angleRef = useRef(0)
  const velRef = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const rafRef = useRef(0)
  const isInView = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
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
          velRef.current *= Math.pow(0.92, dt)
          angleRef.current += velRef.current * dt
        } else {
          velRef.current = 0
          if (isInView.current && hovered === null) {
            angleRef.current += AUTO_SPEED * dt
          }
        }
        setAngle(angleRef.current)
      }

      // which card is most front-facing?
      // front card is at angle ≈ 0 (cos=1), we want card i where (angle + i*STEP) ≈ 0 mod 360
      const best = projects.reduce((bi, _, i) => {
        const aI = ((angleRef.current + i * STEP) % 360 + 360) % 360
        const aB = ((angleRef.current + bi * STEP) % 360 + 360) % 360
        const cosI = Math.cos((aI * Math.PI) / 180)
        const cosB = Math.cos((aB * Math.PI) / 180)
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
    const obs = new IntersectionObserver(([e]) => { isInView.current = e.isIntersecting }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // ── Keyboard ─────────────────────────────────
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { velRef.current -= 3.5; e.preventDefault() }
      if (e.key === 'ArrowRight') { velRef.current += 3.5; e.preventDefault() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  // ── Drag ─────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    lastX.current = e.clientX
    velRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastX.current
    velRef.current = dx * 0.25
    angleRef.current += velRef.current
    setAngle(angleRef.current)
    lastX.current = e.clientX
  }
  const onPointerUp = () => { isDragging.current = false }

  // ── Snap ─────────────────────────────────────
  const snapTo = useCallback((i: number) => {
    // we want card i to be at angle 0 (front) → angleRef = -i * STEP
    const target = -i * STEP
    const cur = angleRef.current
    // find shortest path
    let diff = ((target - cur) % 360 + 540) % 360 - 180
    velRef.current = 0
    angleRef.current = cur + diff
    setAngle(angleRef.current)
  }, [STEP])

  // ── Prev / Next buttons ──────────────────────
  const goNext = () => { velRef.current = 0; snapTo((activeIdx + 1) % count) }
  const goPrev = () => { velRef.current = 0; snapTo((activeIdx - 1 + count) % count) }

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 10, padding: 'clamp(80px,10vw,140px) 0' }}>

      {/* header */}
      <div style={{ padding: '0 clamp(24px,7vw,100px)', marginBottom: 'clamp(48px,6vw,80px)' }}>
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
        letterSpacing:'2px', textTransform:'uppercase', marginBottom:52 }}>
        גרור · חצים ← → · לחץ על פרויקט
      </p>

      {/* ── CAROUSEL WRAPPER ── */}
      <div style={{ position:'relative' }}>

        {/* ARROW LEFT (→ in RTL = previous) */}
        <button
          onClick={goPrev}
          style={{
            position:'absolute', top:'50%', transform:'translateY(-50%)',
            right: 'clamp(8px,3vw,48px)',
            zIndex: 500,
            width:52, height:52, borderRadius:'50%',
            background:'rgba(4,7,15,0.85)', backdropFilter:'blur(16px)',
            border:'1px solid rgba(255,255,255,0.14)',
            color:'var(--text-primary)', fontSize:'1.3rem',
            cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s', boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow=`0 0 24px rgba(0,229,255,0.25)` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.4)' }}
        >→</button>

        {/* ARROW RIGHT (← in RTL = next) */}
        <button
          onClick={goNext}
          style={{
            position:'absolute', top:'50%', transform:'translateY(-50%)',
            left: 'clamp(8px,3vw,48px)',
            zIndex: 500,
            width:52, height:52, borderRadius:'50%',
            background:'rgba(4,7,15,0.85)', backdropFilter:'blur(16px)',
            border:'1px solid rgba(255,255,255,0.14)',
            color:'var(--text-primary)', fontSize:'1.3rem',
            cursor:'pointer', fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s', boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.boxShadow=`0 0 24px rgba(0,229,255,0.25)` }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.4)' }}
        >←</button>

        {/* 3D STAGE */}
        <div
          ref={sectionRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            position: 'relative',
            height: 500,
            perspective: 1100,
            perspectiveOrigin: '50% 50%',
            cursor: isDragging.current ? 'grabbing' : 'grab',
            userSelect: 'none',
            overflow: 'visible',
          }}
        >
          {/* ring origin — centred in stage */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 0, height: 0,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none', // let children handle events
          }}>
            {projects.map((p, i) => {
              const a    = ((angle + i * STEP) % 360 + 360) % 360
              const rad  = (a * Math.PI) / 180
              const x    = Math.sin(rad) * RADIUS
              const z    = Math.cos(rad) * RADIUS
              const depth = z / RADIUS           // -1…1
              const scale  = 0.52 + depth * 0.48  // 0.52 back → 1.0 front
              const opacity = Math.max(0.07, 0.25 + depth * 0.75)
              const zIdx   = Math.round((depth + 1) * 100)
              const isFront = depth > 0.88
              const isHov  = hovered === i

              return (
                <div key={p.id}
                  onPointerEnter={() => setHovered(i)}
                  onPointerLeave={() => setHovered(null)}
                  onClick={() => {
                    if (isFront) { if (p.link) window.open(p.link, '_blank') }
                    else snapTo(i)
                  }}
                  style={{
                    position: 'absolute',
                    width: CARD_W, height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop:  -CARD_H / 2,
                    pointerEvents: 'auto',
                    transform: `translateX(${x}px) translateZ(${z}px) scale(${isHov && isFront ? scale * 1.05 : scale})`,
                    zIndex: isHov ? 300 : zIdx,
                    opacity,
                    transition: isDragging.current
                      ? 'opacity 0.15s'
                      : 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                    cursor: isFront ? (p.link ? 'pointer' : 'default') : 'pointer',
                    borderRadius: 22,
                    overflow: 'hidden',
                    border: isFront
                      ? `1px solid ${p.color}99`
                      : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: isFront
                      ? `0 0 0 1px ${p.color}22, 0 28px 70px ${p.color}55, inset 0 1px 0 rgba(255,255,255,0.12)`
                      : '0 8px 32px rgba(0,0,0,0.6)',
                    background: `linear-gradient(160deg, ${p.gradientFrom}20 0%, rgba(4,7,15,0.97) 65%)`,
                  }}
                >
                  {/* scanlines */}
                  <div style={{
                    position:'absolute', inset:0, zIndex:3, pointerEvents:'none', borderRadius:22,
                    backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px)',
                  }} />

                  {/* corner accents */}
                  {[
                    { top:0,    right:0,  borderTop:`2px solid ${p.color}`, borderRight:`2px solid ${p.color}`, borderRadius:'0 22px 0 0' },
                    { top:0,    left:0,   borderTop:`2px solid ${p.color}`, borderLeft:`2px solid ${p.color}`,  borderRadius:'22px 0 0 0' },
                    { bottom:0, right:0,  borderBottom:`2px solid ${p.color}`, borderRight:`2px solid ${p.color}`, borderRadius:'0 0 22px 0' },
                    { bottom:0, left:0,   borderBottom:`2px solid ${p.color}`, borderLeft:`2px solid ${p.color}`,  borderRadius:'0 0 0 22px' },
                  ].map((s, ci) => (
                    <div key={ci} style={{
                      position:'absolute', width:20, height:20,
                      opacity: isFront ? (isHov ? 1 : 0.75) : 0.15,
                      transition:'opacity 0.3s', ...s,
                    }} />
                  ))}

                  {/* HUD top bar */}
                  <div style={{
                    position:'absolute', top:0, left:0, right:0, zIndex:4,
                    padding:'11px 15px',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    background:'linear-gradient(to bottom, rgba(4,7,15,0.85), transparent)',
                  }}>
                    <span style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'2px',
                      textTransform:'uppercase', color:p.color, opacity: isFront ? 1 : 0.45 }}>
                      {p.tag}
                    </span>
                    <div style={{
                      width:6, height:6, borderRadius:'50%', background:p.color,
                      opacity: isFront ? 1 : 0.25,
                      animation: isFront ? 'pulse-glow 1.8s ease-in-out infinite' : 'none',
                      boxShadow: isFront ? `0 0 8px ${p.color}` : 'none',
                    }} />
                  </div>

                  {/* image */}
                  <div style={{ position:'relative', height:172, overflow:'hidden' }}>
                    <img src={p.images[0]} alt={p.name} draggable={false}
                      style={{
                        width:'100%', height:'100%', objectFit:'cover',
                        display:'block', pointerEvents:'none',
                        filter: isFront ? 'brightness(1)' : 'brightness(0.4) saturate(0.5)',
                        transition:'filter 0.45s ease',
                      }}
                      onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${p.id}/560/380` }}
                    />
                    <div style={{
                      position:'absolute', inset:0,
                      background:'linear-gradient(to bottom, transparent 25%, rgba(4,7,15,0.98) 100%)',
                    }} />
                    {isHov && isFront && (
                      <div style={{
                        position:'absolute', inset:0,
                        background:`linear-gradient(135deg, ${p.color}22, transparent 55%)`,
                        animation:'fadeUp 0.35s ease',
                      }} />
                    )}
                  </div>

                  {/* body */}
                  <div style={{ padding:'14px 18px 18px', position:'relative', zIndex:2 }}>
                    <div style={{ fontSize:'1.8rem', marginBottom:5, lineHeight:1 }}>{p.emoji}</div>
                    <h3 style={{ fontSize:'1.18rem', fontWeight:900, letterSpacing:'-0.5px',
                      marginBottom:4, color:'var(--text-primary)' }}>{p.name}</h3>
                    <p style={{ color:p.color, fontSize:'0.73rem', fontWeight:600, marginBottom:10, letterSpacing:'0.2px' }}>
                      {p.tagline}
                    </p>
                    <p style={{
                      color:'var(--text-secondary)', fontSize:'0.77rem', lineHeight:1.6, marginBottom:14,
                      display:'-webkit-box', WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical' as const, overflow:'hidden',
                    }}>{p.desc}</p>

                    {/* stats */}
                    <div style={{ display:'flex', gap:6, marginBottom:14 }}>
                      {p.stats.slice(0,3).map(s => (
                        <div key={s.label} style={{
                          flex:1, textAlign:'center',
                          background:'rgba(255,255,255,0.04)',
                          border:'1px solid rgba(255,255,255,0.06)',
                          borderRadius:8, padding:'7px 4px',
                        }}>
                          <div style={{ fontWeight:800, fontSize:'0.78rem', color:p.color }}>{s.value}</div>
                          <div style={{ fontSize:'0.52rem', color:'var(--text-muted)', marginTop:1, letterSpacing:'0.5px' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {isFront && p.link ? (
                      <div style={{
                        textAlign:'center', padding:'9px',
                        background:`${p.color}18`, border:`1px solid ${p.color}44`,
                        borderRadius:10, color:p.color,
                        fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.5px',
                        animation:'pulse-glow 2.5s ease-in-out infinite',
                      }}>בקר באתר →</div>
                    ) : !isFront ? (
                      <div style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.68rem', letterSpacing:'1px' }}>
                        לחץ לסיבוב
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* dot nav */}
      <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:48, alignItems:'center' }}>
        {projects.map((p, i) => (
          <button key={i} onClick={() => snapTo(i)} style={{
            width: i===activeIdx ? 32 : 8, height:8, borderRadius:4,
            background: i===activeIdx ? p.color : 'rgba(255,255,255,0.12)',
            border:'none', cursor:'pointer', padding:0,
            transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: i===activeIdx ? `0 0 14px ${p.color}99` : 'none',
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-glow { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  )
}
