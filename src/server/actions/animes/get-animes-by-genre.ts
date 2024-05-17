import { api } from "@/data/api"


export async function getAnimesByGenre(genre: string) {
  const response = await api(`animes/genre/${genre}`, {
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
  })


  const responseJson = await response.json()
  console.log(responseJson)

  return responseJson.animes
}
