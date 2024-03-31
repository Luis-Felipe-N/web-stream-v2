import Header from '@/components/header'
import { Hero } from '@/components/hero'
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

  return (
    <>
      <main className="bg-red-700 relative">
        <Header />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Hero />
        </HydrationBoundary>
      </main>
    </>
  )
}
