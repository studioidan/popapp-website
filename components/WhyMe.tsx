'use client'
import { Zap, Brain, Stethoscope, Smile } from 'lucide-react'

const cards = [
  { Icon: Zap,         title:'מהיר להבין',      text:'פגישה אחת מספיקה. אני מבין את הצורך ומתחיל לבנות.', accent:'#00e5ff' },
  { Icon: Brain,       title:'Full-Stack אמיתי', text:'Frontend, Backend, Mobile, AI, Cloud, DevOps. בכל שכבה, בכל טכנולוגיה.', accent:'#7c3aed' },
  { Icon: Stethoscope, title:'Medical Startups', text:'ניסיון עם רגולציה רפואית, CGM APIs, HL7/FHIR.', accent:'#10b981' },
  { Icon: Smile,       title:'כיף לעבוד איתי',  text:'ישיר, שקוף, נגיש. לקוחות חוזרים כי הדרך לא פחות חשובה מהיעד.', accent:'#f59e0b' },
]

export default function WhyMe() {
  return (
    <section id="why" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.68rem',
          fontWeight:700, letterSpacing:'3px', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          למה לבחור בי
        </div>

        <h2 style={{ fontSize:'clamp(1.6rem,4vw,3.2rem)', fontWeight:900,
          letterSpacing:'-2px', lineHeight:1.0, marginBottom:'clamp(40px,6vw,64px)' }}>
          חברת תוכנה שלמה,<br />
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            מחיר של פרילנסר.
          </span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}>
          {cards.map((c) => (
            <div key={c.title} style={{
              background: 'rgba(8,14,31,0.6)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
              padding: 'clamp(20px,3vw,32px)',
              transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.accent}44`
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 48px ${c.accent}14`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <c.Icon size={26} color={c.accent} strokeWidth={1.75} style={{ marginBottom: 16 }} />
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>{c.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.75 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          #why .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
// Sun Jun 28 12:03:44 UTC 2026
