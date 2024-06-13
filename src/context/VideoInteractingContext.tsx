import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

interface ContextValue {
    isInteracting: boolean;
    setIsInteracting: Dispatch<SetStateAction<boolean>>
    isShowingIndicator: boolean
    setIsShowingIndicator: Dispatch<SetStateAction<boolean>>
}

export const VideoInteractingContext = createContext<ContextValue>({
    isInteracting: false,
    setIsInteracting: () => { },
    isShowingIndicator: false,
    setIsShowingIndicator: () => { }
})

interface VideoInteractingContextProviderProps {
    defaultValue?: boolean
    children: ReactNode
}

export const VideoInteractingContextProvider: FC<VideoInteractingContextProviderProps> = ({ children, defaultValue = false }) => {
    const [isInteracting, setIsInteracting] = useState(defaultValue)
    const [isShowingIndicator, setIsShowingIndicator] = useState(false)

    return (
        <VideoInteractingContext.Provider value={{ isInteracting, setIsInteracting, isShowingIndicator, setIsShowingIndicator }}>{children}</VideoInteractingContext.Provider>
    )
}

export const useInteract = () => { return useContext(VideoInteractingContext) }