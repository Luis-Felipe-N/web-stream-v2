'use server'

import { api } from '@/lib/api'
import { Watched } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

export async function fetchWatchedEpisodes(): Promise<Watched[]> {
  const cookieStore = cookies()
  const token = cookieStore.get('session-token')?.value

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    console.warn('Token de sessão não encontrado. O usuário pode não estar autenticado.')
    return []
  }

  try {
    const response = await api.get(`/watched`)
    const responseJson = await response.data
    return responseJson.watchedEpisodes
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Erro ao buscar episódios assistidos: ${error.message} - Status: ${error.response?.status}`)
      return []
    }
    console.error('Ocorreu um erro inesperado:', error)
    return []
  }
}