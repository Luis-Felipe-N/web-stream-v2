import MovieHero from '@/components/movie/movie-hero'
import Rail from '@/components/movie/rail'
import RailGenres from '@/components/movie/rail/rail-genres'
import { GenreT } from '@/data/types/Genre'
import { getGenresTag } from '@/server/actions/movies/get-genres-tag'
import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import { MovieD } from '@/types'

interface MovieProps {
  params: { id: string }
}

async function getMovie(id: string): Promise<MovieD> {
  const response = await getMovieById(Number(id))

  return response
}

async function getGenres(movie: MovieD): Promise<GenreT | null> {
  const response: GenreT[] = await getGenresTag()

  const genre = response.find(genre => movie.genres.includes(genre.title))

  if (!genre) {
    return null
  }

  return genre
}

export default async function Movie({ params }: MovieProps) {
  const movie = await getMovie(params.id)

  const genre = await getGenres(movie)
  console.log(genre)
  return (
    <main>
      <MovieHero movie={movie} />
      {genre && (
        <RailGenres
          title="Sugestões para você"
          genre={genre.id}
          query={genre.tag}
        />
      )}
    </main>
  )
}
