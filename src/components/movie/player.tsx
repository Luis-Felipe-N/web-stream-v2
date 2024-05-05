'use client'

import ReactPlayer from 'react-player'

interface MoviePlayerProps {
  stream: string
}

export default function Player({ stream }: MoviePlayerProps) {
  console.log(stream)
  return (
    <div>
      <ReactPlayer width="" height="" playing controls className="absolute z-50 t-0 b-0 w-screen h-screen" url={stream} />
    </div>
  )
}