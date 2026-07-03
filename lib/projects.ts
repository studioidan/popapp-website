export interface Project {
  id: string
  name: string
  emoji: string
  logoSrc?: string
  tag: string
  tagline: string
  color: string
  gradientFrom: string
  gradientTo: string
  desc: string
  challenge: string
  result: string
  tech: string[]
  link: string
  images: { src: string; type: 'desktop'|'mobile'|'product'; label: string }[]
  stats: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'mebook',
    name: 'MeBook.ai',
    emoji: '📚',
    logoSrc: '/logos/mebook-logo.png',
    tag: 'AI · ספרי ילדים',
    tagline: 'הילד שלך — גיבור הסיפור',
    color: '#ff6b35',
    gradientFrom: '#ff6b35',
    gradientTo: '#ff9500',
    desc: 'פלטפורמה שמאפשרת להורים ליצור ספר ילדים מודפס עם הילד שלהם כגיבור, בעזרת AI. מעלים תמונה אחת — ומקבלים ספר בכריכה קשה הביתה.',
    challenge: 'בניית תהליך מורכב מהעלאת תמונה, זיהוי פנים, יצירת דמות עקבית לאורך כל הספר. עריכת AI ברמה גבוהה מאוד על כל עמודי הספר. שליחת קבצי הדפסה לבתי דפוס בכל העולם.',
    result: 'חברה שמוכרת כ-3,000 ספרים בחודש.',
    tech: ['React', 'Node.js', 'OpenAI', 'Stable Diffusion', 'AWS S3', 'Stripe', 'Print API'],
    link: 'https://mebook.ai',
    images: [
      { src: '/projects/mebook/hero.png',    type: 'desktop', label: 'דף הבית' },
      { src: '/projects/mebook/gallery.png', type: 'desktop', label: 'גלריית ספרים' },
      { src: '/projects/mebook/product.png', type: 'desktop', label: 'עמוד מוצר' },
      { src: '/projects/mebook/mobile1.png', type: 'mobile',  label: 'יצירת ספר — מובייל' },
      { src: '/projects/mebook/mobile2.png', type: 'mobile',  label: 'פרטי גיבור — מובייל' },
    ],
    stats: [
      { label: 'ספרים שנשלחו', value: '1,000+' },
      { label: 'לקוחות מרוצים', value: '52,000+' },
      { label: 'השקה', value: '2024' },
    ],
  },
  {
    id: 'niki',
    name: 'Niki B',
    emoji: '🍳',
    logoSrc: '/logos/niki-logo.webp',
    tag: 'Mobile App',
    tagline: '100,000 הורדות. אוכל עושים באהבה.',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    desc: 'אפליקציית המתכונים הרשמית של השפית ניקי. חיפוש חכם, פילטרים, מועדפים, וחוויית משתמש שגורמת לבשל.',
    challenge: 'לבנות אפליקציה שתתמוך במאות מתכונים עם תמונות HD, חיפוש מיידי, offline mode — ועדיין תרגיש קלילה ומהירה.',
    result: 'מעל 100,000 הורדות, דירוג 4.8 כוכבים, אפליקציה חיה ב-App Store ו-Google Play.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'Algolia Search', 'CDN'],
    link: 'https://nikib.co.il',
    images: [
      { src: '/projects/niki/mockup.png', type: 'desktop', label: 'מוקאפ האפליקציה' },
    ],
    stats: [
      { label: 'הורדות', value: '100K+' },
      { label: 'דירוג', value: '4.8 ⭐' },
      { label: 'פלטפורמות', value: 'iOS + Android' },
    ],
  },
  {
    id: 'bcone',
    name: 'Lifebuoy',
    emoji: '🏊',
    logoSrc: '/logos/bcone-logo.png',
    tag: 'IoT · בטיחות',
    tagline: 'שניות קובעות חיים',
    color: '#3b82f6',
    gradientFrom: '#3b82f6',
    gradientTo: '#7c3aed',
    desc: 'מערכת IoT חכמה המזהה כניסת ילדים לבריכה ומתריעה להורים בזמן אמת. Computer Vision + התראות Push תוך פחות מ-2 שניות.',
    challenge: 'מצלמה עם מודל Computer Vision שרץ on-device, מחזיקה שבועות על סוללה, עובדת ב-WiFi חלש, ושולחת התראה תוך שניות.',
    result: 'מוצר B2C ו-B2B פעיל בבריכות פרטיות וציבוריות בישראל.',
    tech: ['Python', 'OpenCV', 'TensorFlow Lite', 'React Native', 'AWS IoT', 'MQTT'],
    link: 'https://lifebuoyalarm.com',
    images: [
      { src: '/projects/bcone/mockup.png', type: 'desktop', label: 'אפליקציית BCone' },
    ],
    stats: [
      { label: 'זמן תגובה', value: '<2 שניות' },
      { label: 'דיוק', value: '99.2%' },
      { label: 'פלטפורמה', value: 'IoT + Mobile' },
    ],
  },
  {
    id: 'makesense',
    name: 'MakeSense',
    emoji: '🩺',
    logoSrc: '/logos/makesense-logo.png',
    tag: 'Medical AI · Startup',
    tagline: 'הפלטפורמה הראשונה לניטור פחמימות אוטומטי',
    color: '#10b981',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    desc: 'הפלטפורמה הראשונה מסוגה שמנטרת אוטומטית את תוכן הפחמימות בכל ארוחה דרך חיישן CGM, ומספקת דיוק ברמה רפואית לחולי סכרת.',
    challenge: 'בניית מודל AI שמנתח נתוני CGM בזמן אמת ומשייך אותם לארוחות — ללא צורך בתיעוד ידני.',
    result: 'Medical startup בשלב Validation עם תמיכת משקיעים, נבדק בניסויים קליניים.',
    tech: ['React Native', 'Python', 'TensorFlow', 'CGM APIs', 'HL7/FHIR', 'Node.js'],
    link: 'https://www.makesensedht.com',
    images: [
      { src: 'https://static.wixstatic.com/media/397d84_e4bfc078a0764a3fb118705609d4fc9b~mv2.png/v1/fill/w_1610,h_800,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Frame%201707481449%20(1).png', type: 'desktop', label: 'Dashboard רפואי' },
      { src: '/projects/makesense/app-mockup.png', type: 'desktop', label: 'אפליקציית משתמש' },
      { src: '/projects/makesense/admin-dashboard.png', type: 'desktop', label: 'לוח בקרה לצוות רפואי' },
    ],
    stats: [
      { label: 'תחום', value: 'Medical AI' },
      { label: 'שלב', value: 'Clinical Beta' },
      { label: 'טכנולוגיה', value: 'CGM + ML' },
    ],
  },
  {
    id: 'better',
    name: 'Better',
    emoji: '💳',
    logoSrc: '/logos/better-logo.png',
    tag: 'Fintech · ניהול פיננסי אישי',
    tagline: 'טכנולוגיה שחוסכת לך כסף בלי מאמץ',
    color: '#2f6bff',
    gradientFrom: '#2f6bff',
    gradientTo: '#22c1dc',
    desc: 'אפליקציית פינטק שסורקת את כל התחומים הפיננסיים של המשתמש (פנסיה, בנק, ביטוחים, הלוואות, השקעות והחזרי מס), משווה מול השוק, ומחברת בין המשתמש לצוות מומחים שדואג שיקבל את התנאים הכי משתלמים, כולל עדכונים ישירות בצ׳אט.',
    challenge: 'לבנות אפליקציה שמרכזת נתונים פיננסיים רגישים ממקורות רבים בצורה מאובטחת ותואמת רגולציה, ומציגה אותם למשתמש בצורה פשוטה וברורה לצד המלצות פעולה.',
    result: 'שירות פעיל עם אלפי לקוחות וצוות יועצים מוסמכים בתחומי משכנתאות, מס, פנסיה, אשראי, השקעות וביטוח.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    link: 'https://go.allbetter.co.il/',
    images: [
      { src: '/projects/better/app-mockup.png', type: 'desktop', label: 'אפליקציית Better' },
    ],
    stats: [
      { label: 'לקוחות', value: '19,000+' },
      { label: 'תחומים פיננסיים', value: '6' },
      { label: 'הוקמה', value: '2021' },
    ],
  },
]

export const clients = [
  {
    name: 'ישראל היום',
    logo: 'https://upload.wikimedia.org/wikipedia/he/7/73/Israel_Hayom_Logo.png',
  },
  {
    name: 'The Times of Israel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/forty/TOI_logo.svg',
    logoFallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/TOI_logo.svg/512px-TOI_logo.svg.png',
  },
  {
    name: 'טלרד',
    logo: 'https://upload.wikimedia.org/wikipedia/he/c/c1/Telrad_Logo.png',
  },
  {
    name: 'סובארו',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Subaru_logo.svg/320px-Subaru_logo.svg.png',
  },
  {
    name: 'Johnnie Walker',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Johnnie_Walker_logo.svg/200px-Johnnie_Walker_logo.svg.png',
  },
]
