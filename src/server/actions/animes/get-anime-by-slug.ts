import { api } from '@/lib/api'

export async function getAnimeBySlug(slug: string) {
  // await new Promise((resolse) => setTimeout(resolse, 10000))

  const response = await api.get(`animes/${slug}`)

  const responseJson = await response.data

  return responseJson.anime
}
