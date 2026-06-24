'use client'
import { useEffect, useRef } from 'react'

const cards = [
  { icon: '⚡', title: 'מהירות שלא תמצא בחברה', text: 'בלי שרשראות אישור, בלי להעביר מידע בין מחלקות. אני מקבל החלטות ומממש אותן ברגע. הפרויקט שלך זז כמו סטארטאפ ביום הראשון.' },
  { icon: '🧠', title: 'Senior בכל שכבה', text: 'Frontend, Backend, Mobile, AI, Cloud, DevOps — אני לא מעביר לאחר כשזה מסתבך. 15 שנה של ניסיון בכל אחד מהתחומים.' },
  { icon: '💰', title: 'תקציב שנשמר בשליטה', text: 'בחברת תוכנה אתה משלם על מנהלי פרויקט, QA, PM וארכיטקטים. אצלי — אתה משלם רק על קוד שרץ.' },
  { icon: '🎯', title: 'אני מבין מה אתה צריך', text: 'אחרי עשרות פרויקטים בתעשיות שונות, אני יודע לשאול את השאלות הנכונות ולהגיע למוצר שעובד — לא למה שביקשת על הנייר.' },
  { icon: '🤝', title: 'קשר ישיר, ללא תיווך', text: 'אתה מדבר איתי — לא עם מנהל תיק לקוחות שמעביר הודעות לצוות שמפתח בצד שני של העולם.' },
  { icon: '🚀', title: 'מהרעיון לחנות', text: 'פיתוח, עיצוב, Deploy, App Store, Google Play, תחזוקה — הכל תחת קורת גג אחת. אתה מקבל מוצר שלם.' },
]

export default function WhyMe() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, _) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const i = Number(el.dataset.index)
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 90)
          }
        })
      },
      { threshold: 0.12 }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" style={{ position: 'relative', zIndex: 10, padding: '120px 8vw' }}>
      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16,
      }}>
        <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
        למה לבחור בי
      </div>

      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900,
        letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 64,
      }}>
        חברת תוכנה שלמה,<br />
        <span style={{ color: 'var(--cyan)' }}>מחיר של פרילנסר.</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {cards.map((c, i) => (
          <div
            key={c.title}
            ref={el => { cardRefs.current[i] = el }}
            data-index={i}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 16, padding: '36px',
              opacity: 0, transform: 'translateY(28px)',
              transition: 'all 0.3s ease, opacity 0.6s ease, transform 0.6s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(0,229,255,0.45)'
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 16px 48px rgba(0,229,255,0.08)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--border)'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: 18 }}>{c.icon}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>{c.title}</div>
            <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.72 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
