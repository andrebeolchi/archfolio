import { ModeToggle } from '@/components/theme-mode-toggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-1">
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  )
}
