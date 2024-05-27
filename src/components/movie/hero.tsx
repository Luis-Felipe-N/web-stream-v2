'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { MovieHeroT, MovieT } from '@/types'
import { motion } from "framer-motion";
import { getHeroMovies } from '@/server/actions/movies/get-hero-movies'


export default function Hero() {
  const { data } = useQuery<MovieHeroT[]>({
    queryKey: ['movieshero'],
    queryFn: getHeroMovies,
  })

  console.log(data)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
      className="flex items-end lg:h-[90vh] md:h-[70vh] h-[60vh]">
      <div className='w-full'>
        <Swiper
          autoplay={{
            delay: 4500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {data &&
            data.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="lg:h-screen h-[70vh] flex items-end">
                  <div className="relative z-10  w-full bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent">
                    <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:pb-32 pb-12 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
                      <h1 className="font-semibold  text-4xl">{movie.title}</h1>
                      <p className="max-w-6xl mt-4 truncate-text lg:text md:text-sm text-xs">
                        {movie.synopsis}
                      </p>

                      <Link
                        href={`/movie/${movie.id}`}
                        className="mt-4 rounded-md bg- font-bold font-white uppercase bg-slate-700/80 hover:bg-slate-800/80 transition px-8 py-4 inline-block"
                      >
                        Assistir agora
                      </Link>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-0 h-[40rem]"></div>
                  </div>

                  <picture className="absolute top-0 left-0 right-0 bottom-0 z-0">
                    <img
                      className="h-full w-full object-cover"
                      src={`https://watchbr-resources.s3.amazonaws.com/highlights/${movie.images.p2048x840}`}
                      width={3840}
                      height={2160}
                      alt=""
                    />
                  </picture>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </motion.section>
  )
}
