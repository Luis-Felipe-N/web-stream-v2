import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className="px-20 flex justify-between items-center w-full absolute z-30">
        <h1 className="text-3xl font-semibold">Stream</h1>

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

        <div></div>
      </header>

      <div className="absolute top-0 left-0 right-0 w-full  bg-gradient-to-b from-zinc-950/80 via-zinc-950/20 to-transparent z-20 h-[10rem]"></div>
    </>
  )
}
