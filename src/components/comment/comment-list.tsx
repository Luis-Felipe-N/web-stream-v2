'use client'

import { getComments } from "@/server/actions/episode/get-comments-by-episode"
import { Comment, EpisodeT } from "@/types" // Supondo que Comment tenha 'createdAt'
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFallbackName } from "@/utils/get-fallback-name"
import { formatDistanceToNow } from 'date-fns' // Importe a função
import { ptBR } from 'date-fns/locale' // Importe o locale para português do Brasil

interface CommentListProps {
    episode: EpisodeT
}

export default function CommentList({ episode }: CommentListProps) {

    const { data: comments, isLoading } = useQuery<Comment[]>({
        queryKey: [`comments`, { episodeId: episode.id }],
        queryFn: () => getComments(episode.id),
        enabled: !!episode.id
    })
    console.log(comments)
    // Opcional: Adicionar um estado de carregamento enquanto os comentários estão sendo buscados
    if (isLoading) { // Melhor verificar se há comentários
        return (
            <div className="mt-12">
                <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-slate-200 rounded-full"></div>Comentários</strong>
                <p className="mt-4 text-sm text-gray-500">Carregando comentários...</p>
            </div>
        )
    }
    // if (isError) return <p>Erro ao carregar comentários.</p>;

    if (!comments || comments.length === 0) { // Melhor verificar se há comentários
        return (
            <div className="mt-12">
                <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-slate-200 rounded-full"></div>Comentários</strong>
                <p className="mt-4 text-sm text-gray-500">Ainda não há comentários para este episódio.</p>
            </div>
        )
    }

    return (
        <div className="mt-12">
            <strong className="flex gap-2 items-center text-200"><div className="w-1 h-1 bg-slate-200 rounded-full"></div>Comentários</strong>
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
                            <div className="flex gap-2 items-center"> {/* Adicionado items-center para alinhar melhor */}
                                <span className="font-semibold">{comment.author.name}</span>
                            </div>
                            <span className="text-xs text-gray-500"> {/* Span para o tempo relativo */}
                                {relativeTime.charAt(0).toUpperCase() + relativeTime.slice(1)}
                            </span>
                            {/* <small>{relativeTime}</small> Removido, já que foi incorporado acima */}
                            <p className="text-sm mt-1">{comment.content}</p> {/* Adicionado um pequeno margem top */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// Função auxiliar para verificar se a data é válida (necessário importar `isValid` de `date-fns`)
import { isValid } from 'date-fns';