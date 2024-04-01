export default function Loading() {
  return (
    <main>
      <div className="h-screen relative flex items-end">
        <div className="relative z-10 bg-gradient-to-t w-full from-zinc-950 via-zinc-950/60 to-transparent">
          <div className="px-4 md:px-8 lg:px-24 py-48 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent">
            <h1 className="font-semibold  text-5xl">SKELETON</h1>
            <p className="mt-2 gap-3 flex items-center text-slate-300">
              SKELETON SKELETON
            </p>
            SKELETON
            <div className="mt-4">SKELETON SKELETON</div>
            <p className="text-slate-300 max-w-6xl mt-8 leading-7 truncate-text lg:text-lg md:text-lg text-sm">
              SKELETON
            </p>
          </div>
        </div>
      </div>

      {/* <section className="px-4 md:px-8 lg:px-24">
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Escolha uma temporada" />
          </SelectTrigger>
          <SelectContent>
            {data.seasons.map((season) => (
              <SelectItem key={season.id} value={season.slug}>
                {season.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section> */}
    </main>
  )
}
