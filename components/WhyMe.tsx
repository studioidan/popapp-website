'use client'
import { useEffect, useRef } from 'react'

const cards = [
  { icon:'⚡', title:'מהירות ללא פשרות', text:'תוך ימים, לא חודשים. בלי שרשראות אישור. קוד שרץ תוך שעות.', accent:'#00e5ff' },
  { icon:'🧠', title:'Senior בכל שכבה', text:'Frontend, Backend, Mobile, AI, Cloud, DevOps. לא מעביר לאחר.', accent:'#7c3aed' },
  { icon:'🏥', title:'Medical Startups', text:'ניסיון עם רגולציה רפואית, CGM APIs, HL7/FHIR. מוצרים שצוות רפואי סומך עליהם.', accent:'#10b981' },
  { icon:'😄', title:'כיף לעבוד איתי', text:'ישיר, שקוף, נגיש. תמיד בתמונה. לקוחות חוזרים כי הדרך לא פחות חשובה מהיעד.', accent:'#f59e0b' },
  { icon:'💰', title:'תקציב בשליטה', text:'אתה משלם על קוד שרץ, לא על PM, QA וארכיטקטים שמעבירים הודעות.', accent:'#ff6b35' },
  { icon:'🤝', title:'שותף, לא קבלן', text:'מבין את הביזנס, שואל שאלות קשות, ומגיע עם הצעות משלי.', accent:'#00e5ff' },
]

export default function WhyMe() {
  const refs = useRef<(HTMLDivElement|null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0) scale(1)' },
            Number(el.dataset.i) * 80)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)',
    }}>
      <div style={{ position:'absolute', top:'30%', left:0,
        width:'min(400px,50vw)', height:'min(400px,50vw)', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.04),transparent 70%)',
        pointerEvents:'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.68rem',
          fontWeight:700, letterSpacing:'3px', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          למה לבחור בי
        </div>

        <h2 style={{ fontSize:'clamp(1.6rem,4vw,3.2rem)', fontWeight:900,
          letterSpacing:'-2px', lineHeight:1.0, marginBottom:'clamp(48px,7vw,80px)' }}>
          חברת תוכנה שלמה,<br />
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            מחיר של פרילנסר.
          </span>
        </h2>

        {/* 3×2 symmetric grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {cards.map((c, i) => (
            <div key={c.title}
              ref={el => { refs.current[i] = el }}
              data-i={i}
              style={{
                position: 'relative', overflow: 'hidden',
                background: 'rgba(8,14,31,0.6)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
                padding: 'clamp(24px,3vw,32px)',
                display: 'flex', flexDirection: 'column', gap: 12,
                opacity: 0, transform: 'translateY(28px) scale(0.97)',
                transition: `border-color 0.3s, box-shadow 0.3s, transform 0.3s,
                             opacity 0.6s ease ${i*0.08}s, transform 0.6s ease ${i*0.08}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.accent}44`
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = `0 20px 60px ${c.accent}14, 0 0 0 1px ${c.accent}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* inner glow */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 120, height: 120, borderRadius: '50%',
                background: `radial-gradient(circle, ${c.accent}12, transparent)`,
                pointerEvents: 'none',
              }} />
              <div style={{ fontSize: '2rem', lineHeight: 1 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.3px' }}>{c.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.75, flex: 1 }}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* mobile: 2 cols */}
        <style>{`
          @media (max-width: 640px) {
            #why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 400px) {
            #why-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
