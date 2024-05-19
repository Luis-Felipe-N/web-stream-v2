import { getAnime } from '@/server/actions/animes/get-anime'
import { SearchBar } from '@/components/search/search-bar'
import { SearchResultsAnimes } from '@/components/search/search-results-animes'
import { SearchResultsMovies } from '@/components/search/search-results-movies'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getMoviesByGenre } from '@/server/actions/movies/get-movies-by-genre'


interface AnimeProps {
    searchParams: { keyword: string }
}

async function search(keyword: string) {
    const animes = await getAnime(keyword)

    return { animes }
}

export default async function Search({ searchParams }: AnimeProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['movies'],
        queryFn: () => getMoviesByGenre(22, 6),
    })

    const results = await search(searchParams.keyword)

    return (
        <main
            className='grid px-4 md:px-8 lg:px-24'
        >
            <section className='lg:mt-24 mt-48 gap-8'>
                <SearchBar />
                <div className="relative z-20 mt-12">
                    <strong className="mb-2 block">{searchParams.keyword ? `Resultados para: ${searchParams.keyword}` : "Recomendados para você"}</strong>

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <SearchResultsMovies keyword={searchParams.keyword} />
                    </HydrationBoundary>


                </div >

                <div className="relative z-20 mt-12">
                    <strong className="mb-2 block">{searchParams.keyword ? `Resultados para: ${searchParams.keyword}` : "Recomendados para você"}</strong>

                    <SearchResultsAnimes animes={results.animes} />
                </div >
            </section>
        </main>

    )
}
