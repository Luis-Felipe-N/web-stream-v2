'use client'

import { getAnime } from "@/server/actions/animes/get-anime";
import { AnimeT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResultsProps {
    keyword: string
}

export function SearchResults({ keyword }: SearchResultsProps) {
    const { data } = useQuery<AnimeT[]>({
        queryKey: [`animes@${keyword}`],
        queryFn: () => getAnime(keyword),
    })

    console.log({ data })

    return (
        <div className="relative z-20 mt-12">
            <strong className="mb-2 block">{keyword ? `Resultados para: ${keyword}` : "Recomendados para você"}</strong>

            <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
                {data &&
                    data.map((anime) => (
                        <li key={anime.id} className="h-full w-full border-2 border-transparent hover:border-slate-100 transition">
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
            </ul >
        </div >
    )
}