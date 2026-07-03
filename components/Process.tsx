'use client'
import { useRef, useEffect } from 'react'
import { MessageCircle, FileText, Code2, Rocket } from 'lucide-react'

const steps = [
  { Icon: MessageCircle, num:'01', title:'שיחת גישוש',  text:'30 דקות. מבינים מה צריך ולמה. בלי לבזבז זמן.', anim:'bounce' },
  { Icon: FileText,      num:'02', title:'הצעת מחיר',   text:'מפורטת, מחייבת, עם לוח זמנים ברור. ללא הפתעות.', anim:'none' },
  { Icon: Code2,         num:'03', title:'פיתוח שוטף',  text:'Demo חי תוך ימים. עדכונים שבועיים. תמיד בתמונה.', anim:'pulse' },
  { Icon: Rocket,        num:'04', title:'השקה',         text:'Deploy, App Store ותמיכה אחרי ההשקה.', anim:'launch' },
]

export default function Process() {
  const refs = useRef<(HTMLDivElement|null)[]>([])
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)' },
            Number(el.dataset.i) * 100)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" })
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" style={{ position:'relative', zIndex:10,
      padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)',
      background:'linear-gradient(to bottom,transparent,rgba(0,229,255,0.02),transparent)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.68rem', fontWeight:700,
        letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
        <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
        איך עובדים
      </div>
      <h2 style={{ fontSize:'clamp(1.6rem,4vw,3.2rem)', fontWeight:900,
        letterSpacing:'-2px', lineHeight:1.0, marginBottom:'clamp(40px,6vw,80px)' }}>
        פשוט, שקוף,{' '}
        <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>מהיר.</span>
      </h2>

      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap:12 }}>
        {steps.map((s, i) => (
          <div key={s.num} ref={el=>{refs.current[i]=el}} data-i={i}
            style={{ padding:'clamp(20px,3vw,32px)', borderRadius:18,
              background:'rgba(8,14,31,0.4)', backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.06)',
              opacity:0, transform:'translateY(28px)',
              transition:'border-color 0.3s,transform 0.3s,opacity 0.65s ease,transform 0.65s ease' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.25)';e.currentTarget.style.transform='translateY(-5px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.transform='translateY(0)'}}
          >
            <s.Icon
              size={26}
              color='var(--accent)'
              strokeWidth={1.75}
              style={{
                marginBottom:14,
                animation: s.anim==='bounce' ? 'icon-bounce 2s ease-in-out infinite'
                  : s.anim==='pulse'  ? 'icon-pulse 2.5s ease-in-out infinite'
                  : s.anim==='launch' ? 'icon-launch 3s ease-in-out infinite'
                  : 'none',
              }}
            />

            <div style={{ fontSize:'1rem', fontWeight:700, marginBottom:8, letterSpacing:'-0.3px' }}>{s.title}</div>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.84rem', lineHeight:1.7 }}>{s.text}</p>
          </div>
        ))}
      </div>
      </div>

      <style>{`
        @keyframes icon-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes icon-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.15)} }
        @keyframes icon-launch { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(-8deg)} }
      `}</style>
    </section>
  )
}
