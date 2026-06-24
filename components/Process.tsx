'use client'

const steps = [
  { icon: '💬', title: 'שיחת גישוש', text: 'מבינים ביחד מה צריך — בלי לבזבז לך את הזמן' },
  { icon: '📋', title: 'הצעת מחיר', text: 'הצעה מפורטת עם לוח זמנים מחייב' },
  { icon: '🛠️', title: 'פיתוח שוטף', text: 'עדכונים שבועיים, Demo חי לאורך הדרך' },
  { icon: '🚀', title: 'השקה', text: 'Deploy, App Store ותמיכה אחרי ההשקה' },
]

export default function Process() {
  return (
    <section id="process" style={{
      position: 'relative', zIndex: 10, padding: '100px 8vw',
      background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.025), transparent)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16,
      }}>
        <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
        איך עובדים
      </div>

      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900,
        letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 72,
      }}>
        פשוט, <span style={{ color: 'var(--cyan)' }}>שקוף</span> ומהיר.
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 0,
        position: 'relative',
      }}>
        {/* connector line */}
        <div style={{
          position: 'absolute', top: 36, right: '12%', left: '12%',
          height: 1, background: 'linear-gradient(to left, transparent, var(--border), transparent)',
          zIndex: 0,
        }} />

        {steps.map((s, i) => (
          <div
            key={s.title}
            style={{ textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1 }}
          >
            <div
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'var(--navy)', border: '1.5px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '1.6rem',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'var(--cyan)'
                el.style.transform = 'scale(1.12)'
                el.style.borderColor = 'var(--cyan)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'var(--navy)'
                el.style.transform = 'scale(1)'
                el.style.borderColor = 'var(--border)'
              }}
            >{s.icon}</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--grey)', lineHeight: 1.6 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
