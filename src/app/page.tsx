import Rail from '@/components/rail'
import Hero from '@/components/hero'

import { getPopularAnime } from '@/server/actions/get-popular-anime'

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

  const data = await fetch('https://play.watch.tv.br/api/content-list', {
    method: 'post',
    body: JSON.stringify({
      contentType: 'movie',
      get_tvod: 0,
      id: 10091,
      page: 1,
      signal: {},
      size: 20,
    }),
  })

  console.log(data)

  return (
    <>
      <main className="relative">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hero />
        </HydrationBoundary>

        <Rail />
      </main>
    </>
  )
}
