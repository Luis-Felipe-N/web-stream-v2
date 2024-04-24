import axios from 'axios'

export async function getMovieById(movieId: number) {
  const response = await axios.post(
    'https://play.watch.tv.br/api/content-info',
    {
      id: movieId,
      id_perfil: "6767556",
      signal: {},
      tipo: "filme",
    },
  )
  console.log(response)
  const responseJson = await response.data

  return responseJson.list
}
