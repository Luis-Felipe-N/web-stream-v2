'use client'

import { WatchBrasilUser } from "@/hooks/useWatchBrasil";
import { getWatchBrasilUserProfile } from "@/server/actions/get-watchbrasil-user-profile";
import React, { ReactNode, createContext, useCallback, useEffect, useState } from "react";

interface WatchBrasilContextType {
  user: WatchBrasilUser | null
}

export const watchBrasilContext = createContext<WatchBrasilContextType>({ user: null });

interface WatchBrasilProviderProps {
  children: ReactNode
}

export const WatchBrasilProvider = ({ children }: WatchBrasilProviderProps) => {
  const [user, setUser] = useState<WatchBrasilUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getWatchBrasilUserProfile()
      setUser(user)
    }
    console.log('user')

    getUser()
  }, [])

  return (
    <watchBrasilContext.Provider value={{ user }}>
      {children}
    </watchBrasilContext.Provider>
  );
};