import Link from 'next/link'
import SingInForm from './form'
import { getPopularAnime } from '@/server/actions/animes/get-popular-anime'

 export default async function SingIn() {
  const popular = await getPopularAnime()
  console.log(popular)
  return (
    <div className="flex flex-1 h-full">
      <main className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg bg-[#171717] ">
        <header className='w-full px-4'>
          <Link href={'/'} className='font-black text-3xl'>./stream</Link>
        </header>
        <div className='flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]'>
          <div className="mb-10">
            <h1 className="mt-8 mb-2 lg:text-3xl ">Bem vindo</h1>
            <p className='text-sm text-muted-foreground'>Informe seus dados para acessar sua conta</p>
          </div>

            <SingInForm />
        </div>
      </main>
      <aside className='flex-col items-center justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex bg-[#0f0f0f]'>
        {popular && (
          <div className='w-full max-h-screen overflow-hidden'>
              {popular.slice(0,1).map((anime) => (
                <div key={anime.id} className="h-screen w-full relative flex items-end bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" style={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${anime.banner})` }}>
                 <div className="relative z-30 h-screen w-full px-4 md:px-8 lg:px-24 lg:pb-24 pb-12 bg-gradient-to-tr from-zinc-950 to-transparent">
                </div>
                </div>
              ))}

          </div>
        )}
      </aside>
    </div>
  )
}
