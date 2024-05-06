import MovieHero from '@/components/movie/movie-hero'
import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import { MovieD } from '@/types'

interface MovieProps {
  params: { id: string }
}

async function getMovie(id: string): Promise<MovieD> {
  const response = await getMovieById(Number(id))

  return response
}

export default async function Movie({ params }: MovieProps) {
  const movie = await getMovie(params.id)

  return (
    <main>
      <MovieHero movie={movie} />
    </main>
  )
}
