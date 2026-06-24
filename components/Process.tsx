'use client'
const steps = [
  { icon:'💬', title:'שיחת גישוש', text:'30 דקות. מבינים מה צריך ולמה. בלי לבזבז לך את הזמן.' },
  { icon:'📋', title:'הצעת מחיר', text:'מפורטת, מחייבת, עם לוח זמנים ברור. ללא הפתעות.' },
  { icon:'🛠️', title:'פיתוח שוטף', text:'עדכונים שבועיים. Demo חי תוך ימים. תמיד בתמונה.' },
  { icon:'🚀', title:'השקה ומעבר', text:'Deploy, App Store, תחזוקה — אני לא נעלם אחרי ההשקה.' },
]
export default function Process() {
  return (
    <section id="process" style={{ position:'relative', zIndex:10,
      padding:'clamp(60px,8vw,100px) clamp(20px,7vw,100px)',
      background:'linear-gradient(to bottom, transparent, rgba(0,229,255,0.02), transparent)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:700,
        letterSpacing:'3px', textTransform:'uppercase', color:'var(--cyan)', marginBottom:16 }}>
        <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
        איך עובדים
      </div>
      <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.2rem)', fontWeight:900, letterSpacing:'-1px', lineHeight:1.1, marginBottom:64 }}>
        פשוט, <span style={{ color:'var(--cyan)' }}>שקוף</span> ומהיר.
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:24, position:'relative' }}>
        <div style={{ position:'absolute', top:36, right:'8%', left:'8%', height:1,
          background:'linear-gradient(to left, transparent, var(--border) 20%, var(--border) 80%, transparent)', zIndex:0 }} />
        {steps.map((s,i) => (
          <div key={s.title} style={{ textAlign:'center', padding:'0 16px', position:'relative', zIndex:1 }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--navy)',
              border:'1.5px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 20px', fontSize:'1.6rem', transition:'all 0.3s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--cyan)';e.currentTarget.style.transform='scale(1.12)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='var(--navy)';e.currentTarget.style.transform='scale(1)'}}
            >{s.icon}</div>
            <div style={{ fontSize:'1rem', fontWeight:700, marginBottom:8 }}>{s.title}</div>
            <p style={{ fontSize:'0.84rem', color:'var(--grey)', lineHeight:1.65 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
