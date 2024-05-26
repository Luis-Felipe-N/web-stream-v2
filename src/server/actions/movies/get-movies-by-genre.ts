'use server'

import { api } from '@/data/api'

export async function getMoviesByGenre(genreId: number, size = 30) {
  const response = await api(
    'https://play.watch.tv.br/api/content-list',
    {
      method: 'post',
      body: JSON.stringify({
        contentType: 'movie',
        get_tvod: 1,
        id: genreId,
        page: 1,
        signal: {},
        size,
        variance: 4
      },),
      next: {
        revalidate: 60 * 60 * 24, // 1 hours
      },
    }
  )
  const responseJson = await response.json()

  return responseJson.list
}
