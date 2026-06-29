'use client'

const clients = [
  { name: 'ישראל היום',        src: '/logos/israel-hayom.png' },
  { name: 'The Times of Israel',src: '/logos/times-of-israel.png' },
  { name: 'סובארו',            src: '/logos/subaru.png' },
  { name: 'Johnnie Walker',    src: '/logos/johnnie-walker.png' },
  { name: 'הטכניון',           src: '/logos/technion.png' },
]

// 4x for seamless loop
const all = [...clients, ...clients, ...clients, ...clients]

export default function ClientsStrip() {
  return (
    <section style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(48px,6vw,72px) 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.01)',
    }}>
      <div style={{
        textAlign: 'center', marginBottom: 36,
        fontSize: '0.65rem', fontWeight: 700, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>
        עבדתי עם
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* fade edges */}
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120,
          background:'linear-gradient(to left, var(--bg-base), transparent)',
          zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120,
          background:'linear-gradient(to right, var(--bg-base), transparent)',
          zIndex:2, pointerEvents:'none' }} />

        <div style={{
          display: 'flex',
          gap: 80,
          alignItems: 'center',
          width: 'max-content',
          animation: 'clients-scroll 30s linear infinite',
          willChange: 'transform',
        }}>
          {all.map((c, i) => (
            <div key={i} style={{
              flexShrink: 0,
              transition: 'opacity 0.3s, transform 0.3s',
              opacity: 0.55,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(-2px)'
                ;(e.currentTarget.parentElement as HTMLElement).style.animationPlayState = 'paused'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '0.55'
                e.currentTarget.style.transform = ''
                ;(e.currentTarget.parentElement as HTMLElement).style.animationPlayState = 'running'
              }}
            >
              <img
                src={c.src}
                alt={c.name}
                style={{
                  height: 44,
                  maxWidth: 160,
                  objectFit: 'contain',
                  display: 'block',
                  /* grayscale + invert to white on dark bg */
                  filter: 'grayscale(100%) brightness(0) invert(1)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes clients-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  )
}
