'use client'

import { MovieD } from '@/types'
import { Source } from '@/types/types'
import Player from '../player/player'

interface MoviePlayerProps {
  movie: MovieD
}



export default function PlayerMovie({ movie }: MoviePlayerProps) {

  const source: Source = {
    file: `https://cdnapisec.kaltura.com/p/2267831/sp/226783100/playManifest/entryId/${movie.id_kaltura}/protocol/https/format/applehttp/flavorIds/1_9bbre7wz,1_rqqlkymt,1_v5omkuu1,1_d0djoedj,1_68tcdevq,1_ep8wn0e3/a.m3u8?uiConfId=44208331&playSessionId=0036da5d-2ddc-03ad-9815-0ac1eecf3a04:f951663d-0c35-e941-21e4-b309a99e74d8&referrer=aHR0cHM6Ly9wbGF5LndhdGNoLnR2LmJyL2Fzc2lzdGlyL2ZpbG1lLzEzNDk3L2FzLWF2ZW50dXJhcy1kZS1rOS1sZW5kYS1kby1vdXJvLXBlcmRpZG8=&clientTag=html5:v3.17.9-canary.0-dbe3d1d`,
    label: movie.title,
    type: 'hls'
  }
  return (
    <div>
      <Player source={source} autoPlay autoFocus />
    </div>
  )
}