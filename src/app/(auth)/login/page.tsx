'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { firebase } from '@/interfaces/firebase'

export default function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault()
      event.stopPropagation()

      const credential = await signInWithEmailAndPassword(getAuth(firebase), email, password)
      const idToken = await credential.user.getIdToken()

      // Sets authenticated browser cookies
      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      // Refresh page after updating browser cookies
      router.refresh()

      toast.success('Login efetuado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('E-mail ou senha inválidos, tente novamente.')
    }
  }
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Insira seu e-mail abaixo para fazer login em sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
