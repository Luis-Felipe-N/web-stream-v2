'use server'

import axios from 'axios'

export async function getMoviesByGenre(genreId: number) {
  const response = await axios.post(
    'https://play.watch.tv.br/api/content-list',
    {
      contentType: 'movie',
      get_tvod: 0,
      id: genreId,
      page: 1,
      signal: {},
      size: 30
    },
  )
  const responseJson = await response.data

  return responseJson.list
}
