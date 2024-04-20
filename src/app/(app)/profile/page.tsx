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

    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<ProfilerFormData>({
        resolver: zodResolver(ProfileFormSchema),

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
            <main className='pb-24'>
                <div className='relative h-96'>
                    <Image
                        width={1980}
                        height={900}
                        src="https://media.kitsu.io/anime/cover_images/80/original.jpg"
                        quality={100}
                        alt=""
                        className='absolute h-96 object-cover top-0 left-0 right-0 bottom-0 -z-50'
                    ></Image>

                    <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950/30 via-slate-950/10 to-transparent -z-1 h-[15rem]"></div>

                    <div className='px-4 max-w-7xl mx-auto h-full flex items-end relative z-10 pb-8'>
                        <div className='flex gap-4'>
                            <Avatar className='h-24 w-24 text-2xl'>
                                <AvatarImage src={session.user.avatar} alt={session.user.name} />
                                <AvatarFallback>
                                    {getFallbackName(session.user.name)}
                                </AvatarFallback>
                            </Avatar>

                            <div className='mt-2'>
                                <h1 className='text-zinc-50 font-extrabold text-5xl'>{session.user.name}</h1>
                                <p>10 animes assistidos</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-5xl mx-auto bg-slate-900 mt-12 p-16'>
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-8">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">Detalhes da conta</h2>
                    </div>
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
                        <div className="grid items-center gap-1.5 mt-4">
                            <Label className="">
                                Endereço de email
                                <Input
                                    className="mt-2"
                                    {...register('email')}
                                    placeholder="Ex: email@gmail.com"
                                    errors={errors.email}
                                />
                            </Label>
                        </div>

                        <div className='flex justify-end'>
                            {isSubmitting ? (
                                <Button className="mt-12 " size="lg" disabled={isSubmitting}>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </Button>
                            ) : (
                                <Button className="mt-12 " size="md" type="submit">
                                    Atualizar
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </main>)
    }

}