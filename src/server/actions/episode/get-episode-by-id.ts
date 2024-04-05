import { api } from '@/lib/api'

export async function getEpisodesById(id: string) {
  const response = await api.get(`episodes/${id}`)

  const responseJson = await response.data

  return responseJson.episode
}
