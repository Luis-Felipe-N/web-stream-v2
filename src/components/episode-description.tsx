'use client'

import { EpisodeT } from "@/types"
import { formatDate } from "@/utils/format-date"
import { Star, StarIcon } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

interface EpisodeDescriptionProps {
  episode: EpisodeT
}

export default function EpisodeDescription({ episode }: EpisodeDescriptionProps) {

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href={`/anime/${episode.season.anime.slug}`} className="font-semibold text-red-500 hover:underline block border-r-1 border-zinc-200">{episode.season.anime.title}</Link>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-200 icon icon-tabler icons-tabler-filled icon-tabler-star w-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg> <span className="text-zinc-200 ">{episode.season.anime.rating}</span>
      </div>
      <h1 className="text-2xl mt-4">
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
            <small key={genre.title}>{genre.title}</small>
          ))}
        </div>
      </div>
      <time>
        Lançado em {formatDate(episode.createdAt)}
      </time>
    </div>
  )
}