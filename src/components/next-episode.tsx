'use client'

import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { getNextEpisode } from "@/server/actions/episode/get-next-episode"
import { EpisodeT } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

interface NextEpisodeProps {
    nextEpisode: EpisodeT
}

export default function NextEpisode({ nextEpisode }: NextEpisodeProps) {

    return (
        <div>
            <strong>Proximo Episódio</strong>

            <Link href={`/episode/${nextEpisode.id}`} className="mt-4 block">
                <img
                    width={350}
                    height={350}
                    src={nextEpisode.cover}
                    alt=""
                />

                <small className="block my-2 mb-1 font-semibold text-slate-300 uppercase">
                    {nextEpisode.season.anime.title}
                </small>

                <p>
                    T{nextEpisode.season.title.split('  ')[1]} E
                    {nextEpisode.title.split(' ')[1]} - {nextEpisode.title}
                </p>
            </Link>
        </div>
    )
}