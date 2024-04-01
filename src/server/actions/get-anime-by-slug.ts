export async function getAnimeBySlug(slug: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `animes/${slug}`,
  )

  console.log(process.env.NEXT_PUBLIC_API_URL, response)

  const responseJson = await response.json()

  return responseJson.anime
}
