import { useInfiniteQuery } from '@tanstack/react-query'

import { getAvatars } from "@/server/actions/jikan/get-avatars";
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { useFormContext } from "react-hook-form";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";


interface ICharactersJikanAPI {
    mal_id: number
    url: string
    images: {
        jpg: {
            image_url: string
        }
    }
    name: string
    name_kanji: string
    nicknames: string[]
    favorites: number
    about: string
}

const AVATARPERVIEW = 9

export function SelectAvatar() {
    const { register } = useFormContext()

    function handleGetNextPageAvatar(currentIndex: number, totalIndex: number) {
        if (totalIndex - (AVATARPERVIEW + 5) < currentIndex) {
            fetchNextPageAvatar()
        }
    }

    const { data: avatarSuggestion, fetchNextPage: fetchNextPageAvatar } =
        useInfiniteQuery<ICharactersJikanAPI[], Error>({
            initialPageParam: 1,
            queryKey: ['avatars'],
            queryFn: ({ pageParam }) => {
                const page = typeof pageParam === 'number' ? pageParam : 1
                return getAvatars(page)
            },
            getNextPageParam: (lastPage, pages) => pages.length + 1,
        })

    return (
        <div className="max-w-full mb-4">
            <Swiper
                onSlideChange={(e) =>
                    handleGetNextPageAvatar(
                        e.realIndex,
                        avatarSuggestion ? avatarSuggestion.pages.length * 25 : 0,
                    )
                }
                slidesPerView="auto"
                spaceBetween={10}
                className="w-full mt-4 swiper-rail"
            >
                {avatarSuggestion &&
                    avatarSuggestion.pages.map(
                        (page) =>
                            page &&
                            page.map((anime) => (
                                <SwiperSlide className="swiper-slide-perview" key={anime.mal_id}>
                                    <Label>
                                        <Avatar className='focus-within:border-4 border-red-600 rounded-full h-20 w-20 cursor-pointer'>
                                            <AvatarImage src={anime.images.jpg.image_url} alt={`Poster do personagem ${anime.name}`} />
                                            <input className="opacity-0 w-0 h-0" type="radio" {...register('avatar')} value={anime.images.jpg.image_url} />
                                        </Avatar>
                                    </Label>
                                </SwiperSlide>
                            )),
                    )}
            </Swiper>
        </div>
    )
}