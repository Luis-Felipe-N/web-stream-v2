export default function Header() {
  return (
    <header className="p-6 px-20 bg-gradient-to-b w-full from-zinc-900/30 via-zinc-900/30 to-transparent relative z-20">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">Stream</h1>

        <nav>
          <ul className="flex items-center gap-8 font-mono font-semibold uppercase text-sm">
            <li>
              <a href="">Home</a>
            </li>

            <li>
              <a href="">Minha lista</a>
            </li>

            <li>
              <a href="">Animes</a>
            </li>

            <li>
              <a href="">Filmes</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
