'use server'

import { api } from '@/data/api';


export async function getWatchBrasilUserProfile() {
  const token = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..KLM60HHWICwDZE5n.LGgsr8rgCxSVlRJpzVNntkeTiGk_XDJQLNeeYXwtjKJwQ-fw2_pMauXND2gOhyq5UkLbROTavt8iqyYd_WsWRiCF99-lwzuOH2uzwCobpGngVCOq4JnooMDHbeVs5hiLpgBGsqLYayAqR8OdRWb4bQ8DJCAPR9e2iM5ivYf_WDRFjBcNHTeB8TUkziDeb56DjlVtnVKrYvE7hAhULyXVoxh1pjZNTnYjy-tBV4hoiCQ_qCnwbee9rOZOpVyi9If9HXaZG5Tp2UY076JrL4vn2m0CwxcikUt0g5xrBhjx4sWCRe8lIasF3PUV3xPe4MLTgUZTq4Et2wOI-x3-2s7gG__lB3lHhIF5GYLLURK_Ft_iS6fqPcCbV0bqHsb2g2THC6PaE-LmXgE1awoaTwK3ZV8hBZa7BKtWKLFmArfvJfbSp7v2rumctrs7mkd0er8WjGbq1Q813Y0ldhAVoG45VBSoCgZ34aKh3kVdkZuoPyXiM9lBibjPl3mG4YqqCy1yPlVjsKQ5eld-bjkf2JfrOZ1bk-SxQEBGylF5Hpz5acFnHIStydjjwDzsHuQpz--dpaTsTay1OnvMtaT8SNutRCzRsAZ_73uE-WANyt2YEVTj3VrHzQWKYI2MI3A2UryxW1p14Lv2OcNUdKUI3F1MDaCVCtr6IP377BPkoT2IoiI-0xG8RH70Cd2XrGnuoJ8Knah62MrgyMeN5_GBHcyXx-dSsyS_dKoZiQb1WbxU5Ztk9oTBNE_R3wjSbRYxDwViSGlOwL_2O7mwizrNfkp6fhe4flJJ8QQ22y-Lvzn_UwksD0G6erL8cTWZNiQ0iTXglB2aJmCSQpkemcHmvWXUfOP1p_UD77zbRmIaewXuO_fy0V62Con_DcDbB4tCV0q56Ap0DsQKvb8kUWftK_FqvlrsXguR-ioWEOYrnzVEDehceSBacHaAD2uQj_Wc9Mpwsrg.gGkrESosmxNmubEuemP9Mw'

  const config = {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.6',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Cookie': `__Secure-next-auth.session-token=${token}`,
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
    'https://play.watch.tv.br/api/profile?revalidate=0',
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
