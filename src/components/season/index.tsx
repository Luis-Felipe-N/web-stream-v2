'use client'

import { AnimeT } from '@/types'
import SeasonButton from './season-button'
import EpisodeList from '../episode-list'
import { useState } from 'react'

interface SeasonProps {
  anime: AnimeT
}

export default function Season({ anime }: SeasonProps) {
  const seasons = anime.seasons.sort(function (o1, o2) {
    return Number(o1.title.split('  ')[1]) - Number(o2.title.split('  ')[1])
  })
  const [seasonId, setSeasonId] = useState(seasons[0].id)
  async function handleOnValueChange(value: string) {
    setSeasonId(value)
  }

  return (
    <section className="relative z-20 px-4 md:px-8 lg:px-24">
      <div>
        <SeasonButton seasons={seasons} onValueChange={handleOnValueChange} />
      </div>

      <EpisodeList seasonId={seasonId} />
    </section>
  )
}
