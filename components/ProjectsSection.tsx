'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { projects } from '@/lib/projects'

/* ── DESKTOP FRAME ──────────────────────────────────── */
function DesktopFrame({ src, color, label }: { src:string; color:string; label:string }) {
  return (
    <div style={{ width:'100%', display:'flex', flexDirection:'column' }}>
      {/* outer glow ring */}
      <div style={{
        padding: 3,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${color}55, transparent, ${color}22)`,
        boxShadow: `0 0 0 1px ${color}18, 0 24px 64px ${color}22`,
      }}>
        <div style={{
          background: '#07071a',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {/* browser chrome */}
          <div style={{
            background: 'linear-gradient(to bottom, #0d0d24, #090918)',
            padding: '8px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: `1px solid ${color}18`,
          }}>
            <div style={{ display:'flex', gap:5, flexShrink:0 }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c=>(
                <div key={c} style={{ width:8, height:8, borderRadius:'50%', background:c, opacity:0.9 }} />
              ))}
            </div>
            <div style={{
              flex:1, background:'rgba(255,255,255,0.05)',
              borderRadius:5, padding:'3px 12px',
              fontSize:'0.58rem', color:'rgba(255,255,255,0.22)',
              fontFamily:'monospace', display:'flex', alignItems:'center', gap:6,
            }}>
              <div style={{ width:8, height:8, borderRadius:'50%',
                background:`${color}66`, flexShrink:0,
                boxShadow:`0 0 4px ${color}` }} />
              popapp.co.il
            </div>
          </div>
          {/* screenshot */}
          <div style={{ aspectRatio:'16/9', overflow:'hidden', position:'relative', background:'#04040e' }}>
            <img src={src} alt={label}
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src.slice(-6)}/1200/675` }}
            />
            {/* subtle vignette */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background:'radial-gradient(ellipse at center, transparent 60%, rgba(4,4,14,0.4) 100%)' }} />
          </div>
        </div>
      </div>
      {/* stand */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:50, height:12, background:'#08080f' }} />
        <div style={{ width:88, height:4, background:'#05050c',
          borderRadius:'0 0 6px 6px', boxShadow:`0 4px 20px ${color}22` }} />
      </div>
      <p style={{ textAlign:'center', marginTop:10, fontSize:'0.65rem',
        color:'var(--text-muted)', letterSpacing:'1px' }}>{label}</p>
    </div>
  )
}

/* ── MOBILE FRAME ───────────────────────────────────── */
function MobileFrame({ src, color, label }: { src:string; color:string; label:string }) {
  return (
    <div style={{ width:'100%', maxWidth:200, margin:'0 auto', position:'relative' }}>
      {/* outer glow ring */}
      <div style={{
        padding: 3,
        borderRadius: 36,
        background: `linear-gradient(160deg, ${color}66, transparent 60%, ${color}33)`,
        boxShadow: `0 0 0 1px ${color}18, 0 28px 64px rgba(0,0,0,0.6), 0 0 40px ${color}18`,
      }}>
        <div style={{
          background: '#08081a',
          borderRadius: 33,
          padding: '12px 6px',
        }}>
          {/* dynamic island style notch */}
          <div style={{
            width: 52, height: 8,
            background: 'linear-gradient(to right, #1a1a30, #101020)',
            borderRadius: 4, margin: '0 auto 10px',
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
          }} />
          {/* screen */}
          <div style={{ borderRadius:22, overflow:'hidden',
            aspectRatio:'9/19.5', position:'relative', background:'#000' }}>
            <img src={src} alt={label}
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${src.slice(-6)}m/390/844` }}
            />
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background:'linear-gradient(135deg,rgba(255,255,255,0.04),transparent 50%)' }} />
          </div>
          {/* home bar */}
          <div style={{ width:44, height:4,
            background:`linear-gradient(to right, ${color}33, ${color}66, ${color}33)`,
            borderRadius:2, margin:'10px auto 0',
            boxShadow:`0 0 8px ${color}44` }} />
        </div>
      </div>
      {/* physical buttons */}
      <div style={{ position:'absolute', right:-5, top:82, width:4, height:28,
        background:`linear-gradient(to bottom, ${color}22, ${color}44, ${color}22)`,
        borderRadius:'0 3px 3px 0', boxShadow:`2px 0 6px ${color}22` }} />
      {[68, 92].map((top, i) => (
        <div key={i} style={{ position:'absolute', left:-5, top, width:4, height:20,
          background:`linear-gradient(to bottom, ${color}22, ${color}44, ${color}22)`,
          borderRadius:'3px 0 0 3px', boxShadow:`-2px 0 6px ${color}22` }} />
      ))}
      <p style={{ textAlign:'center', marginTop:12, fontSize:'0.63rem',
        color:'var(--text-muted)', letterSpacing:'1px' }}>{label}</p>
    </div>
  )
}

/* ── GALLERY ────────────────────────────────────────── */
function Gallery({ project }: { project: typeof projects[0] }) {
  const [idx, setIdx] = useState(0)
  const [animDir, setAnimDir] = useState<'left'|'right'|null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const go = useCallback((dir: 'left'|'right') => {
    setAnimDir(dir)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIdx(i => dir === 'right'
        ? (i + 1) % project.images.length
        : (i - 1 + project.images.length) % project.images.length)
      setAnimDir(null)
    }, 200)
  }, [project.images.length])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const img = project.images[idx]

  return (
    <div>
      {/* main frame */}
      <div style={{ position:'relative', marginBottom:20 }}>
        {/* animated frame */}
        <div style={{
          opacity: animDir ? 0 : 1,
          transform: animDir === 'right' ? 'translateX(-12px)' : animDir === 'left' ? 'translateX(12px)' : 'none',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}>
          {img.type === 'mobile'
            ? <MobileFrame src={img.src} color={project.color} label={img.label} />
            : <DesktopFrame src={img.src} color={project.color} label={img.label} />
          }
        </div>

        {/* nav arrows */}
        {project.images.length > 1 && (
          <>
            <button onClick={() => go('left')} style={{
              position:'absolute', right:-16, top:'45%', transform:'translateY(-50%)',
              width:36, height:36, borderRadius:'50%', border:`1px solid ${project.color}44`,
              background:'rgba(4,7,15,0.85)', backdropFilter:'blur(12px)',
              color:project.color, fontSize:'1rem', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s', zIndex:10,
            }}
              onMouseEnter={e => { e.currentTarget.style.background=project.color; e.currentTarget.style.color='#04070f' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(4,7,15,0.85)'; e.currentTarget.style.color=project.color }}
            >→</button>
            <button onClick={() => go('right')} style={{
              position:'absolute', left:-16, top:'45%', transform:'translateY(-50%)',
              width:36, height:36, borderRadius:'50%', border:`1px solid ${project.color}44`,
              background:'rgba(4,7,15,0.85)', backdropFilter:'blur(12px)',
              color:project.color, fontSize:'1rem', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s', zIndex:10,
            }}
              onMouseEnter={e => { e.currentTarget.style.background=project.color; e.currentTarget.style.color='#04070f' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(4,7,15,0.85)'; e.currentTarget.style.color=project.color }}
            >←</button>
          </>
        )}
      </div>

      {/* thumbnails + dots */}
      <div style={{ display:'flex', gap:8, justifyContent:'center',
        flexWrap:'wrap', alignItems:'center', padding:'0 20px' }}>
        {project.images.map((im, i) => (
          <button key={i} onClick={() => { setIdx(i); setAnimDir(null) }} style={{
            width:48, height:34, borderRadius:8, overflow:'hidden',
            border: i===idx ? `2px solid ${project.color}` : '2px solid rgba(255,255,255,0.07)',
            cursor:'pointer', padding:0, transition:'all 0.2s', flexShrink:0, position:'relative',
            boxShadow: i===idx ? `0 0 12px ${project.color}66` : 'none',
          }}>
            <img src={im.src} alt={im.label} style={{
              width:'100%', height:'100%', objectFit:'cover',
              filter: i===idx ? 'none' : 'brightness(0.3)',
              transition:'filter 0.2s',
            }}
              onError={e => { (e.target as HTMLImageElement).src=`https://picsum.photos/seed/${i}/80/60` }}
            />
            {/* device icon */}
            <div style={{
              position:'absolute', bottom:1, right:2,
              fontSize:'0.45rem', lineHeight:1,
              color: i===idx ? project.color : 'rgba(255,255,255,0.3)',
            }}>{im.type==='mobile'?'📱':'🖥'}</div>
          </button>
        ))}
      </div>
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
      {/* header row */}
      <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:32, flexWrap:'wrap' }}>
        {/* logo box */}
        <div style={{
          width:52, height:52, borderRadius:14, flexShrink:0,
          background:`linear-gradient(135deg,${project.gradientFrom}33,${project.gradientTo}22)`,
          border:`1.5px solid ${project.color}44`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.7rem',
          boxShadow:`0 8px 24px ${project.color}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}>{project.emoji}</div>

        <div style={{ flex:1 }}>
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
            onMouseEnter={e => { e.currentTarget.style.background=`${project.color}18`; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.transform='' }}
          >🔗 בקר באתר</a>
        )}
      </div>

      {/* 2 col: gallery + info */}
      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',
        gap:'clamp(32px,5vw,64px)', alignItems:'start' }}>

        {/* gallery */}
        <Gallery project={project} />

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
            {project.stats.map(s => (
              <div key={s.label} style={{ textAlign:'center',
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 14px', minWidth:70 }}>
                <div style={{ fontWeight:800, fontSize:'0.95rem', color:project.color }}>{s.value}</div>
                <div style={{ fontSize:'0.58rem', color:'var(--text-muted)', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {project.tech.map(t => (
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
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.68rem', fontWeight:700,
          letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.6rem,4vw,3rem)', fontWeight:900,
          letterSpacing:'-1.5px', lineHeight:1.0, marginBottom:'clamp(56px,8vw,96px)' }}>
          מוצרים שאנשים{' '}
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            באמת משתמשים בהם.
          </span>
        </h2>

        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
