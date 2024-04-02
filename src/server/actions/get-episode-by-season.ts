import { api } from '@/lib/api'

export async function getEpisodesBySeason(seasonId: string) {
  const response = await api.get(`episodes/season/${seasonId}`)

  const responseJson = await response.data

  return responseJson.episodes
}
