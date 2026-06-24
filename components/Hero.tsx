'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 200)
  }, [])

  return (
    <section style={{
      position: 'relative', zIndex: 10, minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start',
      padding: '0 8vw',
    }}>
      {/* Eyebrow */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontSize: '0.78rem', fontWeight: 600, letterSpacing: '2px',
        textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 28,
      }}>
        <span style={{ display: 'block', width: 32, height: 1.5, background: 'var(--cyan)' }} />
        15 שנות ניסיון · פיתוח מלא מקצה לקצה
      </div>

      {/* Title */}
      <h1 ref={titleRef} style={{
        fontSize: 'clamp(3.2rem, 7vw, 7rem)', fontWeight: 900,
        lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 24,
      }}>
        מפתח אחד.<br />
        <span style={{ color: 'var(--cyan)' }}>יכולות</span> של<br />
        <span style={{ color: 'var(--orange)' }}>חברה שלמה.</span>
      </h1>

      {/* Sub */}
      <p style={{
        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 300,
        color: 'var(--grey)', maxWidth: 560, lineHeight: 1.7, marginBottom: 48,
      }}>
        אני עידן בן שמעון.{' '}
        <strong style={{ color: 'var(--white)', fontWeight: 600 }}>מהרעיון ועד לחנות</strong>
        {' '}— אפליקציות, מוצרי AI, מערכות ניהול ואוטומציות, בלי מליון ישיבות ובלי לשרוף את התקציב.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a href="#contact" onClick={e => {
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }} style={{
          background: 'var(--cyan)', color: 'var(--black)', border: 'none',
          padding: '14px 36px', borderRadius: 8, fontFamily: 'inherit',
          fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
          textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,255,0.35)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >קבל הצעת מחיר</a>

        <a href="#orbit" onClick={e => {
          e.preventDefault()
          document.getElementById('orbit')?.scrollIntoView({ behavior: 'smooth' })
        }} style={{
          background: 'transparent', color: 'var(--white)',
          border: '1.5px solid rgba(255,255,255,0.2)',
          padding: '14px 36px', borderRadius: 8, fontFamily: 'inherit',
          fontSize: '1rem', fontWeight: 400, cursor: 'pointer',
          textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--cyan)'
            e.currentTarget.style.color = 'var(--cyan)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.color = 'var(--white)'
          }}
        >ראה פרויקטים</a>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', gap: 48, marginTop: 72,
        paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)',
        flexWrap: 'wrap',
      }}>
        {[
          { num: '15+', label: 'שנות ניסיון' },
          { num: '100K+', label: 'הורדות לאפליקציה אחת' },
          { num: '∞', label: 'פרויקטים מורכבים שסיימתי' },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--cyan)', lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--grey)', marginTop: 4, fontWeight: 300 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
