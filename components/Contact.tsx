'use client'

export default function Contact() {
  return (
    <>
      <section id="contact" style={{
        position: 'relative', zIndex: 10,
        padding: 'clamp(60px, 10vw, 120px) 6vw',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16,
            justifyContent: 'center',
          }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--cyan)', display: 'block' }} />
            מוכנים להתחיל?
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 900,
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20,
          }}>
            יש לך פרויקט?<br />
            <span style={{ color: 'var(--cyan)' }}>בואו נדבר.</span>
          </h2>

          <p style={{
            color: 'var(--grey)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            lineHeight: 1.75, marginBottom: 48,
          }}>
            ספר לי על הרעיון שלך ואני אחזור אליך תוך 24 שעות עם כיוון ראשוני — בחינם.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:studioidan@gmail.com"
              style={{
                background: 'var(--cyan)', color: 'var(--black)',
                padding: '14px clamp(20px, 4vw, 36px)', borderRadius: 8,
                fontFamily: 'inherit', fontSize: 'clamp(0.88rem, 2vw, 1rem)', fontWeight: 700,
                textDecoration: 'none', display: 'inline-block', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,229,255,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >✉️ studioidan@gmail.com</a>

            <a href="tel:0524667179"
              style={{
                background: 'transparent', color: 'var(--white)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                padding: '14px clamp(20px, 4vw, 36px)', borderRadius: 8,
                fontFamily: 'inherit', fontSize: 'clamp(0.88rem, 2vw, 1rem)', fontWeight: 400,
                textDecoration: 'none', display: 'inline-block', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--white)' }}
            >📞 052-466-7179</a>
          </div>
        </div>
      </section>

      <footer style={{
        position: 'relative', zIndex: 10,
        padding: '24px 6vw',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'var(--grey)', fontSize: '0.82rem',
        flexWrap: 'wrap', gap: 10,
      }}>
        <div>PopApp © 2025 · עידן בן שמעון</div>
        <div>פיתוח תוכנה · AI · מוצרים דיגיטליים</div>
      </footer>
    </>
  )
}
