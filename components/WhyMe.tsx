'use client'
import { useEffect, useRef } from 'react'

const cards = [
  { icon:'⚡', title:'מהירות ללא פשרות', text:'תוך ימים — לא חודשים. בלי שרשראות אישור. קוד שרץ תוך שעות.', accent:'#00e5ff' },
  { icon:'🧠', title:'Senior בכל שכבה', text:'Frontend, Backend, Mobile, AI, Cloud, DevOps — אני לא מעביר לאחר.', accent:'#7c3aed' },
  { icon:'🏥', title:'Medical Startups', text:'HL7/FHIR, CGM APIs, רגולציה רפואית. מוצרים שצוות רפואי יכול לסמוך.', accent:'#10b981' },
  { icon:'😄', title:'כיף לעבוד איתי', text:'ישיר, שקוף, נגיש. תמיד בתמונה. לקוחות חוזרים — כי הניסיון מהנה.', accent:'#f59e0b' },
  { icon:'💰', title:'תקציב בשליטה', text:'אתה משלם על קוד שרץ — לא על PM, QA, ארכיטקטים ועוד.', accent:'#ff6b35' },
  { icon:'🤝', title:'שותף — לא קבלן', text:'אני מבין את הביזנס, שואל שאלות קשות, ומגיע עם הצעות משלי.', accent:'#00e5ff' },
]

export default function WhyMe() {
  const refs = useRef<(HTMLDivElement|null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0) scale(1)' }, Number(el.dataset.i)*90)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why" style={{ position:'relative', zIndex:10, padding:'clamp(80px,10vw,140px) clamp(24px,7vw,100px)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10,
        fontSize:'0.7rem', fontWeight:700, letterSpacing:'3px',
        textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
        <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
        למה לבחור בי
      </div>
      <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.5rem)', fontWeight:900,
        letterSpacing:'-2px', lineHeight:1.0, marginBottom:16 }}>
        חברת תוכנה שלמה,
      </h2>
      <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.5rem)', fontWeight:900,
        letterSpacing:'-2px', lineHeight:1.0, marginBottom:64,
        background:'linear-gradient(135deg, #00e5ff, #0077ff)',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
        מחיר של פרילנסר.
      </h2>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:20 }}>
        {cards.map((c,i) => (
          <div key={c.title} ref={el=>{refs.current[i]=el}} data-i={i}
            style={{
              position:'relative', overflow:'hidden',
              background:'rgba(8,14,31,0.6)', backdropFilter:'blur(16px)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:20, padding:'clamp(24px,3vw,36px)',
              opacity:0, transform:'translateY(32px) scale(0.97)',
              transition:'border-color 0.3s, transform 0.3s, box-shadow 0.3s, opacity 0.65s ease, transform 0.65s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${c.accent}44`
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 24px 64px ${c.accent}18, 0 0 0 1px ${c.accent}22`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* inner glow */}
            <div style={{
              position:'absolute', top:-40, right:-40, width:120, height:120, borderRadius:'50%',
              background:`radial-gradient(circle, ${c.accent}14, transparent)`,
              pointerEvents:'none',
            }} />
            <div style={{ fontSize:'2rem', marginBottom:18 }}>{c.icon}</div>
            <div style={{ fontSize:'1.05rem', fontWeight:700, marginBottom:10, letterSpacing:'-0.3px' }}>{c.title}</div>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.88rem', lineHeight:1.78 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
