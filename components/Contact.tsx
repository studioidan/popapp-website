'use client'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.name||!form.phone) return
    setStatus('sending')
    try {
      const r = await fetch('/api/contact',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      setStatus(r.ok ? 'ok' : 'err')
    } catch { setStatus('err') }
  }

  return (
    <>
      <section id="contact" style={{
        position:'relative', zIndex:10,
        padding:'clamp(80px,10vw,140px) clamp(24px,7vw,100px)',
        overflow:'hidden',
      }}>
        {/* big glow behind */}
        <div style={{ position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(0,229,255,0.05), transparent 70%)',
          pointerEvents:'none' }} />

        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))',
          gap:'clamp(48px,7vw,100px)', alignItems:'start', position:'relative' }}>

          {/* left */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10,
              fontSize:'0.7rem', fontWeight:700, letterSpacing:'3px',
              textTransform:'uppercase', color:'var(--accent)', marginBottom:20 }}>
              <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
              צור קשר
            </div>
            <h2 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:900,
              letterSpacing:'-2.5px', lineHeight:0.95, marginBottom:28 }}>
              יש לך רעיון?<br />
              <span style={{
                background:'linear-gradient(135deg, #00e5ff, #0077ff)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
              }}>בואו נבנה.</span>
            </h2>
            <p style={{ color:'var(--text-secondary)', fontSize:'1rem', lineHeight:1.85, marginBottom:48, maxWidth:380 }}>
              Medical startup, אפליקציה, AI — אחזור תוך{' '}
              <strong style={{ color:'var(--text-primary)' }}>24 שעות</strong>{' '}
              עם כיוון ראשוני בחינם.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:'✉️', label:'אימייל', val:'studioidan@gmail.com', href:'mailto:studioidan@gmail.com' },
                { icon:'📞', label:'טלפון', val:'052-466-7179', href:'tel:0524667179' },
              ].map(c => (
                <a key={c.label} href={c.href} style={{
                  display:'flex', alignItems:'center', gap:14, textDecoration:'none',
                  background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:14, padding:'16px 20px', transition:'all 0.25s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(0,229,255,0.3)'; e.currentTarget.style.transform='translateX(-4px)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='' }}
                >
                  <span style={{ fontSize:'1.3rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', marginBottom:2, textTransform:'uppercase', letterSpacing:'1px' }}>{c.label}</div>
                    <div style={{ fontWeight:600, fontSize:'0.92rem', color:'var(--text-primary)' }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* form card */}
          <div style={{
            background:'rgba(8,14,31,0.7)', backdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:24, padding:'clamp(28px,4vw,48px)',
            position:'relative', overflow:'hidden',
          }}>
            {/* corner glow */}
            <div style={{ position:'absolute', top:-60, right:-60, width:180, height:180, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(0,229,255,0.1), transparent)', pointerEvents:'none' }} />

            {status==='ok' ? (
              <div style={{ textAlign:'center', padding:'48px 0' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:20, animation:'float 2s ease-in-out infinite' }}>🎉</div>
                <h3 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:12, letterSpacing:'-0.5px' }}>קיבלתי!</h3>
                <p style={{ color:'var(--text-secondary)', lineHeight:1.7 }}>
                  תודה {form.name}!<br />אחזור אליך תוך 24 שעות.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div>
                  <h3 style={{ fontSize:'1.3rem', fontWeight:800, letterSpacing:'-0.5px', marginBottom:6 }}>השאר פרטים</h3>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.83rem' }}>ואחזור אליך בהקדם 🙂</p>
                </div>

                {[
                  { key:'name', label:'שם מלא *', placeholder:'ישראל ישראלי', type:'text' },
                  { key:'phone', label:'טלפון *', placeholder:'050-000-0000', type:'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:'0.74rem', color:'var(--text-muted)', display:'block',
                      marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'1px' }}>
                      {f.label}
                    </label>
                    <input type={f.type}
                      value={form[f.key as 'name'|'phone']}
                      onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      placeholder={f.placeholder} required
                      style={{
                        width:'100%', background:'rgba(255,255,255,0.04)',
                        border:'1px solid rgba(255,255,255,0.09)', borderRadius:10,
                        padding:'13px 16px', color:'var(--text-primary)',
                        fontFamily:'inherit', fontSize:'0.95rem', outline:'none',
                        transition:'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e=>{ e.target.style.borderColor='rgba(0,229,255,0.4)'; e.target.style.boxShadow='0 0 0 3px rgba(0,229,255,0.08)' }}
                      onBlur={e=>{ e.target.style.borderColor='rgba(255,255,255,0.09)'; e.target.style.boxShadow='none' }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize:'0.74rem', color:'var(--text-muted)', display:'block',
                    marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'1px' }}>
                    על הפרויקט (לא חובה)
                  </label>
                  <textarea rows={4}
                    value={form.message}
                    onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    placeholder="אנחנו בונים אפליקציה ל..."
                    style={{
                      width:'100%', background:'rgba(255,255,255,0.04)',
                      border:'1px solid rgba(255,255,255,0.09)', borderRadius:10,
                      padding:'13px 16px', color:'var(--text-primary)',
                      fontFamily:'inherit', fontSize:'0.95rem', outline:'none', resize:'vertical',
                      transition:'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e=>{ e.target.style.borderColor='rgba(0,229,255,0.4)'; e.target.style.boxShadow='0 0 0 3px rgba(0,229,255,0.08)' }}
                    onBlur={e=>{ e.target.style.borderColor='rgba(255,255,255,0.09)'; e.target.style.boxShadow='none' }}
                  />
                </div>

                {status==='err' && (
                  <p style={{ color:'#f87171', fontSize:'0.83rem' }}>
                    משהו השתבש. נסה שוב או כתוב ישירות לאימייל.
                  </p>
                )}

                <button type="submit" disabled={status==='sending'} style={{
                  background: status==='sending' ? 'rgba(0,229,255,0.4)' : 'linear-gradient(135deg, #00e5ff, #0077ff)',
                  color:'#04070f', border:'none', padding:'15px', borderRadius:12,
                  fontFamily:'inherit', fontSize:'1rem', fontWeight:700,
                  cursor:status==='sending'?'wait':'pointer', transition:'all 0.25s', marginTop:4,
                }}
                  onMouseEnter={e=>{ if(status!=='sending'){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(0,229,255,0.35)' }}}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
                >
                  {status==='sending' ? '⏳ שולח...' : 'שלח ואחזור אליך תוך 24 שעות →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ position:'relative', zIndex:10,
        padding:'28px clamp(24px,7vw,100px)',
        borderTop:'1px solid var(--border)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        color:'var(--text-muted)', fontSize:'0.78rem', flexWrap:'wrap', gap:10 }}>
        <div>PopApp © 2025 · עידן בן שמעון</div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span>Mobile</span><span style={{ color:'var(--border)' }}>·</span>
          <span>Web</span><span style={{ color:'var(--border)' }}>·</span>
          <span>AI</span><span style={{ color:'var(--border)' }}>·</span>
          <span>Medical</span>
        </div>
      </footer>
    </>
  )
}
