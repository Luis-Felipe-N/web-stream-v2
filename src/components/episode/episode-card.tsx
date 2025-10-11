import { EpisodeT, type Watched } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { getProgress } from '@/utils/get-progress'
import { ProgressWatching } from '../progress-watching'

interface EpisodeCardProps {
  episode: EpisodeT
  watched?: Watched
}

export function EpisodeCard({ episode, watched }: EpisodeCardProps) {
  const seasonTitle = `T${episode.season.title.split('  ')[1]}`
  const episodeTitle = `E${episode.title.split(' ')[1]} - ${episode.title}`

  return (
    <li className="w-full overflow-hidden">
      <Link href={`/episode/${episode.id}`} className="group">
        <div className="aspect-video overflow-hidden bg-zinc-800 relative">
          {episode.cover ? (
            <Image
              fill
              src={episode.cover}
              alt={`Capa do episódio ${episode.title}`}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-700" />
          )}
          {watched && <ProgressWatching watched={watched} className="bg-red-600" />}
        </div>

        <div className="p-2">
          <small className="block mb-1 font-semibold text-zinc-400 uppercase truncate group-hover:text-zinc-100">
            {episode.season.anime.title}
          </small>
          <p className="text-zinc-100 group-hover:text-white truncate" title={episodeTitle}>
            {seasonTitle} {episodeTitle}
          </p>
        </div>
      </Link>

    </li>
  )
}
