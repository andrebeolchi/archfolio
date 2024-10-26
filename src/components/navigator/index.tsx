import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getProjects } from '@/modules/projects'

export function Navigator() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Formação</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <ProjectsNavigationItem />

        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contato</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ProjectsNavigationItem = async () => {
  const projects = await getProjects()

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Projetos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ScrollArea className="h-80">
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {projects?.map((component, index) => (
              <ListItem
                key={`${component.title}-${index}`}
                title={component.title}
                href={`#${component?.id}`}
                imageUrl={component.images[0].url}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
        </ScrollArea>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string
    imageUrl: string
  }
>(({ className, title, imageUrl, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex flex-row items-center select-none space-x-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group',
            className
          )}
          {...props}
        >
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-muted group-hover:bg-background">
            <Image
              src={imageUrl}
              alt={title ?? ''}
              width={32}
              height={32}
              className="h-8 w-8 flex-none text-muted-foreground object-contain"
            />
          </div>
          <div className="block space-y-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-tight text-muted-foreground">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
