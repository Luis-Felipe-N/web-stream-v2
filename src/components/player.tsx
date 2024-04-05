'use client'

import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { EpisodeT } from "@/types"
import { useQuery } from "@tanstack/react-query"

interface PlayerProps {
  episodeId: string
}

export default function Player({episodeId}: PlayerProps) {
  const { data, isFetching, error } = useQuery<EpisodeT>({
    queryKey: [`episode@${episodeId}`],
    queryFn: () => getEpisodesById(episodeId),
  })

  if (isFetching) return <h1>Carregando...</h1>

  if (error || !data) return <h1>Error</h1>


  return (
    <div className="aspect-video">
      <iframe className="w-full h-full" src={data.video} frameBorder="0"></iframe>
    </div>
  )
}