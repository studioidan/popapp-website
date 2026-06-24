import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ClientsStrip from '@/components/ClientsStrip'
import ProjectsSection from '@/components/ProjectsSection'
import WhyMe from '@/components/WhyMe'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import ParticleBg from '@/components/ParticleBg'

export default function Home() {
  return (
    <>
      <ParticleBg />
      <Navbar />
      <main>
        <Hero />
        <ClientsStrip />
        <ProjectsSection />
        <WhyMe />
        <Process />
        <Contact />
      </main>
    </>
  )
}
