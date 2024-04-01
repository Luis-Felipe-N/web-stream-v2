'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Pagination } from 'swiper/modules'

import { getPopularAnime } from '@/server/actions/get-popular-anime'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { AnimeT } from '@/types'

export default function Hero() {
  const { data } = useQuery<AnimeT[]>({
    queryKey: ['popular'],
    queryFn: getPopularAnime,
  })

  return (
    <section className="h-[80vh]">
      <Swiper pagination={true} modules={[Pagination]} className="w-full">
        {data &&
          data.map((anime) => (
            <SwiperSlide key={anime.id}>
              <div className="h-screen relative flex items-end">
                <div className="relative z-10 bg-gradient-to-t w-full from-zinc-950 via-zinc-950/60 to-transparent">
                  <div className="px-4 md:px-8 lg:px-24 py-64 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent">
                    <h1 className="font-semibold  text-4xl">{anime.title}</h1>
                    <strong className="text-green-500 uppercase mt-4 block">
                      {anime.seasons.length}ª temporada já disponível
                    </strong>
                    <p className="max-w-6xl mt-4 leading-7 truncate-text lg:text-lg md:text-lg text-sm">
                      {anime.description}
                    </p>

                    <Link
                      href={`/anime/${anime.slug}`}
                      className="mt-8 font-bold font-white uppercase"
                    >
                      Assistir agora
                    </Link>
                  </div>
                </div>

                <picture className="absolute top-0 left-0 right-0 bottom-0 z-0">
                  <Image
                    className="h-screen w-full object-cover"
                    src={anime.banner}
                    width={3840}
                    height={2160}
                    alt=""
                  />
                  {/* <img
                    className="h-screen w-full object-cover"
                    src={anime.banner}
                    // layout="fill"
                    alt=""
                  /> */}
                </picture>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
