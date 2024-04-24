import { api } from '@/lib/api'

export async function getAnimeBySlug(slug: string) {

  const response = await api.get(`animes/${slug}`)

  const responseJson = await response.data

  await api.post('/animes', {
    slug: responseJson.anime.slug
  })

  return responseJson.anime
}
