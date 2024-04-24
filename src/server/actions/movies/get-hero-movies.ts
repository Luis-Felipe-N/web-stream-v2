import axios from 'axios'

export async function getHeroMovies() {
  const response = await axios.post('https://play.watch.tv.br/api/hero', {
    contentType: 'filme',
    unloggedToken: null,
    signal: {},
  })

  const responseJson = await response.data

  return responseJson
}
