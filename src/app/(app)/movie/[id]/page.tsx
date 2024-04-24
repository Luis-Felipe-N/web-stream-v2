'use client'

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import AnimeHero from '@/components/anime-hero'
import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import Player from '@/components/movie/player'

interface MovieProps {
  params: { id: string }
}

export default async function Movie({ params }: MovieProps) {
  const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: [`movie@${params.id}`],
  //   queryFn: () => getMovieById(Number(params.id)),
  // })

//   console.log(data)

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="h-[80vh]">
          <Player movieId={params.id} />
        </section>

        {/* <Season animeSlug={params.slug} /> */}
      </HydrationBoundary>
    </main>
  )
}
