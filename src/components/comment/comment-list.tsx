'use client'

import { getComments } from "@/server/actions/episode/get-comments-by-episode"
import { Comment, EpisodeT } from "@/types" 
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFallbackName } from "@/utils/get-fallback-name"
import { formatDistanceToNow } from 'date-fns' 
import { ptBR } from 'date-fns/locale' 

interface CommentListProps {
    episode: EpisodeT
}

export default function CommentList({ episode }: CommentListProps) {

    const { data: comments, isLoading } = useQuery<Comment[]>({
        queryKey: [`comments`, { episodeId: episode.id }],
        queryFn: () => getComments(episode.id),
        enabled: !!episode.id
    })
    
    if (isLoading) { 
        return (
            <div className="mt-12">
                <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-zinc-200 rounded-full"></div>Comentários</strong>
                <p className="mt-4 text-sm text-gray-500">Carregando comentários...</p>
            </div>
        )
    }

    if (!comments || comments.length === 0) {
        return (
            <div className="mt-12">
                <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-zinc-200 rounded-full"></div>Comentários</strong>
                <p className="mt-4 text-sm text-gray-500">Ainda não há comentários para este episódio.</p>
            </div>
        )
    }

    return (
        <div className="mt-12">
            <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-zinc-200 rounded-full"></div>Comentários</strong>
            {comments.map(comment => {
                let createdAtDate;
                try {
                    createdAtDate = new Date(comment.updatedAt);
                } catch (error) {
                    console.error("Data inválida para o comentário:", comment.id, comment.createdAt);
                    return null;
                }

                const relativeTime = isValid(createdAtDate)
                    ? formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ptBR })
                    : "Data inválida";

                return (
                    <div className={`flex mt-8 items-start gap-4`} key={comment.id}>
                        <Avatar className='h-14 w-14'>
                            <AvatarImage src={comment.author.avatar || undefined} alt={comment.author.name} />
                            <AvatarFallback>
                                {getFallbackName(comment.author.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">{comment.author.name}</span>
                            </div>
                            <span className="text-xs text-gray-500"> 
                                {relativeTime.charAt(0).toUpperCase() + relativeTime.slice(1)}
                            </span>
                            
                            <p className="text-sm mt-1">{comment.content}</p> 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

import { isValid } from 'date-fns';