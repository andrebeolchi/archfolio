import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getAcademicDetails, getAcademicList } from '@/modules/academics'

export const AcademicsSection = async () => {
  const details = await getAcademicDetails()
  const items = await getAcademicList()

  return (
    <div className="flex flex-col px-6 lg:px-8 gap-10" id="academic">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{details?.title}</h2>
        <p className="text-lg leading-8 text-muted-foreground">{details?.description}</p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {items?.map(academic => (
          <article key={academic.id} className="flex flex-col items-start justify-between">
            {academic.image && (
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                <img src={academic.image} alt={academic.title} className="rounded-lg object-contain" />
              </div>
            )}
            <div className="flex items-center p-2 gap-4">
              <p className="text-muted-foreground text-xs">{academic.date}</p>
              <Badge variant="outline">{academic.category}</Badge>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground">
                <span>
                  <span className="absolute inset-0" />
                  {academic.title}
                </span>
              </h3>
              {academic.subtitle && (
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">{academic.subtitle}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
