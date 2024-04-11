import type { Metadata } from 'next'
import { Lato, Poppins } from 'next/font/google'

import { QueryProvider } from '@/providers/useQueryProvider'
import NextAuthSessionProvider from '@/providers/sessionProvider'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const lato = Poppins({
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <QueryProvider>{children}</QueryProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
