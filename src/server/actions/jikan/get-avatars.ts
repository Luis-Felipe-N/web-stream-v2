import { api } from "@/data/api"

interface getAvatarsProps {
    page?: number
}

export async function getAvatars(page = 1) {
    const response = await api('https://api.jikan.moe/v4/characters?page=' + page, {
        next: {
            revalidate: 60 * 60 * 24, // 1 day
        },
    })

    const responseJson = await response.json()

    return responseJson.data
}
