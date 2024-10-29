import { Separator } from '@/components/ui/separator'
import { getProjectDetails, getProjectList } from '@/modules/projects'

export const ProjectsSection = async () => {
  const details = await getProjectDetails()
  const items = await getProjectList()

  return (
    <div className="min-h-dvh flex flex-col px-6 lg:px-8 gap-10" id="project">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{details?.title}</h2>
        <p className="text-lg leading-8 text-muted-foreground">{details?.description}</p>
      </div>

      <Separator />

      <div className="columns-2 md:columns-3 lg:columns-4 space-y-4 gap-4">
        {items?.map(item => (
          <article
            key={item.id}
            className="relative flex flex-col bg-card p-2 border border-border shadow-sm rounded-xl overflow-hidden cursor-pointer break-inside-avoid"
          >
            <img src={item.images[0]?.url} alt={item.title} className="rounded-lg object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end">
              <h3 className="text-white text-lg font-semibold p-4">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
