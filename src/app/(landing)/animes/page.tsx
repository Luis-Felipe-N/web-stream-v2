import Rail from '@/components/rail'
import Hero from '@/components/hero'

import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'

export default async function Home() {
  const data = await getPopularAnime()

  return (
    <>
      <main>
        <Hero data={data} />

        <Rail />
      </main>
    </>
  )
}
