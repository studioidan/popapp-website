'use client'
import { useEffect, useRef } from 'react'
import { Brain, Stethoscope, Smile, Handshake, Zap } from 'lucide-react'

const cards = [
  { Icon: Zap,         title:'מהיר להבין',      text:'פגישה אחת מספיקה. אני מבין את הצורך ומתחיל לבנות.', accent:'#00e5ff', anim:'pulse' },
  { Icon: Brain,       title:'Full-Stack אמיתי', text:'Frontend, Backend, Mobile, AI, Cloud, DevOps. בכל שכבה, בכל טכנולוגיה.', accent:'#7c3aed', anim:'none' },
  { Icon: Stethoscope, title:'Medical Startups', text:'ניסיון עם רגולציה רפואית, CGM APIs, HL7/FHIR. מוצרים שצוות רפואי סומך עליהם.', accent:'#10b981', anim:'none' },
  { Icon: Smile,       title:'כיף לעבוד איתי',  text:'ישיר, שקוף, נגיש. תמיד בתמונה. לקוחות חוזרים כי הדרך לא פחות חשובה מהיעד.', accent:'#f59e0b', anim:'spin-slow' },
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
    }, { threshold: 0, rootMargin: '0px 0px -50px 0px' })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="why" style={{
      position:'relative', zIndex:10,
      padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
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

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }} className="why-grid">
          {cards.map((c, i) => (
            <div key={c.title}
              ref={el => { refs.current[i] = el }}
              data-i={i}
              style={{
                position:'relative', overflow:'hidden',
                background:'rgba(8,14,31,0.6)', backdropFilter:'blur(16px)',
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:18,
                padding:'clamp(24px,3vw,32px)',
                display:'flex', flexDirection:'column', gap:12,
                opacity:0, transform:'translateY(16px) scale(0.98)',
                transition:`border-color 0.3s, box-shadow 0.3s, transform 0.3s,
                            opacity 0.6s ease ${i*0.08}s, transform 0.6s ease ${i*0.08}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor=`${c.accent}44`
                e.currentTarget.style.transform='translateY(-5px)'
                e.currentTarget.style.boxShadow=`0 20px 60px ${c.accent}14, 0 0 0 1px ${c.accent}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='none'
              }}
            >
              <div style={{ position:'absolute', top:-36, right:-36, width:110, height:110,
                borderRadius:'50%', background:`radial-gradient(circle,${c.accent}10,transparent)`,
                pointerEvents:'none' }} />

              <c.Icon
                size={26}
                color={c.accent}
                strokeWidth={1.75}
                style={{
                  animation: c.anim==='pulse' ? 'icon-pulse 2s ease-in-out infinite'
                    : c.anim==='spin-slow'    ? 'icon-spin 6s linear infinite'
                    : 'none',
                }}
              />
              <div style={{ fontWeight:700, fontSize:'1rem', letterSpacing:'-0.3px' }}>{c.title}</div>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.86rem', lineHeight:1.75, flex:1 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-grid { grid-template-columns: repeat(2,1fr); }
        @media (max-width: 600px) { .why-grid { grid-template-columns: 1fr !important; } }
        @keyframes icon-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.2)} }
        @keyframes icon-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  )
}
