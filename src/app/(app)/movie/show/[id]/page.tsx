import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import Player from '@/components/movie/player'
import { MovieT } from '@/types'
import MovieHero from '@/components/movie/movie-hero'

interface MovieProps {
  params: { id: string }
}

async function getMovie(id: string): Promise<MovieT> {
  const response = await getMovieById(Number(id))

  return response
}

export default async function Movie({ params }: MovieProps) {
  const movie = await getMovie(params.id)
  
  return (
    <div>
      <Player movie={movie} />
    </div>
  )
}
