'use client'
import { useSession } from 'next-auth/react'

import Link from 'next/link'
import { Skeleton } from './ui/skeleton'
import { DropdownUser } from './dropdown-user'

export function Profile() {
  const { data: session, status } = useSession()

  console.log(session)

  if (status === 'loading') {
    return (
      <div className="flex items-end gap-1">
        <div className="mb-2 flex flex-col items-end">
          <Skeleton className="h-2 w-24 rounded" />
          <Skeleton className="h-2 w-14 rounded mt-2" />
        </div>
        <Skeleton className="h-14 w-14 rounded-full" />
      </div>
    )
  }
  if (status === 'authenticated') {
    return <DropdownUser session={session} />
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex gap-4 items-center font">
        <Link
          className="font-semibold font-oswald underline"
          href={'/sing-in'}
        >
          Entrar
        </Link>
      </div>
    )
  }
}