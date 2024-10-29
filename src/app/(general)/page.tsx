import { AcademicsSection } from './academics'
import { HeroSection } from './hero'
import { ProjectsSection } from './projects'

export default async function Home() {
  return (
    <main id="home" className="flex flex-col gap-32 lg:gap-64">
      <HeroSection />

      <AcademicsSection />

      <ProjectsSection />
    </main>
  )
}
