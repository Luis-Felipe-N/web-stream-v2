'use client'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import Link from 'next/link'
import { MovieT } from '@/types'
import { getMoviesByGenre } from '@/server/actions/movies/get-movies-by-genre'
import { Skeleton } from '@/components/ui/skeleton'

interface RailProps {
  title: string
  query?: string
  genre: number
}

export default function RailGenres({ title, query, genre }: RailProps) {
  const { data } = useQuery<MovieT[]>({
    queryKey: [query],
    queryFn: () => getMoviesByGenre(genre),
  })

  return (
    <section className="lg:px-24 lg:py-8 p-4 relative z-20">
      <strong className="lg:text-xl">{title}</strong>

      <Swiper
        slidesPerView="auto"
        spaceBetween={5}
        pagination={true}
        modules={[Pagination]}
        className="w-full mt-4 swiper-rail"
      >
        {data ?
          data.map((anime) => (
            <SwiperSlide className="swiper-slide-perview" key={anime.id}>
              <div className="aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2 border-transparent hover:border-slate-100 transition">
                <Link href={`/movie/${anime.id}`}>
                  <Image
                    quality={100}
                    width={308}
                    height={404}
                    className="h-full w-full object-cover"
                    src={anime.imageUrl}
                    alt=""
                  ></Image>
                </Link>
              </div>
            </SwiperSlide>
          )) : (
            <div className='flex gap-1'>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
              <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
            </div>
          )}
      </Swiper>
    </section>
  )
}
