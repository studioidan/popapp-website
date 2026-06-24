'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['אפליקציות', 'AI Products', 'Medical Tech', 'IoT Systems', 'Startups']
const TECH  = [
  {icon:'⚛️',name:'React Native',color:'#61dafb'},
  {icon:'🟢',name:'Node.js',     color:'#68a063'},
  {icon:'🤖',name:'OpenAI',      color:'#10b981'},
  {icon:'☁️',name:'AWS',         color:'#ff9900'},
  {icon:'🔥',name:'Firebase',    color:'#ffca28'},
  {icon:'🐍',name:'Python / ML', color:'#3b82f6'},
]
const RECENT = [
  {emoji:'📚',name:'MeBook.ai', stat:'1,000+ ספרים', color:'#ff6b35'},
  {emoji:'🍳',name:'Niki B',    stat:'100K הורדות',  color:'#f59e0b'},
  {emoji:'🩺',name:'MakeSense', stat:'Clinical Beta', color:'#10b981'},
  {emoji:'🏊',name:'Lifebuoy', stat:'<2s תגובה',     color:'#3b82f6'},
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [mouse, setMouse] = useState({x:0,y:0})

  useEffect(()=>{
    const id = setInterval(()=>{
      setFading(true)
      setTimeout(()=>{setWordIdx(i=>(i+1)%WORDS.length);setFading(false)},320)
    },2400)
    return ()=>clearInterval(id)
  },[])

  useEffect(()=>{
    const fn=(e:MouseEvent)=>setMouse({x:e.clientX/window.innerWidth-.5,y:e.clientY/window.innerHeight-.5})
    window.addEventListener('mousemove',fn)
    return ()=>window.removeEventListener('mousemove',fn)
  },[])

  useEffect(()=>{
    const el=ref.current; if(!el) return
    el.querySelectorAll<HTMLElement>('.ha').forEach((item,i)=>{
      item.style.opacity='0'; item.style.transform='translateY(36px)'
      setTimeout(()=>{
        item.style.transition='opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        item.style.opacity='1'; item.style.transform='translateY(0)'
      },80+i*120)
    })
  },[])

  return (
    <section style={{
      minHeight:'100vh', position:'relative', zIndex:10,
      display:'grid',
      gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))',
      gap:'clamp(32px,5vw,64px)',
      alignItems:'center',
      padding:'clamp(90px,12vw,140px) clamp(20px,6vw,100px) clamp(60px,8vw,100px)',
      overflow:'hidden',
    }}>
      {/* blobs */}
      <div style={{position:'absolute',top:'-10%',right:'-5%',width:'min(700px,80vw)',height:'min(700px,80vw)',borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.06),transparent 70%)',
        transform:`translate(${mouse.x*-28}px,${mouse.y*-18}px)`,
        transition:'transform 0.9s cubic-bezier(0.16,1,0.3,1)',pointerEvents:'none'}} />
      <div style={{position:'absolute',bottom:'5%',left:'-8%',width:'min(500px,60vw)',height:'min(500px,60vw)',borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,107,53,0.05),transparent 70%)',
        transform:`translate(${mouse.x*18}px,${mouse.y*14}px)`,
        transition:'transform 1.1s cubic-bezier(0.16,1,0.3,1)',pointerEvents:'none'}} />

      {/* ── LEFT ── */}
      <div ref={ref}>
        <div className="ha" style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:28,
          fontSize:'0.65rem',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)'}}>
          <span style={{width:28,height:1.5,background:'var(--accent)',display:'block',flexShrink:0}} />
          15 שנות ניסיון · full-stack · ai · medical
        </div>

        <h1 className="ha" style={{fontSize:'clamp(2.4rem,7vw,7.5rem)',fontWeight:900,
          lineHeight:0.92,letterSpacing:'-3px',marginBottom:28}}>
          <span style={{display:'block'}}>מפתח אחד.</span>
          <span style={{display:'block',background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>יכולות של</span>
          <span style={{display:'block',color:'var(--accent-warm)'}}>חברה שלמה.</span>
        </h1>

        <div className="ha" style={{display:'flex',alignItems:'center',gap:10,marginBottom:18,flexWrap:'wrap'}}>
          <span style={{color:'var(--text-secondary)',fontSize:'clamp(0.9rem,1.8vw,1.15rem)',fontWeight:300}}>בונה</span>
          <span style={{fontSize:'clamp(0.9rem,1.8vw,1.15rem)',fontWeight:700,color:'var(--accent)',
            opacity:fading?0:1,transform:fading?'translateY(-6px)':'translateY(0)',
            transition:'opacity 0.32s,transform 0.32s',display:'inline-block',minWidth:'clamp(120px,20vw,180px)'}}>
            {WORDS[wordIdx]}
          </span>
          <span style={{color:'var(--text-secondary)',fontSize:'clamp(0.9rem,1.8vw,1.15rem)',fontWeight:300}}>מקצה לקצה</span>
        </div>

        <p className="ha" style={{fontSize:'clamp(0.9rem,1.6vw,1.05rem)',fontWeight:300,
          color:'var(--text-secondary)',maxWidth:500,lineHeight:1.85,marginBottom:36}}>
          אני עידן בן שמעון —{' '}
          <strong style={{color:'var(--text-primary)',fontWeight:600}}>מהרעיון ועד ה-App Store</strong>
          , תוך ימים לא חודשים.
        </p>

        <div className="ha" style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:52}}>
          <a href="#contact" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}
            style={{background:'linear-gradient(135deg,#00e5ff,#0077ff)',color:'#04070f',border:'none',
              padding:'13px clamp(20px,4vw,36px)',borderRadius:12,fontFamily:'inherit',
              fontSize:'clamp(0.85rem,2vw,0.97rem)',fontWeight:700,
              textDecoration:'none',display:'inline-flex',alignItems:'center',gap:6,
              transition:'transform 0.25s,box-shadow 0.25s',boxShadow:'0 0 0 1px rgba(0,229,255,0.3)',
              whiteSpace:'nowrap'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,229,255,0.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 0 0 1px rgba(0,229,255,0.3)'}}
          >בוא נדבר →</a>

          <a href="#projects" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}}
            style={{background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',color:'var(--text-primary)',
              border:'1px solid rgba(255,255,255,0.1)',padding:'13px clamp(16px,3vw,28px)',borderRadius:12,
              fontFamily:'inherit',fontSize:'clamp(0.85rem,2vw,0.97rem)',fontWeight:400,
              textDecoration:'none',display:'inline-block',transition:'all 0.25s',whiteSpace:'nowrap'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.4)';e.currentTarget.style.color='var(--accent)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='var(--text-primary)'}}
          >ראה פרויקטים ↓</a>
        </div>

        <div className="ha" style={{display:'flex',gap:'clamp(16px,4vw,48px)',
          paddingTop:28,borderTop:'1px solid var(--border)',flexWrap:'wrap'}}>
          {[{num:'15+',label:'שנות ניסיון'},{num:'100K+',label:'משתמשים'},{num:'∞',label:'פרויקטים'}].map(s=>(
            <div key={s.label}>
              <div style={{fontSize:'clamp(1.4rem,3vw,2.4rem)',fontWeight:900,lineHeight:1,marginBottom:4,
                background:'linear-gradient(135deg,var(--accent),#0077ff)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{s.num}</div>
              <div style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT — hidden on mobile via CSS ── */}
      <div className="hero-right ha" style={{display:'flex',flexDirection:'column',gap:14}}>
        {/* recent projects */}
        <div style={{background:'rgba(8,14,31,0.7)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'18px',
          position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-40,right:-40,width:130,height:130,borderRadius:'50%',
            background:'radial-gradient(circle,rgba(0,229,255,0.1),transparent)',pointerEvents:'none'}} />
          <div style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',
            color:'var(--text-muted)',marginBottom:12}}>פרויקטים אחרונים</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {RECENT.map((r,i)=>(
              <div key={r.name} style={{display:'flex',alignItems:'center',gap:10,
                padding:'9px 12px',borderRadius:10,
                background:'rgba(255,255,255,0.03)',border:`1px solid ${r.color}22`,
                transition:'all 0.22s',animation:`fadeUp 0.5s ease ${i*0.07}s both`}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${r.color}10`;e.currentTarget.style.borderColor=`${r.color}55`;e.currentTarget.style.transform='translateX(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.03)';e.currentTarget.style.borderColor=`${r.color}22`;e.currentTarget.style.transform=''}}
              >
                <span style={{fontSize:'1.2rem',flexShrink:0}}>{r.emoji}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:'0.85rem'}}>{r.name}</div>
                  <div style={{fontSize:'0.7rem',color:r.color,fontWeight:600}}>{r.stat}</div>
                </div>
                <div style={{width:6,height:6,borderRadius:'50%',background:r.color,flexShrink:0,
                  boxShadow:`0 0 6px ${r.color}`,animation:'pulse-glow 2s ease-in-out infinite'}} />
              </div>
            ))}
          </div>
        </div>

        {/* stack */}
        <div style={{background:'rgba(8,14,31,0.7)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.07)',borderRadius:20,padding:'18px'}}>
          <div style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',
            color:'var(--text-muted)',marginBottom:12}}>stack</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7}}>
            {TECH.map((t,i)=>(
              <div key={t.name} style={{display:'flex',alignItems:'center',gap:7,
                padding:'8px 9px',borderRadius:9,
                background:'rgba(255,255,255,0.03)',border:`1px solid ${t.color}18`,
                transition:'all 0.2s',animation:`fadeUp 0.5s ease ${0.3+i*0.05}s both`}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${t.color}12`;e.currentTarget.style.borderColor=`${t.color}44`;e.currentTarget.style.transform='scale(1.04)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.03)';e.currentTarget.style.borderColor=`${t.color}18`;e.currentTarget.style.transform=''}}
              >
                <span style={{fontSize:'1rem',flexShrink:0}}>{t.icon}</span>
                <span style={{fontSize:'0.68rem',fontWeight:600,color:'var(--text-secondary)',
                  whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* availability */}
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderRadius:14,
          background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.25)',backdropFilter:'blur(12px)'}}>
          <div style={{width:9,height:9,borderRadius:'50%',background:'#10b981',flexShrink:0,
            boxShadow:'0 0 8px #10b981',animation:'pulse-glow 1.8s ease-in-out infinite'}} />
          <div>
            <div style={{fontWeight:700,fontSize:'0.82rem',color:'#10b981'}}>פנוי לפרויקטים חדשים</div>
            <div style={{fontSize:'0.7rem',color:'var(--text-muted)',marginTop:1}}>זמן תגובה · 24 שעות</div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{position:'absolute',bottom:24,left:'50%',
        display:'flex',flexDirection:'column',alignItems:'center',gap:6,
        color:'var(--text-muted)',fontSize:'0.62rem',letterSpacing:'2px',textTransform:'uppercase',
        animation:'float 2.5s ease-in-out infinite'}}>
        <div style={{width:1,height:32,background:'linear-gradient(to bottom,var(--accent),transparent)'}} />
        גלול
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse-glow{0%,100%{opacity:0.5}50%{opacity:1}}
        @media(max-width:768px){
          .hero-right{display:none!important;}
        }
      `}</style>
    </section>
  )
}
