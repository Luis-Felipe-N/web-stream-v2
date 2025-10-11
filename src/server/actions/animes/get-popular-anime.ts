import { api } from '@/lib/api'
import type { AnimeT } from '@/types'

export async function getPopularAnime(): Promise<AnimeT[]> {
  const response = await api.get(`animes/popular`)

  const responseJson = await response.data

  return responseJson.animes
}
