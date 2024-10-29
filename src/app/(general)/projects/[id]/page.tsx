import Gallery from '@/components/gallery'
import { Badge } from '@/components/ui/badge'
import { getProject } from '@/modules/projects'

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = await params
  const project = await getProject(id)

  return (
    <main className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="flex flex-col items-start gap-4">
        <Badge>{project.subtitle}</Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{project.title}</h1>
        <p className="text-lg leading-8 text-muted-foreground">{project.description}</p>
      </div>

      <div className="flex-1 px-8">
        <Gallery images={project.images} />
      </div>
    </main>
  )
}
