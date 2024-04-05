
'use client'

import { useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getFallbackName } from '@/utils/get-fallback-name'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'

interface DropdownUserProps {
  session: Session
}

export function DropdownUser({ session }: DropdownUserProps) {
  const { data, status } = useSession()


  const router = useRouter()

  async function logout() {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  if (status === 'authenticated')  {
    return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar className='h-12 w-12'>
          <AvatarImage src={data.user.avatar} alt={data.user.name} />
            <AvatarFallback>
              {getFallbackName(data.user.name)}
            </AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className='flex gap-2 items-center py-2 px-2'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={data.user.avatar} alt={data.user.name} />
            <AvatarFallback>
              {getFallbackName(data.user.name)}
            </AvatarFallback>
          </Avatar>
          <p className='text-sm'>{data.user.name}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className='w-full h-full flex items-center' href={'/'}>Minha conta</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className='w-full h-full flex items-center' href={'/'}>Meus Favoritos</Link>            
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className='w-full h-full flex items-center' href={'/'}>Histórico</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500 cursor-pointer' onClick={logout}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
  }

  return null

}
