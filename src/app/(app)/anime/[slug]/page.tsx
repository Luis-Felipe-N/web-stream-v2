import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

import Season from '@/components/season'
import AnimeHero from '@/components/anime-hero'
import { AnimeT } from '@/types'

interface AnimeProps {
  params: { slug: string }
}

export default async function Anime({ params }: AnimeProps) {
  const anime: AnimeT = await getAnimeBySlug(params.slug)

  console.log(anime.cover)
  return (
    <main>
      <section className="h-[80vh]">
        <AnimeHero anime={anime} />
      </section>

      <Season anime={anime} />
    </main>
  )
}
