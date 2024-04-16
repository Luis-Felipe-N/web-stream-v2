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
    <AnimatePresence>
      {episode ? (
        <main className='grid px-20'>
          <section className='grid grid-cols-12 grid-rows-2 mt-20 gap-8'>
            <div className='col-span-8'>
              <Player episodeId={params.id} />
            </div>

            <div className='col-span-8'>
              <EpisodeDescription episode={episode} />
              <Comment />
            </div>

            <div className='col-span-4 col-start-9 row-span-2 row-start-1'>
              <NextEpisode episode={episode} />
            </div>
          </section>
        </main>
      ) : (
        <motion.div
          key="loading"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: .5,
            delay: .2
          }}
          className='absolute top-0 bottom-0 left-0 right-0 grid place-items-center z-50 bg-slate-950'>
          <Loader2 className="mr-2 h-10 w-10 animate-spin text-zinc-500" />
        </motion.div>
      )
      }
    </AnimatePresence >

  )
}
