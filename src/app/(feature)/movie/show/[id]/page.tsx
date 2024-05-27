import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import Player from '@/components/movie/player'
import { MovieD } from '@/types'
import { getKalturaStream } from '@/server/actions/movies/get-kaltura-stream'

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
    <div className='relative z-[9999999]'>
      <Player movie={movie} />
    </div>
  )
}
