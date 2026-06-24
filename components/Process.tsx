'use client'
import { useRef, useEffect } from 'react'
const steps = [
  {icon:'💬',num:'01',title:'שיחת גישוש',text:'30 דקות. מבינים מה צריך ולמה.'},
  {icon:'📋',num:'02',title:'הצעת מחיר',text:'מפורטת, מחייבת, עם לוח זמנים ברור.'},
  {icon:'🛠️',num:'03',title:'פיתוח שוטף',text:'Demo חי תוך ימים. עדכונים שבועיים.'},
  {icon:'🚀',num:'04',title:'השקה',text:'Deploy, App Store ותמיכה אחרי ההשקה.'},
]
export default function Process() {
  const refs = useRef<(HTMLDivElement|null)[]>([])
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target as HTMLElement
          setTimeout(()=>{el.style.opacity='1';el.style.transform='translateY(0)'},Number(el.dataset.i)*100)
          obs.unobserve(el)
        }
      })
    },{threshold:0.1})
    refs.current.forEach(el=>el&&obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  return (
    <section id="process" style={{position:'relative',zIndex:10,
      padding:'clamp(60px,8vw,120px) clamp(20px,6vw,100px)',
      background:'linear-gradient(to bottom,transparent,rgba(0,229,255,0.02),transparent)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.7rem',fontWeight:700,
        letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)',marginBottom:16}}>
        <span style={{width:24,height:1.5,background:'var(--accent)',display:'block'}} />
        איך עובדים
      </div>
      <h2 style={{fontSize:'clamp(1.6rem,4vw,3.5rem)',fontWeight:900,
        letterSpacing:'-2px',lineHeight:1.0,marginBottom:'clamp(40px,6vw,80px)'}}>
        פשוט, שקוף,{' '}
        <span style={{background:'linear-gradient(135deg,#00e5ff,#0077ff)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>מהיר.</span>
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,180px),1fr))',gap:12}}>
        {steps.map((s,i)=>(
          <div key={s.num} ref={el=>{refs.current[i]=el}} data-i={i}
            style={{padding:'clamp(20px,3vw,32px)',borderRadius:18,
              background:'rgba(8,14,31,0.4)',backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.06)',
              opacity:0,transform:'translateY(28px)',
              transition:'border-color 0.3s,transform 0.3s,opacity 0.65s ease,transform 0.65s ease'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.25)';e.currentTarget.style.transform='translateY(-5px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.transform='translateY(0)'}}
          >
            <div style={{fontSize:'2.8rem',fontWeight:900,letterSpacing:'-2px',
              color:'transparent',WebkitTextStroke:'1px rgba(0,229,255,0.2)',
              lineHeight:1,marginBottom:16,userSelect:'none'}}>{s.num}</div>
            <div style={{fontSize:'1.6rem',marginBottom:12}}>{s.icon}</div>
            <div style={{fontSize:'1rem',fontWeight:700,marginBottom:8,letterSpacing:'-0.3px'}}>{s.title}</div>
            <p style={{color:'var(--text-secondary)',fontSize:'0.84rem',lineHeight:1.7}}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
