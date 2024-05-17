import { api } from "@/data/api"

export async function getAnime(keyword = '') {
  const response = await api(`/animes?keyword=${keyword}`, {
    next: {
      revalidate: 60 * 60, // 1 hours
    },
  })

  const responseJson = await response.json()

  return responseJson.animes
}
