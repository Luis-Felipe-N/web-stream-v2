'use client'

import Image from 'next/image'

import { MovieD, MovieT } from '@/types'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { watchBrasilContext } from '@/context/WatchBrasilUserContext'
import { useContext } from 'react'
import { Loader2 } from 'lucide-react'


interface MovieHeroProps {
  movie: MovieD
}

export default function MovieHero({ movie, }: MovieHeroProps) {
  const { user } = useContext(watchBrasilContext);

  return (
    <>
      {user ? (
        <div className="flex items-end lg:h-[90vh] md:h-[70vh] h-[60vh]" style={{ backgroundSize: 'cover', backgroundImage: `url(${`https://cdnsecakmi.kaltura.com/api_v3/index.php/service/thumbAsset/action/serve/thumbAssetId/${movie.highlight}/ks/${user.ks}`})` }}>
          <div className="relative z-10 flex items-end w-full bg-gradient-to-t from-slate-950/30 via-slate-950/30 to-transparent">
            <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:py-14 py-12 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
              <h1 className="font-semibold  text-4xl">{movie.title}</h1>
              <strong className=" mt-4 block lg:text-base text-sm">
                Elenco principal: {movie.actors}
              </strong>
              <p className="max-w-6xl mt-4 truncate-text lg:text md:text-sm text-xs">
                {movie.synopsis}
              </p>

              <div className="flex text-zinc-400 gap-4 mt-2">
                {movie.genres.split(', ').map((genre) => (
                  <p key={genre}>{genre}</p>
                ))}
              </div>

              <Link
                href={`/movie/show/${movie.id}`}
                className="mt-4 rounded-md bg- font-bold font-white uppercase bg-slate-700/80 hover:bg-slate-800/80 transition px-8 py-4 inline-block"
              >
                Assistir agora
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950 via-slate-950/0 to-transparent z-0 h-[100rem]"></div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key="loading"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: .5,
              delay: .2
            }}
            className='absolute top-0 bottom-0 left-0 right-0 grid place-items-center z-50 bg-slate-950'>
            <Loader2 className="mr-2 h-10 w-10 animate-spin text-zinc-500" />
          </motion.div>
        </AnimatePresence >
      )
      }
    </>
  )
}
