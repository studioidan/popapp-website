export interface Project {
  id: string
  name: string
  icon: string
  tag: string
  color: string
  colorHex: number
  desc: string
  tech: string[]
  link: string
  orbitRadius: number
  orbitSpeed: number
  size: number
}

export const projects: Project[] = [
  {
    id: 'mebook',
    name: 'MeBook.ai',
    icon: '📚',
    tag: 'AI · אתר',
    color: '#ff6b35',
    colorHex: 0xff6b35,
    desc: 'אתר ליצירת ספרי ילדים אישיים באמצעות בינה מלאכותית. מעלים תמונה אחת של הילד ומקבלים הביתה ספר ילדים מרהיב מודפס בכריכה קשה.',
    tech: ['React', 'Node.js', 'OpenAI', 'Stable Diffusion', 'AWS', 'Print API'],
    link: 'https://mebook.ai',
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
    desc: 'אפליקציית המתכונים הרשמית של השפית ניקי. מעל 100,000 הורדות, עם מנגנון חיפוש חכם, מועדפים וחווית משתמש מוקפדת.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'App Store', 'Google Play'],
    link: 'https://nikib.co.il',
    orbitRadius: 5.2,
    orbitSpeed: 0.155,
    size: 0.62,
  },
  {
    id: 'bcone',
    name: 'BCone',
    icon: '🏊',
    tag: 'IoT · בטיחות',
    color: '#7c3aed',
    colorHex: 0x7c3aed,
    desc: 'מערכת חכמה המזהה כניסת ילדים לבריכה ביתית ומתריעה להורים בזמן אמת כדי למנוע טביעה. שילוב של Computer Vision ו-IoT.',
    tech: ['Python', 'Computer Vision', 'IoT', 'React Native', 'Real-time Alerts', 'AWS IoT'],
    link: 'https://www.lifebuoy.co.il',
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
    desc: 'מערכת לניטור וחיזוי מדדי גלוקוז ופחמימות לחולי סכרת. כולל אפליקציה, ממשק ניהול ושרת עם מודלי בינה מלאכותית.',
    tech: ['React Native', 'Python', 'ML Models', 'Node.js', 'Medical APIs', 'Charts'],
    link: '',
    orbitRadius: 8.4,
    orbitSpeed: 0.105,
    size: 0.55,
  },
]
