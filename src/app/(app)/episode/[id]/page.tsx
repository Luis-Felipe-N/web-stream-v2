import { useQuery } from '@tanstack/react-query'

import { getEpisodesById } from '@/server/actions/episode/get-episode-by-id'
import EpisodeDescription from '@/components/episode-description'
import Player from '@/components/player'
import { EpisodeT } from '@/types'
import NextEpisode from '@/components/next-episode'
import { api } from '@/data/api'
import CommentForm from '@/components/comment/comment-form'
import CommentList from '@/components/comment/comment-list'
import { getBaseUrl } from '@/utils/get-base-url'

interface AnimeProps {
  params: { id: string }
}

async function getEpisode(id: string): Promise<EpisodeT> {
  const response = await api(`episodes/${id}`, {
    next: {
      revalidate: 60 * 60 * 24, // 1 hour
    },
  })

  const { episode } = await response.json()

  return episode
}

export default async function Anime({ params }: AnimeProps) {
  const episode = await getEpisode(params.id)
  const video = await getBaseUrl(episode.video)
  console.log(video)
  return (
    <main className='grid lg:px-20 px-4 pb-24'>
      <section className='grid grid-cols-12 grid-rows-2 lg:mt-24 mt-48 gap-8'>
        <div className='lg:col-span-8 col-span-12'>
          {episode && <Player video={video} />}
        </div>

        <div className='lg:col-span-8 col-span-12'>
          {episode && <EpisodeDescription episode={episode} />}
          <div className="mt-12">
            <CommentForm episode={episode} />
            <CommentList episode={episode} />
          </div>
        </div>

        <div className='lg:col-span-4 lg:block hidden lg:col-start-9 row-span-2 row-start-1'>
          {episode && <NextEpisode episode={episode} />}
        </div>
      </section>
    </main>

  )
}
