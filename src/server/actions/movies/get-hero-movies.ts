'use server'

export async function getHeroMovies() {

  const response = await fetch('https://play.watch.tv.br/api/hero/content', {
    method: 'post',
    body: JSON.stringify({
      contentType: 'filme',
      signal: {},
      unloggedToken: null,
    }),
    next: {
      revalidate: 60 * 60,
    },
  })

  const responseJson = await response.json()

  return responseJson
}
