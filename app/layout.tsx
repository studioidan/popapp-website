import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'עידן בן שמעון | PopApp – פיתוח תוכנה מקצה לקצה',
  description: 'מפתח תוכנה Senior עם 15+ שנות ניסיון. אפליקציות, AI, ואוטומציה – יכולות של חברה שלמה, מחיר של פרילנסר.',
  keywords: 'פיתוח אפליקציות, פיתוח תוכנה, React Native, Next.js, AI, ישראל',
  openGraph: {
    title: 'עידן בן שמעון | PopApp',
    description: 'מפתח אחד. יכולות של חברה שלמה.',
    url: 'https://popapp.co.il',
    siteName: 'PopApp',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-LJGXPVXNRW" />
    </html>
  )
}
