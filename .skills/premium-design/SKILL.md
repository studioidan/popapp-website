---
name: premium-design
description: >
  סקיל לעיצוב UI פרימיום ברמה של Vercel, Linear, Stripe, Apple.
  השתמש בסקיל הזה בכל פעם שמבקשים: עיצוב יפה, אנימציה, אפקט מיוחד,
  קומפוננטה חדשה, כרטיס, hero section, hover effect, glassmorphism,
  gradient, motion, scroll effect, תלת מימד, או כל דבר ויזואלי.
  גם אם המשתמש לא אמר "פרימיום" — אם זה UI, השתמש בסקיל הזה.
---

# Premium Design Skill

בכל פעם שבונים קומפוננטה או מסך — השתמש בעקרונות האלה.

---

## 1. פילוסופיה

- **Less is more** — רווח לבן הוא עיצוב. אל תמלא כל פיקסל.
- **Motion = meaning** — אנימציה מעבירה מסר, לא רק נראית יפה.
- **Depth over flatness** — shadows, blur, layers יוצרים תחושת עומק.
- **Color as hierarchy** — צבע אחד dominant, השאר neutral.
- **Type is design** — גודל, משקל ו-letter-spacing הם עיצוב.

---

## 2. צבעים

### Dark mode (ברירת מחדל לפרויקטים כהים)
```css
--bg-base:     #04070f;   /* רקע ראשי */
--bg-raised:   #080e1f;   /* כרטיסים */
--bg-overlay:  #0d1530;   /* modals */
--border:      rgba(255,255,255,0.07);
--border-glow: rgba(0,229,255,0.25);
--text-primary: #eef2ff;
--text-secondary: #6b7a99;
--text-muted:  #3d4a66;
--accent:      #00e5ff;   /* cyan */
--accent-warm: #ff6b35;   /* orange */
--accent-dim:  rgba(0,229,255,0.12);
```

### Gradient recipes
```css
/* Glow card */
background: linear-gradient(135deg, rgba(0,229,255,0.08), transparent 60%);

/* Hero ambient */
background: radial-gradient(ellipse 80% 50% at 50% -10%,
  rgba(0,229,255,0.15), transparent);

/* Text gradient */
background: linear-gradient(135deg, #fff 30%, #6b7a99);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Button shine */
background: linear-gradient(135deg, #00e5ff, #0099ff);
```

---

## 3. Typography

```css
/* Display — hero titles */
font-size: clamp(3rem, 8vw, 8rem);
font-weight: 900;
letter-spacing: -3px;
line-height: 0.95;

/* Heading */
font-size: clamp(1.8rem, 4vw, 3.2rem);
font-weight: 800;
letter-spacing: -1.5px;
line-height: 1.05;

/* Body */
font-size: clamp(0.95rem, 1.5vw, 1.1rem);
font-weight: 300;
line-height: 1.8;
color: var(--text-secondary);

/* Label / eyebrow */
font-size: 0.7rem;
font-weight: 700;
letter-spacing: 3px;
text-transform: uppercase;
color: var(--accent);
```

---

## 4. Spacing Scale

```
4px   xs   — gap between icon and text
8px   sm   — gap between pills
16px  md   — padding inside cards
24px  lg   — gap between cards
40px  xl   — section internal padding
80px  2xl  — between sections
120px 3xl  — major section breaks
```

---

## 5. Cards & Surfaces

### Glass card (glassmorphism)
```tsx
<div style={{
  background: 'rgba(8,14,31,0.7)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: '32px',
  position: 'relative',
  overflow: 'hidden',
}}>
  {/* inner glow top-right */}
  <div style={{
    position: 'absolute', top: -60, right: -60,
    width: 180, height: 180, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,229,255,0.12), transparent)',
    pointerEvents: 'none',
  }} />
  {children}
</div>
```

### Hover card (3D tilt)
```tsx
const [tilt, setTilt] = useState({ x: 0, y: 0 })

onMouseMove={(e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientY - rect.top  - rect.height/2) / rect.height * 12
  const y = (e.clientX - rect.left - rect.width/2)  / rect.width  * -12
  setTilt({ x, y })
}}
onMouseLeave={() => setTilt({ x:0, y:0 })}

style={{
  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
  transition: tilt.x === 0 ? 'transform 0.6s ease' : 'transform 0.08s linear',
}}
```

### Glow border on hover
```tsx
onMouseEnter={e => {
  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'
  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.2), 0 24px 60px rgba(0,229,255,0.1)'
}}
onMouseLeave={e => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
  e.currentTarget.style.boxShadow = 'none'
}}
```

---

## 6. Animations

### Scroll reveal (IntersectionObserver)
```tsx
useEffect(() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target as HTMLElement
        const i = Number(el.dataset.i ?? 0)
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, i * 80)
        obs.unobserve(el)
      }
    })
  }, { threshold: 0.1 })
  refs.forEach(el => el && obs.observe(el))
  return () => obs.disconnect()
}, [])

// initial state on element:
style={{ opacity: 0, transform: 'translateY(40px)',
  transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
```

### Float animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
/* usage: animation: float 3s ease-in-out infinite; */
```

### Shimmer / skeleton
```css
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
}
.skeleton {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%);
  background-size: 200% auto;
  animation: shimmer 1.5s linear infinite;
}
```

### Entrance (hero text)
```tsx
useEffect(() => {
  const items = el.querySelectorAll('.anim')
  items.forEach((item, i) => {
    ;(item as HTMLElement).style.opacity = '0'
    ;(item as HTMLElement).style.transform = 'translateY(36px)'
    setTimeout(() => {
      ;(item as HTMLElement).style.transition =
        'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)'
      ;(item as HTMLElement).style.opacity = '1'
      ;(item as HTMLElement).style.transform = 'translateY(0)'
    }, 100 + i * 130)
  })
}, [])
```

### Infinite scroll strip
```css
@keyframes scroll-rtl {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* duplicate items × 2, animation: scroll-rtl 24s linear infinite */
```

---

## 7. Buttons

### Primary CTA
```tsx
<button style={{
  background: 'var(--accent)',
  color: '#04070f',
  border: 'none',
  padding: '14px 36px',
  borderRadius: 10,
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.25s',
  position: 'relative',
  overflow: 'hidden',
}}
onMouseEnter={e => {
  e.currentTarget.style.transform = 'translateY(-3px)'
  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,229,255,0.35)'
}}
onMouseLeave={e => {
  e.currentTarget.style.transform = ''
  e.currentTarget.style.boxShadow = ''
}}>
  {label}
</button>
```

### Ghost button
```tsx
<button style={{
  background: 'transparent',
  border: '1.5px solid rgba(255,255,255,0.15)',
  color: 'var(--text-primary)',
  padding: '14px 36px',
  borderRadius: 10,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.25s',
}}
onMouseEnter={e => {
  e.currentTarget.style.borderColor = 'var(--accent)'
  e.currentTarget.style.color = 'var(--accent)'
}}
onMouseLeave={e => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
  e.currentTarget.style.color = 'var(--text-primary)'
}}>
  {label}
</button>
```

---

## 8. Section Structure

כל section צריך:
1. **Eyebrow** — label קטן עם קו + uppercase + accent color
2. **Heading** — גדול, bold, עם מילת מפתח בצבע
3. **Sub** — משפט תיאור ב-text-secondary
4. **Content**
5. **CTA** (אם רלוונטי)

```tsx
/* Eyebrow pattern */
<div style={{ display:'flex', alignItems:'center', gap:10,
  fontSize:'0.7rem', fontWeight:700, letterSpacing:'3px',
  textTransform:'uppercase', color:'var(--accent)', marginBottom:16 }}>
  <span style={{ width:24, height:1.5, background:'var(--accent)', display:'block' }} />
  {eyebrow}
</div>
```

---

## 9. Backgrounds & Ambients

### Particle canvas (subtle)
```tsx
// צף בbackground, opacity נמוכה
// dots קטנים (r: 0.3–1.2px) עם תנועה איטית מאוד
// צבע: rgba(0,229,255, 0.05–0.3)
```

### Gradient mesh
```css
background:
  radial-gradient(ellipse at 80% 0%,   rgba(0,229,255,0.08) 0%, transparent 50%),
  radial-gradient(ellipse at 20% 100%, rgba(255,107,53,0.06) 0%, transparent 50%),
  #04070f;
```

### Grid overlay
```css
background-image:
  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
background-size: 64px 64px;
```

---

## 10. Responsive Rules

```tsx
// תמיד clamp על font-size
fontSize: 'clamp(min, preferred_vw, max)'

// padding responsive
padding: 'clamp(20px, 6vw, 100px)'

// grid שמתכווץ
gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'

// breakpoints עם @media ב-<style> tags בקומפוננטה
`@media (max-width: 768px) { ... }`
```

---

## 11. Common Mistakes — אל תעשה

- ❌ `border-radius: 4px` — קטן מדי, תשתמש ב-12–24px לכרטיסים
- ❌ `font-weight: 400` לכותרות — תמיד 700–900
- ❌ `color: white` על רקע לבן / צבעוני — תבדוק contrast
- ❌ `transition: all 0.3s` — ציין מה מתאנים (transform, opacity)
- ❌ padding קטן מ-16px בכרטיסים
- ❌ להשתמש ב-`px` קבוע לfont-size ראשי — תשתמש ב-clamp
- ❌ יותר מ-2–3 צבעים dominant בדף
- ❌ אנימציות מעל 0.6s לinteractions (hover, click)

---

## 12. Quick Component Recipes

### Badge / pill
```tsx
<span style={{
  background: `${color}18`,
  color: color,
  border: `1px solid ${color}44`,
  fontSize: '0.68rem', fontWeight: 700,
  letterSpacing: '1.5px', textTransform: 'uppercase',
  padding: '5px 14px', borderRadius: 20,
}}>label</span>
```

### Stat card
```tsx
<div style={{
  textAlign: 'center',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 12, padding: '14px 20px',
}}>
  <div style={{ fontWeight: 900, fontSize: '1.8rem', color: accent }}>{value}</div>
  <div style={{ fontSize: '0.72rem', color: textSecondary, marginTop: 4 }}>{label}</div>
</div>
```

### Divider with label
```tsx
<div style={{ display:'flex', alignItems:'center', gap:16, color: textMuted, fontSize:'0.75rem' }}>
  <div style={{ flex:1, height:1, background: border }} />
  {label}
  <div style={{ flex:1, height:1, background: border }} />
</div>
```

### Progress bar
```tsx
<div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
  <div style={{
    width: `${pct}%`, height:'100%',
    background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
    borderRadius:2,
    transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
  }} />
</div>
```
