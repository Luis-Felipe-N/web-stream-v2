'use client'

import { getMovieById } from '@/server/actions/movies/get-movie-by-id'
import { EpisodeT } from '@/types'
import { useQuery } from '@tanstack/react-query'
import ReactPlayer from 'react-player'

interface MoviePlayerProps {
    movieId: string
}

export default function Player({ movieId }: MoviePlayerProps) {
    // const { data, isFetching, error } = useQuery<EpisodeT>({
    //     queryKey: [`movie@${movieId}`],
    //     queryFn: () => getMovieById(Number(movieId)),
    // })

    // console.log(data)
    
    return null
}