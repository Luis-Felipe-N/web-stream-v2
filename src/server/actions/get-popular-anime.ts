'use server'

export async function getPopularAnime() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + 'animes/popular',
  )

  console.log(process.env.NEXT_PUBLIC_API_URL, response)

  const responseJson = await response.json()

  return responseJson.animes
}
