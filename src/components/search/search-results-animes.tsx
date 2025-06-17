'use client'

import { AnimeT } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
interface SearchResultsProps {
    animes: AnimeT[]
}

export function SearchResultsAnimes({ animes }: SearchResultsProps) {
    if (animes && !animes.length) {
        return (
            <div>
                <ul className=" gap-2 ">
                    <h1 className="text-center text-2xl font-bold ">Nenhum anime encontrado :/</h1>
                </ul >
            </div >
        )
    }

    return (
        <div>
            <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
                {animes &&
                    animes.map((anime) => (
                        <motion.li
                            key={anime.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="h-full w-full border-2 border-transparent hover:border-slate-100 transition" // Apply styling here
                        >
                            <Link href={`/anime/${anime.slug}`}>
                                <img
                                    width={308}
                                    height={404}
                                    className="h-full w-full object-cover"
                                    src={anime.cover}
                                    alt=""
                                />
                            </Link>
                        </motion.li>
                    ))
                }
            </ul >
        </div >
    )
}