import { api } from '@/lib/api'

interface GetNextEpisodeProps {
  seasonId: string
  animeId: string
  currentIndex: number
}

export async function getNextEpisode({
  seasonId,
  animeId,
  currentIndex,
}: GetNextEpisodeProps) {
  const response = await api.post(`episodes/next`, {
    seasonId,
    animeId,
    currentIndex,
  })

  const responseJson = await response.data

  return responseJson.episode
}
