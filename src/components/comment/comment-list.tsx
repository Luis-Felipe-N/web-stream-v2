'use client'

import { getComments } from "@/server/actions/episode/get-comments-by-episode"
import { Comment, EpisodeT } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFallbackName } from "@/utils/get-fallback-name"

interface CommentListProps {
    episode: EpisodeT
}

export default function CommentList({ episode }: CommentListProps) {

    const { data: comments } = useQuery<Comment[]>({
        queryKey: [`comments`, { episodeId: episode.id }],
        queryFn: () => getComments(episode.id),
        enabled: !!episode.id
    })

    if (!comments) {
        return null
    }

    return (
        <div>
            {comments.map(comment => (
                <div className={`flex mt-8 items-start gap-4`} key={comment.id}>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>
                            {getFallbackName(comment.author.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex gap-2">
                            <span className="font-semibold">{comment.author.name}</span>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}