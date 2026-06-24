'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ── Device Frames ───────────────────────────────────────── */
function DesktopFrame({ src, color }: { src: string; color: string }) {
  return (
    <div style={{ width:'100%', maxWidth:700 }}>
      <div style={{
        background:'#0d0d1a', borderRadius:'14px 14px 0 0',
        border:`1px solid ${color}55`,
        boxShadow:`0 0 0 1px ${color}22, 0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${color}22`,
        overflow:'hidden',
      }}>
        <div style={{ background:'#080812', padding:'8px 14px',
          display:'flex', alignItems:'center', gap:8,
          borderBottom:`1px solid ${color}22` }}>
          <div style={{ display:'flex', gap:5 }}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=>(
              <div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c }} />
            ))}
          </div>
          <div style={{ flex:1, background:'rgba(255,255,255,0.05)', borderRadius:5,
            padding:'3px 12px', fontSize:'0.6rem', color:'rgba(255,255,255,0.25)', fontFamily:'monospace' }}>
            mebook.ai
          </div>
        </div>
        <div style={{ aspectRatio:'16/9', overflow:'hidden', position:'relative' }}>
          <img src={src} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/desk/800/450`}} />
          <div style={{ position:'absolute',inset:0,
            background:'linear-gradient(135deg,rgba(255,255,255,0.03),transparent)',pointerEvents:'none' }} />
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:60,height:12,background:'#0a0a18' }} />
        <div style={{ width:110,height:5,background:'#08080f',borderRadius:'0 0 6px 6px',
          boxShadow:`0 4px 16px ${color}22` }} />
      </div>
    </div>
  )
}

function MobileFrame({ src, color }: { src: string; color: string }) {
  return (
    <div style={{ width:'100%', maxWidth:200, margin:'0 auto' }}>
      <div style={{
        background:'#0a0a18', borderRadius:32,
        border:`2px solid ${color}66`,
        boxShadow:`0 0 0 1px ${color}22, 0 32px 64px rgba(0,0,0,0.8), 0 0 40px ${color}28`,
        padding:'12px 7px',
      }}>
        <div style={{ width:56,height:7,background:'#151525',
          borderRadius:4,margin:'0 auto 10px' }} />
        <div style={{ borderRadius:22,overflow:'hidden',aspectRatio:'9/19.5',
          position:'relative',background:'#000' }}>
          <img src={src} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/mob/390/844`}} />
          <div style={{ position:'absolute',inset:0,
            background:'linear-gradient(135deg,rgba(255,255,255,0.04),transparent 50%)',pointerEvents:'none' }} />
        </div>
        <div style={{ width:44,height:4,background:`${color}55`,
          borderRadius:2,margin:'10px auto 0' }} />
      </div>
      <div style={{ position:'absolute',right:-4,top:70,width:3,height:28,
        background:`${color}44`,borderRadius:2 }} />
      <div style={{ position:'absolute',left:-4,top:60,width:3,height:18,
        background:`${color}44`,borderRadius:2 }} />
      <div style={{ position:'absolute',left:-4,top:84,width:3,height:18,
        background:`${color}44`,borderRadius:2 }} />
    </div>
  )
}

/* ── Gallery picker in modal ─────────────────────────────── */
function GalleryModal({ project, onClose }: { project: typeof projects[0]; onClose: ()=>void }) {
  const [idx, setIdx] = useState(0)
  const img = project.images[idx]

  useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowLeft') setIdx(i=>(i-1+project.images.length)%project.images.length)
      if(e.key==='ArrowRight') setIdx(i=>(i+1)%project.images.length)
    }
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[onClose, project.images.length])

  return (
    <div onClick={onClose} style={{
      position:'fixed',inset:0,zIndex:1000,
      background:'rgba(4,7,15,0.94)',backdropFilter:'blur(28px)',
      display:'flex',alignItems:'center',justifyContent:'center',
      padding:'clamp(12px,3vw,40px)',
      animation:'fadeIn 0.2s ease',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'100%',maxWidth:960,
        background:'rgba(8,14,31,0.96)',
        border:`1px solid ${project.color}33`,
        borderRadius:28,
        overflow:'hidden',
        boxShadow:`0 60px 160px ${project.color}28`,
        animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        maxHeight:'92vh',
        display:'flex',flexDirection:'column',
      }}>
        {/* header */}
        <div style={{
          padding:'clamp(16px,2.5vw,28px) clamp(20px,3vw,36px)',
          borderBottom:`1px solid ${project.color}22`,
          display:'flex',justifyContent:'space-between',alignItems:'center',
          flexShrink:0,
        }}>
          <div style={{ display:'flex',alignItems:'center',gap:14 }}>
            <span style={{ fontSize:'1.8rem' }}>{project.emoji}</span>
            <div>
              <div style={{ fontWeight:900,fontSize:'clamp(1.1rem,2.5vw,1.5rem)',letterSpacing:'-0.5px' }}>{project.name}</div>
              <div style={{ color:project.color,fontSize:'0.78rem',fontWeight:600,marginTop:2 }}>{project.tagline}</div>
            </div>
          </div>
          <div style={{ display:'flex',gap:10,alignItems:'center' }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                onClick={e=>e.stopPropagation()}
                style={{ background:project.color,color:'#04070f',textDecoration:'none',
                  padding:'8px 20px',borderRadius:8,fontWeight:700,fontSize:'0.82rem',fontFamily:'inherit' }}>
                בקר באתר ←
              </a>
            )}
            <button onClick={onClose} style={{
              background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'50%',width:36,height:36,cursor:'pointer',
              color:'var(--text-secondary)',fontSize:'1rem',display:'flex',
              alignItems:'center',justifyContent:'center',fontFamily:'inherit',
            }}>✕</button>
          </div>
        </div>

        {/* main image */}
        <div style={{ flex:1,overflow:'auto',padding:'clamp(16px,3vw,32px)' }}>
          <div style={{ display:'flex',justifyContent:'center',marginBottom:20,minHeight:200 }}>
            <div style={{ position:'relative',width:'100%' }}>
              {img.type==='mobile'
                ? <MobileFrame src={img.src} color={project.color} />
                : <DesktopFrame src={img.src} color={project.color} />
              }
            </div>
          </div>

          {/* thumbnails */}
          <div style={{ display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:24 }}>
            {project.images.map((im,i)=>(
              <button key={i} onClick={()=>setIdx(i)} style={{
                width:56,height:40,borderRadius:8,overflow:'hidden',
                border:i===idx?`2px solid ${project.color}`:'2px solid rgba(255,255,255,0.07)',
                cursor:'pointer',padding:0,transition:'all 0.2s',flexShrink:0,
                boxShadow:i===idx?`0 0 14px ${project.color}66`:'none',
              }}>
                <img src={im.src} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',
                  filter:i===idx?'none':'brightness(0.35)',transition:'filter 0.2s' }}
                  onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${i}/80/60`}}
                />
              </button>
            ))}
          </div>

          {/* details */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,240px),1fr))',gap:16 }}>
            <div style={{ background:'rgba(255,255,255,0.02)',border:'1px solid var(--border)',
              borderRight:`3px solid ${project.color}`,borderRadius:10,padding:'14px 18px' }}>
              <div style={{ fontSize:'0.6rem',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
                color:project.color,marginBottom:6 }}>האתגר</div>
              <p style={{ color:'var(--text-secondary)',fontSize:'0.84rem',lineHeight:1.7 }}>{project.challenge}</p>
            </div>
            <div style={{ background:`${project.color}0a`,border:`1px solid ${project.color}25`,
              borderRadius:10,padding:'14px 18px' }}>
              <div style={{ fontSize:'0.6rem',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
                color:project.color,marginBottom:6 }}>התוצאה</div>
              <p style={{ color:'var(--text-primary)',fontSize:'0.84rem',lineHeight:1.7,fontWeight:500 }}>{project.result}</p>
            </div>
          </div>

          {/* tech */}
          <div style={{ display:'flex',flexWrap:'wrap',gap:7,marginTop:16 }}>
            {project.tech.map(t=>(
              <span key={t} style={{ background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                color:'var(--text-secondary)',fontSize:'0.72rem',padding:'4px 10px',borderRadius:20 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px) scale(0.96)}to{opacity:1;transform:none}}
      `}</style>
    </div>
  )
}

/* ── CARD ────────────────────────────────────────────────── */
const RADIUS = 320
const CARD_W  = 300
const CARD_H  = 420

function ProjectCard({ p, isFront, isHov, depth, x, z, scale, opacity, zIdx, isDragging, onHover, onLeave, onClick }: {
  p: typeof projects[0]; isFront: boolean; isHov: boolean
  depth: number; x: number; z: number; scale: number; opacity: number; zIdx: number; isDragging: boolean
  onHover:()=>void; onLeave:()=>void; onClick:()=>void
}) {
  return (
    <div
      onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}
      style={{
        position:'absolute', width:CARD_W, height:CARD_H,
        left:'50%', top:'50%',
        marginLeft:-CARD_W/2, marginTop:-CARD_H/2,
        transform:`translateX(${x}px) translateZ(${z}px) scale(${isHov&&isFront?scale*1.04:scale})`,
        zIndex: isHov?300:zIdx,
        opacity,
        transition: isDragging?'opacity 0.1s':'transform 0.45s cubic-bezier(0.16,1,0.3,1),opacity 0.45s ease',
        cursor: 'pointer',
        borderRadius: 24, overflow:'hidden',
        // beautiful frame
        border: isFront ? `1.5px solid ${p.color}99` : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isFront
          ? `0 0 0 1px ${p.color}18, 0 40px 100px ${p.color}60, inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 ${p.color}33`
          : '0 8px 40px rgba(0,0,0,0.6)',
        background: 'transparent',
      }}
    >
      {/* FULL BG IMAGE */}
      <img src={p.images[0].src} alt={p.name} draggable={false}
        style={{
          position:'absolute', inset:0, width:'100%',height:'100%',
          objectFit:'cover', display:'block',
          filter: isFront ? 'brightness(0.85)' : 'brightness(0.25) saturate(0.3)',
          transition:'filter 0.5s ease',
          pointerEvents:'none',
        }}
        onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${p.id}/560/840`}}
      />

      {/* gradient overlay — bottom */}
      <div style={{
        position:'absolute', inset:0,
        background: `linear-gradient(to top, rgba(4,7,15,0.96) 0%, rgba(4,7,15,0.6) 45%, rgba(4,7,15,0.1) 100%)`,
        pointerEvents:'none',
      }} />

      {/* color glow overlay */}
      {isFront && (
        <div style={{
          position:'absolute', inset:0,
          background:`linear-gradient(160deg, ${p.color}18 0%, transparent 55%)`,
          pointerEvents:'none',
          transition:'opacity 0.3s',
          opacity: isHov ? 1 : 0.6,
        }} />
      )}

      {/* corner frame accents */}
      {isFront && [
        {top:0,right:0,borderTop:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 24px 0 0'},
        {top:0,left:0, borderTop:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`, borderRadius:'24px 0 0 0'},
        {bottom:0,right:0,borderBottom:`2px solid ${p.color}`,borderRight:`2px solid ${p.color}`,borderRadius:'0 0 24px 0'},
        {bottom:0,left:0, borderBottom:`2px solid ${p.color}`,borderLeft:`2px solid ${p.color}`, borderRadius:'0 0 0 24px'},
      ].map((s,ci)=>(
        <div key={ci} style={{ position:'absolute',width:24,height:24,
          opacity:isHov?1:0.6,transition:'opacity 0.3s',...s }} />
      ))}

      {/* scanlines */}
      <div style={{
        position:'absolute',inset:0,pointerEvents:'none',
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.03) 3px,rgba(0,0,0,0.03) 4px)',
      }} />

      {/* TOP — blinking dot + tag */}
      <div style={{
        position:'absolute',top:0,left:0,right:0,
        padding:'16px 18px',
        display:'flex',justifyContent:'space-between',alignItems:'center',
        background:'linear-gradient(to bottom,rgba(4,7,15,0.7),transparent)',
      }}>
        <span style={{
          fontSize:'0.58rem',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
          color:p.color,opacity:isFront?1:0.3,
          background:`${p.color}18`,border:`1px solid ${p.color}44`,
          padding:'3px 8px',borderRadius:20,
        }}>{p.tag}</span>
        <div style={{
          width:7,height:7,borderRadius:'50%',background:p.color,
          opacity:isFront?1:0.15,
          boxShadow:isFront?`0 0 10px ${p.color}`:' none',
          animation:isFront?'pulse-glow 1.8s ease-in-out infinite':'none',
        }} />
      </div>

      {/* BOTTOM — centered name + emoji */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,
        padding:'0 20px clamp(20px,3vw,32px)',
        textAlign:'center',
        display:'flex',flexDirection:'column',alignItems:'center',gap:8,
      }}>
        {/* emoji big */}
        <div style={{
          fontSize:'2.6rem',lineHeight:1,
          filter:isFront?'none':'grayscale(1) opacity(0.3)',
          transition:'filter 0.4s',
        }}>{p.emoji}</div>

        {/* project name */}
        <h3 style={{
          fontSize:'clamp(1.3rem,2.5vw,1.7rem)',fontWeight:900,letterSpacing:'-0.5px',
          color:isFront?'#fff':'rgba(255,255,255,0.3)',
          transition:'color 0.4s',
          lineHeight:1,
        }}>{p.name}</h3>

        {/* one-line tagline */}
        <p style={{
          color:isFront?p.color:'rgba(255,255,255,0.15)',
          fontSize:'0.78rem',fontWeight:600,
          transition:'color 0.4s',
          marginBottom:2,
        }}>{p.tagline}</p>

        {/* stats — only front */}
        {isFront && (
          <div style={{ display:'flex',gap:6,width:'100%',marginTop:4 }}>
            {p.stats.slice(0,3).map(s=>(
              <div key={s.label} style={{
                flex:1,textAlign:'center',
                background:'rgba(4,7,15,0.7)',backdropFilter:'blur(8px)',
                border:`1px solid ${p.color}33`,
                borderRadius:10,padding:'8px 4px',
              }}>
                <div style={{fontWeight:800,fontSize:'0.82rem',color:p.color}}>{s.value}</div>
                <div style={{fontSize:'0.52rem',color:'rgba(255,255,255,0.35)',marginTop:2,letterSpacing:'0.3px'}}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {isFront && (
          <div style={{
            marginTop:6, padding:'9px 24px',
            background:`${p.color}20`,border:`1px solid ${p.color}55`,
            borderRadius:10,color:p.color,fontSize:'0.78rem',fontWeight:700,
            letterSpacing:'0.5px',
            animation:'pulse-glow 2.5s ease-in-out infinite',
          }}>
            לחץ לפרטים →
          </div>
        )}

        {!isFront && (
          <div style={{color:'rgba(255,255,255,0.2)',fontSize:'0.62rem',letterSpacing:'1px'}}>
            לחץ לסיבוב
          </div>
        )}
      </div>
    </div>
  )
}

/* ── SECTION ─────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [angle, setAngle]       = useState(0)
  const angleRef                = useRef(0)
  const velRef                  = useRef(0)
  const isDragging              = useRef(false)
  const lastX                   = useRef(0)
  const rafRef                  = useRef(0)
  const isInView                = useRef(false)
  const stageRef                = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hovered,   setHovered]   = useState<number|null>(null)
  const [expanded,  setExpanded]  = useState<number|null>(null)

  const count = projects.length
  const STEP  = 360 / count

  useEffect(()=>{
    let last = performance.now()
    const tick=(now:number)=>{
      const dt=Math.min((now-last)/16,3); last=now
      if(!isDragging.current){
        if(Math.abs(velRef.current)>0.02){
          velRef.current*=Math.pow(0.91,dt); angleRef.current+=velRef.current*dt
        }else{
          velRef.current=0
          if(isInView.current&&hovered===null&&expanded===null)
            angleRef.current+=0.006*dt
        }
        setAngle(angleRef.current)
      }
      const best=projects.reduce((bi,_,i)=>{
        const cosI=Math.cos(((angleRef.current+i*STEP)*Math.PI)/180)
        const cosB=Math.cos(((angleRef.current+bi*STEP)*Math.PI)/180)
        return cosI>cosB?i:bi
      },0)
      setActiveIdx(best)
      rafRef.current=requestAnimationFrame(tick)
    }
    rafRef.current=requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(rafRef.current)
  },[hovered,expanded,STEP])

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{isInView.current=e.isIntersecting},{threshold:0.2})
    if(stageRef.current) obs.observe(stageRef.current)
    return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{
      if(expanded!==null)return
      if(e.key==='ArrowLeft'){velRef.current-=3;e.preventDefault()}
      if(e.key==='ArrowRight'){velRef.current+=3;e.preventDefault()}
    }
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[expanded])

  const onPD=(e:React.PointerEvent)=>{
    if(expanded!==null)return
    isDragging.current=true;lastX.current=e.clientX;velRef.current=0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPM=(e:React.PointerEvent)=>{
    if(!isDragging.current)return
    const dx=e.clientX-lastX.current
    velRef.current=dx*0.22;angleRef.current+=velRef.current
    setAngle(angleRef.current);lastX.current=e.clientX
  }
  const onPU=()=>{isDragging.current=false}

  const snapTo=useCallback((i:number)=>{
    const target=-i*STEP; const cur=angleRef.current
    const diff=((target-cur)%360+540)%360-180
    velRef.current=0;angleRef.current=cur+diff;setAngle(angleRef.current)
  },[STEP])

  return (
    <section id="projects" style={{position:'relative',zIndex:10,padding:'clamp(80px,10vw,140px) 0'}}>

      {/* header */}
      <div style={{padding:'0 clamp(20px,6vw,100px)',marginBottom:'clamp(32px,4vw,56px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.7rem',fontWeight:700,
          letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)',marginBottom:14}}>
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

      <p style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.65rem',
        letterSpacing:'2px',textTransform:'uppercase',marginBottom:40}}>
        גרור · חצים ← → · לחץ לפרטים
      </p>

      {/* carousel wrapper */}
      <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>

        <button onClick={()=>snapTo((activeIdx-1+count)%count)} style={arrowS}>→</button>

        <div ref={stageRef}
          onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerLeave={onPU}
          style={{width:'100%',height:520,perspective:1100,perspectiveOrigin:'50% 50%',
            position:'relative',overflow:'visible',
            cursor:isDragging.current?'grabbing':'grab',userSelect:'none'}}>

          {projects.map((p,i)=>{
            const a=((angle+i*STEP)%360+360)%360
            const rad=(a*Math.PI)/180
            const x=Math.sin(rad)*RADIUS
            const z=Math.cos(rad)*RADIUS
            const depth=z/RADIUS
            const scale=0.48+depth*0.52
            const opacity=Math.max(0.06,0.18+depth*0.82)
            const zIdx=Math.round((depth+1)*100)
            const isFront=depth>0.85
            return (
              <ProjectCard key={p.id} p={p} isFront={isFront} isHov={hovered===i}
                depth={depth} x={x} z={z} scale={scale} opacity={opacity} zIdx={zIdx}
                isDragging={isDragging.current}
                onHover={()=>setHovered(i)} onLeave={()=>setHovered(null)}
                onClick={()=>isFront?setExpanded(i):snapTo(i)}
              />
            )
          })}
        </div>

        <button onClick={()=>snapTo((activeIdx+1)%count)} style={arrowSL}>←</button>
      </div>

      {/* dots */}
      <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:44,alignItems:'center'}}>
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

      {/* modal */}
      {expanded!==null && (
        <GalleryModal project={projects[expanded]} onClose={()=>setExpanded(null)} />
      )}

      <style>{`
        @keyframes pulse-glow{0%,100%{opacity:0.55}50%{opacity:1}}
      `}</style>
    </section>
  )
}

const arrowS: React.CSSProperties = {
  flexShrink:0,width:48,height:48,borderRadius:'50%',
  background:'rgba(4,7,15,0.85)',backdropFilter:'blur(16px)',
  border:'1px solid rgba(255,255,255,0.12)',color:'var(--text-primary)',
  fontSize:'1.1rem',cursor:'pointer',fontFamily:'inherit',
  display:'flex',alignItems:'center',justifyContent:'center',
  transition:'all 0.2s',margin:'0 12px 0 0',zIndex:10,
  boxShadow:'0 4px 20px rgba(0,0,0,0.4)',
}
const arrowSL: React.CSSProperties = {...arrowS, margin:'0 0 0 12px'}
