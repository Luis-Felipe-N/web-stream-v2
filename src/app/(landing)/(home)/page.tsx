import Rail from '@/components/rail'
import Hero from '@/components/hero'
import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'
import { KeepWatching } from '@/components/keep-watching';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assista Animes Populares Online | Web Stream',
  description: 'Descubra e assista a uma vasta coleção de animes populares, incluindo os últimos lançamentos e clássicos. Explore diversos gêneros e encontre seu próximo anime favorito em Web Stream.',
  keywords: 'anime, streaming de anime, assistir anime online, animes populares, animes novos, lançamentos de animes, WebStream V2',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Assista Animes Populares Online | Web Stream',
    description: 'Descubra e assista a uma vasta coleção de animes populares e novos em Web Stream.',
    url: 'https://www.seusite.com',
    images: [
      {
        url: 'https://www.seusite.com/og-image-home.png',
        width: 1200,
        height: 630,
        alt: 'Seu Nome de Stream - Plataforma de Streaming de Anime',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assista Animes Populares Online | Seu Nome de Stream',
    description: 'Descubra e assista a uma vasta coleção de animes populares e novos em Seu Nome de Stream.',
    images: ['/imge.png'],
    creator: '@luis_ponto_py',
  },
};


export default async function Home() {
  const data = await getPopularAnime()

  return (
    <>
      <main>
        <Hero data={data} />

        <KeepWatching />
        <Rail />
      </main>
    </>
  )
}
