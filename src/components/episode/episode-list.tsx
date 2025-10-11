'use client'

import { fetchWatchedEpisodes } from "@/server/actions/episode/fetch-watched-episodes"
import { getEpisodesBySeason } from "@/server/actions/get-episode-by-season"
import { useQuery } from "@tanstack/react-query"
import { EpisodeCard } from "./episode-card"
import type { EpisodeT } from "@/types"

interface EpisodeListProps {
  seasonId: string
}

export default function EpisodeList({ seasonId }: EpisodeListProps) {
  const { data: episodes } = useQuery({
    queryKey: ['episodes', seasonId],
    queryFn: () => getEpisodesBySeason(seasonId),
    refetchOnWindowFocus: false,
    enabled: !!seasonId,
  })

  const { data: watchedEpisodes } = useQuery({
    queryKey: ['watchedEpisodes'],
    queryFn: () => fetchWatchedEpisodes(),
  })

  if (!episodes || episodes.length === 0) {
    return (
      <div className="mt-14">
        <p className="text-xl font-semibold">Todos os Episódios</p>
        <p className="mt-4 text-muted-foreground">Nenhum episódio encontrado para esta temporada.</p>
      </div>
    )
  }

  return (
    <div className="mt-14">
      <p className="text-xl font-semibold">Todos os Episódios</p>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {episodes.map((episode: EpisodeT) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            watched={watchedEpisodes ? watchedEpisodes.find(w => w.episodeId === episode.id) : undefined}
          />
        ))}
      </ul>
    </div>
  )

}
