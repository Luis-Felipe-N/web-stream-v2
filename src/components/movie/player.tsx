'use client'

import { MovieD } from '@/types'
import { getStreams } from '@/utils/get-streams'
import { useCallback } from 'react'
import ReactPlayer from 'react-player'

interface MoviePlayerProps {
  movie: MovieD
  stream: string
}



export default function Player({ movie, stream }: MoviePlayerProps) {

  return (
    <div>
      <ReactPlayer width="" height="" playing controls className="absolute z-50 t-0 b-0 w-screen h-screen" url={stream} />
    </div>
  )
}