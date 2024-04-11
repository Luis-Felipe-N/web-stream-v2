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
    params: { slug: string }
}

export default async function Search({ params }: AnimeProps) {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: [`animes`],
        queryFn: () => getAnime(),
    })

    return (
        <main
            className='grid px-4 md:px-8 lg:px-24'
        >
            <section className='mt-8 gap-8'>
                <SearchBar />
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <SearchResults />
                </HydrationBoundary>
            </section>
        </main>

    )
}