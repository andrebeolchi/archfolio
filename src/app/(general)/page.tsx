import { AcademicsSection } from './academics'
import { HeroSection } from './hero'

export default async function Home() {
  return (
    <main>
      <HeroSection />

      <AcademicsSection />
    </main>
  )
}
