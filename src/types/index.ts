export const Type: {
  CRUNCHYROLL: 'CRUNCHYROLL'
  ANIMESONLINE: 'ANIMESONLINE'
} = {
  CRUNCHYROLL: 'CRUNCHYROLL',
  ANIMESONLINE: 'ANIMESONLINE',
}

export type Type = (typeof Type)[keyof typeof Type]

interface Anime {
  id: string
  title: string
  slug: string
  description: string
  createdAt: string
  rating: number
  banner: string
  cover: string
  nsfw: boolean
  trailerYtId: string
}

interface Season {
  id: string
  title: string
  slug: string
  animeId: string
  createdAt: string
  updatedAt: string
  anime: Anime
}

export interface EpisodeT {
  id: string
  title: string
  slug: string
  description: string
  cover: string
  createdAt: string
  duration: number
  index: number
  isNew: boolean
  type: Type
  video: string
  seasonId: string
  season: Season
}

export interface SeasonT extends Season {
  episodes: EpisodeT[]
}

export interface AnimeT extends Anime {
  genres: []
  seasons: SeasonT[]
}
