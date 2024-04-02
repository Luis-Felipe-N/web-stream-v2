import Link from 'next/link'
import { Bookmark, Search } from 'lucide-react'

export default function Header() {
  return (
    <>
      <header className="px-20 flex justify-between items-center w-full absolute z-30">
        <h1 className="text-4xl font-bold">Stream</h1>

        <nav>
          <ul className="flex items-center gap-8 font-mono font-semibold uppercase">
            <li>
              <Link className="py-6 inline-block" href={'/'}>
                Home
              </Link>
            </li>

            <li>
              <a className="py-6 inline-block" href="">
                Minha lista
              </a>
            </li>

            <li>
              <a className="py-6 inline-block" href="">
                Animes
              </a>
            </li>

            <li>
              <a className="py-6 inline-block" href="">
                Filmes
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-4">
          <Link href={'/'}>
            <Search className="hover:font-bold" size={24} />
          </Link>

          <Link href={'/'}>
            <Bookmark className="hover:" size={24} />
          </Link>
        </div>
      </header>

      <div className="absolute top-0 left-0 right-0 w-full  bg-gradient-to-b from-slate-950/90 via-slate-950/30 to-transparent z-20 h-[10rem]"></div>
    </>
  )
}
