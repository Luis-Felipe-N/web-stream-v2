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
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { getComments } from "@/server/actions/episode/get-comments-by-episode"
import { EpisodeT } from "@/types"

const CommentFormSchema = z.object({
    content: z.string().min(3, { message: 'Nome precisa conter no mínimo 3 caracteres' }),
})

export type CommentFormData = z.infer<typeof CommentFormSchema>

interface CommentFormProps {
    episode: EpisodeT
}

export default function CommentForm({ episode }: CommentFormProps) {
    const { data, status } = useSession()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => getComments(episode.id),
        onSuccess: (data) => {
            queryClient.setQueryData([`comments`, { episodeId: episode.id }], data)
        },
    })

    const { handleSubmit, register, setValue } = useForm<CommentFormData>({
        resolver: zodResolver(CommentFormSchema),
    })

    async function handleComment(data: CommentFormData) {
        try {
            const comment = await commentEpisode(episode.id, data.content)

            mutation.mutate(comment)
            setValue('content', '')
        } catch (error) {

        }
    }

    if (!data) {
        return null
    }

    if (status === 'authenticated') {
        return (
            <form onSubmit={handleSubmit(handleComment)} className="flex items-start gap-2">
                <Avatar className='h-14 w-14'>
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback>
                        {getFallbackName(data.user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-sm mb-2">Comente como <strong>{data.user.name}</strong></p>
                    <Textarea
                        placeholder="Deixe um comentário"
                        {...register('content')}
                    />
                    <div className="mt-2 focus-within:invisible">
                        <Button>Enviar</Button>
                    </div>
                </div>
            </form>
        )
    }
}