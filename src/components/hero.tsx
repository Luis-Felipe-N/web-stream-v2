'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import { Pagination } from 'swiper/modules'

export function Hero() {
  return (
    <section className="h-[80vh]">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <div className="h-screen relative flex items-end ">
            <div className="relative z-10 p-24 pb-56 max-w-7xl bg-clip-text bg-gradient-to-tr from-zinc-900 via-slate-50 to-slate-50">
              <h1 className="text-3xl font-semibold">Solo Revenge</h1>
              <p className="mt-4">
                Há mais de uma década, surgiu uma misteriosa passagem chamada
                "portal", que conecta este mundo a uma dimensão diferente, o que
                fez com que pessoas despertassem poderes únicos… e essas pessoas
                são chamadas de "caçadores". Os caçadores usam seus poderes
                sobre-humanos para conquistar masmorras dentro dos portais e
                assim ganhar a vida.
              </p>
            </div>

            <picture className="absolute top-0 left-0 right-0 bottom-0 z-0">
              <img
                className="h-screen w-full object-cover"
                src="https://wwwimage-intl.pplusstatic.com/thumbnails/photos/w1920-q80/marquee/11/66/43/3/hero_landscape_d6c6597f-5f07-4d3d-a95b-8cd586d7cd1e.jpg"
                alt=""
              />
            </picture>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </section>
  )
}
{
  /* <section
      className="h-1/6"
      style={{
        backgroundImage:
          '',
      }}
    >
      <h1>Solo Revenge</h1>
    </section> */
}
