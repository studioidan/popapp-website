'use client'
import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle, Loader } from 'lucide-react'

type Status = 'idle'|'sending'|'ok'|'err'

export default function Contact() {
  const [form,setForm] = useState({name:'',phone:'',message:''})
  const [status,setStatus] = useState<Status>('idle')

  const submit = async(e:React.FormEvent)=>{
    e.preventDefault(); if(!form.name||!form.phone) return
    setStatus('sending')
    try{
      const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      setStatus(r.ok?'ok':'err')
    }catch{setStatus('err')}
  }

  const inp:React.CSSProperties={width:'100%',background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.09)',borderRadius:10,
    padding:'13px 16px',color:'var(--text-primary)',
    fontFamily:'inherit',fontSize:'0.95rem',outline:'none',
    transition:'border-color 0.2s,box-shadow 0.2s'}

  const lbl:React.CSSProperties={fontSize:'0.72rem',color:'var(--text-muted)',display:'block',
    marginBottom:8,fontWeight:600,textTransform:'uppercase',letterSpacing:'1px'}

  return (
    <>
      <section id="contact" style={{position:'relative',zIndex:10,
        padding:'clamp(60px,8vw,120px) clamp(20px,6vw,100px)',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:'min(600px,80vw)',height:'min(600px,80vw)',borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,229,255,0.04),transparent 70%)',pointerEvents:'none'}} />

        <div style={{maxWidth:960,margin:'0 auto',display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))',
          gap:'clamp(40px,6vw,80px)',alignItems:'start',position:'relative'}}>

          {/* left */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.7rem',fontWeight:700,
              letterSpacing:'3px',textTransform:'uppercase',color:'var(--accent)',marginBottom:20}}>
              <span style={{width:24,height:1.5,background:'var(--accent)',display:'block'}} />
              צור קשר
            </div>
            <h2 style={{fontSize:'clamp(1.8rem,5vw,4rem)',fontWeight:900,
              letterSpacing:'-2px',lineHeight:0.95,marginBottom:24}}>
              יש לך רעיון?<br />
              <span style={{background:'linear-gradient(135deg,#00e5ff,#0077ff)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>בוא נתחיל.</span>
            </h2>
            <p style={{color:'var(--text-secondary)',fontSize:'clamp(0.9rem,1.8vw,1rem)',lineHeight:1.85,marginBottom:40,maxWidth:380}}>
              Medical startup, אפליקציה, AI — אחזור תוך{' '}
              <strong style={{color:'var(--text-primary)'}}>24 שעות</strong>{' '}
              עם כיוון ראשוני בחינם.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {[
                {Icon:Mail, label:'אימייל',val:'studioidan@gmail.com',href:'mailto:studioidan@gmail.com'},
                {Icon:Phone,label:'טלפון', val:'052-466-7179',       href:'tel:0524667179'},
              ].map(c=>(
                <a key={c.label} href={c.href} style={{display:'flex',alignItems:'center',gap:14,
                  textDecoration:'none',background:'rgba(255,255,255,0.03)',backdropFilter:'blur(12px)',
                  border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'14px 18px',
                  transition:'all 0.25s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.3)';e.currentTarget.style.transform='translateX(-3px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.transform=''}}
                >
                  <c.Icon size={18} color='var(--accent)' strokeWidth={1.75} />
                  <div>
                    <div style={{fontSize:'0.65rem',color:'var(--text-muted)',marginBottom:2,textTransform:'uppercase',letterSpacing:'1px'}}>{c.label}</div>
                    <div style={{fontWeight:600,fontSize:'clamp(0.82rem,2vw,0.92rem)',color:'var(--text-primary)',wordBreak:'break-all'}}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* form */}
          <div style={{background:'rgba(8,14,31,0.7)',backdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,
            padding:'clamp(24px,4vw,44px)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-60,right:-60,width:160,height:160,borderRadius:'50%',
              background:'radial-gradient(circle,rgba(0,229,255,0.09),transparent)',pointerEvents:'none'}} />

            {status==='ok'?(
              <div style={{textAlign:'center',padding:'48px 0'}}>
                <CheckCircle size={52} color='#10b981' strokeWidth={1.5} style={{margin:'0 auto 20px',display:'block'}} />
                <h3 style={{fontSize:'1.5rem',fontWeight:800,marginBottom:10,letterSpacing:'-0.5px'}}>קיבלתי!</h3>
                <p style={{color:'var(--text-secondary)',lineHeight:1.7}}>
                  תודה {form.name}!<br/>אחזור אליך תוך 24 שעות.
                </p>
              </div>
            ):(
              <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:18}}>
                <div>
                  <h3 style={{fontSize:'1.2rem',fontWeight:800,letterSpacing:'-0.5px',marginBottom:5}}>השאר פרטים</h3>
                  <p style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>ואחזור אליך בהקדם</p>
                </div>
                {[
                  {key:'name', label:'שם מלא *',placeholder:'ישראל ישראלי',type:'text'},
                  {key:'phone',label:'טלפון *', placeholder:'050-000-0000',type:'tel'},
                ].map(f=>(
                  <div key={f.key}>
                    <label style={lbl}>{f.label}</label>
                    <input type={f.type} value={form[f.key as 'name'|'phone']}
                      onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      placeholder={f.placeholder} required style={inp}
                      onFocus={e=>{e.target.style.borderColor='rgba(0,229,255,0.4)';e.target.style.boxShadow='0 0 0 3px rgba(0,229,255,0.08)'}}
                      onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.09)';e.target.style.boxShadow='none'}}
                    />
                  </div>
                ))}
                <div>
                  <label style={lbl}>על הפרויקט (לא חובה)</label>
                  <textarea rows={3} value={form.message}
                    onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    placeholder="אנחנו בונים אפליקציה ל..." style={{...inp,resize:'vertical'}}
                    onFocus={e=>{e.target.style.borderColor='rgba(0,229,255,0.4)';e.target.style.boxShadow='0 0 0 3px rgba(0,229,255,0.08)'}}
                    onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.09)';e.target.style.boxShadow='none'}}
                  />
                </div>
                {status==='err'&&<p style={{color:'#f87171',fontSize:'0.82rem'}}>משהו השתבש. נסה שוב.</p>}
                <button type="submit" disabled={status==='sending'} style={{
                  background:status==='sending'?'rgba(0,229,255,0.4)':'linear-gradient(135deg,#00e5ff,#0077ff)',
                  color:'#04070f',border:'none',padding:'14px',borderRadius:12,
                  fontFamily:'inherit',fontSize:'0.97rem',fontWeight:700,
                  cursor:status==='sending'?'wait':'pointer',transition:'all 0.25s',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8}}
                  onMouseEnter={e=>{if(status!=='sending'){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(0,229,255,0.35)'}}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
                >
                  {status==='sending'
                    ? <><Loader size={16} style={{animation:'spin 1s linear infinite'}} /> שולח...</>
                    : <><Send size={16} /> שלח ואחזור אליך תוך 24 שעות</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{position:'relative',zIndex:10,padding:'24px clamp(20px,6vw,100px)',
        borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',
        alignItems:'center',color:'var(--text-muted)',fontSize:'0.8rem',flexWrap:'wrap',gap:10}}>
        <div>PopApp © 2025 · עידן בן שמעון</div>
        <div>Mobile · Web · AI · Medical</div>
      </footer>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </>
  )
}
