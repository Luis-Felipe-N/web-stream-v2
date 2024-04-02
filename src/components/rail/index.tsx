import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import RailGenres from './rail-genres'
import { getAnimesByGenre } from '@/server/actions/animes/get-animes-by-genre'

export default async function Rail() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['animeacao'],
    queryFn: () => getAnimesByGenre('acao'),
  })

  await queryClient.prefetchQuery({
    queryKey: ['animeaventura'],
    queryFn: () => getAnimesByGenre('aventura'),
  })

  await queryClient.prefetchQuery({
    queryKey: ['animecomedia'],
    queryFn: () => getAnimesByGenre('comedia'),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RailGenres
        title="Desbrave o Mundo da Ação"
        genre="acao"
        query="animeacao"
      />

      <RailGenres
        title="Embarque em Grandes Aventuras"
        genre="aventura"
        query="animeaventura"
      />

      <RailGenres
        title="Precisando de uma boa risada?"
        genre="comedia"
        query="animecomedia"
      />
    </HydrationBoundary>
  )
}
