import type { Metadata, ResolvingMetadata } from 'next';

import Season from '@/components/season'
import AnimeHero from '@/components/anime-hero'

import { AnimeT } from '@/types'
import { getURLEpisodeToWatch } from '@/utils/get-url-episode-to-watch';
import { getAnimeBySlug } from '@/server/actions/animes/get-anime-by-slug'

interface AnimeProps {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: AnimeProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const anime: AnimeT = await getAnimeBySlug(slug);

  if (!anime) {
    return {
      title: 'Anime Não Encontrado | Web Stream',
      description: 'A página de anime que você está procurando não foi encontrada.',
    };
  }

  const siteName = 'Web Stream';
  const title = `Assistir ${anime.title} Online Completo | ${siteName}`;
  const description = anime.description
    ? anime.description.substring(0, 155) + (anime.description.length > 155 ? '...' : '')
    : `Assista todos os episódios de ${anime.title} online em alta qualidade em ${siteName}. Descubra mais sobre ${anime.title}, incluindo temporadas, episódios e informações de transmissão.`;

  const keywords = [
    anime.title,
    'assistir anime',
    'anime online',
    'streaming de anime',
    ...anime.genres.map(g => g.title),
    'dublado',
    'legendado',
    siteName,
  ].join(', ');


  const imageUrl = anime.banner || anime.cover; //

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `/anime/${slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      siteName: siteName,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Banner de ${anime.title}`,
        },
      ] : [],
      locale: 'pt_BR',
      type: 'video.tv_show',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],

    },
  };
}

export default async function Anime({ params }: AnimeProps) {
  const anime: AnimeT = await getAnimeBySlug(params.slug)

  const URLEpisodeToWatch = await getURLEpisodeToWatch(anime)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: anime.title,
    description: anime.description,
    image: anime.banner || anime.cover,
    numberOfSeasons: anime.seasons ? anime.seasons.length.toString() : undefined,
    genres: anime.genres.map(g => g.title),
    trailer: anime.trailerYtId ? `https://www.youtube.com/watch?v=${anime.trailerYtId}` : undefined,
  };

  return (
    <main className='pb-24'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnimeHero anime={anime} URLEpisodeToWatch={URLEpisodeToWatch} />


      <Season anime={anime} />
    </main>
  )
}
