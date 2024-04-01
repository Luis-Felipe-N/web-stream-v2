'use client'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { getAnimesByGenre } from '@/server/actions/get-animes-by-genre'
import Link from 'next/link'
import { Anime } from '@/types'

interface RailProps {
  title: string
  query?: string
  genre: string
}

export default function RailGenres({ title, query, genre }: RailProps) {
  const { data } = useQuery<Anime[]>({
    queryKey: [query],
    queryFn: () => getAnimesByGenre(genre),
  })

  return (
    <section className="lg:px-24 lg:py-8 p-4 relative z-20">
      <strong className="text-xl">{title}</strong>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        pagination={true}
        modules={[Pagination]}
        className="w-full mt-4"
      >
        {data &&
          data.map((anime) => (
            <SwiperSlide className="swiper-slide-perview" key={anime.id}>
              <div className="aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem]">
                <Link href={`/anime/${anime.slug}`}>
                  <Image
                    width={308}
                    height={404}
                    className="h-full w-full object-cover"
                    src={anime.cover}
                    alt=""
                  ></Image>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
