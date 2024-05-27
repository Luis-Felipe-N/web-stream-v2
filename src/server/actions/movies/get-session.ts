'use server'

import { api } from "@/data/api"

export async function getSession() {
    const token = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..0j_M4HcOquzl4op9.5QpshFq7tUDeWak6LEg659F-73hvDKZwZFx215ALFvdr_RejEdYIop1jas6L8YD0YqISY3yFaMN5gl_7uO13OxQCdas8QGPOWjtuNRIQUaovVEoaz6tnR_nFzhvAojEgFaE_3a1eIbYl7GTx9eK9eoDggNuIISyRZiR9r7W5OHbOkyaGNQgXThFhku7BpvPu6ZnO64jHY-5zjODFfMMTWC--oxiLoGhepVV88386xAaiW6oj4eycCTpr3XiIrA1JZud_ky1gAw_a3uMUv4iLAgi0XIFB7CKcf0dVpLCrFYc4JFgF7ce29zJdL_aKsulGHMPbZ7d2lqXFUzv0kRLh7IPlLARv0njxxp42FNUTvCamgIBUFAj2GreAmV_7bVGhYhdiaBkWQpCmVOqG22Sg8ZFnuaioOJhvm_yHDUnlaCD-zqFzg9WiFjRcWrNdg4fF7zju0xWUAGHPNJUbpNega6-JP3x1jPJJqh3Zq7v9uZKH1Pe8xbdCpWc9gsQpAqRz-7F5Ql9lDY5J8i5mXJxUTTA7sfbyxh6U2xZ-TEd9Vx5t9KuXAvthPlKRprmy-eifVzFgOz7WVbTookWb6rWVKdC_8EUgiPDYeRwYqPIGxtLY3XmQWj68mckeyaZ-9eaCsMMh5XwTTj9xMCXuaS4jEXV0B6kZ-NqrzLkyKEzeEPvKEga3TIm_3uRQP1lpDQrzB2imBbaa.SlQsmr31JRH6ILnsRvi57g'

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
        'https://play.watch.tv.br/api/auth/session',
        {
            next: {
                revalidate: 60 * 60, // 1 hours
            },
            ...config
        },
    )

    const data = await response.json()

    return {
        wtk: data.accessToken,
        token: token
    }
}