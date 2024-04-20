'use client'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import Link from 'next/link'
import { AnimeT } from '@/types'
import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'
import { getAnimesByGenre } from '@/server/actions/animes/get-animes-by-genre'

interface RailBannerProps {
  title: string
  query?: string
  genre: string
}

export default function RailBanner({ title, query, genre }: RailBannerProps) {
  const { data } = useQuery<AnimeT[]>({
    queryKey: ['popular'],
    queryFn: getPopularAnime,
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
        {data &&
          data.map((anime) => (
            <SwiperSlide className="swiper-slide-perview" key={anime.id}>
              <div className="aspect-[4/3] lg:w-[35rem] lg:h-[19.75rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2 border-transparent hover:border-slate-100 transition relative">
                <Link href={`/anime/${anime.slug}`}>
                  <Image
                    quality={100}
                    width={563}
                    height={316}
                    className="h-full w-full object-cover"
                    src={anime.banner}
                    alt=""
                  ></Image>
                </Link>
                <div className='bg-gradient-to-tr from-slate-900/30 via-slate-900/10 to-transparent absolute bottom-0 p-4 pt-20'>
                  <h1 className='text-xl font-semibold'>{anime.title}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
