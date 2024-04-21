import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import RailGenres from './rail-genres'
import { getAnimesByGenre } from '@/server/actions/animes/get-animes-by-genre'
import RailBanner from './rail-banner'
import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'

export default async function Rail() {
  const queryClient = new QueryClient()

  return (
    <div className='mb-24'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RailGenres
          title="Desbrave o Mundo da Ação"
          genre="acao"
          query="animeacao"
        />

        <RailGenres
          title="Precisando de uma boa risada?"
          genre="comedia"
          query="animecomedia"
        />

        <RailGenres
          title="Embarque em Grandes Aventuras"
          genre="aventura"
          query="animeaventura"
        />

        {/* <RailGenres
          title="Horror para você"
          genre="horror"
          query="animehorror"
        /> */}

        <RailGenres
          title="Um pouco de drama"
          genre="drama"
          query="animedrama"
        />

        <RailGenres
          title="De volta para escola"
          genre="escolar"
          query="animeescolar"
        />

        <RailGenres
          title="Fantasia para você"
          genre="fantasia"
          query="animefantasia"
        />

        <RailGenres
          title="Ficção científica para você"
          genre="ficcao-cientifica"
          query="animeficcaocientifica"
        />

      </HydrationBoundary>
    </div>
  )
}
