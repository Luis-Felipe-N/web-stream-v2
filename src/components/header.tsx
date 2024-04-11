import Link from 'next/link'
import { Bookmark, Search } from 'lucide-react'
import { Profile } from './profile'

export default function Header() {
  return (
    <>
      <header className="px-4 md:px-8 lg:px-24 grid grid-cols-12 grid-rows-2 items-center w-full sticky z-30">
        <h1 className="text-3xl font-bold lg:col-span-3 md:lg:col-span-3 col-span-6 md:lg:row-span-2 lg:row-span-2 row-span-1">./stream</h1>

        <nav className='justify-self-center lg:col-span-6 md:lg:col-span-6 col-span-12 md:lg:row-span-2 lg:row-span-2 row-span-1 md:lg:row-start-1 lg:row-start-1 row-start-2 md:lg:col-start-4 lg:col-start-4 col-start-1'>
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

        <div className="flex items-center justify-end gap-4 lg:col-span-3 md:lg:col-span-3 col-span-6 md:lg:row-span-2 lg:row-span-2 row-span-1">
          <Link href={'/search'}>
            <Search className="hover:font-bold" size={24} />
          </Link>

          <Link href={'/'}>
            <Bookmark className="hover:" size={24} />
          </Link>

          <Profile />
        </div>
      </header>

      <div className="absolute top-0 left-0 right-0 w-full  bg-gradient-to-b from-slate-950/90 via-slate-950/30 to-transparent z-20 h-[10rem]"></div>
    </>
  )
}
