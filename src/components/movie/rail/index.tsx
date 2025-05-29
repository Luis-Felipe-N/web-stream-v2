import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

import { getMoviesByGenre } from '@/server/actions/movies/get-movies-by-genre'
import RailGenres from './rail-genres'

<<<<<<< HEAD

=======
>>>>>>> a34a42ca5c9f7bec5864887bf953f27d29295a39
export default async function Rail() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['movieacao'],
    queryFn: () => getMoviesByGenre(10067),
  })

  await queryClient.prefetchQuery({
    queryKey: ['movieaventura'],
    queryFn: () => getMoviesByGenre(10068),
  })

  await queryClient.prefetchQuery({
    queryKey: ['moviecomedia'],
    queryFn: () => getMoviesByGenre(10069),
  })

  await queryClient.prefetchQuery({
    queryKey: ['moviehorror'],
    queryFn: () => getMoviesByGenre(10083),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RailGenres
        title="Desbrave o Mundo da Ação"
        genre={10067}
        query="movieeacao"
      />

      <RailGenres
        title="Precisando de uma boa risada?"
        genre={10069}
        query="movieecomedia"
      />

      <RailGenres
        title="Embarque em Grandes Aventuras"
        genre={10068}
        query="movieeaventura"
      />


      <RailGenres
        title="Documentários"
        genre={22}
        query="moviedocumentarios"
      />

      <RailGenres
        title="Horror para você"
        genre={10083}
        query="movieehorror"
      />

      <RailGenres
        title="Ver com a familia?"
        genre={10073}
        query="movieefamilia"
      />

      <RailGenres
        title="Um pouco de drama"
        genre={10072}
        query="movieedrama"
      />
    </HydrationBoundary>
  )
}
