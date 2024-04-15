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

export interface GenreT {
  title: string
  slug: string
}

export interface SeasonT extends Season {
  episodes: EpisodeT[]
}

export interface AnimeT extends Anime {
  genres: GenreT[]
  seasons: SeasonT[]
}

export interface MovieT {
  order: number
  id: number
  serieId: string
  episode_id: string
  position: null
  duration: null
  type: string
  livetvod: boolean
  entry_id: string
  cover: string
  highlight: string
  bannerPageUrl: string
  orientation: string
  cdn: number
  title: string
  genres: string[]
  availability: string
  expire: string
  imageUrl: string
  timestamp: string
  description: string
  isNSports: boolean
  isConmebolLibertadores: boolean
  isConmebolSulamericana: boolean
  isLive: boolean
  favorite: boolean
  censorship: string
  matchIsComingSoon: boolean
  isComingSoon: number
  onktp: boolean
  rented: true
  isRented: true
  rentStatus: null
}

export interface MovieHeroT {
  order: number
  destiny: string
  type: string
  secondaryType: null
  id: number
  images: {
    p375x460: string
    p750x920: string | null
    p1024x420: string
    p1920x540: string | null
    p2048x840: string
  }
  cdn: 3
  title: string
  synopsis: string
  favorite: boolean
  genres: string[]
  year: number
  duration: string
  censorship: string
  cta_name: string
  cta_position: string
  link_banner: string
  seasons: number
  cover: string
}
