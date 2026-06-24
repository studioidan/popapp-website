'use client'
import { clients } from '@/lib/projects'

const all = [...clients, ...clients]

export default function ClientsStrip() {
  return (
    <section style={{
      position:'relative', zIndex:10,
      padding:'clamp(48px,6vw,72px) 0',
      borderTop:'1px solid var(--border)',
      borderBottom:'1px solid var(--border)',
      overflow:'hidden',
    }}>
      <div style={{ textAlign:'center', marginBottom:36,
        fontSize:'0.68rem', fontWeight:700, letterSpacing:'3px',
        textTransform:'uppercase', color:'var(--text-muted)' }}>
        בין הלקוחות
      </div>

      <div style={{ position:'relative' }}>
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:160,
          background:'linear-gradient(to left, var(--bg-base), transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:160,
          background:'linear-gradient(to right, var(--bg-base), transparent)', zIndex:2, pointerEvents:'none' }} />

        <div style={{ display:'flex', gap:80, alignItems:'center',
          animation:'scroll-rtl 30s linear infinite', width:'max-content' }}>
          {all.map((c,i) => (
            <div key={i} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:8,
              opacity:0.35, transition:'opacity 0.3s, transform 0.3s', flexShrink:0,
            }}
              onMouseEnter={e=>{ e.currentTarget.style.opacity='0.9'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e=>{ e.currentTarget.style.opacity='0.35'; e.currentTarget.style.transform='' }}
            >
              <img src={c.logo} alt={c.name}
                style={{ height:32, objectFit:'contain', filter:'brightness(0) invert(1)', maxWidth:130 }}
                onError={e=>{
                  (e.target as HTMLElement).style.display='none'
                  const span = (e.target as HTMLElement).nextSibling as HTMLElement
                  if(span) span.style.display='block'
                }}
              />
              <span style={{ display:'none', fontWeight:700, fontSize:'0.9rem',
                color:'var(--text-primary)', whiteSpace:'nowrap' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
