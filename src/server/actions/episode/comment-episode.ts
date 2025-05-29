'use server'

import { cookies } from 'next/headers'
import { api } from '@/lib/api'

export async function commentEpisode(id: string, content: string) {
    const cookieStore = cookies()
    const token = cookieStore.get('session-token')?.value

    api.defaults.headers.Authorization = `Bearer ${token}`
    const response = await api.post(`episodes/${id}/comments`, {
        content,
    })
    console.log({ response })
    const responseJson = await response.data

    return responseJson.comment
}