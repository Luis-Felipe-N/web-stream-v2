'use client'

import { watchBrasilContext } from '@/context/WatchBrasilUserContext'
import { AnimeT, MovieD } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface SearchResultsProps {
    animes: AnimeT[]
}

export function SearchResultsAnimes({ animes }: SearchResultsProps) {

    return (
        <div>
            <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
                {animes &&
                    animes.map((anime) => (
                        <li key={anime.id} className="h-full w-full border-2 border-transparent hover:border-slate-100 transition">
                            <Link href={`/anime/${anime.slug}`}>
                                <img
                                    width={308}
                                    height={404}
                                    className="h-full w-full object-cover"
                                    src={anime.cover}
                                    alt=""
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul >
        </div >
    )
}