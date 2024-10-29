'use client'

import { usePathname } from 'next/navigation'

import { SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const SubLinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const path = usePathname()

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <a href={href}>
                <span className={path === href ? 'text-lime-600 dark:text-lime-500 font-semibold' : ''}>
                  {children}
                </span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </TooltipTrigger>
        <TooltipContent side="left">
          <span>{children}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
