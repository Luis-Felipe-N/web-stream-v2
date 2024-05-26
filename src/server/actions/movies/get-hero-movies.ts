'use server'

export async function getHeroMovies() {
  const response = await fetch('https://play.watch.tv.br/api/hero', {
    method: 'post',
    body: JSON.stringify({
      contentType: 'filme',
      unloggedToken: null,
      signal: {},
    }),
    next: {
      revalidate: 60 * 60, // 1 hours
    },

  })

  const responseJson = await response.json()

  return responseJson
}
