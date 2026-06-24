'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.ha')
    items.forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(40px)'
      setTimeout(() => {
        item.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, 80 + i * 130)
    })
  }, [])

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center',
      padding: 'clamp(80px,12vw,140px) clamp(20px,7vw,100px) 60px',
      overflow: 'hidden',
    }}>
      {/* ambient blobs */}
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width: 600, height: 600, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'10%', left:'-10%', width: 500, height: 500, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div ref={ref} style={{ maxWidth: 900, position: 'relative' }}>
        {/* eyebrow */}
        <div className="ha" style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:32,
          fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--cyan)' }}>
          <span style={{ width:32, height:1.5, background:'var(--cyan)', display:'block' }} />
          15 שנות ניסיון · full-stack · AI · medical
        </div>

        {/* main title */}
        <h1 className="ha" style={{
          fontSize: 'clamp(2.8rem,8vw,8rem)', fontWeight:900,
          lineHeight: 0.95, letterSpacing:'-3px', marginBottom:36,
        }}>
          <span style={{ display:'block' }}>מפתח אחד.</span>
          <span style={{ display:'block', color:'var(--cyan)', WebkitTextStroke:'0px' }}>יכולות</span>
          <span style={{ display:'block' }}>של <span style={{ color:'var(--orange)' }}>חברה שלמה.</span></span>
        </h1>

        {/* sub */}
        <p className="ha" style={{
          fontSize:'clamp(1rem,2.2vw,1.35rem)', fontWeight:300, color:'var(--grey)',
          maxWidth:620, lineHeight:1.8, marginBottom:52,
        }}>
          אני עידן בן שמעון — <strong style={{ color:'var(--white)', fontWeight:600 }}>בונה מוצרים מקצה לקצה</strong> כמו שסטארטאפ שלם לא יכול.
          מהרעיון ועד ה-App Store, תוך ימים — לא חודשים.
        </p>

        {/* CTAs */}
        <div className="ha" style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:72 }}>
          <a href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}
            style={{ background:'var(--cyan)', color:'var(--black)', padding:'15px 40px', borderRadius:10,
              fontFamily:'inherit', fontSize:'1rem', fontWeight:700, textDecoration:'none',
              display:'inline-block', transition:'all 0.25s', letterSpacing:'-0.3px' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(0,229,255,0.35)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
          >בוא נדבר על הפרויקט שלך →</a>
          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}}
            style={{ background:'transparent', color:'var(--white)', border:'1.5px solid rgba(255,255,255,0.15)',
              padding:'15px 36px', borderRadius:10, fontFamily:'inherit', fontSize:'1rem',
              fontWeight:400, textDecoration:'none', display:'inline-block', transition:'all 0.25s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)';e.currentTarget.style.color='var(--cyan)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='var(--white)'}}
          >ראה פרויקטים</a>
        </div>

        {/* stats */}
        <div className="ha" style={{ display:'flex', gap:'clamp(24px,5vw,64px)', flexWrap:'wrap',
          paddingTop:36, borderTop:'1px solid var(--border)' }}>
          {[
            { num:'15+', label:'שנות ניסיון' },
            { num:'100K+', label:'משתמשים באפליקציה אחת' },
            { num:'4', label:'תחומים: Mobile · Web · AI · IoT' },
            { num:'∞', label:'פרויקטים מסובכים שסיימתי' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'var(--cyan)', lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:'0.78rem', color:'var(--grey)', marginTop:5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
