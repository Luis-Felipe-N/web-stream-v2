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
import { Loader2 } from 'lucide-react'

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Este email não parece válido.' }),
  password: z.string().min(6, { message: 'Senha precisa conter no mínimo 6 caracteres' }),
})

export type loginFormData = z.infer<typeof LoginFormSchema>

export default function SingIn() {
  const { register, handleSubmit, setError, formState: { isSubmitting, errors} } = useForm<loginFormData>({
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

      if (response?.status === 401 || !response?.ok) {
        return setError('root', {
          message:
            'Credenciais incorretas. Por favor, verifique seu e-mail e senha.',
        })
      }

      if (response?.ok) {
        router.replace('/')
      }

    } catch (error) {
      return setError('root', {
        message:
          'Ocorreu algum erro ao fazer o login. Por favor, tente novamente',
      })
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
          {errors.root && (
            <p className="text-start mt-2 text-sm text-red-400 mb-4 font-bold">
              {errors.root?.message}
            </p>
          )}
          <div className="grid items-center gap-1.5">
            <Label className="text-base font-semibold">
              Endereço de email
              <Input
                className="mt-2"
                {...register('email')}
                placeholder="Ex: email@gmail.com"
                errors={errors.email}
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
                errors={errors.password}
              />
            </Label>
          </div>

          <p className="mt-4 hover:underline transition text-sm font-semibold text-slate-200 hover:text-slate-400">
            <Link href="/">Esqueceu sua senha?</Link>
          </p>

          {isSubmitting ? (
              <Button className="mt-12 w-full" size="lg" type="submit" disabled={isSubmitting}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button className="mt-12 w-full" size="lg" type="submit">
                Entrar
              </Button>
            )}


        </form>
      </div>
    </div>
  )
}
