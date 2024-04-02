import { api } from '@/lib/api'

export async function getAnimesByGenre(genre: string) {
  const response = await api.get(`animes/genre/${genre}`)

  const responseJson = await response.data

  return responseJson.animes
}
