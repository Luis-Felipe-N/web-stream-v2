'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
