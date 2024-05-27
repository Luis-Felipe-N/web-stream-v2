'use server'

import { api } from '@/data/api';
import { getSession } from './movies/get-session';





export async function getWatchBrasilUserProfile() {
  const token = getSession()

  console.log(token)

  // const cookie = ``;

  const config = {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.6',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Cookie': `wtk=${token}; deviceUuid=49fd-571e-a8fe-0018-38cd-7e61; pid=6767556; hasShownModal-6767556=true`,
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

  console.log(response)

  const responseJson = await response.json()

  return responseJson
}
