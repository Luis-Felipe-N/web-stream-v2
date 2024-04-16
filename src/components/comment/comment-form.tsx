'use client'

import { Button } from "../ui/button"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from "../ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFallbackName } from "@/utils/get-fallback-name"
import { useSession } from "next-auth/react"

const CommentFormSchema = z.object({
    name: z.string().min(3, { message: 'Nome precisa conter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Este email não parece válido' }),
    password: z.string().min(6, { message: 'Senha precisa conter no mínimo 6 caracteres' })
})


export type CommentFormData = z.infer<typeof CommentFormSchema>

export default function CommentForm() {
    const { data, status } = useSession()

    const { handleSubmit } = useForm<CommentFormData>({
        resolver: zodResolver(CommentFormSchema),
    })

    function handleComment(data: CommentFormData) {

    }

    if (!data) {
        return null
    }

    if (status === 'authenticated') {
        return (
            <form onSubmit={handleSubmit(handleComment)} className="flex items-start gap-2">
                <Avatar className='h-12 w-12'>
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback>
                        {getFallbackName(data.user.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <Textarea
                        placeholder="Deixe um comentário"
                    />
                    <div className="mt-2">
                        <Button>Enviar</Button>
                    </div>
                </div>
            </form >
        )
    }
}