'use client'

import ReactPlayer from "react-player"

interface PlayerProps {
  video: string
}

export default function Player({ video }: PlayerProps) {

  return (
    <div className="aspect-video bg-slate-800">
      {video && (<ReactPlayer width="" height="" url={video} playing controls className="w-full h-full" />)}
    </div>
  )
}