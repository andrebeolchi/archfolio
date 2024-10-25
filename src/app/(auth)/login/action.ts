import { signInWithEmailAndPassword } from 'firebase/auth'
import { z } from 'zod'

import { auth } from '@/interfaces/firebase'

const schema = z.object({
  email: z.string().trim().min(1, { message: 'Informe seu e-mail.' }).email({ message: 'E-mail inválido.' }),

  password: z.string().min(1, { message: 'Informe sua senha.' }),
})

export const signIn = async (_previousState: unknown, formData: FormData) => {
  if (!formData) {
    return {
      hash: Math.random(),
      message: 'Erro ao processar formulário, tente novamente.',
    }
  }

  const data = {
    email: (formData?.get('email') as string)?.trim().toLowerCase(),
    password: (formData?.get('password') as string)?.trim(),
  }

  const validatedFields = schema.safeParse(data)
  if (!validatedFields.success) {
    return {
      hash: Math.random(),
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await signInWithEmailAndPassword(auth, data.email, data.password)
  } catch (error) {
    return {
      hash: Math.random(),
      message: 'E-mail ou senha inválidos, tente novamente.',
      error,
    }
  }
}
