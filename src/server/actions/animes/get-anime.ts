import { api } from '@/lib/api'

export async function getAnime(keyword = '') {
  const response = await api.get(`/animes?keyword=${keyword}`)

  const responseJson = await response.data

  return responseJson.animes
}
