import { getWatchBrasilUserProfile } from "@/server/actions/get-watchbrasil-user-profile";
import { useEffect, useMemo, useState } from "react";

export interface WatchBrasilUser {
  id: number,
  userId: number,
  name: string,
  photo: string,
  ageBracket: number,
  usePin: boolean,
  isMaster: boolean,
  isLogged: boolean,
  isKidsProfile: boolean,
  liveContentEnabled: boolean,
  language: string,
  ks: string
}

interface UseWatchBrasilResponse {
  user: WatchBrasilUser | null
}

export const useWatchBrasil = (): UseWatchBrasilResponse => {

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getWatchBrasilUserProfile()
      setUser(user)
    }
    console.log('user')

    getUser()
  }, [])

  const [user, setUser] = useState<WatchBrasilUser | null>(null);
  return { user };
};