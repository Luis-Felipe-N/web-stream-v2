import axios from 'axios'
// import Cookies from 'js-cookie'
// import { cookies } from 'next/headers'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((request) => {
  // 'use server'

  const headers = request.headers ?? {}

  const token = '' // cookies().get('session-token')

  console.log(token)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  console.log(token)
  request.headers = headers
  return request
})
