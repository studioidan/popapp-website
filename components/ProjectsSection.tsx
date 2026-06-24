'use client'
import { useRef, useState, useEffect } from 'react'
import { projects } from '@/lib/projects'

/* ─────────────────────────────────────────────
   3D PROJECT CAROUSEL — each card = one project
───────────────────────────────────────────── */
export default function ProjectsSection() {
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = projects.length
  const step = 360 / count
  const RADIUS = 380   // px — tweak for how spread out the ring is

  /* inertia loop */
  useEffect(() => {
    const tick = () => {
      if (!dragging) {
        if (Math.abs(velRef.current) > 0.02) {
          velRef.current *= 0.95
          angleRef.current += velRef.current
          setAngle(a => a + velRef.current)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [dragging])

  /* scroll → rotate */
  useEffect(() => {
    const el = containerRef.current; if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * 0.06
      velRef.current += delta
      angleRef.current += delta
      setAngle(angleRef.current)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  /* drag */
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true); setLastX(e.clientX)
    velRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastX
    const delta = dx * 0.3
    velRef.current = delta
    angleRef.current += delta
    setAngle(angleRef.current)
    setLastX(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  /* snap to card */
  const snapTo = (i: number) => {
    const target = -i * step
    const current = angleRef.current % 360
    let diff = ((target - current) % 360 + 540) % 360 - 180
    velRef.current = 0
    angleRef.current += diff
    setAngle(angleRef.current)
  }

  /* get z-depth for card i → determines if it's "front" */
  const getDepth = (i: number) => {
    const a = ((angle + i * step) % 360 + 360) % 360
    return Math.cos((a * Math.PI) / 180)
  }

  const frontIdx = projects.reduce((best, _, i) =>
    getDepth(i) > getDepth(best) ? i : best, 0)

  return (
    <section id="projects" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(60px,8vw,120px) 0',
    }}>
      {/* header */}
      <div style={{ padding: '0 clamp(20px,6vw,100px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10,
          fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px',
          textTransform:'uppercase', color:'var(--cyan)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.2rem)', fontWeight:900,
          letterSpacing:'-1px', lineHeight:1.1 }}>
          מוצרים שאנשים <span style={{ color:'var(--cyan)' }}>באמת משתמשים בהם.</span>
        </h2>
      </div>

      {/* hint */}
      <p style={{ textAlign:'center', color:'var(--grey)', fontSize:'0.78rem',
        marginBottom:32, letterSpacing:'1px' }}>
        גלול · גרור · לחץ על פרויקט
      </p>

      {/* 3D stage */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          position: 'relative',
          height: 480,
          perspective: 1200,
          perspectiveOrigin: '50% 45%',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          overflow: 'visible',
        }}
      >
        {/* ring */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 0, height: 0,
          transformStyle: 'preserve-3d',
        }}>
          {projects.map((p, i) => {
            const a = ((angle + i * step) % 360 + 360) % 360
            const rad = (a * Math.PI) / 180
            const x = Math.sin(rad) * RADIUS
            const z = Math.cos(rad) * RADIUS
            const depth = z / RADIUS   // -1 to 1
            const scale = 0.65 + depth * 0.35
            const opacity = 0.3 + depth * 0.7
            const isFront = i === frontIdx
            const blur = isFront ? 0 : Math.max(0, (1 - depth) * 2.5)

            return (
              <div
                key={p.id}
                onClick={() => {
                  if (isFront) setSelected(selected === i ? null : i)
                  else snapTo(i)
                }}
                style={{
                  position: 'absolute',
                  width: 300, height: 380,
                  marginLeft: -150, marginTop: -190,
                  transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                  zIndex: Math.round((depth + 1) * 50),
                  opacity,
                  filter: `blur(${blur}px)`,
                  transition: dragging ? 'none' : 'filter 0.3s, opacity 0.3s',
                  cursor: isFront ? 'pointer' : 'pointer',
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: `linear-gradient(160deg, ${p.gradientFrom}22, ${p.gradientTo}10, rgba(7,13,30,0.95))`,
                  border: isFront
                    ? `1.5px solid ${p.color}99`
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isFront
                    ? `0 32px 80px ${p.color}44, 0 0 0 1px ${p.color}33`
                    : '0 8px 32px rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(0px)',
                }}
              >
                {/* card image */}
                <div style={{ position:'relative', height:175, overflow:'hidden' }}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    draggable={false}
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', pointerEvents:'none' }}
                    onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/600/400` }}
                  />
                  <div style={{
                    position:'absolute', inset:0,
                    background:`linear-gradient(to bottom, transparent 30%, rgba(7,13,30,0.95) 100%)`,
                  }} />
                  {/* tag */}
                  <div style={{
                    position:'absolute', top:12, right:12,
                    background:`${p.color}22`, border:`1px solid ${p.color}66`,
                    backdropFilter:'blur(8px)',
                    color:p.color, fontSize:'0.62rem', fontWeight:700,
                    letterSpacing:'1.5px', textTransform:'uppercase',
                    padding:'4px 10px', borderRadius:20,
                  }}>{p.tag}</div>
                </div>

                {/* card body */}
                <div style={{ padding:'16px 20px 20px' }}>
                  <div style={{ fontSize:'2rem', marginBottom:4 }}>{p.emoji}</div>
                  <h3 style={{ fontSize:'1.3rem', fontWeight:900, letterSpacing:'-0.5px', marginBottom:4 }}>
                    {p.name}
                  </h3>
                  <p style={{ color:p.color, fontSize:'0.78rem', fontWeight:600, marginBottom:10 }}>
                    {p.tagline}
                  </p>
                  <p style={{ color:'var(--grey)', fontSize:'0.8rem', lineHeight:1.65,
                    display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' as const,
                    overflow:'hidden', marginBottom:16 }}>
                    {p.desc}
                  </p>

                  {/* stats row */}
                  <div style={{ display:'flex', gap:8, marginBottom:16 }}>
                    {p.stats.slice(0,3).map(s => (
                      <div key={s.label} style={{
                        flex:1, textAlign:'center',
                        background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.07)',
                        borderRadius:8, padding:'8px 4px',
                      }}>
                        <div style={{ fontWeight:800, fontSize:'0.85rem', color:p.color }}>{s.value}</div>
                        <div style={{ fontSize:'0.58rem', color:'var(--grey)', marginTop:1 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA — only on front card */}
                  {isFront && p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                        background:p.color, color:'#04070f',
                        textDecoration:'none', padding:'10px',
                        borderRadius:10, fontWeight:700, fontSize:'0.85rem', fontFamily:'inherit',
                        transition:'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity='1'}
                    >בקר באתר ←</a>
                  )}
                  {!isFront && (
                    <div style={{ textAlign:'center', color:'rgba(255,255,255,0.25)',
                      fontSize:'0.75rem', marginTop:4 }}>לחץ לסיבוב</div>
                  )}
                </div>

                {/* front glow ring */}
                {isFront && (
                  <div style={{
                    position:'absolute', inset:-2, borderRadius:23,
                    background:'transparent',
                    boxShadow:`inset 0 0 0 1.5px ${p.color}`,
                    pointerEvents:'none',
                    animation:'pulse-ring 2s ease-in-out infinite',
                  }} />
                )}
              </div>
            )
          })}
        </div>

        {/* arrow buttons */}
        {[{dir:-1,label:'→', pos:'right'}, {dir:1,label:'←', pos:'left'}].map(({dir,label,pos}) => (
          <button key={pos}
            onClick={() => {
              const delta = dir * -60
              velRef.current += delta * 0.3
              angleRef.current += delta
              setAngle(angleRef.current)
            }}
            style={{
              position:'absolute', top:'50%', transform:'translateY(-50%)',
              [pos]: 24, zIndex:200,
              background:'rgba(7,13,30,0.8)', backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%',
              width:48, height:48, cursor:'pointer',
              color:'var(--white)', fontSize:'1.2rem', fontFamily:'inherit',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--cyan)'; e.currentTarget.style.color='#04070f' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(7,13,30,0.8)'; e.currentTarget.style.color='var(--white)' }}
          >{label}</button>
        ))}
      </div>

      {/* dot nav */}
      <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:40 }}>
        {projects.map((p, i) => (
          <button key={i}
            onClick={() => snapTo(i)}
            style={{
              width: i === frontIdx ? 28 : 8, height:8, borderRadius:4,
              background: i === frontIdx ? p.color : 'rgba(255,255,255,0.15)',
              border:'none', cursor:'pointer', padding:0,
              transition:'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
