'use client'

import { SelectAvatar } from '@/components/auth/select-avatar' // Presumo que este componente se integra com RHF
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Importar Alert
import { api } from '@/lib/api'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2, AlertCircle } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormProvider, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

const RegisterFormSchema = z.object({
  avatar: z.string().min(1, { message: "Por favor, selecione um avatar." }), // Tornando obrigatório
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' }),
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>

export type registerFormData = z.infer<typeof RegisterFormSchema>

export default function SignUp() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
      password: '',
    }
  })

  const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = form

  const router = useRouter()

  async function handleCreateAccount(credentials: registerFormData) {
    try {
      const response = await api.post('/users', credentials)
      console.log({ response })

      if (response.status === 201 && response.data.user) {

        const signInResponse = await signIn('credentials', {
          email: credentials.email,
          password: credentials.password,
          redirect: false,
        })

        if (signInResponse?.ok) {
          toast.success("Conta criada com sucesso! Redirecionando...")
          router.replace('/')
        } else {

          toast.error("Conta criada, mas o login automático falhou. Por favor, faça login manualmente.")
          setError('root', { message: "Sua conta foi criada, mas houve um problema ao fazer login automaticamente. Tente fazer login." })
          router.push('/login')
        }
      } else {
        setError('root', { message: "Resposta inesperada do servidor ao criar conta." })
      }

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data.message
        if (errorResponse.statusCode === 409) {
          setError('email', { type: 'manual', message: "Este email já está cadastrado. Tente outro." })
        } else {
          const apiErrorMessage = errorResponse.message || 'Não foi possível criar sua conta. Tente novamente.';
          setError('root', { message: apiErrorMessage })
        }
      } else {
        console.error("Create account error:", error)
        setError('root', { message: 'Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.' })
      }
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
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro ao Criar Conta</AlertTitle>
                <AlertDescription>
                  {errors.root.message}
                </AlertDescription>
              </Alert>
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
