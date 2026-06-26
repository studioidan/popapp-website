'use client'
import { useRef, useEffect, useState } from 'react'
import { projects } from '@/lib/projects'

/* ── CSS Device Frames ──────────────────────────────── */
function DesktopFrame({ src, color }: { src: string; color: string }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        background: '#0a0a18',
        borderRadius: '14px 14px 0 0',
        border: `1px solid ${color}44`,
        boxShadow: `0 0 0 1px ${color}18, 0 24px 64px rgba(0,0,0,0.6), 0 0 48px ${color}18`,
        overflow: 'hidden',
      }}>
        {/* browser bar */}
        <div style={{
          background: '#07071a', padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: `1px solid ${color}22`,
        }}>
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 5,
            padding: '3px 12px', fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace',
          }}>https://popapp.co.il</div>
        </div>
        {/* screenshot */}
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: '#000' }}>
          <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${src.slice(-8)}/1200/675` }}
          />
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(135deg,rgba(255,255,255,0.04),transparent 50%)',
            pointerEvents:'none' }} />
        </div>
      </div>
      {/* stand */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:56, height:12, background:'#08080f' }} />
        <div style={{ width:100, height:5, background:'#06060e',
          borderRadius:'0 0 6px 6px', boxShadow:`0 4px 16px ${color}18` }} />
      </div>
    </div>
  )
}

function MobileFrame({ src, color }: { src: string; color: string }) {
  return (
    <div style={{ width: '100%', maxWidth: 240, margin: '0 auto', position: 'relative' }}>
      <div style={{
        background: '#0a0a18', borderRadius: 36,
        border: `2px solid ${color}55`,
        boxShadow: `0 0 0 1px ${color}18, 0 32px 80px rgba(0,0,0,0.7), 0 0 48px ${color}22`,
        padding: '14px 8px',
      }}>
        <div style={{ width:60, height:8, background:'#141426', borderRadius:4, margin:'0 auto 12px' }} />
        <div style={{ borderRadius:24, overflow:'hidden', aspectRatio:'9/19.5', position:'relative', background:'#000' }}>
          <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${src.slice(-8)}m/390/844` }}
          />
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(135deg,rgba(255,255,255,0.04),transparent 50%)',
            pointerEvents:'none' }} />
        </div>
        <div style={{ width:48, height:4, background:`${color}44`, borderRadius:2, margin:'12px auto 0' }} />
      </div>
      {/* side buttons */}
      {[{side:'right',top:80,h:28},{side:'left',top:68,h:20},{side:'left',top:94,h:20}].map((b,i)=>(
        <div key={i} style={{ position:'absolute', [b.side]:-4, top:b.top,
          width:3, height:b.h, background:`${color}33`, borderRadius:2 }} />
      ))}
    </div>
  )
}

/* ── Single Project Row ─────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // split images by type
  const desktopImgs = project.images.filter(i => i.type === 'desktop')
  const mobileImgs  = project.images.filter(i => i.type === 'mobile')

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(48px)',
      transition: `opacity 0.75s ease ${index * 0.05}s, transform 0.75s ease ${index * 0.05}s`,
      paddingBottom: 'clamp(80px,10vw,140px)',
      borderBottom: '1px solid var(--border)',
      marginBottom: 'clamp(80px,10vw,140px)',
    }}>
      {/* Project header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        marginBottom: 'clamp(36px,5vw,56px)',
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, flexShrink: 0,
          background: `linear-gradient(135deg, ${project.gradientFrom}33, ${project.gradientTo}22)`,
          border: `1.5px solid ${project.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem',
          boxShadow: `0 8px 24px ${project.color}22`,
        }}>{project.emoji}</div>

        <div style={{ flex: 1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900,
              letterSpacing: '-1px', lineHeight: 1,
            }}>{project.name}</h3>
            <span style={{
              background: `${project.color}18`, color: project.color,
              border: `1px solid ${project.color}44`,
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20,
            }}>{project.tag}</span>
          </div>
          <p style={{ color: project.color, fontSize: '0.85rem', fontWeight: 600, marginTop: 4 }}>
            {project.tagline}
          </p>
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
            border: `1px solid ${project.color}44`, color: project.color,
            textDecoration: 'none', padding: '10px 22px', borderRadius: 10,
            fontWeight: 600, fontSize: '0.85rem', fontFamily: 'inherit',
            transition: 'all 0.25s', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { e.currentTarget.style.background=`${project.color}18`; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.transform='' }}
          >
            🔗 בקר באתר
          </a>
        )}
      </div>

      {/* description */}
      <p style={{
        color: 'var(--text-secondary)', fontSize: 'clamp(0.92rem,1.8vw,1.05rem)',
        lineHeight: 1.85, marginBottom: 'clamp(32px,5vw,52px)',
        maxWidth: 700,
      }}>{project.desc}</p>

      {/* Images grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px,5vw,56px)' }}>

        {/* Desktop screenshots */}
        {desktopImgs.length > 0 && (
          <div>
            <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'2.5px',
              textTransform:'uppercase', color:'var(--text-muted)', marginBottom:20,
              display:'flex', alignItems:'center', gap:8 }}>
              <span>🖥️</span> Desktop
            </div>
            <div style={{ display:'grid',
              gridTemplateColumns:`repeat(auto-fit, minmax(min(100%,${desktopImgs.length===1?'600px':'340px'}),1fr))`,
              gap: 'clamp(20px,3vw,32px)' }}>
              {desktopImgs.map((img, i) => (
                <div key={i}>
                  <DesktopFrame src={img.src} color={project.color} />
                  <p style={{ textAlign:'center', marginTop:10, fontSize:'0.68rem',
                    color:'var(--text-muted)', letterSpacing:'1px' }}>{img.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile screenshots */}
        {mobileImgs.length > 0 && (
          <div>
            <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'2.5px',
              textTransform:'uppercase', color:'var(--text-muted)', marginBottom:20,
              display:'flex', alignItems:'center', gap:8 }}>
              <span>📱</span> Mobile
            </div>
            <div style={{ display:'grid',
              gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,200px),1fr))',
              gap:'clamp(20px,3vw,40px)' }}>
              {mobileImgs.map((img, i) => (
                <div key={i}>
                  <MobileFrame src={img.src} color={project.color} />
                  <p style={{ textAlign:'center', marginTop:12, fontSize:'0.65rem',
                    color:'var(--text-muted)', letterSpacing:'1px' }}>{img.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech + stats bar */}
        <div style={{ display:'flex', gap:'clamp(16px,3vw,32px)', flexWrap:'wrap', alignItems:'flex-start' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, flex:1 }}>
            {project.tech.map(t => (
              <span key={t} style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'var(--text-secondary)', fontSize:'0.72rem', padding:'4px 11px', borderRadius:20,
              }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:12, flexShrink:0 }}>
            {project.stats.map(s => (
              <div key={s.label} style={{
                textAlign:'center',
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 16px',
              }}>
                <div style={{ fontWeight:800, fontSize:'1rem', color:project.color }}>{s.value}</div>
                <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section id="projects" style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px) 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10,
          fontSize:'0.68rem', fontWeight:700, letterSpacing:'3px',
          textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
          <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
          פרויקטים נבחרים
        </div>
        <h2 style={{ fontSize:'clamp(1.6rem,4vw,3rem)', fontWeight:900,
          letterSpacing:'-1.5px', lineHeight:1.0,
          marginBottom:'clamp(56px,8vw,100px)' }}>
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
