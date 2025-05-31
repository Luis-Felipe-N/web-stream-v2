'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle, AlertCircleIcon } from 'lucide-react'

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' }),
})

export type loginFormData = z.infer<typeof LoginFormSchema>

export default function SingIn() {
  const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<loginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
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
        setError('root', {
          message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        })
        return;
      }

      if (response?.status === 401 || !response?.ok) {
        let errorMessage = 'Credenciais incorretas. Verifique seu e-mail e senha.';
        if (response.error === 'CredentialsSignin') {
          errorMessage = 'Email ou senha inválidos. Por favor, tente novamente.';
        } else if (response.error) {
          errorMessage = 'Ocorreu um erro ao tentar fazer login. Tente mais tarde.';
          console.error("NextAuth SignIn Error:", response.error);
        }

        setError('root', { message: errorMessage });
        return;
      }

      router.replace('/')

    } catch (error) {
      console.error("Login submission error:", error);
      setError('root', {
        message: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
      });
    }
  }

  return (
    <div className="grid place-items-center h-full">
      <div className="bg-slate-900 p-12 py-16 pb-20 max-w-xl w-full rounded-lg m">
        <div className="mb-14 text-center">
          <h1 className="text-4xl mb-2 font-bold">Entrar</h1>
          <p>Acesse sua conta para continuar.</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          {errors.root && (
            <Alert variant="destructive" className='mb-4'>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao Entrar</AlertTitle>
              <AlertDescription>
                {errors.root.message}
              </AlertDescription>
            </Alert>
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
            <Button className="mt-12 w-full" size="lg" disabled={isSubmitting}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="mt-12 w-full" size="lg" type="submit">
              Entrar
            </Button>
          )}

          <p className="mt-4 text-sm font-semibold text-slate-200 ">
            Não possui uma conta? <Link className='hover:underline transition text-[#E71D36] hover:text-slate-400' href={'/sing-up'}>Faça seu cadastro.</Link>
          </p>

        </form>
      </div>
    </div>
  )
}
