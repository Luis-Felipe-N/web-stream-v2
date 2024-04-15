import Rail from '@/components/rail'
import Hero from '@/components/hero'

import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['popular'],
    queryFn: getPopularAnime,
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
