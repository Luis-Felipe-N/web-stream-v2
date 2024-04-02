'use server'

import { api } from '@/lib/api'

export async function getRecommendedAnime() {
  const response = await api.get(`animes/recommended`)

  const responseJson = await response.data

  return responseJson.animes
}
