export const Type: {
  CRUNCHYROLL: 'CRUNCHYROLL',
  ANIMESONLINE: 'ANIMESONLINE'
} = {
  CRUNCHYROLL: 'CRUNCHYROLL',
  ANIMESONLINE: 'ANIMESONLINE',
}

export type Type = (typeof Type)[keyof typeof Type]

export interface GenreT {
  title: string
  slug: string
}
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
  genres: GenreT[]
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
  genres: string
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
  rented: boolean
  isRented: boolean
  rentStatus: null
}
export interface MovieD {
  id: number,
  id_kaltura: string,
  title: string,
  synopsis: string,
  censorship: string,
  year: number,
  director: string,
  actors: string,
  cover: string,
  highlight: string,
  cdn: number,
  duration: number,
  availability: string,
  price: string,
  genres: string,
  genre: string,
  isNSportsMatch: boolean,
  isConmebolLibertadoresMatch: boolean,
  isConmebolSulamericanaMatch: boolean,
  isLiveMatch: boolean,
  isNSportsPayment: boolean,
  isParamountFreemium: boolean,
  dataFromOPC: boolean,
  pageType: number,
  favorite: boolean,
  warning: string,
  isParamount: boolean,
  isVubiquitySony: boolean,
  isGlobo: boolean,
  isRegional: boolean,
  rented: boolean,
  progress: number,
  endPointCdn: string
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

export interface User {
  id: string,
  name: string,
  email: string,
  role: "USER",
  avatar: string
}

export interface Comment {
  id: string,
  content: string,
  updatedAt: string,
  createdAt: string
  author: User
}

export interface Watched {

  stopAt: number,

  updatedAt: '2025-06-20T22:24:50.732Z',
  id: string,
  authorId: string,
  episodeId: string,
  createdAt: string,
  episode: EpisodeT
}