import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import RailGenres from './rail-genres'
import { getAnimesByGenre } from '@/server/actions/animes/get-animes-by-genre'

const GENRES = [
  {
    title: "Desbrave o Mundo da Ação",
    genre: "acao",
    query: "animeacao",
  },
  {
    title: "Precisando de uma boa risada?",
    genre: "comedia",
    query: "animecomedia",
  },
  {
    title: "Embarque em Grandes Aventuras",
    genre: "aventura",
    query: "animeaventura",
  },
  {
    title: "Horror para você",
    genre: "horror",
    query: "animehorror",
  },
  {
    title: "Um pouco de drama",
    genre: "drama",
    query: "animedrama",
  },
  {
    title: "De volta para escola",
    genre: "escolar",
    query: "animeescolar",
  },
  {
    title: "Fantasia para você",
    genre: "fantasia",
    query: "animefantasia",
  },
  {
    title: "Ficção científica para você",
    genre: "ficcao-cientifica",
    query: "animeficcaocientifica",
  }
]

export default async function Rail() {
  const queryClient = new QueryClient()

  for (const item of GENRES) {
    await queryClient.prefetchQuery({
      queryKey: [item.query],
      queryFn: () => getAnimesByGenre(item.genre),
    })
  }

  return (
    <div className='mb-24'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {GENRES.map(item => (
          <RailGenres
            key={item.query}
            title={item.title}
            genre={item.genre}
            query={item.query}
          />
        ))}
      </HydrationBoundary>
    </div>
  )
}
