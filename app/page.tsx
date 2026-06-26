import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectsSection from '@/components/ProjectsSection'
import ClientsStrip from '@/components/ClientsStrip'
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
        <About />
        <ProjectsSection />
        <ClientsStrip />
        <WhyMe />
        <Process />
        <Contact />
      </main>
    </>
  )
}
