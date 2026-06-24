'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ─────────────────────────────────────────────
   3D SCROLL CAROUSEL
───────────────────────────────────────────── */
function ScrollCarousel({ images, color, name }: { images: string[]; color: string; name: string }) {
  const [angle, setAngle] = useState(0)           // current rotation in degrees
  const [dragging, setDragging] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const velRef = useRef(0)
  const angleRef = useRef(0)
  const count = images.length
  const step = 360 / count
  const radius = 280  // px — 3D carousel radius

  // Inertia loop
  useEffect(() => {
    const tick = () => {
      if (!dragging && Math.abs(velRef.current) > 0.05) {
        velRef.current *= 0.94
        angleRef.current += velRef.current
        setAngle(angleRef.current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [dragging])

  // Scroll → rotate
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let ticking = false
    const onWheel = (e: WheelEvent) => {
      // only hijack when hovering this section
      const rect = el.getBoundingClientRect()
      if (e.clientY < rect.top || e.clientY > rect.bottom) return
      e.preventDefault()
      const delta = e.deltaY * 0.12
      velRef.current += delta
      angleRef.current += delta
      setAngle(angleRef.current)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    setLastX(e.clientX)
    velRef.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastX
    const delta = dx * 0.35
    velRef.current = delta
    angleRef.current += delta
    setAngle(angleRef.current)
    setLastX(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  const getCardStyle = (i: number) => {
    const cardAngle = angle + i * step
    const rad = (cardAngle * Math.PI) / 180
    const x = Math.sin(rad) * radius
    const z = Math.cos(rad) * radius
    // brightness based on z (facing camera = bright)
    const brightness = ((z / radius) * 0.4 + 0.6)
    const scale = 0.72 + ((z / radius) * 0.28)
    const isCenter = z > radius * 0.7

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      zIndex: Math.round(z + radius),
      opacity: brightness,
      filter: `brightness(${brightness}) ${isCenter ? 'drop-shadow(0 20px 48px ' + color + '55)' : ''}`,
      transition: dragging ? 'none' : 'filter 0.2s',
      cursor: isCenter ? 'zoom-in' : 'pointer',
      outline: isCenter ? `2px solid ${color}88` : 'none',
      borderRadius: 18,
      overflow: 'hidden' as const,
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      top: 0, left: 0,
    }
  }

  return (
    <div ref={sectionRef} style={{ userSelect: 'none' }}>
      {/* 3D stage */}
      <div
        style={{
          position: 'relative',
          height: 340,
          perspective: 1000,
          perspectiveOrigin: '50% 50%',
          marginBottom: 48,
          overflow: 'visible',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* carousel ring */}
        <div style={{
          position: 'absolute',
          width: 300, height: 200,
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%)`,
          transformStyle: 'preserve-3d',
        }}>
          {images.map((src, i) => {
            const cardAngle = angle + i * step
            const rad = (cardAngle * Math.PI) / 180
            const x = Math.sin(rad) * radius
            const z = Math.cos(rad) * radius
            const brightness = (z / radius) * 0.4 + 0.6
            const scale = 0.72 + (z / radius) * 0.28
            const isCenter = z > radius * 0.7

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 280, height: 190,
                  top: '50%', left: '50%',
                  marginTop: -95, marginLeft: -140,
                  transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                  zIndex: Math.round(z + radius),
                  opacity: Math.max(0.15, brightness),
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: isCenter ? 'zoom-in' : 'pointer',
                  outline: isCenter ? `2px solid ${color}` : 'none',
                  outlineOffset: 2,
                  transition: dragging ? 'none' : 'outline 0.2s',
                  boxShadow: isCenter ? `0 24px 64px ${color}44` : 'none',
                }}
                onClick={() => { if (isCenter) setLightboxIdx(i) }}
              >
                <img
                  src={src}
                  alt={`${name} screenshot ${i + 1}`}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                  onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${name}${i}/560/380` }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${color}55 0%, transparent 55%)`,
                  opacity: isCenter ? 1 : 0.5,
                }} />
                {isCenter && (
                  <div style={{
                    position: 'absolute', bottom: 12, right: 12,
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                    borderRadius: 8, padding: '4px 10px',
                    fontSize: '0.7rem', color: '#fff', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    🔍 הגדל
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Arrow buttons */}
        {[-1, 1].map(dir => (
          <button
            key={dir}
            onClick={() => { velRef.current += dir * -18; angleRef.current += dir * -18 }}
            style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              ...(dir === -1 ? { right: 0 } : { left: 0 }),
              zIndex: 99,
              background: 'rgba(4,7,15,0.75)', backdropFilter: 'blur(8px)',
              border: `1px solid ${color}44`, borderRadius: '50%',
              width: 40, height: 40, cursor: 'pointer',
              color: color, fontSize: '1.1rem', fontFamily: 'inherit',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = '#04070f' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(4,7,15,0.75)'; e.currentTarget.style.color = color }}
          >
            {dir === -1 ? '→' : '←'}
          </button>
        ))}
      </div>

      {/* hint */}
      <p style={{ textAlign: 'center', color: 'var(--grey)', fontSize: '0.75rem', marginTop: -32, marginBottom: 8 }}>
        גלול · גרור · לחץ על התמונה הקדמית להגדלה
      </p>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(4,7,15,0.95)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, animation: 'fadeIn 0.2s ease',
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes zoomIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`}</style>
          <button onClick={() => setLightboxIdx(null)}
            style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', fontSize: '1.4rem', width: 44, height: 44,
              borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
          {/* prev/next in lightbox */}
          <button onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + count) % count) }}
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              fontSize: '1.4rem', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >→</button>
          <button onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % count) }}
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              fontSize: '1.4rem', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >←</button>
          <img
            src={images[lightboxIdx]}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '88vw', maxHeight: '82vh', objectFit: 'contain',
              borderRadius: 16, boxShadow: `0 0 80px ${color}44`,
              animation: 'zoomIn 0.25s cubic-bezier(0.16,1,0.3,1)',
            }}
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${name}${lightboxIdx}/1200/700` }}
          />
          <div style={{ position: 'absolute', bottom: 24,
            color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
            {lightboxIdx + 1} / {count}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROJECT ROW
───────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isEven = index % 2 === 0

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(40px,5vw,80px)',
      alignItems: 'center',
      marginBottom: 'clamp(120px,14vw,180px)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(60px)',
      transition: `opacity 0.75s ease ${index * 0.07}s, transform 0.75s ease ${index * 0.07}s`,
    }}>

      {/* Gallery */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <ScrollCarousel images={project.images} color={project.color} name={project.name} />
      </div>

      {/* Text */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{
            fontSize: '4rem', fontWeight: 900, lineHeight: 1,
            color: 'transparent', WebkitTextStroke: `1px ${project.color}55`,
          }}>0{index + 1}</span>
          <span style={{
            background: `${project.color}18`, color: project.color,
            border: `1px solid ${project.color}44`,
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20,
          }}>{project.tag}</span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.7rem,3vw,2.5rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>
          {project.name}
        </h3>
        <p style={{ color: project.color, fontSize: '0.95rem', fontWeight: 600, marginBottom: 18 }}>
          {project.tagline}
        </p>
        <p style={{ color: 'var(--grey)', lineHeight: 1.8, fontSize: '0.93rem', marginBottom: 20 }}>
          {project.desc}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
            borderRight: `3px solid ${project.color}`, borderRadius: 8, padding: '13px 18px' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', color: project.color, marginBottom: 5 }}>האתגר</div>
            <p style={{ color: 'var(--grey)', fontSize: '0.83rem', lineHeight: 1.7 }}>{project.challenge}</p>
          </div>
          <div style={{ background: `${project.color}0c`, border: `1px solid ${project.color}28`,
            borderRadius: 8, padding: '13px 18px' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', color: project.color, marginBottom: 5 }}>התוצאה</div>
            <p style={{ color: 'var(--white)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 500 }}>{project.result}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--grey)', fontSize: '0.71rem', padding: '4px 10px', borderRadius: 20,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {project.stats.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '10px 16px', minWidth: 76, textAlign: 'center',
            }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: project.color }}>{s.value}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--grey)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: project.color, color: '#04070f',
              textDecoration: 'none', padding: '12px 26px',
              borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', fontFamily: 'inherit',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 36px ${project.color}55` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >בקר באתר ←</a>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,100px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10,
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16 }}>
        <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
        פרויקטים נבחרים
      </div>
      <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900,
        letterSpacing: '-1px', lineHeight: 1.1,
        marginBottom: 'clamp(64px,9vw,110px)' }}>
        מוצרים שאנשים <span style={{ color: 'var(--cyan)' }}>באמת משתמשים בהם.</span>
      </h2>

      {projects.map((p, i) => (
        <ProjectRow key={p.id} project={p} index={i} />
      ))}
    </section>
  )
}
