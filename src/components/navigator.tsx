'use client'
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
import { cn } from '@/lib/utils'

import { ScrollArea } from './ui/scroll-area'

const components: {
  title: string
  imageUrl: string
  href: string
  description: string
}[] = [
  {
    title: 'Alert Dialog',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
  {
    title: 'Tabs',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
  {
    title: 'Tabs',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
  {
    title: 'Tabs',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    imageUrl: 'https://picsum.photos/200/300',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export function Navigator() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Formação</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <AcademicNavigationItem />

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contato</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const AcademicNavigationItem = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Projetos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ScrollArea className="h-80">
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {components.map((component, index) => (
              <ListItem
                key={`${component.title}-${index}`}
                title={component.title}
                href={component.href}
                imageUrl={component.imageUrl}
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
          <div className="block">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
