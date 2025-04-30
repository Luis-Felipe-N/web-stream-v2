'use client'

import { AnimeT } from '@/types'
import SeasonButton from './season-button'
import EpisodeList from '../episode-list'
import { useState } from 'react'
interface SeasonProps {
  anime: AnimeT
}

export default function Season({ anime }: SeasonProps) {

  const seasons = anime.seasons.sort(function (x, y) {
    return Number(x.title.split('  ')[1]) - Number(y.title.split('  ')[1])
  })
  console.log({ seasons })
  const [seasonId, setSeasonId] = useState(seasons[0].id)

  async function handleOnValueChange(value: string) {
    setSeasonId(value)
  }

  return (
    <section className="relative z-20 px-4 md:px-8 lg:px-24">
      <SeasonButton seasons={seasons} onValueChange={handleOnValueChange} />

      <EpisodeList seasonId={seasonId} />
    </section>
  )
}
