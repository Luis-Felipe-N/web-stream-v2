import { getEpisodesBySeason } from '@/server/actions/get-episode-by-season'
import { EpisodeT } from '@/types'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

interface EpisodeListProps {
  seasonId: string;
}

export default async function EpisodeList({ seasonId }: EpisodeListProps) {
  // Fetch data directly on the server
  let episodes: EpisodeT[] = [];
  let errorFetching: string | null = null;

  try {
    episodes = await getEpisodesBySeason(seasonId);
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
    errorFetching = "Failed to load episodes. Please try again later.";
    // Optionally, you can re-throw the error or handle it by returning a specific UI
    // For example, return <p>Error loading episodes.</p>;
  }

  if (errorFetching) {
    return (
      <div className="mt-14">
        <p className="text-xl font-semibold text-red-500">{errorFetching}</p>
      </div>
    );
  }

  if (!episodes || episodes.length === 0) {
    return (
      <div className="mt-14">
        <p className="text-xl font-semibold">Todos Episódios</p>
        <p className="mt-4">Nenhum episódio encontrado para esta temporada.</p>
      </div>
    );
  }

  return (
    <div className="mt-14">
      <p className="text-xl font-semibold">Todos Episódios</p>
      <ul className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-8">
        {episodes.map((episode) => (
          <li className="w-full" key={episode.id}>
            <Link href={`/episode/${episode.id}`} className="group">
              <div className="aspect-video overflow-hidden bg-slate-700"> {/* Added for consistent image sizing and placeholder */}
                <img
                  width={850} // These are more like aspect ratio hints for layout, actual size will be controlled by CSS/parent
                  height={478} // Assuming a 16:9 or similar aspect ratio for episode covers
                  src={episode.cover}
                  alt={`Capa do episódio ${episode.title}`} // More descriptive alt text
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Added styling for responsive images
                />
              </div>
              <small className="block mt-2 mb-1 font-semibold text-slate-300 uppercase truncate group-hover:text-slate-100">
                {episode.season.anime.title}
              </small>
              <p className="text-slate-100 group-hover:text-white truncate">
                T{episode.season.title.split('  ')[1]} E
                {episode.title.split(' ')[1]} - {episode.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
