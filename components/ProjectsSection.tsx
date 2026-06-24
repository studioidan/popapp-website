'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ── Device Frame Components ────────────────────────────── */
function DesktopFrame({ src, label, color }: { src: string; label: string; color: string }) {
  return (
    <div style={{ position:'relative', width:'100%' }}>
      {/* monitor body */}
      <div style={{
        background:'#1a1a2e',
        borderRadius:'12px 12px 0 0',
        border:`1px solid ${color}44`,
        boxShadow:`0 0 0 1px ${color}22, 0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${color}18`,
        overflow:'hidden',
        position:'relative',
      }}>
        {/* browser chrome */}
        <div style={{
          background:'#0d0d1a',
          padding:'8px 12px',
          display:'flex', alignItems:'center', gap:8,
          borderBottom:`1px solid ${color}22`,
        }}>
          <div style={{display:'flex', gap:5}}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=>(
              <div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}} />
            ))}
          </div>
          {/* fake URL bar */}
          <div style={{
            flex:1, background:'rgba(255,255,255,0.06)',
            borderRadius:4, padding:'3px 10px',
            fontSize:'0.62rem', color:'rgba(255,255,255,0.3)',
            fontFamily:'monospace',
          }}>
            {label}
          </div>
        </div>
        {/* screenshot */}
        <div style={{ aspectRatio:'16/9', overflow:'hidden', position:'relative' }}>
          <img src={src} alt={label} style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
          }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src}/800/450`}}
          />
          {/* screen glare */}
          <div style={{
            position:'absolute', top:0, left:0, right:0,
            height:'30%',
            background:'linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)',
            pointerEvents:'none',
          }} />
        </div>
      </div>
      {/* monitor stand */}
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div style={{width:60, height:10, background:'#111', borderTop:'none'}} />
        <div style={{width:100, height:5, background:'#0d0d1a', borderRadius:'0 0 4px 4px',
          boxShadow:`0 2px 8px ${color}22`}} />
      </div>
      {/* label */}
      <div style={{textAlign:'center', marginTop:8,
        fontSize:'0.65rem', color:'rgba(255,255,255,0.3)', letterSpacing:'1px'}}>
        {label}
      </div>
    </div>
  )
}

function MobileFrame({ src, label, color }: { src: string; label: string; color: string }) {
  return (
    <div style={{ position:'relative', width:'100%', maxWidth:180, margin:'0 auto' }}>
      {/* phone body */}
      <div style={{
        background:'#0d0d1a',
        borderRadius:28,
        border:`2px solid ${color}55`,
        boxShadow:`0 0 0 1px ${color}22, 0 24px 48px rgba(0,0,0,0.7), 0 0 30px ${color}22`,
        padding:'10px 6px',
        position:'relative',
      }}>
        {/* notch */}
        <div style={{
          width:60, height:6, background:'#1a1a2e',
          borderRadius:3, margin:'0 auto 8px',
        }} />
        {/* screen */}
        <div style={{
          borderRadius:18, overflow:'hidden',
          aspectRatio:'9/19.5',
          position:'relative',
          background:'#000',
        }}>
          <img src={src} alt={label} style={{
            width:'100%', height:'100%', objectFit:'cover', display:'block',
          }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src}/390/844`}}
          />
          {/* screen glare */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, bottom:0,
            background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
            pointerEvents:'none',
          }} />
        </div>
        {/* home indicator */}
        <div style={{
          width:40, height:3, background:`${color}44`,
          borderRadius:2, margin:'8px auto 0',
        }} />
      </div>
      {/* side buttons */}
      <div style={{ position:'absolute', right:-3, top:60, width:3, height:24,
        background:`${color}33`, borderRadius:2 }} />
      <div style={{ position:'absolute', left:-3, top:50, width:3, height:16,
        background:`${color}33`, borderRadius:2 }} />
      <div style={{ position:'absolute', left:-3, top:72, width:3, height:16,
        background:`${color}33`, borderRadius:2 }} />
      {/* label */}
      <div style={{textAlign:'center', marginTop:10,
        fontSize:'0.62rem', color:'rgba(255,255,255,0.3)', letterSpacing:'1px'}}>
        {label}
      </div>
    </div>
  )
}

/* ── Image Gallery with Mixed Frames ────────────────────── */
function ProjectGallery({ project }: { project: typeof projects[0] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = project.images[activeIdx]

  return (
    <div>
      {/* main display */}
      <div style={{ marginBottom:20, minHeight:280, display:'flex', alignItems:'center', justifyContent:'center' }}>
        {active.type === 'mobile' ? (
          <MobileFrame src={active.src} label={active.label} color={project.color} />
        ) : (
          <DesktopFrame src={active.src} label={active.label} color={project.color} />
        )}
      </div>

      {/* thumbnails */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
        {project.images.map((img, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{
            width:52, height:36, borderRadius:6, overflow:'hidden',
            border: i===activeIdx ? `2px solid ${project.color}` : '2px solid rgba(255,255,255,0.08)',
            cursor:'pointer', padding:0,
            boxShadow: i===activeIdx ? `0 0 12px ${project.color}55` : 'none',
            transition:'all 0.2s',
            position:'relative',
          }}>
            <img src={img.src} alt={img.label} style={{
              width:'100%', height:'100%', objectFit:'cover',
              filter: i===activeIdx ? 'none' : 'brightness(0.4)',
              transition:'filter 0.2s',
            }}
              onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${img.src}/80/60`}}
            />
            {/* device type badge */}
            <div style={{
              position:'absolute', bottom:2, right:2,
              fontSize:'0.45rem', background:'rgba(0,0,0,0.7)',
              padding:'1px 3px', borderRadius:2,
              color: i===activeIdx ? project.color : 'rgba(255,255,255,0.4)',
            }}>
              {img.type === 'mobile' ? '📱' : '🖥️'}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── 3D Carousel ─────────────────────────────────────────── */
const RADIUS = 300
const CARD_W = 272
const CARD_H = 360

export default function ProjectsSection() {
  const [angle, setAngle] = useState(0)
  const angleRef = useRef(0)
  const velRef = useRef(0)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const rafRef = useRef(0)
  const isInView = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hovered, setHovered] = useState<number|null>(null)
  const [expanded, setExpanded] = useState<number|null>(null)

  const count = projects.length
  const STEP = 360 / count

  useEffect(()=>{
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now-last)/16, 3); last = now
      if (!isDragging.current) {
        if (Math.abs(velRef.current) > 0.02) {
          velRef.current *= Math.pow(0.91, dt)
          angleRef.current += velRef.current * dt
        } else {
          velRef.current = 0
          if (isInView.current && hovered===null && expanded===null)
            angleRef.current += 0.007 * dt
        }
        setAngle(angleRef.current)
      }
      const best = projects.reduce((bi,_,i)=>{
        const cosI = Math.cos(((angleRef.current+i*STEP)*Math.PI)/180)
        const cosB = Math.cos(((angleRef.current+bi*STEP)*Math.PI)/180)
        return cosI>cosB?i:bi
      },0)
      setActiveIdx(best)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(rafRef.current)
  },[hovered, expanded, STEP])

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{isInView.current=e.isIntersecting},{threshold:0.25})
    if (stageRef.current) obs.observe(stageRef.current)
    return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{
      if(e.key==='ArrowLeft'){velRef.current-=3;e.preventDefault()}
      if(e.key==='ArrowRight'){velRef.current+=3;e.preventDefault()}
      if(e.key==='Escape'){setExpanded(null)}
    }
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[])

  const onPD=(e:React.PointerEvent)=>{
    isDragging.current=true;lastX.current=e.clientX;velRef.current=0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPM=(e:React.PointerEvent)=>{
    if(!isDragging.current)return
    const dx=e.clientX-lastX.current
    velRef.current=dx*0.22; angleRef.current+=velRef.current
    setAngle(angleRef.current); lastX.current=e.clientX
  }
  const onPU=()=>{isDragging.current=false}

  const snapTo=useCallback((i:number)=>{
    const target=-i*STEP; const cur=angleRef.current
    let diff=((target-cur)%360+540)%360-180
    velRef.current=0; angleRef.current=cur+diff; setAngle(angleRef.current)
  },[STEP])

  const goNext=()=>snapTo((activeIdx+1)%count)
  const goPrev=()=>snapTo((activeIdx-1+count)%count)

  return (
    <section id="projects" style={{position:'relative',zIndex:10,padding:'clamp(80px,10vw,140px) 0'}}>

      <div style={{padding:'0 clamp(20px,6vw,100px)',marginBottom:'clamp(40px,5vw,64px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.7rem',fontWeight:700,
          letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)',marginBottom:16}}>
          <span style={{width:24,height:1.5,background:'var(--accent)',display:'block'}} />
          פרויקטים נבחרים
        </div>
        <h2 style={{fontSize:'clamp(1.6rem,4vw,3.5rem)',fontWeight:900,letterSpacing:'-2px',lineHeight:1.0}}>
          מוצרים שאנשים{' '}
          <span style={{background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            באמת משתמשים בהם.
          </span>
        </h2>
      </div>

      <p style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.66rem',
        letterSpacing:'2px',textTransform:'uppercase',marginBottom:40}}>
        גרור · חצים ← → · לחץ לפרטים
      </p>

      <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <button onClick={goPrev} style={arrowBtn}>→</button>

        <div ref={stageRef} onPointerDown={onPD} onPointerMove={onPM}
          onPointerUp={onPU} onPointerLeave={onPU}
          style={{width:'100%',height:480,perspective:1000,perspectiveOrigin:'50% 50%',
            position:'relative',overflow:'visible',
            cursor:isDragging.current?'grabbing':'grab',userSelect:'none'}}>

          {projects.map((p,i)=>{
            const a=((angle+i*STEP)%360+360)%360
            const rad=(a*Math.PI)/180
            const x=Math.sin(rad)*RADIUS
            const z=Math.cos(rad)*RADIUS
            const depth=z/RADIUS
            const scale=0.5+depth*0.5
            const opacity=Math.max(0.06,0.2+depth*0.8)
            const zIdx=Math.round((depth+1)*100)
            const isFront=depth>0.86
            const isHov=hovered===i

            return (
              <div key={p.id}
                onPointerEnter={()=>setHovered(i)}
                onPointerLeave={()=>setHovered(null)}
                onClick={()=>{
                  if(isFront) setExpanded(i)
                  else snapTo(i)
                }}
                style={{
                  position:'absolute',width:CARD_W,height:CARD_H,
                  left:'50%',top:'50%',
                  marginLeft:-CARD_W/2,marginTop:-CARD_H/2,
                  transform:`translateX(${x}px) translateZ(${z}px) scale(${isHov&&isFront?scale*1.05:scale})`,
                  zIndex:isHov?300:zIdx,opacity,
                  transition:isDragging.current?'opacity 0.1s':'transform 0.45s cubic-bezier(0.16,1,0.3,1),opacity 0.45s ease',
                  cursor:isFront?'pointer':'pointer',
                  borderRadius:22,overflow:'hidden',
                  border:isFront?`1px solid ${p.color}88`:'1px solid rgba(255,255,255,0.05)',
                  boxShadow:isFront
                    ?`0 0 0 1px ${p.color}22,0 28px 70px ${p.color}55,inset 0 1px 0 rgba(255,255,255,0.1)`
                    :'0 8px 32px rgba(0,0,0,0.5)',
                  background:`linear-gradient(160deg,${p.gradientFrom}20 0%,rgba(4,7,15,0.97) 65%)`,
                }}
              >
                {/* scanlines */}
                <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none',borderRadius:22,
                  backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px)'}} />
                {/* corners */}
                {[
                  {top:0,right:0,borderTop:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 22px 0 0'},
                  {top:0,left:0,borderTop:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`,borderRadius:'22px 0 0 0'},
                  {bottom:0,right:0,borderBottom:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 0 22px 0'},
                  {bottom:0,left:0,borderBottom:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`,borderRadius:'0 0 0 22px'},
                ].map((s,ci)=>(
                  <div key={ci} style={{position:'absolute',width:20,height:20,
                    opacity:isFront?(isHov?1:0.7):0.1,transition:'opacity 0.3s',...s}} />
                ))}
                {/* HUD */}
                <div style={{position:'absolute',top:0,left:0,right:0,zIndex:4,padding:'10px 14px',
                  display:'flex',justifyContent:'space-between',alignItems:'center',
                  background:'linear-gradient(to bottom,rgba(4,7,15,0.85),transparent)'}}>
                  <span style={{fontSize:'0.56rem',fontWeight:700,letterSpacing:'2px',
                    textTransform:'uppercase',color:p.color,opacity:isFront?1:0.4}}>{p.tag}</span>
                  <div style={{width:6,height:6,borderRadius:'50%',background:p.color,
                    opacity:isFront?1:0.2,animation:isFront?'pulse-glow 1.8s ease-in-out infinite':'none',
                    boxShadow:isFront?`0 0 8px ${p.color}`:'none'}} />
                </div>
                {/* image — first image as cover */}
                <div style={{position:'relative',height:168,overflow:'hidden'}}>
                  <img src={p.images[0].src} alt={p.name} draggable={false}
                    style={{width:'100%',height:'100%',objectFit:'cover',display:'block',pointerEvents:'none',
                      filter:isFront?'brightness(1)':'brightness(0.35) saturate(0.4)',
                      transition:'filter 0.45s ease'}}
                    onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${p.id}/560/380`}}
                  />
                  <div style={{position:'absolute',inset:0,
                    background:'linear-gradient(to bottom,transparent 20%,rgba(4,7,15,0.98) 100%)'}} />
                  {/* mobile badge if first img is mobile */}
                  {p.images[0].type==='mobile' && (
                    <div style={{position:'absolute',top:8,left:8,
                      background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',
                      borderRadius:6,padding:'3px 7px',fontSize:'0.55rem',color:'rgba(255,255,255,0.6)'}}>
                      📱 Mobile
                    </div>
                  )}
                </div>
                {/* body */}
                <div style={{padding:'12px 16px 16px',position:'relative',zIndex:2}}>
                  <div style={{fontSize:'1.7rem',marginBottom:4,lineHeight:1}}>{p.emoji}</div>
                  <h3 style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-0.5px',
                    marginBottom:4,color:'var(--text-primary)'}}>{p.name}</h3>
                  <p style={{color:p.color,fontSize:'0.7rem',fontWeight:600,marginBottom:8}}>{p.tagline}</p>
                  <p style={{color:'var(--text-secondary)',fontSize:'0.74rem',lineHeight:1.6,marginBottom:12,
                    display:'-webkit-box',WebkitLineClamp:2,
                    WebkitBoxOrient:'vertical' as const,overflow:'hidden'}}>{p.desc}</p>
                  <div style={{display:'flex',gap:5,marginBottom:10}}>
                    {p.stats.slice(0,3).map(s=>(
                      <div key={s.label} style={{flex:1,textAlign:'center',
                        background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',
                        borderRadius:8,padding:'6px 3px'}}>
                        <div style={{fontWeight:800,fontSize:'0.74rem',color:p.color}}>{s.value}</div>
                        <div style={{fontSize:'0.5rem',color:'var(--text-muted)',marginTop:1}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {isFront ? (
                    <div style={{textAlign:'center',padding:'8px',
                      background:`${p.color}18`,border:`1px solid ${p.color}44`,
                      borderRadius:10,color:p.color,fontSize:'0.74rem',fontWeight:700,
                      animation:'pulse-glow 2.5s ease-in-out infinite'}}>
                      לחץ לפרטים מלאים →
                    </div>
                  ):(
                    <div style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.65rem',letterSpacing:'1px'}}>לחץ לסיבוב</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={goNext} style={arrowBtnL}>←</button>
      </div>

      {/* dot nav */}
      <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:40,alignItems:'center'}}>
        {projects.map((p,i)=>(
          <button key={i} onClick={()=>snapTo(i)} style={{
            width:i===activeIdx?32:8,height:8,borderRadius:4,
            background:i===activeIdx?p.color:'rgba(255,255,255,0.12)',
            border:'none',cursor:'pointer',padding:0,
            transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow:i===activeIdx?`0 0 14px ${p.color}99`:'none',
          }} />
        ))}
      </div>

      {/* ── EXPANDED MODAL ── */}
      {expanded !== null && (() => {
        const p = projects[expanded]
        return (
          <div onClick={()=>setExpanded(null)} style={{
            position:'fixed',inset:0,zIndex:1000,
            background:'rgba(4,7,15,0.92)',backdropFilter:'blur(24px)',
            display:'flex',alignItems:'center',justifyContent:'center',
            padding:'clamp(16px,4vw,40px)',
            animation:'fadeIn 0.25s ease',
          }}>
            <div onClick={e=>e.stopPropagation()} style={{
              background:'rgba(8,14,31,0.95)',
              border:`1px solid ${p.color}44`,
              borderRadius:24,width:'100%',maxWidth:900,
              maxHeight:'90vh',overflowY:'auto',
              boxShadow:`0 40px 120px ${p.color}30`,
              animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {/* modal header */}
              <div style={{
                padding:'clamp(20px,3vw,36px)',
                borderBottom:`1px solid ${p.color}22`,
                display:'flex',justifyContent:'space-between',alignItems:'center',
              }}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <span style={{fontSize:'2rem'}}>{p.emoji}</span>
                  <div>
                    <h3 style={{fontSize:'clamp(1.2rem,3vw,1.8rem)',fontWeight:900,letterSpacing:'-1px'}}>{p.name}</h3>
                    <p style={{color:p.color,fontSize:'0.8rem',fontWeight:600,marginTop:2}}>{p.tagline}</p>
                  </div>
                </div>
                <button onClick={()=>setExpanded(null)} style={{
                  background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:'50%',width:36,height:36,cursor:'pointer',
                  color:'var(--text-secondary)',fontSize:'1rem',fontFamily:'inherit',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  transition:'all 0.2s',flexShrink:0,
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
                >✕</button>
              </div>

              <div style={{padding:'clamp(20px,3vw,36px)',display:'grid',
                gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',gap:'clamp(24px,4vw,48px)'}}>

                {/* gallery */}
                <ProjectGallery project={p} />

                {/* info */}
                <div>
                  <p style={{color:'var(--text-secondary)',lineHeight:1.8,fontSize:'0.95rem',marginBottom:20}}>{p.desc}</p>

                  <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
                    <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid var(--border)',
                      borderRight:`3px solid ${p.color}`,borderRadius:8,padding:'13px 18px'}}>
                      <div style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:p.color,marginBottom:5}}>האתגר</div>
                      <p style={{color:'var(--text-secondary)',fontSize:'0.84rem',lineHeight:1.7}}>{p.challenge}</p>
                    </div>
                    <div style={{background:`${p.color}0c`,border:`1px solid ${p.color}28`,
                      borderRadius:8,padding:'13px 18px'}}>
                      <div style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:p.color,marginBottom:5}}>התוצאה</div>
                      <p style={{color:'var(--text-primary)',fontSize:'0.86rem',lineHeight:1.7,fontWeight:500}}>{p.result}</p>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:10,marginBottom:24,flexWrap:'wrap'}}>
                    {p.stats.map(s=>(
                      <div key={s.label} style={{flex:1,minWidth:80,textAlign:'center',
                        background:'rgba(255,255,255,0.03)',border:'1px solid var(--border)',
                        borderRadius:10,padding:'12px 8px'}}>
                        <div style={{fontWeight:800,fontSize:'1rem',color:p.color}}>{s.value}</div>
                        <div style={{fontSize:'0.62rem',color:'var(--text-muted)',marginTop:2}}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:28}}>
                    {p.tech.map(t=>(
                      <span key={t} style={{background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.08)',
                        color:'var(--text-secondary)',fontSize:'0.72rem',
                        padding:'4px 10px',borderRadius:20}}>{t}</span>
                    ))}
                  </div>

                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{display:'inline-flex',alignItems:'center',gap:8,
                        background:p.color,color:'#04070f',
                        textDecoration:'none',padding:'12px 28px',
                        borderRadius:10,fontWeight:700,fontSize:'0.92rem',fontFamily:'inherit',
                        transition:'all 0.25s'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 10px 36px ${p.color}55`}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
                    >בקר באתר ←</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      <style>{`
        @keyframes pulse-glow{0%,100%{opacity:0.55}50%{opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
      `}</style>
    </section>
  )
}

const arrowBtn: React.CSSProperties = {
  flexShrink:0,width:48,height:48,borderRadius:'50%',
  background:'rgba(4,7,15,0.85)',backdropFilter:'blur(16px)',
  border:'1px solid rgba(255,255,255,0.12)',
  color:'var(--text-primary)',fontSize:'1.1rem',
  cursor:'pointer',fontFamily:'inherit',
  display:'flex',alignItems:'center',justifyContent:'center',
  transition:'all 0.2s',margin:'0 12px 0 0',zIndex:10,
  boxShadow:'0 4px 20px rgba(0,0,0,0.4)',
}
const arrowBtnL: React.CSSProperties = { ...arrowBtn, margin:'0 0 0 12px' }
