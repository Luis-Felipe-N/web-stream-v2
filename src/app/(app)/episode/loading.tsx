import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main>
      <div className="h-screen relative flex items-end">
        <div className="relative z-10 bg-gradient-to-t w-full from-slate-950 via-slate-950/60 to-transparent">
          <div className="px-4 md:px-8 lg:px-24 py-48 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
            <h1 className="font-semibold  text-5xl">
              <Skeleton className="h-10 w-[250px]" />
            </h1>
            <p className="mt-2 gap-3 flex items-center text-slate-300">
              <Skeleton className="h-6 w-[150px]" />
            </p>
            <div className="mt-4">
              <Skeleton className="h-14 w-[200px]" />
            </div>

            <div className="mt-4">
              <Skeleton className="h-10 w-[130px]" />
            </div>
            <p className="text-slate-300 max-w-6xl mt-8 leading-7 truncate-text lg:text-lg md:text-lg text-sm">
              <Skeleton className="h-32 max-w-6xl" />
            </p>
            <div className="flex gap-4 mt-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>

            <div className="mt-14">
              <Skeleton className="h-14 w-[200px]" />
            </div>
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
