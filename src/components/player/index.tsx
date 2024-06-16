'use client'

import { createRef, forwardRef, ReactNode, useCallback, useRef } from 'react'

import { Source } from '@/types/types'
import GlobalContext from '@/context/GlobalContext'
import { VideoContextProvider } from '@/context/VideoContextProvider'
import DefaultUI from './default-ui'
import { EpisodeT } from '@/types'

export interface StreamPlayer extends React.HTMLAttributes<HTMLVideoElement> {
    source: Source;
    autoPlay?: boolean;
    autoFullscreen?: boolean
    forwarder?: EpisodeT // | MOVIE | SERIE
    previous?: EpisodeT // | MOVIE | SERIE
}

interface InnerPlayerProps extends StreamPlayer {
    children: ReactNode
}
const InnerPlayer = forwardRef<HTMLVideoElement, InnerPlayerProps>(
    ({ children, ...props }, ref) => {
        const videoRef = useRef<HTMLVideoElement | null>(null);

        const playerRef = useCallback(
            (node: any) => {
                videoRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLVideoElement>).current = node;
                }
            },
            [ref]
        );

        return (
            <VideoContextProvider videoRef={videoRef} >
                <DefaultUI ref={playerRef} {...props} >{""}</DefaultUI>
            </VideoContextProvider>
        );
    },
)

const StreamPlayer = forwardRef<HTMLVideoElement, StreamPlayer>(
    (
        { source, children, ...props },
        ref
    ) => {
        return (
            <GlobalContext source={source} {...props}>
                <InnerPlayer
                    source={source}
                    ref={ref}
                    {...props}
                >
                    {children}
                </InnerPlayer>
            </GlobalContext>
        );
    }
);

InnerPlayer.displayName = 'InnerPlayer';
StreamPlayer.displayName = 'StreamPlayer';

export default StreamPlayer