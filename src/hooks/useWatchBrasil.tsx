import { getWatchBrasilUserProfile } from "@/server/actions/get-watchbrasil-user-profile";
import { useEffect, useMemo, useState } from "react";
import { string } from "zod";

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

export const useWatchBrasil = () => {

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getWatchBrasilUserProfile()

      setUser(user)
    }

    getUser()
  }, [])

  const [user, setUser] = useState();
  return { user };
};