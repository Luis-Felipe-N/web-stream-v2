'use client'

import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { EpisodeT } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

interface PlayerProps {
  episodeId: string
}

export default function Player({ episodeId }: PlayerProps) {
  const { data, isFetching, error } = useQuery<EpisodeT>({
    queryKey: [`episode@${episodeId}`],
    queryFn: () => getEpisodesById(episodeId),
  })

  if (isFetching) return (
    <div
      className='grid place-items-center aspect-video z-50 bg-slate-900'>
      <Loader2 className="mr-2 h-10 w-10 animate-spin text-zinc-500" />
    </div>
  )

  if (error || !data) return <h1>Error</h1>


  return (
    <div className="aspect-video">
      <iframe className="w-full h-full" src={data.video} frameBorder="0"></iframe>
    </div>
  )
}