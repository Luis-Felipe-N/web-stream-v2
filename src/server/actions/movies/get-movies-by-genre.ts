'use server'

import { api } from '@/data/api'
import { getSession } from './get-session';

export async function getMoviesByGenre(genreId: number, size = 30) {

  const { wtk, token } = await getSession()
  console.log({ wtk, token })
  const cookie = `deviceUuid=d4d0-47c1-89e0-4a5d-0d73-70f1; __Host-next-auth.csrf-token=425843e8f14032c2829f4a38abb757e906bd44b4ab8230864b8398996050a453%7Cb49d26df585e7deb9640c664668af300dcd70a000ea8b06dd9370a5d7ce4d8ee; __Secure-next-auth.callback-url=https%3A%2F%2Fplay.watch.tv.br%2Fselecionar-perfil%3Fredirect%3D%252Fhome; pid=Njc2NzU1Ng%3D%3D; active_profile=%7B%22ageBracket%22%3A18%2C%22id%22%3A6767556%2C%22isMaster%22%3Atrue%2C%22name%22%3A%22Luis%20Felipe%20Nunes%22%2C%22photo%22%3A%22%22%2C%22isKidsProfile%22%3Afalse%2C%22liveContentEnabled%22%3Atrue%2C%22usePin%22%3Afalse%2C%22userId%22%3Anull%2C%22ks%22%3Anull%7D; wtk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZCI6IldBVCIsImRldmljZV9pZCI6OTc4MCwibG9naW5fdGltZXN0YW1wIjoxNzM2MjY1NjcwMDAwLCJzdWIiOjE4NzAxOTUsInVzZXJfaWQiOjE4NzAxOTUsImlhdCI6MTczNjI2NTY3MCwiZXhwIjoxNzM2MjY5MjcwLCJwcm9maWxlX2lkIjo2NzY3NTU2fQ.lvPvGNv4Sc1K-o4sCnBOzrYguqUHGYnscE3J9Uq91Pw; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..rKmyXG2vuGCKy_V2.A12L6rm7EAaKsw9r1A_kAK0ZNdaVTJWVqFTmcdJ5l9NrDRTOhwUbH6VoIydPythIZHnPvHoQH_rkKufAg40omp7bHAq7m4fioISx7LWFACwrdnJTjnw9-H7Rz7SJKxPn4R9rlW6tn-gOrE-8cgH0O0eG3_pzcu942iPU-J0r7ueieuwE2gM1QAyJ_UtcFwF-8JTgAJBftxUBWzeqtnjJjFhX3unLo9-BGw1BSfzxYhYedsg7rWxzTCfp3djCxHL0K7PaG8LMrPKm2XweCwESDADZqpfwLwJ4uvgJPaUqd21FLf4IqNRAcbMV9j_4TSqJO1LlO_3Jm-Fv5_UcH478UUUSs43MkEC2DCZF4sEIMosVTKOYs965QPHSMT25biwk_Xt0wmWV5zjpcg6W5EEeabtLcrs8Sm79UIC-He5LA8Gz3PjQle-M3CurpfOb8YWHGcldFZ2cwGIyYtCoNE45otBkiDwoQpazEUTTpxDY6B0x7rZMRX8ZYMF5h4DuGaF83jjTp1RvdbXU_KZgFY7k8m0nvemfB6MBggCxBuOilGszbVpA51DvWqMZVWGHKqsq2ZegNSxD7dbMiVg9iRz9spWkTH1fREFEhh7L5VQ4DAL0CfBZOa58pdcV_1RY9yBSxh8IU1UUYAv-XWYYqH5hsmbSu2jHL2dWlS7g1itB6I98dMmetAd9ALkpGauopwFA5wkATD4kaNmEvkZAXP3LyFuQ9kvFQ_R4eFIUhSIXUILdlCs0yiksLq0nfp_wZ7BfkH_yQhTnl7mVG6HuNiKpiN3R0gJ8t0pPE7S1lrh9wXLFFUP8dtBxtsIgH14yv3HoVPjvvcx-0jlfn-2mwYbYG2WCQI3Aw0yadjyojQwp7J-ADtkr0B4CPgTsRMX-DdYP_O7_ENr9D36JWPJdcJMz8m4L978U2Yrye1a4vjZu8i24KW9lNn54WK8F2Bzi.Qac-wStbNUKs7PVF-tM7BQ`

  const config = {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.6',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Cookie': cookie,
      'Pragma': 'no-cache',
      'Sec-Ch-Ua': '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Linux"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Gpc': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    }
  };


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
      ...config
    }
  )
  const responseJson = await response.json()
  console.log({ responseJson })
  return responseJson.list
}
