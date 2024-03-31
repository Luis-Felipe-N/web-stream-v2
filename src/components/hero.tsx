'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import { Pagination } from 'swiper/modules'
import { Button } from './ui/button'
import { getPopularAnime } from '@/server/actions/get-popular-anime'
import { useQuery } from '@tanstack/react-query'
import { Anime } from '@/types/anime'

export function Hero() {
  const { data } = useQuery<Anime[]>({
    queryKey: ['popular'],
    queryFn: getPopularAnime,
  })

  console.log(data)

  return (
    <section className="h-[80vh] -mt-20">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {data.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="h-screen relative flex items-end">
              <div className="relative z-10 bg-gradient-to-t w-full from-zinc-900 via-zinc-900/80 to-transparent">
                <div className="p-24 py-56 max-w-7xl bg-gradient-to-tr from-zinc-900 via-transparent to-transparent">
                  <h1 className="text-3xl font-semibold">{anime.title}</h1>
                  <strong className="text-green-500 uppercase mt-4 block">
                    2ª temporada já disponível
                  </strong>
                  <p className="mt-4 leading-7">{anime.description}</p>

                  <Button
                    className="mt-8 font-bold font-white uppercase"
                    size="lg"
                  >
                    Assistir agora
                  </Button>
                </div>
              </div>

              <picture className="absolute top-0 left-0 right-0 bottom-0 z-0">
                <img
                  className="h-screen w-full object-cover"
                  src={anime.banner}
                  alt=""
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
