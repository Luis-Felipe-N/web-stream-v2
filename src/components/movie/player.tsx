'use client'

import { EpisodeT, MovieT } from '@/types'
import ReactPlayer from 'react-player'

interface MoviePlayerProps {
    movie: MovieT
}

export default function Player({ movie }: MoviePlayerProps) {

    return (
        <div>
            <ReactPlayer url="https://cdnapisec.kaltura.com/p/2267831/sp/2267831/playManifest/entryId/1_ruhvtq6e/flavorIds/1_pmlrtqed,1_4k7uikft,1_ke0g804i,1_hfa3awex,1_jcgxx70u/deliveryProfileId/4542/protocol/https/format/applehttp/a.m3u8"/>
        </div>
    )
}