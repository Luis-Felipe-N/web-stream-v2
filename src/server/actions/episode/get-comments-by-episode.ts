import { api } from '@/data/api'

export async function getComments(id: string) {
    const response = await api(`episodes/${id}/comments`, {
        // content,
    })

    const responseJson = await response.json()

    return responseJson.comments
}
