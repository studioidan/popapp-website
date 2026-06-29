'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' },
            Number(el.dataset.i || 0) * 90)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const r = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el }
  const anim = (delay = 0): React.CSSProperties => ({
    opacity: 0, transform: 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <section id="about" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ position:'absolute', bottom:0, right:0, width:'min(500px,60vw)',
        height:'min(500px,60vw)', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,107,53,0.04),transparent 70%)',
        pointerEvents:'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div ref={r(0)} data-i="0" style={{ display:'inline-flex', alignItems:'center', gap:10,
          fontSize:'0.68rem', fontWeight:700, letterSpacing:'3px',
          textTransform:'uppercase', color:'var(--accent)', marginBottom:24, ...anim() }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          מי אני
        </div>

        <p ref={r(1)} data-i="1" style={{ fontSize:'clamp(0.9rem,1.6vw,1rem)',
          fontWeight:600, color:'var(--text-muted)', letterSpacing:'1px',
          textTransform:'uppercase', marginBottom:12, ...anim(0.06) }}>
          עידן בן שמעון
        </p>

        <h2 ref={r(2)} data-i="2" style={{ fontSize:'clamp(1.6rem,4vw,3rem)', fontWeight:900,
          letterSpacing:'-1.5px', lineHeight:1.1, marginBottom:32, ...anim(0.1) }}>
          מהנדס תוכנה עצמאי.<br />
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            נגעתי כמעט בכל תחום.
          </span>
        </h2>

        <p ref={r(3)} data-i="3" style={{ fontSize:'clamp(1rem,1.8vw,1.12rem)', fontWeight:300,
          color:'var(--text-secondary)', lineHeight:1.9, marginBottom:16, maxWidth:680, ...anim(0.14) }}>
          15 שנה. עשרות פרויקטים. בניתי אפליקציות שהגיעו למאות אלפי משתמשים, מערכות IoT שמצילות חיים, ופלטפורמות AI רפואיות שנבדקות בניסויים קליניים.
        </p>

        <p ref={r(4)} data-i="4" style={{ fontSize:'clamp(1rem,1.8vw,1.12rem)', fontWeight:300,
          color:'var(--text-secondary)', lineHeight:1.9, marginBottom:16, maxWidth:680, ...anim(0.18) }}>
          יש לי אובססיה ללמוד דברים חדשים. אני אוהב לצאת מאזור הנוחות שלי, להתמודד עם תחומים שלא מכרתי, ולצאת מהם עם פתרון שעובד. זה מה שגרם לי לנגוע בכל כך הרבה עולמות שונים.
        </p>

        <p ref={r(5)} data-i="5" style={{ fontSize:'clamp(1rem,1.8vw,1.12rem)', fontWeight:300,
          color:'var(--text-secondary)', lineHeight:1.9, marginBottom:56, maxWidth:680, ...anim(0.22) }}>
          אני לא עובד עבורך, אני עובד{' '}
          <strong style={{ color:'var(--text-primary)', fontWeight:600 }}>איתך</strong>.
          {' '}פגישה אחת מספיקה כדי שאבין בדיוק מה צריך, ומשם קוד שרץ תוך ימים, לא חודשים. בלי ישיבות מיותרות, בלי תקציב שנשרף.
        </p>

        {/* stats */}
        <div ref={r(6)} data-i="6" style={{ display:'flex', gap:'clamp(24px,5vw,64px)',
          flexWrap:'wrap', paddingTop:48, marginTop:48,
          borderTop:'1px solid var(--border)', ...anim(0.5) }}>
          {[
            {num:'15+',label:'שנות ניסיון'},
            {num:'100K+',label:'משתמשים באפליקציה אחת'},
            {num:'50+',label:'פרויקטים שסיימתי'},
            {num:'4',label:'תחומי התמחות'},
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize:'clamp(1.6rem,3vw,2.6rem)', fontWeight:900, lineHeight:1, marginBottom:6,
                background:'linear-gradient(135deg,var(--accent),#0077ff)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.num}</div>
              <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
