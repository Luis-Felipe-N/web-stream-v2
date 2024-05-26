import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

import Season from '@/components/season'
import AnimeHero from '@/components/anime-hero'
import { AnimeT } from '@/types'

interface AnimeProps {
  params: { slug: string }
}

export default async function Anime({ params }: AnimeProps) {
  const anime: AnimeT = await getAnimeBySlug(params.slug)

  return (
    <main>
      <section className="flex items-end lg:h-[80vh] md:h-[70vh] h-[60vh]">
        <AnimeHero anime={anime} />
      </section>

      <Season anime={anime} />
    </main>
  )
}
