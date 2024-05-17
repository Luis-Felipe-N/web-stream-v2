// 'use server' 

import { AnimeT } from "@/types"
import Image from "next/image"
import Link from "next/link"
import LazyYoutube from "./lazy-youtube"
import { useSwiperSlide } from "swiper/react"
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react"
import { valideYoutubeVideoId } from "@/utils/valide-yotube-video-id"

interface HeroItemProps {
    data: AnimeT
}

export default function HeroItem({ data }: HeroItemProps) {
    const swiperSlide = useSwiperSlide();


    return (
        <>
            <div className="h-full relative z-10 flex items-end w-full bg-gradient-to-t from-slate-950/30 via-slate-950/30 to-transparent" style={{ backgroundSize: 'cover', backgroundImage: `url(${data.banner})` }}>
                <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:pb-32 pb-12 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
                    <h1 className="font-semibold  text-4xl">{data.title}</h1>
                    <strong className="text-green-500 uppercase mt-4 block lg:text-base text-sm">
                        {data.seasons.length}ª temporada já disponível
                    </strong>
                    <p className="max-w-6xl mt-4 truncate-text lg:text md:text-sm text-xs">
                        {data.description}
                    </p>

                    <Link
                        href={`/ anime / ${data.slug}`}
                        className="mt-4 rounded-md bg- font-bold font-white uppercase bg-slate-700/80 hover:bg-slate-800/80 transition px-8 py-4 inline-block"
                    >
                        Assistir agora
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950 via-slate-950/0 to-transparent z-0 h-[100rem]"></div>
            </div>
        </>
    )
}