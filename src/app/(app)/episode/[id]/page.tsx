import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

import Season from '@/components/season'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import AnimeHero from '@/components/anime-hero'
import { getEpisodesById } from '@/server/actions/episode/get-episode-by-id'
import Image from 'next/image'
import EpisodeDescription from '@/components/episode-description'
import Player from '@/components/player'

interface AnimeProps {
  params: { id: string }
}

export default async function Anime({ params }: AnimeProps) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [`episode@${params.id}`],
    queryFn: () => getEpisodesById(params.id),
  })
  console.log(params.id)
  return (
    <main className='grid px-20'>
      <section className='grid grid-cols-12 grid-rows-2 mt-20 gap-8'>
        <div className='col-span-8'>
          <Player episodeId={params.id} />
        </div>

        <div className='col-span-8'>
          <EpisodeDescription episodeId={params.id} />
        </div>

        <div className='col-span-4 col-start-9 row-span-2 row-start-1'>
          asdasd
        </div>
      </section>
    </main>
  )
}
