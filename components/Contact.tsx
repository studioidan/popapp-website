'use client'
export default function Contact() {
  return (
    <>
      <section id="contact" style={{ position:'relative', zIndex:10,
        padding:'clamp(60px,8vw,120px) clamp(20px,7vw,100px)', textAlign:'center' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10,
            fontSize:'0.72rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase',
            color:'var(--cyan)', marginBottom:16, justifyContent:'center' }}>
            <span style={{ width:24, height:1.5, background:'var(--cyan)', display:'block' }} />
            מוכנים להתחיל?
          </div>
          <h2 style={{ fontSize:'clamp(1.8rem,5vw,4rem)', fontWeight:900, letterSpacing:'-1.5px', lineHeight:1.1, marginBottom:20 }}>
            יש לך פרויקט?<br /><span style={{ color:'var(--cyan)' }}>בואו נדבר.</span>
          </h2>
          <p style={{ color:'var(--grey)', fontSize:'clamp(0.9rem,2vw,1.1rem)', lineHeight:1.8, marginBottom:20 }}>
            Startup רפואי, אפליקציה מורכבת, מוצר AI — אני בונה את זה.
          </p>
          <p style={{ color:'var(--grey)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:52 }}>
            ספר לי על הרעיון. אחזור תוך 24 שעות עם כיוון ראשוני — <strong style={{ color:'var(--white)' }}>בחינם.</strong>
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="mailto:studioidan@gmail.com"
              style={{ background:'var(--cyan)', color:'var(--black)',
                padding:'15px clamp(20px,4vw,40px)', borderRadius:10,
                fontFamily:'inherit', fontSize:'clamp(0.88rem,2vw,1rem)', fontWeight:700,
                textDecoration:'none', display:'inline-block', transition:'all 0.25s' }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,229,255,0.35)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
            >✉️ studioidan@gmail.com</a>
            <a href="tel:0524667179"
              style={{ background:'transparent', color:'var(--white)',
                border:'1.5px solid rgba(255,255,255,0.2)',
                padding:'15px clamp(20px,4vw,36px)', borderRadius:10,
                fontFamily:'inherit', fontSize:'clamp(0.88rem,2vw,1rem)', fontWeight:400,
                textDecoration:'none', display:'inline-block', transition:'all 0.25s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)';e.currentTarget.style.color='var(--cyan)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.color='var(--white)'}}
            >📞 052-466-7179</a>
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
