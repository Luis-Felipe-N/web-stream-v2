'use client'

import { EpisodeT } from "@/types"
import { formatDate } from "@/utils/format-date"

import Image from "next/image"
import Link from "next/link"

interface EpisodeDescriptionProps {
  episode: EpisodeT
}

export default function EpisodeDescription({ episode }: EpisodeDescriptionProps) {

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href={`/anime/${episode.season.anime.slug}`} className="font-semibold text-red-500 hover:underline">{episode.season.anime.title}</Link> | <span>{episode.season.anime.rating}</span>
      </div>
      <h1 className="text-2xl mt-4 font-semibold uppercase">
        E{episode.title.split(' ')[1]} - {episode.title}
      </h1>
      <div className="my-2 flex items-center gap-2">
        {episode.season.anime.nsfw ? (
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

        <div className="flex text-zinc-400 gap-2">
          {episode.season.anime.genres.map((genre) => (
            <p key={genre.title}>{genre.title}</p>
          ))}
        </div>
      </div>
      <time>
        Lançado em {formatDate(episode.createdAt)}
      </time>
    </div>
  )
}