'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterFormSchema = z.object({
  name: z.string().min(3),
  email: z.string(),
  password: z.string(),
})

export type registerFormData = z.infer<typeof RegisterFormSchema>

export default function SingIn() {
  const { register, handleSubmit, setError } = useForm<registerFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })

  async function handleCreateAccount(credentials: registerFormData) {
    try {
      await api.post('/users', credentials)

      // LOGIN
    } catch (error) {
      if (error instanceof AxiosError) {
        setError('root', { message: error.response?.data.message })
      }
    }
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="bg-slate-900 p-12 py-16 pb-20 max-w-xl w-full rounded-lg m">
        <div className="mb-14 text-center">
          <h1 className="text-4xl mb-2 font-bold">Criar conta</h1>
          <p>Digite o endereço de e-mail e a senha da sua conta.</p>
        </div>

        <form onSubmit={handleSubmit(handleCreateAccount)} className="w-full">
          <div className="grid items-center gap-1.5">
            <Label className="text-base font-semibold">
              Nome Completo
              <Input
                className="mt-2"
                {...register('name')}
                placeholder="Ex: Kakashi Hatake"
              />
            </Label>
          </div>
          <div className="grid items-center gap-1.5 mt-4">
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
                placeholder="Ex: senhaforte"
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
