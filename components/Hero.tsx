'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = ['אפליקציות', 'AI Products', 'Medical Tech', 'IoT Systems', 'Startups']

const HERO_CLIENTS = [
  { name: 'ישראל היום',        logo: 'https://upload.wikimedia.org/wikipedia/he/7/73/Israel_Hayom_Logo.png' },
  { name: 'The Times of Israel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/TOI_logo.svg/512px-TOI_logo.svg.png' },
  { name: 'טלרד',              logo: 'https://upload.wikimedia.org/wikipedia/he/c/c1/Telrad_Logo.png' },
  { name: 'סובארו',            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Subaru_logo.svg/320px-Subaru_logo.svg.png' },
  { name: 'Johnnie Walker',    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Johnnie_Walker_logo.svg/200px-Johnnie_Walker_logo.svg.png' },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setFading(false) }, 320)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = ref.current; if (!el) return
    el.querySelectorAll<HTMLElement>('.ha').forEach((item, i) => {
      item.style.opacity = '0'
      item.style.transform = 'translateY(32px)'
      setTimeout(() => {
        item.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, 100 + i * 140)
    })
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'clamp(100px,12vw,160px) clamp(24px,8vw,120px) 80px',
      overflow: 'hidden',
    }}>
      {/* ambient */}
      <div style={{ position:'absolute', top:'-15%', left:'50%', transform:'translateX(-50%)',
        width:'min(800px,100vw)', height:'min(600px,80vw)', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%)',
        pointerEvents:'none' }} />

      <div ref={ref} style={{ maxWidth: 760, width: '100%' }}>
        {/* eyebrow */}
        <div className="ha" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36,
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--accent)',
        }}>
          <span style={{ width: 28, height: 1.5, background: 'var(--accent)', display: 'block' }} />
          15 שנות ניסיון · full‑stack · ai · medical
          <span style={{ width: 28, height: 1.5, background: 'var(--accent)', display: 'block' }} />
        </div>

        {/* headline */}
        <h1 className="ha" style={{
          fontSize: 'clamp(2.8rem, 8vw, 8.5rem)',
          fontWeight: 900, lineHeight: 0.92, letterSpacing: '-4px',
          marginBottom: 28,
        }}>
          <span style={{ display: 'block' }}>מפתח אחד.</span>
          <span style={{ display: 'block',
            background: 'linear-gradient(135deg,#00e5ff,#0077ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            יכולות של
          </span>
          <span style={{ display: 'block', color: 'var(--accent-warm)' }}>חברה שלמה.</span>
        </h1>

        {/* word cycle — all inline, no wrap */}
        <div className="ha" style={{ marginBottom: 52, fontSize:'clamp(1rem,2vw,1.2rem)', color:'var(--text-secondary)', fontWeight:300 }}>
          <span>בונה </span>
          <span style={{
            fontWeight: 700, color: 'var(--accent)',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'opacity 0.32s, transform 0.32s',
            display: 'inline-block',
          }}>{WORDS[wordIdx]}</span>
          <span style={{ marginRight: 12 }}> מקצה לקצה</span>
        </div>

        {/* 3 buttons */}
        <div className="ha" style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 56,
        }}>
          <button onClick={() => scrollTo('about')} style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-primary)',
            padding: '14px clamp(20px,4vw,36px)',
            borderRadius: 12, fontFamily: 'inherit',
            fontSize: 'clamp(0.88rem,2vw,1rem)', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='' }}
          >מי אני</button>

          <button onClick={() => scrollTo('projects')} style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-primary)',
            padding: '14px clamp(20px,4vw,36px)',
            borderRadius: 12, fontFamily: 'inherit',
            fontSize: 'clamp(0.88rem,2vw,1rem)', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.transform='' }}
          >פרויקטים</button>

          <button onClick={() => scrollTo('contact')} style={{
            background: 'linear-gradient(135deg,#00e5ff,#0077ff)',
            border: 'none',
            color: '#04070f',
            padding: '14px clamp(20px,4vw,36px)',
            borderRadius: 12, fontFamily: 'inherit',
            fontSize: 'clamp(0.88rem,2vw,1rem)', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: '0 0 0 1px rgba(0,229,255,0.3)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(0,229,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 0 0 1px rgba(0,229,255,0.3)' }}
          >בואו נדבר →</button>
        </div>

        {/* clients strip */}
        <div className="ha" style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.62rem', fontWeight: 700, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            marginBottom: 18, textAlign: 'center',
          }}>עבדתי עם</p>

          {/* scrolling logos */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
              background: 'linear-gradient(to left, var(--bg-base), transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
              background: 'linear-gradient(to right, var(--bg-base), transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
              display: 'flex', gap: 56, alignItems: 'center',
              width: 'max-content',
              animation: 'hero-clients 22s linear infinite',
              willChange: 'transform',
            }}>
              {[...HERO_CLIENTS, ...HERO_CLIENTS, ...HERO_CLIENTS, ...HERO_CLIENTS].map((c, i) => (
                <img key={i} src={c.logo} alt={c.name}
                  style={{
                    height: 28, maxWidth: 110, objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.45, flexShrink: 0, display: 'block',
                    transition: 'opacity 0.3s',
                  }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.45' }}
                />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes hero-clients {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
        `}</style>
      </div>

      {/* version badge - remove after confirming deploys work */}
      <div style={{
        position:'fixed', bottom:12, left:12, zIndex:9999,
        background:'rgba(0,229,255,0.15)', border:'1px solid var(--accent)',
        borderRadius:8, padding:'4px 12px',
        fontSize:'0.7rem', color:'var(--accent)', fontFamily:'monospace',
      }}>v1 · {new Date().toLocaleTimeString('he-IL', {hour:'2-digit', minute:'2-digit'})}</div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: -24, left: '50%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        animation: 'floatY 2.5s ease-in-out infinite',
      }}>
        {/* animated mouse icon */}
        <div style={{
          width: 24, height: 38, borderRadius: 12,
          border: '1.5px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '6px 0',
          position: 'relative',
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: 2,
            background: 'var(--accent)',
            animation: 'scrollDot 1.8s ease-in-out infinite',
          }} />
        </div>
        <span style={{
          fontSize: '0.6rem', color: 'var(--text-muted)',
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>גלול</span>
      </div>

      <style>{`
        @keyframes floatY {
          0%,100%{transform:translateX(-50%) translateY(0)}
          50%{transform:translateX(-50%) translateY(-6px)}
        }
        @keyframes scrollDot {
          0%{opacity:1;transform:translateY(0)}
          80%{opacity:0;transform:translateY(8px)}
          100%{opacity:0;transform:translateY(0)}
        }
      `}</style>
    </section>
  )
}
