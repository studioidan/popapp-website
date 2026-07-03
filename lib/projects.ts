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
    desc: 'אפליקציית המתכונים הרשמית של השפית ניקי ביסלייך. חיפוש חכם, פילטרים, מועדפים, וחוויית משתמש שגורמת לבשל.',
    challenge: 'לבנות אפליקציה שתתמוך במאות מתכונים עם תמונות HD, חיפוש מיידי, offline mode — ועדיין תרגיש קלילה ומהירה.',
    result: 'מעל 100,000 הורדות, דירוג 4.8 כוכבים, אפליקציה חיה ב-App Store ו-Google Play.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'Algolia Search', 'CDN'],
    link: 'https://nikib.co.il',
    images: [
      { src: '/projects/niki/mockup.png', type: 'desktop', label: 'מוקאפ האפליקציה' },
      { src: 'https://picsum.photos/seed/niki2/390/844', type: 'mobile', label: 'חיפוש מתכונים' },
      { src: 'https://picsum.photos/seed/niki3/390/844', type: 'mobile', label: 'עמוד מתכון' },
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
      { src: 'https://picsum.photos/seed/pool1/800/500', type: 'desktop', label: 'דף הבית' },
      { src: 'https://picsum.photos/seed/pool2/390/844', type: 'mobile', label: 'התראה בזמן אמת' },
      { src: 'https://picsum.photos/seed/pool3/390/844', type: 'mobile', label: 'ניהול מצלמות' },
      { src: 'https://picsum.photos/seed/pool4/800/500', type: 'desktop', label: 'Dashboard' },
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
      { src: 'https://picsum.photos/seed/med2/390/844', type: 'mobile', label: 'ניטור גלוקוז' },
      { src: 'https://picsum.photos/seed/med3/390/844', type: 'mobile', label: 'דוח יומי' },
      { src: 'https://picsum.photos/seed/med4/800/500', type: 'desktop', label: 'ממשק רופא' },
    ],
    stats: [
      { label: 'תחום', value: 'Medical AI' },
      { label: 'שלב', value: 'Clinical Beta' },
      { label: 'טכנולוגיה', value: 'CGM + ML' },
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
