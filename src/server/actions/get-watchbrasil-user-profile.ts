'use server'

import { api } from '@/data/api';
import { getSession } from './movies/get-session';


export async function getWatchBrasilUserProfile() {
  const token = getSession()

  const config = {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.6',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Cookie': `__Host-next-auth.csrf-token=cb037e9047ef5a66a390b39b810e069837bc3fe477c6d62d870662c44b039781%7C1c0be8c5de93c852c79cdfdbd6f4e75715f5a8aaaafb865ada31c0125397dd84; __Secure-next-auth.callback-url=https%3A%2F%2Fplay.watch.tv.br%2Fselecionar-perfil%3Fredirect%3D%2Fhome; wtk=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0aDIud2F0Y2gudHYuYnIvYXBpL3Y0L2F1dGgiLCJpYXQiOjE3MTY3NTU0MDgsImV4cCI6MTczMjMwNzQwOCwibmJmIjoxNzE2NzU1NDA4LCJqdGkiOiJYdEFPNFB3SGF3S0sxTXRlIiwic3ViIjoiMTg3MDE5NSIsInBydiI6IjdhZTRlY2QyNWI3NjZhM2Y0ZWI0YzZmZjU5MDI0NzEzZWU0MThiZDEiLCJicmFuZCI6IndhdGNoIn0.SwMDoVp7Q6MuZRpJSpHFrD9nuewLjk-aRI6U5U4il-U; deviceUuid=3ecc-984d-30a7-2829-447e-9a81; pid=6767556; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..yPrAUVlNUiX0vSFa.lqF8fhXsG9bePawB9IMhxx2VquauqFWrfDQnNV9ChVuYCSW2MPngA_nr-o0VfQkPqhurXOOO2pg52suuIw6uMs45XEjL8VaBVxPhT2Uft26eK0nLB-scBky5T2nZy_Pg87IzJ_03kOqPBJb6V3rq59hvSfTqzNFyNP-e2JWqwCyM5gRHvQHI7OgNd2dFQvnxKyOW_KWKiTD30o0WX5ZueGYSqTUzOuKo7pzrlTX8AYPJljqXXR1dP891jLPopkUwfx0kZffeLsGVcDPxSqfulHpzFwxNyWE4DQWeAkQMrKWnOjrhbU7S9HyLTNPKWY0VgjTp_R25wQWGWQ9FRpq8WrSzWvPHWAxJyvitmrOxrt10cBNRXu3g_KPg9SNOVEOwpiIBI7jpaCPh2yXuTMpZnEwqG_2VAepOku3rASFTqmXLDa-rmDfZ0GcDrBOZIRefOIahziYTlpr8k_fpN8mDnXGoSKJkGrWL5PTlQd2s6e7zUAUoXVOO0tu5SlqhyzXb2DDWvINQJSsKD44mvoMECTzHXRYfYcLOuBkVM_rda7o-r9Vd585b75EFifZ1DNXhI3FosX-NInAbY0LdAvO8WiEZyqdkm8mQ8YnDgKRsdVG0go6oAxdNN_LxZfGZc8BzEf-jBcyDMXU0YmeCbNzj3G32Xaaov2IML4Ndt_efFV12LoXxp_mp-eiU-9yhh48L4zKUxFP9.v-bj_l584fkLjSRiw38-1g`,
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
    'https://play.watch.tv.br/api/profile?responseType=standard&revalidate=0',
    {
      next: {
        revalidate: 60 * 60, // 1 hours
      },
      ...config
    },
  )

  const responseJson = await response.json()

  return responseJson
}
