import { AppSidebar } from '@/components/app-sidebar'
import { DownloadCurriculumButton, LogoutButton } from '@/components/curriculum-button'
import { getUser } from '@/components/get-user'
import { ModeToggle } from '@/components/theme-mode-toggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function GeneralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser()

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full space-y-6 flex flex-col flex-1">
        <div className="w-full flex flex-col">
          <div className="container p-6 max-w-screen-xl flex items-center justify-between gap-6 z-10">
            <SidebarTrigger />

            <div className="flex gap-2 items-center">
              <ModeToggle />
              {user ? <LogoutButton /> : <DownloadCurriculumButton />}
            </div>
          </div>
          {/* Sidebar */}
        </div>

        <div className="container max-w-screen-xl flex flex-1 flex-col py-6">{children}</div>

        {/* TODO -- Footer */}
      </div>
    </SidebarProvider>
  )
}
