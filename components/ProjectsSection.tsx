'use client'
import { useRef, useState, useEffect } from 'react'
import { projects } from '@/lib/projects'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top  - rect.height / 2) / rect.height * 10
    const y = (e.clientX - rect.left - rect.width  / 2) / rect.width  * -10
    setTilt({ x, y })
  }

  const isEven = index % 2 === 0

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(24px,4vw,64px)',
        alignItems: 'center',
        marginBottom: 'clamp(80px,10vw,140px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      {/* Text side */}
      <div style={{ order: isEven ? 0 : 1 }}>
        {/* number + tag */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
          <span style={{ fontSize:'5rem', fontWeight:900, color:'var(--border)', lineHeight:1, userSelect:'none' }}>
            0{index + 1}
          </span>
          <span style={{
            background: `${project.color}18`, color: project.color,
            border: `1px solid ${project.color}44`,
            fontSize:'0.68rem', fontWeight:700, letterSpacing:'2px',
            textTransform:'uppercase', padding:'5px 14px', borderRadius:20,
          }}>{project.tag}</span>
        </div>

        <h3 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:900, letterSpacing:'-1px', marginBottom:8 }}>
          {project.name}
        </h3>
        <p style={{ color: project.color, fontSize:'1rem', fontWeight:600, marginBottom:20 }}>
          {project.tagline}
        </p>
        <p style={{ color:'var(--grey)', lineHeight:1.8, fontSize:'0.97rem', marginBottom:20 }}>
          {project.desc}
        </p>

        {/* challenge */}
        <div style={{
          background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
          borderRight: `3px solid ${project.color}`,
          borderRadius:8, padding:'16px 20px', marginBottom:24,
        }}>
          <div style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color: project.color, marginBottom:6 }}>האתגר</div>
          <p style={{ color:'var(--grey)', fontSize:'0.88rem', lineHeight:1.7 }}>{project.challenge}</p>
        </div>

        {/* result */}
        <div style={{
          background: `${project.color}0d`, border:`1px solid ${project.color}30`,
          borderRadius:8, padding:'16px 20px', marginBottom:28,
        }}>
          <div style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color: project.color, marginBottom:6 }}>התוצאה</div>
          <p style={{ color:'var(--white)', fontSize:'0.9rem', lineHeight:1.7, fontWeight:500 }}>{project.result}</p>
        </div>

        {/* tech pills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
              color:'var(--grey)', fontSize:'0.74rem', padding:'5px 12px', borderRadius:20,
            }}>{t}</span>
          ))}
        </div>

        {/* stats */}
        <div style={{ display:'flex', gap:24, marginBottom:36, flexWrap:'wrap' }}>
          {project.stats.map(s => (
            <div key={s.label} style={{ textAlign:'center',
              background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
              borderRadius:10, padding:'12px 20px', minWidth:90 }}>
              <div style={{ fontWeight:800, fontSize:'1.1rem', color: project.color }}>{s.value}</div>
              <div style={{ fontSize:'0.68rem', color:'var(--grey)', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background: project.color, color:'#04070f',
              textDecoration:'none', padding:'12px 28px',
              borderRadius:10, fontWeight:700, fontSize:'0.95rem', fontFamily:'inherit',
              transition:'all 0.25s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 10px 36px ${project.color}55`}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
          >בקר באתר ←</a>
        )}
      </div>

      {/* 3D Image Card */}
      <div style={{ order: isEven ? 1 : 0, perspective:'1000px' }}>
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x:0, y:0 })}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: tilt.x === 0 ? 'transform 0.6s ease' : 'transform 0.1s ease',
            transformStyle: 'preserve-3d',
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: `0 40px 100px ${project.color}25, 0 0 0 1px ${project.color}22`,
            cursor: 'default',
            background: 'var(--navy)',
          }}
        >
          {/* gradient overlay */}
          <div style={{
            position:'absolute', inset:0, zIndex:2,
            background:`linear-gradient(135deg, ${project.gradientFrom}18, ${project.gradientTo}08)`,
          }} />

          {/* App preview mockup */}
          <div style={{
            background: `linear-gradient(160deg, ${project.color}15, rgba(4,7,15,0.9))`,
            padding:'clamp(20px,4vw,40px)',
            minHeight:360,
            display:'flex', flexDirection:'column', justifyContent:'space-between',
          }}>
            {/* top bar */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <div style={{ display:'flex', gap:6 }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                  <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                ))}
              </div>
              <span style={{ fontSize:'2rem' }}>{project.emoji}</span>
            </div>

            {/* main image */}
            {!imgError ? (
              <img
                src={project.ogImage}
                alt={project.name}
                onError={() => setImgError(true)}
                style={{
                  width:'100%', borderRadius:12, marginBottom:20,
                  maxHeight:200, objectFit:'cover',
                  border:`1px solid ${project.color}22`,
                }}
              />
            ) : (
              <div style={{
                width:'100%', height:200, borderRadius:12, marginBottom:20,
                background:`linear-gradient(135deg, ${project.color}22, transparent)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'4rem',
              }}>{project.emoji}</div>
            )}

            {/* bottom info */}
            <div>
              <div style={{ fontWeight:800, fontSize:'1.2rem', marginBottom:4 }}>{project.name}</div>
              <div style={{ color: project.color, fontSize:'0.82rem', fontWeight:600 }}>{project.tagline}</div>
              {/* fake progress / ui elements */}
              <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:6 }}>
                {[80,55,70].map((w,i) => (
                  <div key={i} style={{ height:3, borderRadius:2, background:`rgba(255,255,255,0.06)`, overflow:'hidden' }}>
                    <div style={{ width:`${w}%`, height:'100%', background: project.color, borderRadius:2, opacity:0.5 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* floating badge */}
        <div style={{
          position:'relative', marginTop:-20, marginRight:20,
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(4,7,15,0.9)', border:`1px solid ${project.color}44`,
          borderRadius:12, padding:'10px 18px',
          boxShadow:`0 8px 32px ${project.color}20`,
          backdropFilter:'blur(12px)',
        }}>
          <span style={{ fontSize:'1.1rem' }}>{project.emoji}</span>
          <div>
            <div style={{ fontWeight:700, fontSize:'0.82rem' }}>{project.stats[0].value}</div>
            <div style={{ fontSize:'0.68rem', color:'var(--grey)' }}>{project.stats[0].label}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ position:'relative', zIndex:10, padding:'clamp(60px,8vw,120px) clamp(20px,7vw,100px)' }}>
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px',
        textTransform:'uppercase', color:'var(--cyan)', marginBottom:16,
      }}>
        <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
        פרויקטים נבחרים
      </div>
      <h2 style={{
        fontSize:'clamp(1.8rem,4vw,3.2rem)', fontWeight:900,
        letterSpacing:'-1px', lineHeight:1.1, marginBottom:'clamp(56px,8vw,100px)',
      }}>
        מוצרים שאנשים <span style={{ color:'var(--cyan)' }}>באמת משתמשים בהם.</span>
      </h2>

      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </section>
  )
}
