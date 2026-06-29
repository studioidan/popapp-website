'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  const links = [
    { label: 'מי אני', id: 'about' },
    { label: 'פרויקטים', id: 'projects' },
    { label: 'תהליך', id: 'process' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: `${scrolled ? 12 : 20}px clamp(20px,5vw,64px)`,
        background: scrolled ? 'rgba(4,7,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
          Pop<span style={{
            background: 'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>App</span>
        </div>

        <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }} className="hide-mobile">
          {links.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => go(id)} style={{
                background: 'none', border: 'none', color: 'var(--text-secondary)',
                fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >{label}</button>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="hide-mobile" onClick={() => go('contact')} style={{
            background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.3)',
            color: 'var(--accent)', padding: '9px 22px', borderRadius: 8,
            fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='#04070f' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(0,229,255,0.08)'; e.currentTarget.style.color='var(--accent)' }}
          >בואו נדבר</button>

          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:'none', border:'none', cursor:'pointer', padding:6 }}>
            <div style={{ width:22, display:'flex', flexDirection:'column', gap:5 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:'block', height:1.5, background:'var(--text-primary)', borderRadius:2,
                  transition:'all 0.3s',
                  transform: menuOpen ? (i===0?'rotate(45deg) translate(4.5px,4.5px)':i===2?'rotate(-45deg) translate(4.5px,-4.5px)':'none') : 'none',
                  opacity: menuOpen && i===1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="hide-desktop" style={{
          position:'fixed', inset:0, zIndex:99,
          background:'rgba(4,7,15,0.97)', backdropFilter:'blur(24px)',
          display:'flex', flexDirection:'column', justifyContent:'center',
          padding:'0 8vw', gap:4, animation:'fadeUp 0.3s ease',
        }}>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{
              background:'none', border:'none', color:'var(--text-primary)',
              fontSize:'2rem', fontWeight:800, cursor:'pointer',
              fontFamily:'inherit', padding:'16px 0',
              borderBottom:'1px solid var(--border)', textAlign:'right', letterSpacing:'-1px',
            }}>{label}</button>
          ))}
          <button onClick={() => go('contact')} style={{
            marginTop:28, background:'linear-gradient(135deg,#00e5ff,#0077ff)',
            color:'#04070f', border:'none', padding:'16px', borderRadius:12,
            fontFamily:'inherit', fontSize:'1.1rem', fontWeight:700, cursor:'pointer',
          }}>בואו נדבר</button>
        </div>
      )}

      <style>{`
        @media(max-width:768px){.hide-mobile{display:none!important}}
        @media(min-width:769px){.hide-desktop{display:none!important}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </>
  )
}
