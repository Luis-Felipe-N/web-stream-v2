import { api } from '@/lib/api'

export async function getPopularAnime() {
  const response = await api.get(`animes/popular`)

  const responseJson = await response.data

  return responseJson.animes
}
