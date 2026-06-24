'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ── Stacked Card Gallery ─────────────────────────────────────── */
function StackGallery({ images, color }: { images: string[]; color: string }) {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => setActive(a => (a + 1) % images.length), [images.length])
  const prev = useCallback(() => setActive(a => (a - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    intervalRef.current = setInterval(next, 3200)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next])

  const pause = () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  const resume = () => { intervalRef.current = setInterval(next, 3200) }

  // positions for 4 stacked cards
  const getStyle = (i: number) => {
    const total = images.length
    const offset = ((i - active) % total + total) % total
    // 0=front, 1=behind-right, 2=further, 3=left-peek
    const configs = [
      { x: 0,    y: 0,   z: 40,  scale: 1,    opacity: 1,    rotate: 0  },
      { x: 28,   y: -14, z: 30,  scale: 0.92, opacity: 0.75, rotate: 3  },
      { x: 48,   y: -24, z: 20,  scale: 0.84, opacity: 0.45, rotate: 6  },
      { x: 60,   y: -32, z: 10,  scale: 0.76, opacity: 0.2,  rotate: 9  },
    ]
    const cfg = configs[offset] || configs[3]
    return {
      position: 'absolute' as const,
      inset: 0,
      borderRadius: 18,
      overflow: 'hidden' as const,
      transform: `translateX(${cfg.x}px) translateY(${cfg.y}px) scale(${cfg.scale}) rotate(${cfg.rotate}deg)`,
      zIndex: 40 - offset,
      opacity: cfg.opacity,
      transition: 'all 0.55s cubic-bezier(0.34,1.56,0.64,1)',
      cursor: offset === 0 ? 'grab' : 'pointer',
      boxShadow: offset === 0 ? `0 24px 64px ${color}35, 0 0 0 1px ${color}22` : 'none',
    }
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '62%' }}
      onMouseEnter={pause} onMouseLeave={resume}
      onMouseDown={e => { setDragging(true); setStartX(e.clientX); pause() }}
      onMouseUp={e => {
        if (dragging) {
          const dx = e.clientX - startX
          if (dx < -40) next()
          else if (dx > 40) prev()
          setDragging(false); resume()
        }
      }}
      onTouchStart={e => { setStartX(e.touches[0].clientX); pause() }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - startX
        if (dx < -40) next(); else if (dx > 40) prev()
        resume()
      }}
    >
      {images.map((src, i) => (
        <div key={i} style={getStyle(i)} onClick={() => i !== active && setActive(i)}>
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${src.slice(-6)}/800/500` }}
          />
          {/* subtle gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${color}44 0%, transparent 60%)`,
          }} />
        </div>
      ))}

      {/* dots */}
      <div style={{
        position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6, zIndex: 50,
      }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); pause(); setTimeout(resume, 4000) }}
            style={{
              width: i === active ? 20 : 6, height: 6, borderRadius: 3,
              background: i === active ? color : 'rgba(255,255,255,0.2)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Single Project Row ───────────────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isEven = index % 2 === 0

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'center',
      marginBottom: 'clamp(100px,12vw,160px)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(56px)',
      transition: `opacity 0.75s ease ${index * 0.08}s, transform 0.75s ease ${index * 0.08}s`,
    }}>

      {/* ── Gallery side ── */}
      <div style={{ order: isEven ? 1 : 0, paddingBottom: 40 }}>
        <StackGallery images={project.images} color={project.color} />
      </div>

      {/* ── Text side ── */}
      <div style={{ order: isEven ? 0 : 1 }}>
        {/* number + tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1,
            color: 'transparent', WebkitTextStroke: `1px ${project.color}44` }}>
            0{index + 1}
          </span>
          <span style={{
            background: `${project.color}18`, color: project.color,
            border: `1px solid ${project.color}44`,
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20,
          }}>{project.tag}</span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 900,
          letterSpacing: '-1px', marginBottom: 6 }}>{project.name}</h3>
        <p style={{ color: project.color, fontSize: '0.97rem', fontWeight: 600, marginBottom: 18 }}>
          {project.tagline}
        </p>
        <p style={{ color: 'var(--grey)', lineHeight: 1.8, fontSize: '0.94rem', marginBottom: 20 }}>
          {project.desc}
        </p>

        {/* challenge / result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
            borderRight: `3px solid ${project.color}`, borderRadius: 8, padding: '13px 18px',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', color: project.color, marginBottom: 5 }}>האתגר</div>
            <p style={{ color: 'var(--grey)', fontSize: '0.84rem', lineHeight: 1.7 }}>{project.challenge}</p>
          </div>
          <div style={{
            background: `${project.color}0c`, border: `1px solid ${project.color}28`,
            borderRadius: 8, padding: '13px 18px',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', color: project.color, marginBottom: 5 }}>התוצאה</div>
            <p style={{ color: 'var(--white)', fontSize: '0.86rem', lineHeight: 1.7, fontWeight: 500 }}>{project.result}</p>
          </div>
        </div>

        {/* tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--grey)', fontSize: '0.72rem', padding: '4px 11px', borderRadius: 20,
            }}>{t}</span>
          ))}
        </div>

        {/* stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {project.stats.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '11px 18px', minWidth: 80, textAlign: 'center',
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: project.color }}>{s.value}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--grey)', marginTop: 2 }}>{s.label}</div>
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

/* ── Section ─────────────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(60px,8vw,120px) clamp(20px,6vw,100px)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16,
      }}>
        <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
        פרויקטים נבחרים
      </div>
      <h2 style={{
        fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900,
        letterSpacing: '-1px', lineHeight: 1.1,
        marginBottom: 'clamp(64px,9vw,110px)',
      }}>
        מוצרים שאנשים <span style={{ color: 'var(--cyan)' }}>באמת משתמשים בהם.</span>
      </h2>

      {projects.map((p, i) => (
        <ProjectRow key={p.id} project={p} index={i} />
      ))}
    </section>
  )
}
