'use client'

import { api } from "@/data/api"
import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { EpisodeT } from "@/types"
import { getBaseUrl } from "@/utils/get-base-url"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import ReactPlayer from "react-player"

interface PlayerProps {
  episode: EpisodeT
}

export default function Player({ episode }: PlayerProps) {

  const [video, setVideo] = useState('')

  useEffect(() => {
    if(episode) {
      const getVideoUrl = async () => {
        const video = await getBaseUrl(episode.video)
        setVideo(video)
      }
  
      getVideoUrl()
    }
  }, [episode])

  return (
    <div className="aspect-video">
      <ReactPlayer width="" height="" url={video} playing controls className="w-full h-full"/>
    </div>
  )
}