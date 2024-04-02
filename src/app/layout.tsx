import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import { QueryProvider } from '@/providers/useQueryProvider'
import NextAuthSessionProvider from '@/providers/sessionProvider'

import './globals.css'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Stream',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={lato.className} lang="pt">
      <body className={`bg-slate-950 text-zinc-50 antialiased `}>
        <NextAuthSessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
