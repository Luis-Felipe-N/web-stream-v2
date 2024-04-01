export async function getAnimesByGenre(genre: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `animes/genre/${genre}`,
  )

  const responseJson = await response.json()

  return responseJson.animes
}
