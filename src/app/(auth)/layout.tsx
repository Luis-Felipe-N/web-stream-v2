import Link from 'next/link'
import type { Metadata } from 'next'

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
    <main className="h-screen flex flex-col">
      <header className="px-20 py-6 flex justify-between items-center w-full text-lg">
        <h1 className="text-3xl font-bold">./stream</h1>

        <div className="flex gap-4">
          <Link
            className="font-bold hover:text-zinc-300 transition"
            href={'/sing-up'}
          >
            Cadastrar-se
          </Link>

          <Link
            className="font-semibold font-oswald underline"
            href={'/sing-in'}
          >
            Entrar
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </main>
  )
}
