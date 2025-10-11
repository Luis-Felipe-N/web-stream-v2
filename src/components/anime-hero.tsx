'use client'

import Link from 'next/link';
import Image from 'next/image'

import { AnimeT } from '@/types'
import { Button } from './ui/button'

import { motion } from "framer-motion";

import { Outfit } from 'next/font/google';
import { FaPlay, FaVideo } from 'react-icons/fa6'
import { useQuery } from '@tanstack/react-query';
import { fetchWatchedEpisodes } from '@/server/actions/episode/fetch-watched-episodes';
import { ProgressWatching } from './progress-watching';


const outfit = Outfit({ subsets: ['latin'] });

interface AnimeHeroProps {
  anime: AnimeT
  URLEpisodeToWatch: string
}

export default function AnimeHero({ anime, URLEpisodeToWatch }: AnimeHeroProps) {

  const banner = anime?.banner ? anime?.banner.split('?')[0] : anime.cover
  const { data: watchedEpisodes } = useQuery({
    queryKey: ['watchedEpisodes'],
    queryFn: () => fetchWatchedEpisodes(),
  })

  const watchedEpisodesByAnime = watchedEpisodes ? watchedEpisodes.filter(w => w.episode.season.animeId === anime.id) : undefined

  const lastWatchedEpisode = watchedEpisodesByAnime && watchedEpisodesByAnime[0]

  if (lastWatchedEpisode) {
    const URLEpisodeToWatch = `/episode/${lastWatchedEpisode.episodeId}`
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
      }} className='flex items-end lg:h-[80vh] md:h-[80vh] h-[75vh]'>
      <div
        className="flex items-end w-full h-full">
        <div className="h-full relative z-10 flex items-end w-full bg-gradient-to-t from-zinc-950/30 via-zinc-950/30 to-transparent" style={{ backgroundSize: 'cover', backgroundImage: `url(${banner})` }}>
          <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:py-16 py-8 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent">
            <div className='lg:space-y-6 space-y-4'>
              <h1 className={`font-semibold lg:text-5xl text-3xl ${outfit.className}`}>{anime.title}</h1>

              <div className='flex gap-4'>
                <p className=" gap-3 flex items-center text-zinc-400">
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
                <div className="flex text-zinc-400 gap-2 text-base">
                  {anime.genres.map((genre) => (
                    <p key={genre.title}>{genre.title}</p>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link href={URLEpisodeToWatch}>
                  <Button className='gap-2 font-bold text-base px-8 py-7 relative overflow-hidden'>
                    <FaPlay />

                    {lastWatchedEpisode ? (
                      <div>
                        Continue Ep. {lastWatchedEpisode.episode.title.split(' ')[1]}
                        <ProgressWatching watched={lastWatchedEpisode} className="bg-white" />
                      </div>
                    ) : 'Assistir Agora'}

                  </Button>
                </Link>

                {!!anime.trailerYtId && (
                  <Button size='icon' variant="ghost" className='px-6 py-6 bg-[#FFFFFF26]' title='Assista o trailer'>
                    <a
                      target="__black"
                      href={`https://www.youtube.com/watch?v=${anime.trailerYtId}`}
                    >
                      <FaVideo size={18} />
                    </a>
                  </Button>

                )}
              </div>

              <p className="text-zinc-200 max-w-5xl leading-5 truncate-text lg:text-base md:text-lg text-sm">
                {anime.description}
              </p>

            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-zinc-950 via-zinc-950/0 to-transparent z-0 h-[100rem]"></div>
        </div>
      </div>
    </motion.section>
  )
}
