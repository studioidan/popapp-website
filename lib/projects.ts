export interface Project {
  id: string
  name: string
  icon: string
  tag: string
  color: string
  colorHex: number
  desc: string
  longDesc: string
  tech: string[]
  link: string
  imageUrl: string
  stats: { label: string; value: string }[]
  orbitRadius: number
  orbitSpeed: number
  size: number
}

export const projects: Project[] = [
  {
    id: 'mebook',
    name: 'MeBook.ai',
    icon: '📚',
    tag: 'AI · ספרי ילדים',
    color: '#ff6b35',
    colorHex: 0xff6b35,
    desc: 'פלטפורמה ליצירת ספרי ילדים מותאמים אישית באמצעות AI. מעלים תמונה של הילד — ומקבלים ספר מודפס בכריכה קשה שבו הילד הוא הגיבור.',
    longDesc: 'מהרעיון ועד לדפוס — בניתי את כל המערכת: אתר React, שרת Node.js, אינטגרציה עם OpenAI ו-Stable Diffusion ליצירת איורים, ומערכת הזמנה ומשלוח אוטומטית. הפרויקט הושק ב-2024 ומייצר הכנסה פסיבית.',
    tech: ['React', 'Node.js', 'OpenAI', 'Stable Diffusion', 'AWS', 'Print API', 'Stripe'],
    link: 'https://mebook.ai',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    stats: [
      { label: 'השקה', value: '2024' },
      { label: 'טכנולוגיה', value: 'AI + Print' },
      { label: 'פלטפורמה', value: 'Web' },
    ],
    orbitRadius: 3.6,
    orbitSpeed: 0.18,
    size: 0.52,
  },
  {
    id: 'niki',
    name: 'Niki',
    icon: '🍳',
    tag: 'Mobile App · 100K+ הורדות',
    color: '#00e5ff',
    colorHex: 0x00e5ff,
    desc: 'אפליקציית המתכונים הרשמית של השפית ניקי ביסלייך. מעל 100,000 הורדות עם חיפוש חכם, מועדפים וחווית משתמש מוקפדת.',
    longDesc: 'אפליקציה מלאה ב-React Native לשני הפלטפורמות. כוללת מנוע חיפוש מהיר, מסננים לפי דיאטה וזמן הכנה, שמירת מועדפים, ושיתוף מתכונים. עברה 100K הורדות תוך חצי שנה מההשקה.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'App Store', 'Google Play'],
    link: 'https://nikib.co.il',
    imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80',
    stats: [
      { label: 'הורדות', value: '100K+' },
      { label: 'דירוג', value: '4.8 ⭐' },
      { label: 'פלטפורמה', value: 'iOS + Android' },
    ],
    orbitRadius: 5.2,
    orbitSpeed: 0.155,
    size: 0.62,
  },
  {
    id: 'bcone',
    name: 'BCone',
    icon: '🏊',
    tag: 'IoT · בטיחות ילדים',
    color: '#7c3aed',
    colorHex: 0x7c3aed,
    desc: 'מערכת חכמה המזהה כניסת ילדים לבריכה ביתית ומתריעה להורים בזמן אמת — כדי למנוע טביעה.',
    longDesc: 'מערכת IoT משולבת: מצלמה עם Computer Vision לזיהוי תנועה במים, App ב-React Native לקבלת התראות Push בזמן אמת, ופאנל ניהול. המערכת עובדת גם ב-WiFi חלש ומחזיקה סוללה שבועות.',
    tech: ['Python', 'Computer Vision', 'IoT', 'React Native', 'AWS IoT', 'Push Notifications'],
    link: 'https://www.lifebuoy.co.il',
    imageUrl: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80',
    stats: [
      { label: 'דיוק זיהוי', value: '99.2%' },
      { label: 'זמן תגובה', value: '<2 שניות' },
      { label: 'פלטפורמה', value: 'IoT + Mobile' },
    ],
    orbitRadius: 6.8,
    orbitSpeed: 0.13,
    size: 0.45,
  },
  {
    id: 'makesense',
    name: 'MakeSense',
    icon: '🩺',
    tag: 'Medical · AI',
    color: '#10b981',
    colorHex: 0x10b981,
    desc: 'מערכת לניטור וחיזוי מדדי גלוקוז לחולי סכרת. כולל אפליקציה, ממשק ניהול רפואי ומודלי AI לחיזוי.',
    longDesc: 'מוצר Medical-grade שפותח בשיתוף רופאים. App ב-React Native לחולים, ממשק ווב לרופאים, שרת Python עם מודלי ML לחיזוי רמות גלוקוז, ואינטגרציה עם חיישנים רפואיים.',
    tech: ['React Native', 'Python', 'TensorFlow', 'Node.js', 'HealthKit', 'Medical APIs'],
    link: '',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    stats: [
      { label: 'משתמשים', value: 'Medical Beta' },
      { label: 'מודל AI', value: 'TensorFlow' },
      { label: 'פלטפורמה', value: 'iOS + Web' },
    ],
    orbitRadius: 8.4,
    orbitSpeed: 0.105,
    size: 0.55,
  },
]
