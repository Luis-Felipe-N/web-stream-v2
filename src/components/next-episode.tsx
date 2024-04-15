import { getEpisodesById } from "@/server/actions/episode/get-episode-by-id"
import { getNextEpisode } from "@/server/actions/episode/get-next-episode"
import { EpisodeT } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

interface NextEpisodeProps {
    episode: EpisodeT
}

export default function NextEpisode({ episode }: NextEpisodeProps) {
    const { data: nextEpisode, isLoading, error } = useQuery<EpisodeT>({
        queryKey: [`episode@${episode.index + 1}`],
        queryFn: () => getNextEpisode({
            animeId: episode.season.animeId,
            seasonId: episode.seasonId,
            currentIndex: episode.index
        }),
    })

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (!nextEpisode) {
        return null
    }

    return (
        <div>
            <strong>Proximo Episódio</strong>

            <Link href={`/episode/${nextEpisode.id}`} className="mt-4 block">
                <Image
                    width={350}
                    height={350}
                    src={nextEpisode.cover}
                    quality={100}
                    alt=""
                ></Image>

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