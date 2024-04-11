import { api } from '@/lib/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { cookies } from 'next/headers'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const { data } = await api.post('sessions', {
          email: credentials?.email,
          password: credentials?.password,
        })

        const { token } = data

        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: responseData } = await api.get('me')

        if (responseData.user) {
          cookies().set('session-token', token)

          return responseData.user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)

      return token
    },
    async session({ session, token }) {
      console.log({ session, token })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any

      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
