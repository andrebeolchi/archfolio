import { HeroSection } from './hero'

export default async function Home() {
  return (
    <main>
      <HeroSection />

      <div>
        <h1 className="text-xl mb-4">Academics</h1>
      </div>

      <div>
        <h1 className="text-xl mb-4">Projects</h1>
      </div>
    </main>
  )
}
