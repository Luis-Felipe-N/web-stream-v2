import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

import Season from '@/components/season'
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query'
import AnimeHero from '@/components/anime-hero'
import { getAnime } from '@/server/actions/animes/get-anime'
import { SearchBar } from '@/components/search-bar'
import { SearchResults } from '@/components/search-results'


interface AnimeProps {
    searchParams: { keyword: string }
}

export default async function Search({ searchParams }: AnimeProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: [`animes@${searchParams.keyword}`],
        queryFn: () => getAnime(),
    })

    return (
        <main
            className='grid px-4 md:px-8 lg:px-24'
        >
            <section className='lg:mt-24 mt-48 gap-8'>
                <SearchBar />
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <SearchResults keyword={searchParams.keyword} />
                </HydrationBoundary>
            </section>
        </main>

    )
}
