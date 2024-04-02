import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

import Season from '@/components/season'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import AnimeHero from '@/components/anime-hero'

interface AnimeProps {
  params: { slug: string }
}

export default async function Anime({ params }: AnimeProps) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [`anime@${params.slug}`],
    queryFn: () => getAnimeBySlug(params.slug),
  })

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="h-[80vh]">
          <AnimeHero slug={params.slug} />
        </section>

        <Season animeSlug={params.slug} />
      </HydrationBoundary>
    </main>
  )
}
