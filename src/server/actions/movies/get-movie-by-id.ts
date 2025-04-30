import { getSession } from "./get-session";

export async function getMovieById(movieId: number) {
  const { wtk, token } = await getSession()

  const cookie = `__Host-next-auth.csrf-token=425843e8f14032c2829f4a38abb757e906bd44b4ab8230864b8398996050a453%7Cb49d26df585e7deb9640c664668af300dcd70a000ea8b06dd9370a5d7ce4d8ee; __Secure-next-auth.callback-url=https%3A%2F%2Fplay.watch.tv.br%2Fselecionar-perfil%3Fredirect%3D%252Fhome; deviceUuid=6076-b26a-995b-1d40-24d9-fbfe; pid=Njc2NzU1Ng%3D%3D; active_profile=%7B%22ageBracket%22%3A18%2C%22id%22%3A6767556%2C%22isMaster%22%3Atrue%2C%22name%22%3A%22Luis%20Felipe%20Nunes%22%2C%22photo%22%3A%22%22%2C%22isKidsProfile%22%3Afalse%2C%22liveContentEnabled%22%3Atrue%2C%22usePin%22%3Afalse%2C%22userId%22%3Anull%2C%22ks%22%3Anull%2C%22languagePlayer%22%3A%7B%22_id%22%3A%22%22%2C%22_language%22%3A%22por%22%2C%22_label%22%3A%22POR%22%2C%22_short_language%22%3A%22pt%22%2C%22_title%22%3A%22Portugu%C3%AAs%22%7D%2C%22subtitlePlayer%22%3A%7B%22_id%22%3A%22%22%2C%22_language%22%3A%22off%22%2C%22_label%22%3A%22Off%22%2C%22_short_language%22%3A%22off%22%2C%22_title%22%3A%22Desativadas%22%7D%7D; wtk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZCI6IldBVCIsImRldmljZV9pZCI6NTY1MDM0LCJsb2dpbl90aW1lc3RhbXAiOjE3NDQzODQ5OTYwMDAsInN1YiI6MTg3MDE5NSwidXNlcl9pZCI6MTg3MDE5NSwiaWF0IjoxNzQ0Mzg0OTk2LCJleHAiOjE3NDQzODg1OTYsInByb2ZpbGVfaWQiOjY3Njc1NTZ9.R4pI1HVAihoFPrQqhz2_zDvDHgfF_ACwqvBiv2SHuDM; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..KLM60HHWICwDZE5n.LGgsr8rgCxSVlRJpzVNntkeTiGk_XDJQLNeeYXwtjKJwQ-fw2_pMauXND2gOhyq5UkLbROTavt8iqyYd_WsWRiCF99-lwzuOH2uzwCobpGngVCOq4JnooMDHbeVs5hiLpgBGsqLYayAqR8OdRWb4bQ8DJCAPR9e2iM5ivYf_WDRFjBcNHTeB8TUkziDeb56DjlVtnVKrYvE7hAhULyXVoxh1pjZNTnYjy-tBV4hoiCQ_qCnwbee9rOZOpVyi9If9HXaZG5Tp2UY076JrL4vn2m0CwxcikUt0g5xrBhjx4sWCRe8lIasF3PUV3xPe4MLTgUZTq4Et2wOI-x3-2s7gG__lB3lHhIF5GYLLURK_Ft_iS6fqPcCbV0bqHsb2g2THC6PaE-LmXgE1awoaTwK3ZV8hBZa7BKtWKLFmArfvJfbSp7v2rumctrs7mkd0er8WjGbq1Q813Y0ldhAVoG45VBSoCgZ34aKh3kVdkZuoPyXiM9lBibjPl3mG4YqqCy1yPlVjsKQ5eld-bjkf2JfrOZ1bk-SxQEBGylF5Hpz5acFnHIStydjjwDzsHuQpz--dpaTsTay1OnvMtaT8SNutRCzRsAZ_73uE-WANyt2YEVTj3VrHzQWKYI2MI3A2UryxW1p14Lv2OcNUdKUI3F1MDaCVCtr6IP377BPkoT2IoiI-0xG8RH70Cd2XrGnuoJ8Knah62MrgyMeN5_GBHcyXx-dSsyS_dKoZiQb1WbxU5Ztk9oTBNE_R3wjSbRYxDwViSGlOwL_2O7mwizrNfkp6fhe4flJJ8QQ22y-Lvzn_UwksD0G6erL8cTWZNiQ0iTXglB2aJmCSQpkemcHmvWXUfOP1p_UD77zbRmIaewXuO_fy0V62Con_DcDbB4tCV0q56Ap0DsQKvb8kUWftK_FqvlrsXguR-ioWEOYrnzVEDehceSBacHaAD2uQj_Wc9Mpwsrg.gGkrESosmxNmubEuemP9Mw`

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
      'Referer': 'https://play.watch.tv.br/filmes/acao',
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

  const responseJson = await response.json()

  return responseJson
}
