'use client'
import { clients } from '@/lib/projects'

const allClients = [...clients, ...clients] // duplicate for infinite scroll

export default function ClientsStrip() {
  return (
    <section style={{
      position:'relative', zIndex:10,
      padding:'clamp(48px,6vw,80px) 0',
      borderTop:'1px solid var(--border)',
      borderBottom:'1px solid var(--border)',
      overflow:'hidden',
      background:'rgba(255,255,255,0.01)',
    }}>
      <div style={{
        textAlign:'center', marginBottom:40,
        fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px',
        textTransform:'uppercase', color:'var(--grey)',
      }}>עבדתי עם</div>

      {/* scrolling strip */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        {/* fade edges */}
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120,
          background:'linear-gradient(to left, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120,
          background:'linear-gradient(to right, var(--black), transparent)', zIndex:2, pointerEvents:'none' }} />

        <div style={{
          display:'flex', gap:64, alignItems:'center',
          animation:'scroll 28s linear infinite',
          width:'max-content',
        }}>
          {allClients.map((c, i) => (
            <div key={i} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:10,
              opacity:0.45, transition:'opacity 0.3s', cursor:'default',
              minWidth:120, flexShrink:0,
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
            >
              <img
                src={c.logo}
                alt={c.name}
                style={{ height:36, objectFit:'contain', filter:'brightness(0) invert(1)', maxWidth:120 }}
                onError={e => {
                  const parent = (e.target as HTMLElement).parentElement
                  if (parent) {
                    ;(e.target as HTMLElement).style.display = 'none'
                    const span = parent.querySelector('.fallback-name') as HTMLElement
                    if (span) span.style.display = 'block'
                  }
                }}
              />
              <span className="fallback-name" style={{
                display:'none', fontWeight:700, fontSize:'0.9rem',
                color:'var(--white)', whiteSpace:'nowrap',
              }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
