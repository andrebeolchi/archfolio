'use client'

import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { auth } from '@/interfaces/firebase'

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleLogout() {
    try {
      setIsLoading(true)

      await signOut(auth)

      await fetch('/api/logout')

      toast.success('Logout efetuado com sucesso!')

      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Não foi possível efetuar o logout, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return <Button onClick={handleLogout}>{isLoading ? 'Saindo...' : 'Sair'}</Button>
}

export const DownloadCurriculumButton = () => {
  return <Button onClick={() => {}}>Download Curriculum</Button>
}
