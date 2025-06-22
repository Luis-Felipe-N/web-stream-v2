
import { fetchWatchedEpisodes } from "@/server/actions/episode/fetch-watched-episodes";
import { Watched } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { getServerSession } from "next-auth";

interface KeepWatchingProps {

}

export async function KeepWatching() {
    console.log('KeepWatching renderizado');
    const data = await getServerSession()
    console.log(data)

    const watchedEpisodes = await fetchWatchedEpisodes();

    const getProgress = (watched: Watched) => {
        return (watched.stopAt / watched.episode.duration) * 100
    }

    if (!watchedEpisodes || watchedEpisodes.length === 0) {
        return null;
    }

    return (
        <section className="lg:px-24 lg:py-8 p-4 mt-4">
            <strong className="lg:text-xl">Continue assistindo</strong>
            <ul className="mt-4 grid grid-cols-5 gap-4">
                {watchedEpisodes.map((watched) => (
                    <li className="w-full relative" key={watched.id}>
                        <Link href={`/episode/${watched.episode.id}`} className="group">
                            <div className="aspect-video overflow-hidden bg-slate-700">
                                <img
                                    width={850}
                                    height={478}
                                    src={watched.episode.cover}
                                    alt={`Capa do episódio ${watched.episode.title}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="h-1 bg-white/50 absolute bottom-0 left-0 w-full">
                                <span className={`block h-1 bg-white`} style={{ width: `${getProgress(watched)}%` }}></span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}