'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFallbackName } from '@/utils/get-fallback-name'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ProfileFormSchema = z.object({
    name: z.string().min(3, { message: 'Nome precisa conter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Este email não parece válido' }),
    password: z.string().min(6, { message: 'Senha precisa conter no mínimo 6 caracteres' })
})


export type ProfilerFormData = z.infer<typeof ProfileFormSchema>

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'unauthenticated') {
        return router.push('/')
    }
    console.log({ session })
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ProfilerFormData>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            name: session?.user.name
        },
    })

    function handleUpdateProfile(data: ProfilerFormData) {

    }

    if (status === 'loading') {
        return (
            <div className="flex items-end gap-1">
                <h1>Carregando</h1>
            </div>
        )
    }

    if (status === 'authenticated') {
        return (
            <main className='h-screen w-full grid place-items-center'>
                <header className={`transition duration-500 px-4 md:px-8 lg:px-24 grid grid-cols-12 grid-rows-2 items-center w-full fixed top-0 z-30 ${scrollY > 10 ? "bg-slate-950/90" : ""}`}>
                    <h1 className="text-3xl py-6 font-bold lg:col-span-3 md:lg:col-span-3 col-span-6 md:lg:row-span-2 lg:row-span-2 row-span-1">
                        <Link className="px-6 inline-block" href={'/'}>
                            ./stream
                        </Link>
                    </h1>


                </header>
                <div className='flex items-center flex-col max-w-4xl w-full px-4 md:px-8 lg:px-24'>
                    <h1 className='text-zinc-50 font-extrabold text-5xl'>Editar Perfil</h1>
                    <Avatar className='h-28 w-28 cursor-pointer mt-8'>
                        <AvatarImage src={session.user.avatar} alt={session.user.name} />
                        <AvatarFallback>
                            {getFallbackName(session.user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="w-full mx-auto">
                        <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full">
                            {errors.root && (
                                <p className="text-start mt-2 text-sm text-red-400 mb-4 font-bold">
                                    {errors.root?.message}
                                </p>
                            )}
                            <div className="grid items-center gap-1.5">
                                <Label className="">
                                    Nome Completo
                                    <Input
                                        className="mt-2"
                                        {...register('name')}
                                        placeholder="Ex: Kakashi Hatake"
                                        errors={errors.name}
                                    />
                                </Label>
                            </div>

                            <div className='flex justify-center gap-4'>
                                {isSubmitting ? (
                                    <Button className="mt-12 " size="lg" disabled={isSubmitting}>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </Button>
                                ) : (
                                    <>
                                        <Button className="mt-12" size="md" type="submit" variant="outline">
                                            Cancelar
                                        </Button>
                                        <Button className="mt-12" size="md" type="submit">
                                            Atualizar
                                        </Button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div >
            </main >)
    }

}