'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const links = [
    { label: 'פרויקטים', id: 'orbit' },
    { label: 'למה אני', id: 'why' },
    { label: 'תהליך', id: 'process' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 5vw',
        background: scrolled ? 'rgba(5,8,16,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>
          Pop<span style={{ color: 'var(--cyan)' }}>App</span>
        </div>

        {/* Desktop links */}
        <ul className="hide-mobile" style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
          {links.map(({ label, id }) => (
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="hide-mobile"
            onClick={() => scrollTo('contact')}
            style={{
              background: 'transparent', border: '1.5px solid var(--cyan)',
              color: 'var(--cyan)', padding: '9px 22px', borderRadius: 6,
              fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = 'var(--black)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cyan)' }}
          >בואו נדבר</button>

          {/* Hamburger */}
          <button className="hide-desktop"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          >
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', height: 2, background: 'var(--white)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="hide-desktop" style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'rgba(5,8,16,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px 5vw 32px',
          display: 'flex', flexDirection: 'column', gap: 4,
          animation: 'slideDown 0.3s ease',
        }}>
          <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }`}</style>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', color: 'var(--white)',
              fontSize: '1.2rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', padding: '14px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'right',
            }}>{label}</button>
          ))}
          <button onClick={() => scrollTo('contact')} style={{
            marginTop: 16,
            background: 'var(--cyan)', color: 'var(--black)',
            border: 'none', padding: '14px', borderRadius: 8,
            fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700,
            cursor: 'pointer',
          }}>בואו נדבר</button>
        </div>
      )}
    </>
  )
}
