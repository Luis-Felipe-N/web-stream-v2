import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <>
      <header className="p-6">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-semibold">Stream</h1>

          <nav>
            <ul className="flex items-center gap-8">
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
      <main className="bg-red-700">
        <Hero />
      </main>
    </>
  )
}
