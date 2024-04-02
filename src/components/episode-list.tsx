import { getEpisodesBySeason } from '@/server/actions/get-episode-by-season'
import { EpisodeT } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

interface EpisodeListProps {
  seasonId: string
}

export default function EpisodeList({ seasonId }: EpisodeListProps) {
  const { data } = useQuery<EpisodeT[]>({
    queryKey: [`episode@${seasonId}`],
    queryFn: () => getEpisodesBySeason(seasonId),
  })

  return (
    <div className="mt-14">
      <p className="text-xl font-semibold">Todos Episódios</p>
      <ul className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-8">
        {data &&
          data.map((episode) => (
            <li className="w-full" key={episode.id}>
              <Image
                width={850}
                height={850}
                src={episode.cover}
                quality={100}
                alt=""
              ></Image>
              <small className="block my-2 mb-1 font-semibold text-slate-300 uppercase">
                {episode.season.anime.title}
              </small>

              <p>
                T{episode.season.title.split('  ')[1]} E
                {episode.title.split(' ')[1]} - {episode.title}
              </p>
            </li>
          ))}
      </ul>
    </div>
  )
}
