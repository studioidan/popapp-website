'use client'
import { useEffect, useRef } from 'react'

const floatingCards = [
  { icon: '📱', label: 'React Native', delay: 0 },
  { icon: '🤖', label: 'AI / OpenAI', delay: 0.4 },
  { icon: '☁️', label: 'AWS Cloud', delay: 0.8 },
  { icon: '⚡', label: 'Next.js', delay: 1.2 },
  { icon: '🔥', label: 'Firebase', delay: 1.6 },
  { icon: '🧠', label: 'Machine Learning', delay: 2.0 },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const children = el.querySelectorAll<HTMLElement>('.hero-anim')
    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(36px)'
      setTimeout(() => {
        child.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      }, 100 + i * 120)
    })
  }, [])

  return (
    <section ref={heroRef} style={{
      position: 'relative', zIndex: 10, minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '100px 6vw 60px',
      gap: 48,
    }}>
      {/* LEFT — Text */}
      <div>
        <div className="hero-anim" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: '0.78rem', fontWeight: 600, letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 28,
        }}>
          <span style={{ display: 'block', width: 32, height: 1.5, background: 'var(--cyan)' }} />
          15 שנות ניסיון · פיתוח מלא מקצה לקצה
        </div>

        <h1 className="hero-anim" style={{
          fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)', fontWeight: 900,
          lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 24,
        }}>
          מפתח אחד.<br />
          <span style={{ color: 'var(--cyan)' }}>יכולות</span> של<br />
          <span style={{ color: 'var(--orange)' }}>חברה שלמה.</span>
        </h1>

        <p className="hero-anim" style={{
          fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300,
          color: 'var(--grey)', maxWidth: 520, lineHeight: 1.75, marginBottom: 44,
        }}>
          אני עידן בן שמעון.{' '}
          <strong style={{ color: 'var(--white)', fontWeight: 600 }}>מהרעיון ועד לחנות</strong>
          {' '}— אפליקציות, מוצרי AI, מערכות ניהול ואוטומציות. בלי מליון ישיבות ובלי לשרוף את התקציב.
        </p>

        <div className="hero-anim" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              background: 'var(--cyan)', color: 'var(--black)', border: 'none',
              padding: '14px 36px', borderRadius: 8, fontFamily: 'inherit',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,229,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >קבל הצעת מחיר</a>

          <a href="#orbit" onClick={e => { e.preventDefault(); document.getElementById('orbit')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              background: 'transparent', color: 'var(--white)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '14px 36px', borderRadius: 8, fontFamily: 'inherit',
              fontSize: '1rem', fontWeight: 400, cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--white)' }}
          >ראה פרויקטים ↓</a>
        </div>

        <div className="hero-anim" style={{
          display: 'flex', gap: 40, marginTop: 64,
          paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.08)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '15+', label: 'שנות ניסיון' },
            { num: '100K+', label: 'הורדות' },
            { num: '∞', label: 'פרויקטים שסיימתי' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--cyan)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--grey)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Floating tech cards grid */}
      <div className="hero-anim hero-right" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        position: 'relative',
      }}>
        {/* Big center card */}
        <div style={{
          gridColumn: '1 / -1',
          background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,229,255,0.04))',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🚀</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>Full-Stack Development</div>
          <div style={{ color: 'var(--grey)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Mobile · Web · AI · Backend · Cloud · DevOps
          </div>
          {/* animated glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.15), transparent)',
            animation: 'float 3s ease-in-out infinite',
          }} />
        </div>

        {floatingCards.map((card, i) => (
          <div key={card.label}
            style={{
              background: 'rgba(8,14,31,0.8)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '20px',
              display: 'flex', alignItems: 'center', gap: 12,
              animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${card.delay}s`,
              transition: 'all 0.3s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--grey)' }}>{card.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; padding: 80px 6vw 40px !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
