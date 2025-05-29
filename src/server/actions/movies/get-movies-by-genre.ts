'use server'

import { api } from '@/data/api'
import { getSession } from './get-session';

export async function getMoviesByGenre(genreId: number, size = 30) {

  const config = {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.6',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      "cookie": "deviceUuid=d725-6d7c-412f-a265-e787-845d; __Host-next-auth.csrf-token=f2b19062392a12134a3f3c7770fbea662b47caba94b85f8b03fd05816462931c%7Cd425434cff6794b04d64c7cb8d7f73a138ab333eb7b42535dcea182ffd66ee27; __Secure-next-auth.callback-url=https%3A%2F%2Fplay.watch.tv.br%2Fselecionar-perfil%3Fredirect%3D%252Fhome; pid=Njc2NzU1Ng%3D%3D; active_profile=%7B%22ageBracket%22%3A18%2C%22id%22%3A6767556%2C%22isMaster%22%3Atrue%2C%22name%22%3A%22Luis%20Felipe%20Nunes%22%2C%22photo%22%3A%22%22%2C%22isKidsProfile%22%3Afalse%2C%22liveContentEnabled%22%3Atrue%2C%22usePin%22%3Afalse%2C%22userId%22%3Anull%2C%22ks%22%3Anull%2C%22languagePlayer%22%3A%7B%22_id%22%3A%22%22%2C%22_language%22%3A%22por%22%2C%22_label%22%3A%22POR%22%2C%22_short_language%22%3A%22pt%22%2C%22_title%22%3A%22Portugu%C3%AAs%22%2C%22_active%22%3Afalse%7D%2C%22subtitlePlayer%22%3A%7B%22_id%22%3A%22off%22%2C%22_language%22%3A%22off%22%2C%22_label%22%3A%22Off%22%2C%22_short_language%22%3A%22off%22%2C%22_title%22%3A%22Desativadas%22%2C%22_active%22%3Afalse%7D%7D; wtk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZCI6IldBVCIsImRldmljZV9pZCI6OTY0NDA2LCJsb2dpbl90aW1lc3RhbXAiOjE3NDg1MzMyNTkwMDAsInN1YiI6MTg3MDE5NSwidXNlcl9pZCI6MTg3MDE5NSwiaWF0IjoxNzQ4NTMzMjU5LCJleHAiOjE3NDg1MzY4NTksInByb2ZpbGVfaWQiOjY3Njc1NTZ9.FQufrjGzXFiudj5iCHGwUd0hEMEa5DDtNjBXB3c4ScY; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..lOuu0P5RdiFPqLom.uYuM8gLSzgj4l3w0AkU6DznYftEYkT4uBhk-GAYydfVFnA4gff7BeGJguEGywusEmpfXdT7a5Arn6Hhzrn3vMwXE3krAut013sX_CenJSFlKsiSR0J1YOP-WiODKjR_QvL_p20Fa2PxL3pb4vzfu499-jb46yLJPiStY_A8M24nE1e3MlQ9O4EKG6xP1LUjgEGSezQKtKTkDOrnIqSxXIBkjLi2OlKGcEQ4eMRi_IccQtIoticrjybmyP-FZxf7prHoSCPwTTVHXungxuBEV4zaFevbGEmSBg_RFpUQXjjpH3GMtB9oik9eDJxzrQ8klbDk_6s5x_W5bba0N8Ly_k719PN3lHdWrD75Po5Y9A32i73-3qVzR5v9nRsznC_bq6qSIRg8OF6IuQ9D8uWykfUtusNdZnhKRiyIucQI9ceRkJrfF_xZyVCW_Nli_KFsegsuye8G8tS3KoPJbQFc5vucenEzv1PglOL_QO_B1cuR8WPWtAlZP0LyRjBj5Uqx9w_r3oemePY3pvM7GVVB9_vgiqJvk8UK9ctWxi_mbCLa0bMFjgvhQ7o4eVZ-T1IoBBHukZY4x0IW1s6Bqau3q1vOSUfkzXn2vuXUbrqBuipPeX5ps7-F-6wkRe5qkt6O3Dju7yKEBt9fnvXfkCo13VqEy9lL-1InGRvaHOu_qbfAH3i3tkt1xBRyIEZg7zZ5_LGGj9qySkloR0piTmwov4R23u9wWC5N2mWhLm1o5H4CN8z5HmznBgtQxSp9KzMIIEB5DCcZ4ZyQaFBAR8xbKhbGkvEwUSeBpcwLlpyAZH8W-sMc7jPt8JOUb8vkGhlZ1VjhhGStu47AR-KYRQJjMSaqdYYXX7Gk5u7VE7C5GoJcFN_Jy-i5ddSd4CXyqyciDdrVVVlOUzaE4lz8VHkOR2dyZ34zUn1QHulp9R6-jLcaLvxC1TzTRrdNEMEKT41tFyFE.1NzBUWJ8PGu_AVz6inYagg",
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
    'https://play.watch.tv.br/api/carousel-content-list',
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

  console.log({ response })
  const responseJson = await response.json()
  console.log({ responseJson })
  return responseJson.list
}
