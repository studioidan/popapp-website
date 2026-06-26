'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ── LIGHTBOX ────────────────────────────────────────── */
function Lightbox({ project, startIdx, onClose }: {
  project: typeof projects[0]; startIdx: number; onClose: () => void
}) {
  const [idx, setIdx] = useState(startIdx)
  const count = project.images.length
  const img = project.images[idx]

  const prev = useCallback(() => setIdx(i => (i - 1 + count) % count), [count])
  const next = useCallback(() => setIdx(i => (i + 1) % count), [count])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   next()
      if (e.key === 'ArrowRight')  prev()
    }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose, prev, next])

  return (
    <div onClick={onClose} role="button" tabIndex={-1} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(2,4,10,0.97)',
      backdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease',
    }}>
      {/* top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '18px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(2,4,10,0.9), transparent)',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, pointerEvents:'auto' }}>
          <span style={{ fontSize:'1.4rem' }}>{project.emoji}</span>
          <div>
            <div style={{ fontWeight:700, fontSize:'0.95rem' }}>{project.name}</div>
            <div style={{ color:project.color, fontSize:'0.72rem' }}>{img.label}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16, pointerEvents:'auto' }}>
          <span style={{ color:'var(--text-muted)', fontSize:'0.8rem' }}>
            {idx + 1} / {count}
          </span>
          <button onClick={onClose} style={{
            background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
            color:'var(--text-primary)', width:36, height:36, borderRadius:'50%',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1rem', fontFamily:'inherit', transition:'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
          >✕</button>
        </div>
      </div>

      {/* main image */}
      <div style={{
        flex: 1, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '72px 80px 100px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        <img
          key={idx}
          src={img.src}
          alt={img.label}
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}22`,
            animation: 'zoomIn 0.25s cubic-bezier(0.16,1,0.3,1)',
            display: 'block',
            cursor: 'default',
          }}
          onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${img.src.slice(-6)}/1200/800` }}
        />

        {/* device type badge */}
        <div style={{
          position:'absolute', bottom:96, left:'50%', transform:'translateX(-50%)',
          background:'rgba(4,7,15,0.8)', backdropFilter:'blur(12px)',
          border:`1px solid ${project.color}33`, borderRadius:20,
          padding:'4px 14px', fontSize:'0.7rem', color:'var(--text-muted)',
          display:'flex', alignItems:'center', gap:6,
          pointerEvents: 'none',
        }}>
          <span>{img.type === 'mobile' ? '📱' : '🖥️'}</span>
          {img.type === 'mobile' ? 'Mobile' : 'Desktop'}
        </div>
      </div>

      {/* bottom: thumbs + arrows */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 24px 24px',
        background: 'linear-gradient(to top, rgba(2,4,10,0.95), transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
        pointerEvents: 'none',
      }}>
        {/* prev */}
        <button onClick={e => { e.stopPropagation(); prev() }} style={{...navBtn(project.color), pointerEvents:'auto'}}>→</button>

        {/* thumbnails */}
        <div style={{ display:'flex', gap:8, alignItems:'center', pointerEvents:'auto' }}>
          {project.images.map((im, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setIdx(i) }} style={{
              width:52, height:38, borderRadius:8, overflow:'hidden',
              border: i===idx
                ? `2px solid ${project.color}`
                : '2px solid rgba(255,255,255,0.08)',
              cursor:'pointer', padding:0, transition:'all 0.2s', flexShrink:0,
              boxShadow: i===idx ? `0 0 14px ${project.color}66` : 'none',
            }}>
              <img src={im.src} alt={im.label} style={{
                width:'100%', height:'100%', objectFit:'cover',
                filter: i===idx ? 'none' : 'brightness(0.3)',
                transition:'filter 0.2s',
              }}
                onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${i}/80/60` }}
              />
            </button>
          ))}
        </div>

        {/* next */}
        <button onClick={e => { e.stopPropagation(); next() }} style={{...navBtn(project.color), pointerEvents:'auto'}}>←</button>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes zoomIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  )
}

function navBtn(color: string): React.CSSProperties {
  return {
    width:44, height:44, borderRadius:'50%',
    background:'rgba(4,7,15,0.85)', backdropFilter:'blur(12px)',
    border:`1px solid ${color}55`, color,
    fontSize:'1.1rem', cursor:'pointer', flexShrink:0,
    display:'flex', alignItems:'center', justifyContent:'center',
    transition:'all 0.2s',
  }
}

/* ── THUMBNAIL STRIP (replaces old Gallery) ─────────── */
function ProjectGallery({ project }: { project: typeof projects[0] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  return (
    <>
      {/* grid of thumbnails with device frames */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {project.images.map((img, i) => (
          <button key={i} onClick={() => setLightboxIdx(i)} style={{
            padding: 0, border:'none', background:'none',
            cursor:'pointer', borderRadius:12, overflow:'visible',
            position:'relative',
          }}>
            {img.type === 'mobile'
              ? <MiniMobile src={img.src} color={project.color} label={img.label} />
              : <MiniDesktop src={img.src} color={project.color} label={img.label} />
            }
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          project={project}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  )
}

/* ── MINI DESKTOP THUMB ─────────────────────────────── */
function MiniDesktop({ src, color, label }: { src:string; color:string; label:string }) {
  return (
    <div>
      <div style={{
        borderRadius:'8px 8px 0 0',
        border:`1px solid ${color}44`,
        background:'#0a0a18', overflow:'hidden',
        boxShadow:`0 0 0 1px ${color}18, 0 8px 24px rgba(0,0,0,0.5)`,
        transition:'all 0.25s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}99`; e.currentTarget.style.boxShadow=`0 0 0 1px ${color}44, 0 12px 32px ${color}22` }}
        onMouseLeave={e => { e.currentTarget.style.borderColor=`${color}44`; e.currentTarget.style.boxShadow=`0 0 0 1px ${color}18, 0 8px 24px rgba(0,0,0,0.5)` }}
      >
        {/* tiny browser bar */}
        <div style={{ background:'#07071a', padding:'5px 8px',
          display:'flex', alignItems:'center', gap:5,
          borderBottom:`1px solid ${color}18` }}>
          <div style={{ display:'flex', gap:3 }}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c=>(
              <div key={c} style={{ width:5,height:5,borderRadius:'50%',background:c,opacity:0.8 }} />
            ))}
          </div>
          <div style={{ flex:1, background:'rgba(255,255,255,0.04)',
            borderRadius:3, height:6 }} />
        </div>
        {/* image */}
        <div style={{ height:80, overflow:'hidden' }}>
          <img src={src} alt={label} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block' }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src.slice(-6)}/400/225`}} />
        </div>
      </div>
      {/* stand */}
      <div style={{ display:'flex',flexDirection:'column',alignItems:'center' }}>
        <div style={{ width:24,height:6,background:'#08080f' }} />
        <div style={{ width:44,height:3,background:'#06060e',borderRadius:'0 0 4px 4px' }} />
      </div>
      <p style={{ textAlign:'center',marginTop:5,fontSize:'0.6rem',
        color:'var(--text-muted)',letterSpacing:'0.5px' }}>{label}</p>
    </div>
  )
}

/* ── MINI MOBILE THUMB ──────────────────────────────── */
function MiniMobile({ src, color, label }: { src:string; color:string; label:string }) {
  return (
    <div style={{ maxWidth: 90, margin:'0 auto' }}>
      <div style={{
        borderRadius: 14, border:`2px solid ${color}44`,
        background:'#08081a', padding:'4px 3px',
        boxShadow:`0 0 0 1px ${color}18, 0 8px 24px rgba(0,0,0,0.5)`,
        transition:'all 0.25s',
      }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=`${color}99`;e.currentTarget.style.boxShadow=`0 0 0 1px ${color}44, 0 12px 32px ${color}22`}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=`${color}44`;e.currentTarget.style.boxShadow=`0 0 0 1px ${color}18, 0 8px 24px rgba(0,0,0,0.5)`}}
      >
        <div style={{ width:18, height:3, background:'#1a1a30', borderRadius:2, margin:'0 auto 3px' }} />
        {/* correct 9:19.5 aspect ratio */}
        <div style={{ borderRadius:8, overflow:'hidden', aspectRatio:'9/19.5', position:'relative' }}>
          <img src={src} alt={label}
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            onError={e=>{(e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src.slice(-6)}m/200/430`}}
          />
        </div>
        <div style={{ width:14, height:2, background:`${color}44`, borderRadius:1, margin:'3px auto 0' }} />
      </div>
      <p style={{ textAlign:'center', marginTop:6, fontSize:'0.6rem',
        color:'var(--text-muted)', letterSpacing:'0.5px' }}>{label}</p>
    </div>
  )
}

/* ── PROJECT ROW ────────────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(48px)',
      transition: `opacity 0.75s ease ${index*0.05}s, transform 0.75s ease ${index*0.05}s`,
      paddingBottom:'clamp(72px,9vw,120px)',
      borderBottom:'1px solid var(--border)',
      marginBottom:'clamp(72px,9vw,120px)',
    }}>
      {/* header */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28, flexWrap:'wrap' }}>
        <div style={{
          width:52, height:52, borderRadius:14, flexShrink:0,
          background:`linear-gradient(135deg,${project.gradientFrom}33,${project.gradientTo}22)`,
          border:`1.5px solid ${project.color}44`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.7rem',
          boxShadow:`0 8px 24px ${project.color}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}>{project.emoji}</div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
            <h3 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900,
              letterSpacing:'-0.8px', lineHeight:1 }}>{project.name}</h3>
            <span style={{
              background:`${project.color}15`, color:project.color,
              border:`1px solid ${project.color}44`,
              fontSize:'0.62rem', fontWeight:700, letterSpacing:'1.5px',
              textTransform:'uppercase', padding:'3px 10px', borderRadius:20,
            }}>{project.tag}</span>
          </div>
          <p style={{ color:project.color, fontSize:'0.82rem', fontWeight:600, marginTop:4 }}>
            {project.tagline}
          </p>
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:7,
            background:'rgba(255,255,255,0.04)', backdropFilter:'blur(12px)',
            border:`1px solid ${project.color}44`, color:project.color,
            textDecoration:'none', padding:'9px 20px', borderRadius:10,
            fontWeight:600, fontSize:'0.82rem', fontFamily:'inherit',
            transition:'all 0.25s', whiteSpace:'nowrap',
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${project.color}18`;e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.transform=''}}
          >🔗 בקר באתר</a>
        )}
      </div>

      {/* 2 col */}
      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,340px),1fr))',
        gap:'clamp(32px,5vw,64px)', alignItems:'start' }}>

        {/* thumbnail gallery */}
        <div>
          <p style={{ fontSize:'0.68rem', color:'var(--text-muted)', letterSpacing:'1px',
            marginBottom:14, textTransform:'uppercase', fontWeight:600 }}>
            לחץ על תמונה לתצוגה מלאה
          </p>
          <ProjectGallery project={project} />
        </div>

        {/* info */}
        <div>
          <p style={{ color:'var(--text-secondary)', fontSize:'clamp(0.9rem,1.6vw,1rem)',
            lineHeight:1.85, marginBottom:24 }}>{project.desc}</p>

          <div style={{ display:'flex', flexDirection:'column', gap:20, marginBottom:24 }}>
            <div>
              <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'2px',
                textTransform:'uppercase', color:project.color, marginBottom:8 }}>האתגר</div>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.88rem', lineHeight:1.78 }}>{project.challenge}</p>
            </div>
            <div>
              <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'2px',
                textTransform:'uppercase', color:project.color, marginBottom:8 }}>התוצאה</div>
              <p style={{ color:'var(--text-primary)', fontSize:'0.88rem', lineHeight:1.78, fontWeight:500 }}>{project.result}</p>
            </div>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
            {project.stats.map(s=>(
              <div key={s.label} style={{ textAlign:'center',
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 14px', minWidth:70 }}>
                <div style={{ fontWeight:800, fontSize:'0.95rem', color:project.color }}>{s.value}</div>
                <div style={{ fontSize:'0.58rem', color:'var(--text-muted)', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {project.tech.map(t=>(
              <span key={t} style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'var(--text-secondary)', fontSize:'0.7rem', padding:'4px 10px', borderRadius:20,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SECTION ────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" style={{
      position:'relative', zIndex:10,
      padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px) 0',
      borderTop:'1px solid var(--border)',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.68rem',
          fontWeight:700, letterSpacing:'3px', textTransform:'uppercase',
          color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.6rem,4vw,3rem)', fontWeight:900,
          letterSpacing:'-1.5px', lineHeight:1.0,
          marginBottom:'clamp(56px,8vw,96px)' }}>
          מוצרים שאנשים{' '}
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            באמת משתמשים בהם.
          </span>
        </h2>

        {projects.map((p,i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
