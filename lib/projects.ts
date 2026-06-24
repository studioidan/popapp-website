export interface Project {
  id: string
  name: string
  emoji: string
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
  images: string[] // gallery images
  stats: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'mebook',
    name: 'MeBook.ai',
    emoji: '📚',
    tag: 'AI · ספרי ילדים',
    tagline: 'הילד שלך — גיבור הסיפור',
    color: '#ff6b35',
    gradientFrom: '#ff6b35',
    gradientTo: '#ff9500',
    desc: 'פלטפורמה שמאפשרת להורים ליצור ספר ילדים מודפס עם הילד שלהם כגיבור, בעזרת AI. מעלים תמונה אחת — ומקבלים ספר בכריכה קשה הביתה.',
    challenge: 'בניית pipeline שלם: העלאת תמונה → זיהוי פנים → יצירת איורים עקביים עם AI → עריכת ספר → הזמנה לדפוס ומשלוח.',
    result: 'מוצר חי ומייצר הכנסה ב-2024, עם אלפי ספרים שנשלחו לבתים ברחבי העולם.',
    tech: ['React', 'Node.js', 'OpenAI', 'Stable Diffusion', 'AWS S3', 'Stripe', 'Print API'],
    link: 'https://mebook.ai',
    images: [
      'https://mebook.ai/wp-content/uploads/2024/05/Group-2sitehero.png',
      'https://picsum.photos/seed/mebook2/800/500',
      'https://picsum.photos/seed/mebook3/800/500',
      'https://picsum.photos/seed/mebook4/800/500',
    ],
    stats: [
      { label: 'ספרים שנשלחו', value: '1,000+' },
      { label: 'AI Models', value: '3' },
      { label: 'השקה', value: '2024' },
    ],
  },
  {
    id: 'niki',
    name: 'Niki B',
    emoji: '🍳',
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
      'https://picsum.photos/seed/food1/800/500',
      'https://picsum.photos/seed/food2/800/500',
      'https://picsum.photos/seed/food3/800/500',
      'https://picsum.photos/seed/food4/800/500',
    ],
    stats: [
      { label: 'הורדות', value: '100K+' },
      { label: 'דירוג', value: '⭐ 4.8' },
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
      'https://picsum.photos/seed/pool1/800/500',
      'https://picsum.photos/seed/pool2/800/500',
      'https://picsum.photos/seed/pool3/800/500',
      'https://picsum.photos/seed/pool4/800/500',
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
    challenge: 'בניית מודל AI שמנתח נתוני CGM בזמן אמת ומשייך אותם לארוחות — ללא צורך בתיעוד ידני. אינטגרציה עם ציוד רפואי מוסדר.',
    result: 'Medical startup בשלב Validation עם תמיכת משקיעים, נבדק בניסויים קליניים.',
    tech: ['React Native', 'Python', 'TensorFlow', 'CGM APIs', 'HL7/FHIR', 'Node.js'],
    link: 'https://www.makesensedht.com',
    images: [
      'https://static.wixstatic.com/media/397d84_e4bfc078a0764a3fb118705609d4fc9b~mv2.png/v1/fill/w_1610,h_800,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Frame%201707481449%20(1).png',
      'https://picsum.photos/seed/medical2/800/500',
      'https://picsum.photos/seed/medical3/800/500',
      'https://picsum.photos/seed/medical4/800/500',
    ],
    stats: [
      { label: 'תחום', value: 'Medical AI' },
      { label: 'שלב', value: 'Clinical Beta' },
      { label: 'טכנולוגיה', value: 'CGM + ML' },
    ],
  },
]

export const clients = [
  { name: 'ישראל היום', logo: 'https://upload.wikimedia.org/wikipedia/he/7/73/Israel_Hayom_Logo.png' },
  { name: 'The Times of Israel', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/The_Times_of_Israel_logo.png' },
  { name: 'טלרד', logo: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/c1/Telrad_Logo.png/320px-Telrad_Logo.png' },
  { name: 'סובארו', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Subaru_logo.svg/320px-Subaru_logo.svg.png' },
  { name: 'Johnnie Walker', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Johnnie_Walker_logo.svg/320px-Johnnie_Walker_logo.svg.png' },
]
