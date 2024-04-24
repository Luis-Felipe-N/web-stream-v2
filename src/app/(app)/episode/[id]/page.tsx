'use client'

import { useQuery } from '@tanstack/react-query'

import { getEpisodesById } from '@/server/actions/episode/get-episode-by-id'
import EpisodeDescription from '@/components/episode-description'
import Player from '@/components/player'
import Comment from '@/components/comment'
import { EpisodeT } from '@/types'
import { Loader2 } from 'lucide-react'
import NextEpisode from '@/components/next-episode'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimeProps {
  params: { id: string }
}

export default function Anime({ params }: AnimeProps) {
  const { data: episode } = useQuery<EpisodeT>({
    queryKey: [`episode@${params.id}`],
    queryFn: () => getEpisodesById(params.id),
  })

  return (
    <main className='grid lg:px-20 px-4'>
      <section className='grid grid-cols-12 grid-rows-2 mt-20 gap-8'>
        <div className='lg:col-span-8 col-span-12'>
          {episode && <Player episode={episode} />}
        </div>

        <div className='lg:col-span-8 col-span-12'>
          {episode && <EpisodeDescription episode={episode} />}
          <Comment />
        </div>

        <div className='lg:col-span-4 lg:block hidden lg:col-start-9 row-span-2 row-start-1'>
          {episode && <NextEpisode episode={episode} />}
        </div>
      </section>
    </main>

  )
}
