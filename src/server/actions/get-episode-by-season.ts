export async function getEpisodesBySeason(seasonId: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `episodes/season/${seasonId}`,
  )

  const responseJson = await response.json()
  console.log(response)
  return responseJson.episodes
}
