'use client'

import { WatchBrasilProvider as WatchBrasilClientProvider } from "@/context/WatchBrasilUserContext"
import { ReactNode } from "react"

interface WatchBrasilProviderProps {
  children: ReactNode
}

export function WatchBrasilProvider({ children }: WatchBrasilProviderProps) {


  return <WatchBrasilClientProvider>{children}</WatchBrasilClientProvider>
}
