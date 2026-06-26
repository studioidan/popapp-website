'use client'
import { clients } from '@/lib/projects'

// Duplicate for seamless infinite scroll
const all = [...clients, ...clients]

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
        בין הלקוחות שעבדתי איתם
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* fade edges */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 160,
          background: 'linear-gradient(to left, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 160,
          background: 'linear-gradient(to right, var(--bg-base), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex', gap: 72, alignItems: 'center',
          animation: 'scroll-rtl 32s linear infinite',
          width: 'max-content',
        }}>
          {all.map((c, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              flexShrink: 0, minWidth: 100,
              opacity: 0.4, transition: 'opacity 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.transform = '' }}
            >
              <img
                src={c.logo}
                alt={c.name}
                style={{
                  height: 36, maxWidth: 140, objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  display: 'block',
                }}
                onError={e => {
                  // try fallback if available
                  const el = e.target as HTMLImageElement
                  if ('logoFallback' in c && el.src !== (c as any).logoFallback) {
                    el.src = (c as any).logoFallback
                  } else {
                    // show text instead
                    el.style.display = 'none'
                    const parent = el.parentElement
                    if (parent) {
                      const span = document.createElement('span')
                      span.textContent = c.name
                      span.style.cssText = 'font-weight:700;font-size:0.9rem;color:var(--text-primary);white-space:nowrap;font-family:inherit'
                      parent.appendChild(span)
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
