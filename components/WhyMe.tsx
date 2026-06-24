'use client'
import { useEffect, useRef } from 'react'

const cards = [
  { icon:'⚡', title:'מהירות ללא פשרות', text:'תוך ימים — לא חודשים. בלי שרשראות אישור, בלי ישיבות קיקיון. קוד שרץ תוך שעות.' },
  { icon:'🧠', title:'Senior בכל שכבה', text:'Frontend, Backend, Mobile, AI, Cloud, DevOps — בכל שכבה. אני לא מעביר לאחר כשזה מסתבך.' },
  { icon:'🏥', title:'מומחה Medical Startups', text:'ניסיון עם HL7/FHIR, CGM APIs, רגולציה רפואית. יודע לבנות מוצר שצוות רפואי יכול לסמוך עליו.' },
  { icon:'😄', title:'כיף לעבוד איתי', text:'ישיר, שקוף, נגיש. אתה תמיד יודע מה קורה. לקוחות חוזרים — כי הניסיון מהנה, לא רק התוצאה.' },
  { icon:'💰', title:'תקציב בשליטה', text:'אצלי אתה משלם על קוד שרץ — לא על מנהלי פרויקט, PM, QA וארכיטקטים שמעבירים ביניהם הודעות.' },
  { icon:'🤝', title:'שותף — לא קבלן', text:'אני לא מקבל ספק ובונה. אני מבין את הביזנס, שואל שאלות קשות, ומגיע עם הצעות משלי.' },
]

export default function WhyMe() {
  const refs = useRef<(HTMLDivElement|null)[]>([])
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const i = Number(el.dataset.i)
          setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)' }, i*80)
        }
      })
    }, { threshold:0.1 })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why" style={{ position:'relative', zIndex:10, padding:'clamp(60px,8vw,120px) clamp(20px,7vw,100px)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:700,
        letterSpacing:'3px', textTransform:'uppercase', color:'var(--cyan)', marginBottom:16 }}>
        <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
        למה לבחור בי
      </div>
      <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.2rem)', fontWeight:900, letterSpacing:'-1px', lineHeight:1.1, marginBottom:60 }}>
        חברת תוכנה שלמה,<br /><span style={{ color:'var(--cyan)' }}>מחיר של פרילנסר.</span>
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:20 }}>
        {cards.map((c,i) => (
          <div key={c.title} ref={el=>{refs.current[i]=el}} data-i={i}
            style={{ background:'rgba(255,255,255,0.025)', border:'1px solid var(--border)', borderRadius:18,
              padding:'clamp(24px,3vw,36px)', opacity:0, transform:'translateY(30px)',
              transition:'border-color 0.3s, transform 0.3s, box-shadow 0.3s, opacity 0.6s ease, transform 0.6s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.4)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow='0 24px 60px rgba(0,229,255,0.07)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
          >
            <div style={{ fontSize:'2rem', marginBottom:16 }}>{c.icon}</div>
            <div style={{ fontSize:'1.05rem', fontWeight:700, marginBottom:10 }}>{c.title}</div>
            <p style={{ color:'var(--grey)', fontSize:'0.88rem', lineHeight:1.75 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
