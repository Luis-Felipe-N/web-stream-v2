'use client'

import { getAnime } from "@/server/actions/animes/get-anime";
import { AnimeT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export function SearchResults() {
    const { data } = useQuery<AnimeT[]>({
        queryKey: [`animes`],
        queryFn: () => getAnime(),
    })

    console.log(data)

    return (
        <div className="relative z-20 mt-12">
            <strong className="">Recomendados para você</strong>

            <ul className="flex flex-wrap">
                {data &&
                    data.map((anime) => (
                        <li key={anime.id} className="aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2 border-transparent hover:border-slate-100 transition">
                            <Link href={`/anime/${anime.slug}`}>
                                <Image
                                    quality={100}
                                    width={308}
                                    height={404}
                                    className="h-full w-full object-cover"
                                    src={anime.cover}
                                    alt=""
                                ></Image>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}