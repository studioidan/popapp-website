'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['אפליקציות', 'AI Products', 'Medical Tech', 'Startups', 'IoT Systems']

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  /* word cycle */
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setFading(false) }, 350)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  /* mouse parallax for ambient blobs */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* entrance */
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.querySelectorAll<HTMLElement>('.ha').forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(40px)'
      setTimeout(() => {
        item.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, 80 + i * 130)
    })
  }, [])

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center',
      padding: 'clamp(100px,12vw,160px) clamp(24px,7vw,100px) 80px',
      overflow: 'hidden',
    }}>
      {/* parallax ambient blobs */}
      <div style={{
        position: 'absolute', top: '-5%', right: '-8%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`,
        transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.05) 0%, transparent 70%)',
        transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
        transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 960, position: 'relative', zIndex: 1 }}>
        {/* eyebrow */}
        <div className="ha" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36,
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--accent)',
        }}>
          <span style={{ width: 32, height: 1.5, background: 'var(--accent)', display: 'block' }} />
          15 שנות ניסיון · full-stack · ai · medical
        </div>

        {/* main title */}
        <h1 className="ha" style={{
          fontSize: 'clamp(3rem,8.5vw,9rem)', fontWeight: 900,
          lineHeight: 0.92, letterSpacing: '-4px', marginBottom: 40,
        }}>
          <span style={{ display: 'block', color: 'var(--text-primary)' }}>מפתח אחד.</span>
          {/* gradient word */}
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #00e5ff 0%, #0077ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>יכולות של</span>
          <span style={{ display: 'block', color: 'var(--accent-warm)' }}>חברה שלמה.</span>
        </h1>

        {/* animated word */}
        <div className="ha" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 300 }}>
            בונה
          </span>
          <span style={{
            fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 700,
            color: 'var(--accent)',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            display: 'inline-block',
            minWidth: 180,
          }}>{WORDS[wordIdx]}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 300 }}>
            מקצה לקצה
          </span>
        </div>

        {/* sub */}
        <p className="ha" style={{
          fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 300,
          color: 'var(--text-secondary)', maxWidth: 580, lineHeight: 1.85, marginBottom: 52,
        }}>
          אני עידן בן שמעון —{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>מהרעיון ועד ה-App Store</strong>
          , תוך ימים לא חודשים. בלי ישיבות, בלי תקציב שנשרף.
        </p>

        {/* CTAs */}
        <div className="ha" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 80 }}>
          <a href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #0077ff)',
              color: '#04070f', border: 'none',
              padding: '15px 40px', borderRadius: 12,
              fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.25s, box-shadow 0.25s',
              boxShadow: '0 0 0 1px rgba(0,229,255,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,229,255,0.4), 0 0 0 1px rgba(0,229,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.3)' }}
          >
            בוא נדבר על הפרויקט שלך
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </a>

          <a href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '15px 36px', borderRadius: 12,
              fontFamily: 'inherit', fontSize: '1rem', fontWeight: 400,
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          >ראה פרויקטים ↓</a>
        </div>

        {/* stats */}
        <div className="ha" style={{
          display: 'flex', gap: 'clamp(24px,5vw,56px)',
          paddingTop: 36, borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '15+', label: 'שנות ניסיון' },
            { num: '100K+', label: 'משתמשים באפליקציה אחת' },
            { num: '4', label: 'תחומי התמחות' },
            { num: '∞', label: 'פרויקטים שסיימתי' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 900,
                lineHeight: 1, marginBottom: 6,
                background: 'linear-gradient(135deg, var(--accent), #0077ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.num}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'var(--text-muted)', fontSize: '0.68rem', letterSpacing: '2px',
        textTransform: 'uppercase', animation: 'float 2.5s ease-in-out infinite',
      }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        גלול
      </div>
    </section>
  )
}
