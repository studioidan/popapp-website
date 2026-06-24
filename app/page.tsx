import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyMe from '@/components/WhyMe'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import ParticleBg from '@/components/ParticleBg'

// R3F must be loaded client-side only
const OrbitScene = dynamic(() => import('@/components/OrbitScene'), { ssr: false })

export default function Home() {
  return (
    <>
      <ParticleBg />
      <Navbar />
      <main>
        <Hero />
        <OrbitScene />
        <WhyMe />
        <Process />
        <Contact />
      </main>
    </>
  )
}
