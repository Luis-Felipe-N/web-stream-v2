import { getEpisodesBySeason } from '@/server/actions/get-episode-by-season'
import { EpisodeT } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

interface EpisodeListProps {
  seasonId: string
}

export default function EpisodeList({ seasonId }: EpisodeListProps) {
  const { data, isLoading } = useQuery<EpisodeT[]>({
    queryKey: [`episode@${seasonId}`],
    queryFn: () => getEpisodesBySeason(seasonId),
  })

  if (isLoading) {
    return (
      <div className="mt-14">
        <Skeleton className='w-[180px] h-[30px]'></Skeleton>
        <ul className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-8">
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-[220px]'></Skeleton>
            <Skeleton className='w-[200px] h-[20px]'></Skeleton>
            <Skeleton className='w-[180px] h-[20px]'></Skeleton>
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-[220px]'></Skeleton>
            <Skeleton className='w-[200px] h-[20px]'></Skeleton>
            <Skeleton className='w-[180px] h-[20px]'></Skeleton>
          </div>
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-[220px]'></Skeleton>
            <Skeleton className='w-[200px] h-[20px]'></Skeleton>
            <Skeleton className='w-[180px] h-[20px]'></Skeleton>
          </div>
        </ul>

      </div>
    )
  }

  return (
    <div className="mt-14">
      <p className="text-xl font-semibold">Todos Episódios</p>
      <ul className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 gap-8">
        {data &&
          data.map((episode) => (
            <li className="w-full" key={episode.id}>
              <Link href={`/episode/${episode.id}`}>
                <img
                  width={850}
                  height={850}
                  src={episode.cover}
                  // quality={100}
                  alt=""
                />
                <small className="block my-2 mb-1 font-semibold text-slate-300 uppercase">
                  {episode.season.anime.title}
                </small>

                <p>
                  T{episode.season.title.split('  ')[1]} E
                  {episode.title.split(' ')[1]} - {episode.title}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
