'use client'

import { SelectAvatar } from '@/components/auth/select-avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { getAvatars } from '@/server/actions/jikan/get-avatars'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome precisa conter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Este email não parece válido' }),
  password: z.string().min(6, { message: 'Senha precisa conter no mínimo 6 caracteres' }),
  avatar: z.string()
})

export type registerFormData = z.infer<typeof RegisterFormSchema>

export default function SingIn() {
  const form = useForm<registerFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })
  const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = form

  const router = useRouter()

  async function handleCreateAccount(credentials: registerFormData) {
    try {
      const response = await api.post('/users', credentials)

      if (response.status === 201) {
        await signIn('credentials', {
          email: response.data.user.email,
          password: response.data.user.password,
          redirect: false,
        })

        router.replace('/')
      }

    } catch (error) {
      if (error instanceof AxiosError) {

        if (error.response?.status === 409) {
          return setError('root', { message: "Este endereço de e-mail já está associado a uma conta existente" })
        }

        setError('root', { message: error.response?.data.message })
      }

      setError('root', { message: 'Ocorreu algum erro ao fazer o login. Por favor, tente novamente' })
    }
  }


  return (
    <FormProvider {...form}>
      <div className="grid place-items-center h-full">
        <div className="bg-slate-900 p-12 py-16 pb-20 max-w-xl w-full rounded-lg m">
          <div className="mb-14 text-center">
            <h1 className="text-4xl mb-2 font-bold">Criar conta</h1>
            <p>Digite o endereço de e-mail e a senha da sua conta.</p>
          </div>

          <form onSubmit={handleSubmit(handleCreateAccount)} className="w-full">
            {errors.root && (
              <p className="text-start mt-2 text-sm text-red-400 mb-4 font-bold">
                {errors.root?.message}
              </p>
            )}

            <div className="gap-1.5">
              <Label className="text-base font-semibold max-w-full">
                Avatar
                <SelectAvatar />
              </Label>
            </div>

            <div className="grid items-center gap-1.5">
              <Label className="text-base font-semibold">
                Nome Completo
                <Input
                  className="mt-2"
                  {...register('name')}
                  placeholder="Ex: Kakashi Hatake"
                  errors={errors.name}
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
                  errors={errors.email}
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
                  errors={errors.password}
                />
              </Label>
            </div>

            <p className="mt-4 hover:underline transition text-sm font-semibold text-slate-200 hover:text-slate-400">
              <Link href="/">Esqueceu sua senha?</Link>
            </p>

            {isSubmitting ? (
              <Button className="mt-12 w-full" size="lg" disabled={isSubmitting}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button className="mt-12 w-full" size="lg" type="submit">
                Cadastrar
              </Button>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  )
}
