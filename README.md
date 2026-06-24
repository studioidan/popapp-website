# PopApp Website 🚀

אתר תיק עבודות תלת-מימדי לעידן בן שמעון / PopApp

## Stack

- **Next.js 14** (App Router)
- **React Three Fiber** + **Drei** — סצנת 3D
- **Three.js** — רנדור WebGL
- **Framer Motion** — אנימציות
- **TypeScript**

## התחלה מהירה

```bash
npm install
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000)

## Deploy ל-Vercel

```bash
npx vercel --prod
```

או חבר את ה-repo ב-[vercel.com](https://vercel.com) לdeploy אוטומטי.

## הוספת פרויקטים

ערוך את `lib/projects.ts` — כל פרויקט מקבל:
- `name`, `icon`, `desc`, `tech`, `link`
- `color` + `colorHex` — צבע כוכב הלכת
- `orbitRadius`, `orbitSpeed`, `size` — מסלול

## מבנה תיקיות

```
app/
  layout.tsx      # root layout + metadata
  page.tsx        # דף ראשי
  globals.css     # CSS variables + reset
components/
  Navbar.tsx
  Hero.tsx
  OrbitScene.tsx  # Three.js 3D orbit
  ProjectModal.tsx
  WhyMe.tsx
  Process.tsx
  Contact.tsx
  ParticleBg.tsx
lib/
  projects.ts     # נתוני הפרויקטים
```
