'use client'

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { EpisodeT } from "@/types";
import Player from "./player";
import { getBaseUrl } from "@/utils/get-base-url";
import { Source } from "@/types/types";

interface EpisodePlayerProps {
    source: Source
    nextEpisode?: EpisodeT
}

export default function EpisodePlayer({ source }: EpisodePlayerProps) {

    return (
        <video
            // ref={playerRef}
            autoPlay


            src={source.file}
            controls
            className="w-full max-h-screen aspect-video"
            title="Uma descrição concisa do conteúdo do vídeo"
        >
        </video>
    )
};  
