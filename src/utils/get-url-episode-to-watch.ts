import { getEpisodesBySeason } from "@/server/actions/get-episode-by-season";
import { AnimeT } from "@/types";

export async function getURLEpisodeToWatch(anime: AnimeT) {
    // TODO: Get episode the user stop
    const episodes = await getEpisodesBySeason(anime.seasons[0].id);

    return `/episode/${episodes[0].id}`
}