'use client'

import { Button } from "../ui/button"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from "../ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFallbackName } from "@/utils/get-fallback-name"
import { useSession } from "next-auth/react"
import { commentEpisode } from "@/server/actions/episode/comment-episode"

const CommentFormSchema = z.object({
    content: z.string().min(3, { message: 'Nome precisa conter no mínimo 3 caracteres' }),
})

export type CommentFormData = z.infer<typeof CommentFormSchema>

interface CommentFormProps {
    episodeId: string
}

export default function CommentForm({ episodeId }: CommentFormProps) {
    const { data, status } = useSession()

    const { handleSubmit, register, formState: { errors } } = useForm<CommentFormData>({
        resolver: zodResolver(CommentFormSchema),
    })

    async function handleComment(data: CommentFormData) {
        const response = await commentEpisode(episodeId, data.content)

        console.log(response)
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
                <div className="flex-1">

                    <Textarea
                        placeholder="Deixe um comentário"
                        {...register('content')}
                    // errors={errors.content}
                    />
                    <div className="mt-2">
                        <Button>Enviar</Button>
                    </div>
                </div>
            </form >
        )
    }
}