import { ChevronsDownIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getHero } from '@/modules/hero'

export const HeroSection = async () => {
  const data = await getHero()

  return (
    <div className="h-dvh px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className={cn(
            'relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c7ff6d] to-[#e7ffc4] opacity-30 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          )}
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex flex-col items-center gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-6xl  font-bold tracking-tight text-center">{data?.title}</h1>
          <p className="text-md sm:text-lg leading-normal text-center text-muted-foreground">{data?.subtitle}</p>
        </div>

        <div className="flex gap-2">
          <Button asChild className="bg-lime-600 dark:bg-lime-400 font-semibold">
            <a href={data?.whatsapp}>Contato</a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="#projects">Ver mais</Link>
          </Button>
        </div>

        <ChevronsDownIcon className="w-5 h-5 opacity-40 animate-bounce" />
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#c7ff6d] to-[#e7ffc4] opacity-30 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
