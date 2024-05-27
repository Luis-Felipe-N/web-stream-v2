import { getSession } from "./get-session";

export async function getMovieById(movieId: number) {
  const { wtk, token } = await getSession()

  const cookie = `__Host-next-auth.csrf-token=422e5095bb9f387946e05298f3a456c69cdeff655b808c8cffa3024c218a4cfb%7Cade8e5fd9dddbd35eb544750a14ff24972d8eb51218660f955c1f65f7f126a44; __Secure-next-auth.callback-url=https%3A%2F%2Fplay.watch.tv.br; wtk=${wtk}; deviceUuid=49fd-571e-a8fe-0018-38cd-7e61; pid=6767556; hasShownModal-6767556=true; __Secure-next-auth.session-token=${token}`

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

  const response = await fetch('https://play.watch.tv.br/api/content-info',
    {
      method: 'post',
      body: JSON.stringify({
        id: movieId,
        id_perfil: "6767556",
        signal: {},
        tipo: "filme",
      }),
      next: {
        revalidate: 60 * 60 * 24 * 7, // 1 hours
      },
      ...config
    },
  )

  console.log(response)

  const responseJson = await response.json()

  console.log(responseJson)
  return responseJson
}
