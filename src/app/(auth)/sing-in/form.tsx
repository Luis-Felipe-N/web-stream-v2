'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { zodResolver } from '@hookform/resolvers/zod'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle, AlertCircleIcon } from 'lucide-react'
import Link from 'next/link'

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' }),
})

export type loginFormData = z.infer<typeof LoginFormSchema>

export default function SingInForm() {
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

      console.log(response)

      if (response.status === 401 || !response.ok) {
        let errorMessage = 'Credenciais inválidas. Verifique seu e-mail e senha.';
        if (response.error === 'CredentialsSignin') {
          errorMessage = 'Email ou senha incorretos. Por favor, tente novamente.';
        } else if (response.error === 'CallbackRouteError') {
          errorMessage = 'Problema ao autenticar. Tente novamente mais tarde.';
          console.error("NextAuth Callback Route Error:", response.error);
        } else if (response.error) {
          errorMessage = `Não foi possível fazer login: ${response.error}.`;
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
      <div className="mt-2">
        <Label htmlFor={`email`}>Email</Label>
        <Input
          placeholder="seuemail@gmail.com"
          {...register("email", { required: true })}
          type="email"
          className='mt-2'
        />

      </div>

      <div className="mt-2">
        <div>
          <Label htmlFor={`password`}>Senha</Label>
        </div>
        <Input
          placeholder="seu-senha-secreta"
          {...register("password", { required: true })}
          type="password"
          className='mt-2'
        />
      </div>

      {isSubmitting ? (
        <Button className="mt-12 w-full font-bold " size="lg" disabled={isSubmitting}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando
        </Button>
      ) : (
        <Button
          className="font-bold w-full mt-12 px-4 py-2 h-[42px] border"
          type="submit"
        >
          Entrar
        </Button>
      )}

      <div className="my-8 text-sm text-center space-x-2">
        <span className='text-muted-foreground'>Não possui uma conta?</span>
        <Link className='underline font-semibold transition hover:underline text-[#E71D36] hover:text-[#E71D36]/50' href={'/sing-up'}>Faça seu cadastro.</Link>
      </div>

    </form>
  )
}