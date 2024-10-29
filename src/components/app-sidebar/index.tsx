import { ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getAcademicList } from '@/modules/academics'
import { getProjects } from '@/modules/projects'

export const AppSidebar = () => {
  return (
    <Sidebar variant="floating" side="left" collapsible="offcanvas">
      <SidebarMenu>
        <AcademicNavigationSub />
        <ProjectsNavigationSub />
      </SidebarMenu>
      <SidebarRail />
    </Sidebar>
  )
}

const AcademicNavigationSub = async () => {
  const academics = await getAcademicList()

  return (
    <Collapsible className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Formação
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenuSub>
            {academics?.map(academic => (
              <SubLinkItem key={academic.id} href={`#${academic.id}`}>
                {academic.title}
              </SubLinkItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const ProjectsNavigationSub = async () => {
  const projects = await getProjects()

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Projetos ({projects?.length})
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenuSub>
            {projects?.map(project => (
              <SubLinkItem key={project.id} href={`#${project.id}`}>
                {project.title}
              </SubLinkItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

const SubLinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <a href={href}>
              <span>{children}</span>
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
