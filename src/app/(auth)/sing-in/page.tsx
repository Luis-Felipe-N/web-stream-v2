'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type loginFormData = z.infer<typeof LoginFormSchema>

export default function SingIn() {
  const { register, handleSubmit, setError } = useForm<loginFormData>({
    resolver: zodResolver(LoginFormSchema),
  })

  const router = useRouter()

  async function handleLogin(credentials: loginFormData) {
    try {
      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (!response) {
        return setError('root', {
          message:
            'Ocorreu algum erro ao fazer o login. Por favor, tente novamente',
        })
      }

      if (response.ok) {
        router.replace('/')
      } else {
        setError('root', {
          message:
            'Credenciais incorretas. Por favor, verifique seu e-mail e senha.',
        })
      }
    } catch (error) {
      if (!response) {
        return setError('root', {
          message:
            'Ocorreu algum erro ao fazer o login. Por favor, tente novamente',
        })
      }
    }
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="bg-slate-900 p-12 py-16 pb-20 max-w-xl w-full rounded-lg m">
        <div className="mb-14 text-center">
          <h1 className="text-4xl mb-2 font-bold">Entrar</h1>
          <p>Digite o endereço de e-mail e a senha da sua conta.</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          <div className="grid items-center gap-1.5">
            <Label className="text-base font-semibold">
              Endereço de email
              <Input
                className="mt-2"
                {...register('email')}
                placeholder="Ex: email@gmail.com"
              />
            </Label>
          </div>

          <div className="grid items-center gap-1.5 mt-4">
            <Label className="text-base font-semibold">
              Senha
              <Input
                {...register('password')}
                placeholder="Ex: suasenha"
                type="password"
                className="mt-2"
              />
            </Label>
          </div>

          <p className="mt-4 hover:underline transition text-sm font-semibold text-slate-200 hover:text-slate-400">
            <Link href="/">Esqueceu sua senha?</Link>
          </p>

          <Button className="mt-12 w-full" size="lg" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
