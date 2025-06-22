'use client'

import { api } from '@/data/api'

import NextEpisode from '@/components/next-episode'
import CommentForm from '@/components/comment/comment-form'
import CommentList from '@/components/comment/comment-list'
import EpisodeDescription from '@/components/episode-description'

import { getBaseUrl } from '@/utils/get-base-url'
import { EpisodeT } from '@/types'
import { Source } from '@/types/types'
import { getNextEpisode as getNextEpisodeAction } from '@/server/actions/episode/get-next-episode'
import { useEffect } from 'react'
import Player from '@/components/player/player'

interface AnimeProps {
  params: { id: string }
}

async function getEpisode(id: string): Promise<EpisodeT> {
  const response = await api(`episodes/${id}`)

  const { episode } = await response.json()

  return episode
}

function getNextEpisode(episode: EpisodeT) {
  const nextEpisode = getNextEpisodeAction({
    animeId: episode.season.animeId,
    seasonId: episode.seasonId,
    currentIndex: episode.index
  })

  return nextEpisode
}



export default async function Anime({ params }: AnimeProps) {
  console.log(`[SERVER RENDER Anime Page] ID: ${params.id}, Timestamp: ${new Date().toISOString()}`);
  const episode = await getEpisode(params.id)
  const video = await getBaseUrl(episode.video)

  const source: Source = {
    refer: episode.id,
    file: video,
    label: episode.slug,
  }

  const nextEpisode = await getNextEpisode(episode)

  return (
    <main className='grid lg:px-20 px-4 pb-24'>
      <section className='grid grid-cols-12  lg:mt-24 mt-48 gap-8'>
        <div className='col-span-12 h-[50vh] flex justify-center'>
          <Player source={source}></Player>
        </div>

        <div className='lg:col-span-8 col-span-12'>
          {episode && <EpisodeDescription episode={episode} />}
          <div className="mt-12">
            <CommentForm episode={episode} />
            <CommentList episode={episode} />
          </div>
        </div>

        {nextEpisode && (
          <div className='lg:col-span-4 lg:block hidden lg:col-start-9 row-span-2 row-start-2'>
            <NextEpisode nextEpisode={nextEpisode} />
          </div>
        )}
      </section>
    </main>

  )
}
