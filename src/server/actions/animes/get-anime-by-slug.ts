import { api } from '@/data/api'

export async function getAnimeBySlug(slug: string) {

  const response = await api(`animes/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hours
    },
  })

  const responseJson = await response.json()

  return responseJson.anime
}
