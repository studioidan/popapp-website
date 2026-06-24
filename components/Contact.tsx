'use client'
import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section id="contact" style={{ position:'relative', zIndex:10,
        padding:'clamp(60px,8vw,120px) clamp(20px,7vw,100px)' }}>

        <div style={{ maxWidth:960, margin:'0 auto', display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'clamp(40px,6vw,80px)',
          alignItems:'start' }}>

          {/* Left — text */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10,
              fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase',
              color:'var(--cyan)', marginBottom:16 }}>
              <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
              צור קשר
            </div>
            <h2 style={{ fontSize:'clamp(1.8rem,4vw,3.4rem)', fontWeight:900,
              letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:20 }}>
              יש לך פרויקט?<br />
              <span style={{ color:'var(--cyan)' }}>בואו נדבר.</span>
            </h2>
            <p style={{ color:'var(--grey)', fontSize:'1rem', lineHeight:1.8, marginBottom:36 }}>
              Startup רפואי, אפליקציה מורכבת, מוצר AI —
              ספר לי על הרעיון ואחזור אליך תוך <strong style={{ color:'var(--white)' }}>24 שעות</strong> עם כיוון ראשוני בחינם.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { icon:'✉️', label:'אימייל', value:'studioidan@gmail.com', href:'mailto:studioidan@gmail.com' },
                { icon:'📞', label:'טלפון', value:'052-466-7179', href:'tel:0524667179' },
              ].map(c => (
                <a key={c.label} href={c.href} style={{
                  display:'flex', alignItems:'center', gap:14, textDecoration:'none',
                  background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                  borderRadius:12, padding:'16px 20px', transition:'all 0.25s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.4)';e.currentTarget.style.transform='translateX(-4px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform=''}}
                >
                  <span style={{ fontSize:'1.4rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:'0.7rem', color:'var(--grey)', marginBottom:2 }}>{c.label}</div>
                    <div style={{ fontWeight:600, fontSize:'0.95rem' }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background:'rgba(255,255,255,0.025)',
            border:'1px solid var(--border)',
            borderRadius:24, padding:'clamp(28px,4vw,44px)',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:20 }}>🎉</div>
                <h3 style={{ fontSize:'1.5rem', fontWeight:800, marginBottom:12 }}>קיבלתי!</h3>
                <p style={{ color:'var(--grey)', lineHeight:1.7 }}>
                  תודה {form.name}!<br />
                  אחזור אליך תוך 24 שעות.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <h3 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:4 }}>השאר פרטים</h3>
                <p style={{ color:'var(--grey)', fontSize:'0.85rem', marginBottom:8 }}>
                  ואחזור אליך בהקדם 🙂
                </p>

                {/* Name */}
                <div>
                  <label style={{ fontSize:'0.78rem', color:'var(--grey)', display:'block', marginBottom:6, fontWeight:600 }}>
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="ישראל ישראלי"
                    required
                    style={{
                      width:'100%', background:'rgba(255,255,255,0.04)',
                      border:'1px solid var(--border)', borderRadius:10,
                      padding:'13px 16px', color:'var(--white)',
                      fontFamily:'inherit', fontSize:'0.95rem', outline:'none',
                      transition:'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor='rgba(0,229,255,0.5)'}
                    onBlur={e  => e.target.style.borderColor='var(--border)'}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize:'0.78rem', color:'var(--grey)', display:'block', marginBottom:6, fontWeight:600 }}>
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="050-000-0000"
                    required
                    style={{
                      width:'100%', background:'rgba(255,255,255,0.04)',
                      border:'1px solid var(--border)', borderRadius:10,
                      padding:'13px 16px', color:'var(--white)',
                      fontFamily:'inherit', fontSize:'0.95rem', outline:'none',
                      transition:'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor='rgba(0,229,255,0.5)'}
                    onBlur={e  => e.target.style.borderColor='var(--border)'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize:'0.78rem', color:'var(--grey)', display:'block', marginBottom:6, fontWeight:600 }}>
                    ספר לי על הפרויקט (לא חובה)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="אנחנו בונים אפליקציה ל..."
                    rows={4}
                    style={{
                      width:'100%', background:'rgba(255,255,255,0.04)',
                      border:'1px solid var(--border)', borderRadius:10,
                      padding:'13px 16px', color:'var(--white)',
                      fontFamily:'inherit', fontSize:'0.95rem', outline:'none',
                      resize:'vertical', transition:'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor='rgba(0,229,255,0.5)'}
                    onBlur={e  => e.target.style.borderColor='var(--border)'}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color:'#f87171', fontSize:'0.85rem' }}>
                    משהו השתבש. נסה שוב או שלח ישירות ל-studioidan@gmail.com
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{
                    background: status === 'sending' ? 'rgba(0,229,255,0.5)' : 'var(--cyan)',
                    color:'var(--black)', border:'none',
                    padding:'15px', borderRadius:10,
                    fontFamily:'inherit', fontSize:'1rem', fontWeight:700,
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    transition:'all 0.25s', marginTop:4,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,229,255,0.35)' }}}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
                >
                  {status === 'sending' ? '⏳ שולח...' : 'שלח ואחזור אליך תוך 24 שעות →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ position:'relative', zIndex:10, padding:'24px clamp(20px,7vw,100px)',
        borderTop:'1px solid var(--border)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        color:'var(--grey)', fontSize:'0.8rem', flexWrap:'wrap', gap:10 }}>
        <div>PopApp © 2025 · עידן בן שמעון</div>
        <div>Mobile · Web · AI · Medical</div>
      </footer>
    </>
  )
}
