'use client'

import Image from 'next/image'

import { AnimeT } from '@/types'
import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'
import { Button } from './ui/button'

import { useQuery } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnimeHeroProps {
  anime: AnimeT
}

export default function AnimeHero({ anime }: AnimeHeroProps) {

  const banner = anime?.banner ? anime?.banner.split('?')[0] : anime.cover

  return (
    <>
      <div
        className="flex items-end w-full h-full">
        <div className="h-full relative z-10 flex items-end w-full bg-gradient-to-t from-slate-950/30 via-slate-950/30 to-transparent" style={{ backgroundSize: 'cover', backgroundImage: `url(${banner})` }}>
          <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:py-16 py-8 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
            <div className='lg:space-y-6 space-y-4'>
              <h1 className="font-semibold lg:text-5xl text-3xl">{anime.title}</h1>
              <p className=" gap-3 flex items-center text-slate-300">
                {anime.nsfw ? (
                  <Image
                    className="rounded"
                    src="/NR18-AUTO.jpg"
                    width={20}
                    height={20}
                    alt="Conteúdo para maiores de 18 anos"
                  />
                ) : (
                  <Image
                    className="rounded"
                    src="/NR16-AUTO.jpg"
                    width={20}
                    height={20}
                    alt="Conteúdo para maiores de 16 anos"
                  />
                )}
                {anime.seasons.length} Temporadas
              </p>

              <Button className="font-bold font-white uppercase h-10 px-4 py-2 text-sm lg:h-14 rounded-md lg:px-12 lg:text-base" size="md">
                Assistir 1T Ep.1
              </Button>

              <div className="">
                <Button className="flex items-center gap-2" variant="ghost">
                  <Plus />
                  <span>Minha Lista</span>
                </Button>

                {anime.trailerYtId && (
                  <a
                    target="__black"
                    href={`https://www.youtube.com/watch?v=${anime.trailerYtId}`}
                  ></a>
                )}
              </div>

              <p className="text-zinc-200 max-w-6xl leading-7 truncate-text lg:text-lg md:text-lg text-sm">
                {anime.description}
              </p>

              <div className="flex text-zinc-400 gap-4">
                {anime.genres.map((genre) => (
                  <p key={genre.title}>{genre.title}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950 via-slate-950/0 to-transparent z-0 h-[100rem]"></div>
        </div>
      </div>
    </>
  )
}
