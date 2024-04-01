import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { getAnimeBySlug } from '@/server/actions/get-anime-by-slug'

import { Plus } from 'lucide-react'
import { AnimeT } from '@/types'
import Season from '@/components/season'

interface AnimeProps {
  params: { slug: string }
}

export default async function Anime({ params }: AnimeProps) {
  const data: AnimeT = await getAnimeBySlug(params.slug)
  console.log(data)
  return (
    <main>
      <section className="h-[80vh]">
        <div className="h-screen relative flex items-end">
          <div className="relative z-10 bg-gradient-to-t w-full from-zinc-950 via-zinc-950/60 to-transparent">
            <div className="px-4 md:px-8 lg:px-24 py-64 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent">
              <h1 className="font-semibold  text-5xl">{data.title}</h1>
              <p className="mt-2 gap-3 flex items-center text-slate-300">
                {data.nsfw ? (
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
                {data.seasons.length} Temporadas
              </p>

              <Button className="mt-8 font-bold font-white uppercase" size="lg">
                Assistir 1T Ep.1
              </Button>

              <div className="mt-4">
                <Button className="flex items-center gap-2" variant="ghost">
                  <Plus />
                  <span>Minha Lista</span>
                </Button>

                {data.trailerYtId && (
                  <a
                    target="__black"
                    href={`https://www.youtube.com/watch?v=${data.trailerYtId}`}
                  ></a>
                )}
              </div>

              <p className="text-slate-300 max-w-6xl mt-8 leading-7 truncate-text lg:text-lg md:text-lg text-sm">
                {data.description}
              </p>
            </div>
          </div>

          <picture className="absolute top-0 left-0 right-0 bottom-0 z-0">
            {data.banner ? (
              <Image
                className="h-screen w-full object-cover"
                src={data.banner}
                width={3840}
                height={2160}
                alt=""
              />
            ) : (
              <Image
                className="h-screen w-full object-cover blur-md"
                src={data.cover}
                width={3840}
                height={2160}
                alt=""
              />
            )}
          </picture>
        </div>
      </section>

      <Season anime={data} />
    </main>
  )
}
