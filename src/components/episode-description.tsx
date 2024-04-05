'use client'

import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { EpisodeT } from "@/types"
import { formatDate } from "@/utils/format-date"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

interface EpisodeDescriptionProps {
  episodeId: string
}

export default function EpisodeDescription({ episodeId }: EpisodeDescriptionProps) {
  const { data, isFetching, error } = useQuery<EpisodeT>({
    queryKey: [`episode@${episodeId}`],
    queryFn: () => getEpisodesById(episodeId),
  })

  if (isFetching) return <h1>Carregando...</h1>

  if (error || !data) return <h1>Error</h1>

  console.log(data)

  return (
    <div> 
      <div className="flex items-center gap-2">
        <Link href={`/anime/${data.season.anime.slug}`} className="font-semibold text-red-500 hover:underline">{data.season.anime.title}</Link> | <span>{data.season.anime.rating}</span>
      </div>
      <h1 className="text-2xl mt-4 font-semibold uppercase">
        E{data.title.split(' ')[1]} - {data.title}
      </h1>
      <div className="mt-2">
        {data.season.anime.nsfw ? (
          <Image
            className="rounded"
            src="/NR18-AUTO.jpg"
            width={20}
            height={20}
            alt="Conteúdo para maiores de 18 anos"
          />
        ) : (
          <Image
            className="rounded"
            src="/NR16-AUTO.jpg"
            width={20}
            height={20}
            alt="Conteúdo para maiores de 16 anos"
          />
        )}
      </div>
      <time>
        Lançado em {formatDate(data.createdAt)}
      </time>
    </div>
  )
}