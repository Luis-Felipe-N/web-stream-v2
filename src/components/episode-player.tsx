'use client'

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { EpisodeT } from "@/types";
import Player from "./player";
import { getBaseUrl } from "@/utils/get-base-url";
import { Source } from "@/types/types";

interface EpisodePlayerProps {
    episode: EpisodeT
    nextEpisode?: EpisodeT
}

export default function EpisodePlayer({ episode, nextEpisode }: EpisodePlayerProps) {
    const [source, setSource] = useState<Source>()

    useEffect(() => {
        const getVideo = async () => {
            const video = await getBaseUrl(episode.video)
            const sourceT: Source = {
                file: video,
                label: episode.slug,
            }

            setSource(sourceT)
        }

        getVideo()
    }, [episode])
    console.log(source)

    if (source) {
        return (
            // <Player source={source} forwarder={nextEpisode} />
            < iframe src={episode.video} >
                sdasda

            </iframe >
        );
    }

    return null
};  
