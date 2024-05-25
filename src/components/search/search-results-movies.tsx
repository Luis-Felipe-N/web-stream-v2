'use client'

import { watchBrasilContext } from '@/context/WatchBrasilUserContext'
import { getMoviesByGenre } from '@/server/actions/movies/get-movies-by-genre';
import { searchMovie } from "@/server/actions/movies/search-movie";
import { MovieD } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Skeleton } from '../ui/skeleton';


interface SearchResultsMoviesProps {
    keyword: string
}

interface SearchResultsMoviesListProps {
    movies: MovieD[] | undefined
    user: any
}

const SearchResultsMoviesList = ({ movies, user }: SearchResultsMoviesListProps) => (
    <div>
        <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
            {movies &&
                movies.map((movie) => (
                    <li key={movie.id} className="h-full w-full border-2 border-transparent hover:border-slate-100 transition">
                        <Link href={`/movie/${movie.id}`}>
                            <img
                                width={308}
                                height={404}
                                className="h-full w-full object-cover"
                                src={`https://cdnsecakmi.kaltura.com/api_v3/index.php/service/thumbAsset/action/serve/thumbAssetId/${movie.highlight}/ks/${user.ks}`}
                                alt=""
                            />
                        </Link>
                    </li>
                ))
            }
        </ul >
    </div >
)

const SearchResultsMoviesLoading = () => (
    <div>
        <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
            <li className="h-full w-full border-2 border-transparent hover:border-slate-100 transition">
                <Skeleton className="w-308 h-404"></Skeleton>
                <Skeleton className="w-308 h-404"></Skeleton>
                <Skeleton className="w-308 h-404"></Skeleton>
                <Skeleton className="w-308 h-404"></Skeleton>
                <Skeleton className="w-308 h-404"></Skeleton>
                <Skeleton className="w-308 h-404"></Skeleton>
            </li>
        </ul >
    </div >
)

export function SearchResultsMovies({ keyword }: SearchResultsMoviesProps) {
    const { user } = useContext(watchBrasilContext);

    if (keyword) {
        const { data: movies, isFetching } = useQuery<MovieD[]>({
            queryKey: [`movies@${keyword}`],
            queryFn: () => searchMovie(keyword),
            enabled: !!user
        })

        if (!user) return null

        if (isFetching) return (
            <SearchResultsMoviesLoading />
        )

        return (
            <SearchResultsMoviesList movies={movies} user={user} />
        )
    } else {
        const { data: movies, isFetching } = useQuery<MovieD[]>({
            queryKey: ['movies'],
            queryFn: () => getMoviesByGenre(22, 6),
        })

        if (!user) return null

        if (isFetching) return (
            <SearchResultsMoviesLoading />
        )

        return (
            <SearchResultsMoviesList movies={movies} user={user} />
        )
    }
}