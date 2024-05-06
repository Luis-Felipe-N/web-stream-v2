import { WatchBrasilUser, useWatchBrasil } from "@/hooks/useWatchBrasil";
import React, { ReactNode, createContext } from "react";

interface WatchBrasilContextType {
  user: WatchBrasilUser | null
}

export const watchBrasilContext = createContext<WatchBrasilContextType>({ user: null });

interface WatchBrasilProviderProps {
  children: ReactNode
}

export const WatchBrasilProvider = ({ children }: WatchBrasilProviderProps) => {
  const { user } = useWatchBrasil();
  return (
    <watchBrasilContext.Provider value={{ user }}>
      {children}
    </watchBrasilContext.Provider>
  );
};