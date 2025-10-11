'use server'

import { api } from '@/lib/api'
import { Watched } from '@/types'
import { cookies } from 'next/headers'

export async function fetchWatchedEpisodes(): Promise<Watched[]> {
    const cookieStore = cookies()
    const token = cookieStore.get('session-token')?.value

    api.defaults.headers.Authorization = `Bearer ${token}`
    const response = await api.get(`/watched`)

    const responseJson = await response.data

    return responseJson.watchedEpisodes
}