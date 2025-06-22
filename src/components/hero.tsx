'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'

import { AnimeT } from '@/types'
import { motion } from "framer-motion";
import HeroItem from './hero-item'

interface HeroProps {
  data: AnimeT[]
}

export default function Hero({ data }: HeroProps) {

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }}
      className="flex items-end lg:h-[80vh] md:h-[70vh] h-[60vh]">
      <div className='w-full h-full'>
        <Swiper
          autoplay={{
            delay: 20000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className='w-full h-full'
        >
          {data &&
            data.map((anime) => (
              <SwiperSlide key={anime.id}>
                <HeroItem data={anime} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </motion.section>
  )
}
