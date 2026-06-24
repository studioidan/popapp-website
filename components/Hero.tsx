'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['אפליקציות', 'AI Products', 'Medical Tech', 'IoT Systems', 'Startups']

const TECH_STACK = [
  { icon:'⚛️',  name:'React Native', color:'#61dafb' },
  { icon:'🟢',  name:'Node.js',      color:'#68a063' },
  { icon:'🤖',  name:'OpenAI',       color:'#10b981' },
  { icon:'☁️',  name:'AWS',          color:'#ff9900' },
  { icon:'🔥',  name:'Firebase',     color:'#ffca28' },
  { icon:'🐍',  name:'Python / ML',  color:'#3b82f6' },
]

const RECENT = [
  { emoji:'📚', name:'MeBook.ai',  stat:'1,000+ ספרים', color:'#ff6b35' },
  { emoji:'🍳', name:'Niki B',     stat:'100K הורדות',  color:'#f59e0b' },
  { emoji:'🩺', name:'MakeSense', stat:'Clinical Beta', color:'#10b981' },
  { emoji:'🏊', name:'Lifebuoy',  stat:'<2s זמן תגובה',color:'#3b82f6' },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setFading(false) }, 320)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX/window.innerWidth-.5, y: e.clientY/window.innerHeight-.5 })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  useEffect(() => {
    const el = ref.current; if (!el) return
    el.querySelectorAll<HTMLElement>('.ha').forEach((item, i) => {
      item.style.opacity = '0'; item.style.transform = 'translateY(36px)'
      setTimeout(() => {
        item.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        item.style.opacity = '1'; item.style.transform = 'translateY(0)'
      }, 80 + i * 120)
    })
  }, [])

  return (
    <section style={{
      minHeight: '100vh', position: 'relative', zIndex: 10,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'center',
      padding: 'clamp(100px,12vw,140px) clamp(24px,7vw,100px) 80px',
      overflow: 'hidden',
    }}>
      {/* ambient blobs */}
      <div style={{ position:'absolute',top:'-10%',right:'-5%',width:700,height:700,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.06),transparent 70%)',
        transform:`translate(${mouse.x*-28}px,${mouse.y*-18}px)`,
        transition:'transform 0.9s cubic-bezier(0.16,1,0.3,1)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'5%',left:'-8%',width:500,height:500,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,107,53,0.05),transparent 70%)',
        transform:`translate(${mouse.x*18}px,${mouse.y*14}px)`,
        transition:'transform 1.1s cubic-bezier(0.16,1,0.3,1)',pointerEvents:'none' }} />

      {/* ── LEFT: text ──────────────────────── */}
      <div ref={ref}>
        <div className="ha" style={{ display:'inline-flex',alignItems:'center',gap:10,marginBottom:32,
          fontSize:'0.68rem',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)' }}>
          <span style={{ width:32,height:1.5,background:'var(--accent)',display:'block' }} />
          15 שנות ניסיון · full-stack · ai · medical
        </div>

        <h1 className="ha" style={{ fontSize:'clamp(2.8rem,7vw,7.5rem)',fontWeight:900,
          lineHeight:0.92,letterSpacing:'-4px',marginBottom:36 }}>
          <span style={{ display:'block' }}>מפתח אחד.</span>
          <span style={{ display:'block',
            background:'linear-gradient(135deg,#00e5ff 0%,#0077ff 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>יכולות של</span>
          <span style={{ display:'block',color:'var(--accent-warm)' }}>חברה שלמה.</span>
        </h1>

        {/* animated word */}
        <div className="ha" style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20,flexWrap:'wrap' }}>
          <span style={{ color:'var(--text-secondary)',fontSize:'clamp(0.95rem,1.8vw,1.2rem)',fontWeight:300 }}>בונה</span>
          <span style={{
            fontSize:'clamp(0.95rem,1.8vw,1.2rem)',fontWeight:700,color:'var(--accent)',
            opacity:fading?0:1,transform:fading?'translateY(-6px)':'translateY(0)',
            transition:'opacity 0.32s,transform 0.32s',display:'inline-block',minWidth:160,
          }}>{WORDS[wordIdx]}</span>
          <span style={{ color:'var(--text-secondary)',fontSize:'clamp(0.95rem,1.8vw,1.2rem)',fontWeight:300 }}>מקצה לקצה</span>
        </div>

        <p className="ha" style={{ fontSize:'clamp(0.92rem,1.6vw,1.1rem)',fontWeight:300,
          color:'var(--text-secondary)',maxWidth:500,lineHeight:1.85,marginBottom:44 }}>
          אני עידן בן שמעון —{' '}
          <strong style={{ color:'var(--text-primary)',fontWeight:600 }}>מהרעיון ועד ה-App Store</strong>
          , תוך ימים לא חודשים. בלי ישיבות, בלי תקציב שנשרף.
        </p>

        <div className="ha" style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:64 }}>
          <a href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}
            style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',color:'#04070f',border:'none',
              padding:'14px 36px',borderRadius:12,fontFamily:'inherit',fontSize:'0.97rem',fontWeight:700,
              textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8,
              transition:'transform 0.25s,box-shadow 0.25s',
              boxShadow:'0 0 0 1px rgba(0,229,255,0.3)' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,229,255,0.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 0 0 1px rgba(0,229,255,0.3)'}}
          >בוא נדבר על הפרויקט שלך →</a>

          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}}
            style={{ background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',color:'var(--text-primary)',
              border:'1px solid rgba(255,255,255,0.1)',padding:'14px 32px',borderRadius:12,
              fontFamily:'inherit',fontSize:'0.97rem',fontWeight:400,
              textDecoration:'none',display:'inline-block',transition:'all 0.25s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.4)';e.currentTarget.style.color='var(--accent)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='var(--text-primary)'}}
          >ראה פרויקטים ↓</a>
        </div>

        <div className="ha" style={{ display:'flex',gap:'clamp(20px,4vw,48px)',
          paddingTop:32,borderTop:'1px solid var(--border)',flexWrap:'wrap' }}>
          {[
            {num:'15+',label:'שנות ניסיון'},
            {num:'100K+',label:'משתמשים'},
            {num:'4',label:'תחומי התמחות'},
          ].map(s=>(
            <div key={s.label}>
              <div style={{ fontSize:'clamp(1.5rem,3vw,2.4rem)',fontWeight:900,lineHeight:1,marginBottom:5,
                background:'linear-gradient(135deg,var(--accent),#0077ff)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.num}</div>
              <div style={{ fontSize:'0.72rem',color:'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: visual panel ─────────────────── */}
      <div className="ha" style={{ display:'flex',flexDirection:'column',gap:16 }}>

        {/* Recent projects mini-cards */}
        <div style={{
          background:'rgba(8,14,31,0.7)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,
          padding:'20px',position:'relative',overflow:'hidden',
        }}>
          {/* inner glow */}
          <div style={{ position:'absolute',top:-40,right:-40,width:140,height:140,borderRadius:'50%',
            background:'radial-gradient(circle,rgba(0,229,255,0.1),transparent)',pointerEvents:'none' }} />

          <div style={{ fontSize:'0.65rem',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',
            color:'var(--text-muted)',marginBottom:14 }}>פרויקטים אחרונים</div>

          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {RECENT.map((r,i) => (
              <div key={r.name}
                style={{
                  display:'flex',alignItems:'center',gap:12,
                  padding:'10px 14px',borderRadius:12,
                  background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${r.color}22`,
                  transition:'all 0.25s',
                  animation:`fadeUp 0.5s ease ${i*0.08}s both`,
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=`${r.color}10`;e.currentTarget.style.borderColor=`${r.color}55`;e.currentTarget.style.transform='translateX(-4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.03)';e.currentTarget.style.borderColor=`${r.color}22`;e.currentTarget.style.transform=''}}
              >
                <span style={{ fontSize:'1.4rem',flexShrink:0 }}>{r.emoji}</span>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:700,fontSize:'0.88rem',marginBottom:1 }}>{r.name}</div>
                  <div style={{ fontSize:'0.72rem',color:r.color,fontWeight:600 }}>{r.stat}</div>
                </div>
                <div style={{ width:6,height:6,borderRadius:'50%',background:r.color,
                  flexShrink:0,boxShadow:`0 0 6px ${r.color}`,
                  animation:'pulse-glow 2s ease-in-out infinite' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack grid */}
        <div style={{
          background:'rgba(8,14,31,0.7)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,
          padding:'20px',
        }}>
          <div style={{ fontSize:'0.65rem',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',
            color:'var(--text-muted)',marginBottom:14 }}>stack</div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 }}>
            {TECH_STACK.map((t,i) => (
              <div key={t.name}
                style={{
                  display:'flex',alignItems:'center',gap:8,
                  padding:'8px 10px',borderRadius:10,
                  background:'rgba(255,255,255,0.03)',
                  border:`1px solid ${t.color}18`,
                  transition:'all 0.2s',
                  animation:`fadeUp 0.5s ease ${0.3+i*0.06}s both`,
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=`${t.color}12`;e.currentTarget.style.borderColor=`${t.color}44`;e.currentTarget.style.transform='scale(1.04)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.03)';e.currentTarget.style.borderColor=`${t.color}18`;e.currentTarget.style.transform=''}}
              >
                <span style={{ fontSize:'1.1rem',flexShrink:0 }}>{t.icon}</span>
                <span style={{ fontSize:'0.72rem',fontWeight:600,color:'var(--text-secondary)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* availability badge */}
        <div style={{
          display:'flex',alignItems:'center',gap:12,
          padding:'14px 18px',borderRadius:14,
          background:'rgba(16,185,129,0.08)',
          border:'1px solid rgba(16,185,129,0.25)',
          backdropFilter:'blur(12px)',
        }}>
          <div style={{ width:10,height:10,borderRadius:'50%',background:'#10b981',flexShrink:0,
            boxShadow:'0 0 8px #10b981',animation:'pulse-glow 1.8s ease-in-out infinite' }} />
          <div>
            <div style={{ fontWeight:700,fontSize:'0.85rem',color:'#10b981' }}>פנוי לפרויקטים חדשים</div>
            <div style={{ fontSize:'0.72rem',color:'var(--text-muted)',marginTop:1 }}>זמן תגובה ממוצע · 24 שעות</div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{ position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',
        display:'flex',flexDirection:'column',alignItems:'center',gap:8,
        color:'var(--text-muted)',fontSize:'0.65rem',letterSpacing:'2px',textTransform:'uppercase',
        animation:'float 2.5s ease-in-out infinite' }}>
        <div style={{ width:1,height:36,background:'linear-gradient(to bottom,var(--accent),transparent)' }} />
        גלול
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
        @keyframes pulse-glow{0%,100%{opacity:0.5}50%{opacity:1}}
        @media(max-width:768px){section{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
