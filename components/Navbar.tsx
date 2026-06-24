'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 48px',
      background: scrolled ? 'rgba(5,8,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>
        Pop<span style={{ color: 'var(--cyan)' }}>App</span>
      </div>

      <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
        {[
          { label: 'פרויקטים', id: 'orbit' },
          { label: 'למה אני', id: 'why' },
          { label: 'תהליך', id: 'process' },
        ].map(({ label, id }) => (
          <li key={id}>
            <button onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', color: 'var(--grey)',
              fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey)')}
            >{label}</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo('contact')}
        style={{
          background: 'transparent', border: '1.5px solid var(--cyan)',
          color: 'var(--cyan)', padding: '9px 24px', borderRadius: 6,
          fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--cyan)'
          e.currentTarget.style.color = 'var(--black)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--cyan)'
        }}
      >
        בואו נדבר
      </button>
    </nav>
  )
}
