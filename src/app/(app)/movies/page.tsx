import Rail from '@/components/movie/rail'
import Hero from '@/components/movie/hero'

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

import { getHeroMovies } from '@/server/actions/movies/get-hero-movies'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['movieshero'],
    queryFn: getHeroMovies,
  })


  return (
    <>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hero />
        </HydrationBoundary>

        <Rail />
      </main>
    </>
  )
}
