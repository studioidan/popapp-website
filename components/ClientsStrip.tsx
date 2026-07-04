'use client'

const clients = [
  { name: 'ישראל היום',        src: '/logos/israel-hayom.png' },
  { name: 'The Times of Israel',src: '/logos/times-of-israel.png' },
  { name: 'סובארו',            src: '/logos/subaru.png' },
  { name: 'Johnnie Walker',    src: '/logos/johnnie-walker.png' },
  { name: 'הטכניון',           src: '/logos/technion.png' },
  { name: 'Better',            src: '/logos/better-logo.png' },
]

export default function ClientsStrip() {
  return (
    <section style={{
      position: 'relative', zIndex: 10,
      padding: 'clamp(64px,8vw,96px) clamp(20px,5vw,60px)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(255,255,255,0.01)',
    }}>
      <div style={{
        textAlign: 'center', marginBottom: 44,
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>
        עבדתי עם
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 20,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {clients.map((c, i) => (
          <div key={i} style={{
            transition: 'transform 0.3s, box-shadow 0.3s',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 14,
            padding: '24px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 92,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,229,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <img
              src={c.src}
              alt={c.name}
              loading="eager"
              style={{
                height: 56,
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
