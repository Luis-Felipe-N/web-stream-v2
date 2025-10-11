import { cn } from "@/lib/utils"
import type { Watched } from "@/types"

interface ProgressWatchingProps {
  watched?: Watched
  className?: string
}
export function ProgressWatching({ watched, className }: ProgressWatchingProps) {
  const progress = watched ? watched.stopAt / watched.episode.duration * 100 : 0
  return (
    <div className={`h-1 bg-white/20 absolute bottom-0 left-0 w-full`}>
      <div className={cn(
            "h-1 bg-white",
            className
          )} style={{ width: `${progress}%` }} />
    </div>
  )
}