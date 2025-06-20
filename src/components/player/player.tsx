
'use client'

import screenfull from '@/utils/screenfull';
import { isMobile } from '@/utils/device';
import { Source } from '@/types/types';
import { PLAYER_CONTAINER_CLASS } from '@/constants';
import { api } from '@/lib/api'
import { useCallback, useEffect, useRef } from 'react';

export interface PlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    source: Source;
    autoPlay?: boolean;
    lockOrientationOnFullscreen?: boolean;
}

// Removendo React.forwardRef
export default function Player({ source, children, autoPlay = false, lockOrientationOnFullscreen = true, ...props }: PlayerProps) {
    const innerRef = useRef<HTMLVideoElement>(null);

    const playerRef = useCallback(
        (node: HTMLVideoElement) => {
            innerRef.current = node;
        },
        []
    );

    const sendWatchedProgress = useCallback(async (currentTime: number) => {
        if (currentTime !== 0 || isNaN(currentTime)) {

            console.log(currentTime)
            const response = await api.post('/watched', {
                episodeId: source.refer,
                duration: currentTime
            });
            console.log('Progresso do episódio salvo com sucesso:', response.data);
        }
    }, [source.refer])

    useEffect(() => {
        const videoElement = innerRef.current

        if (!videoElement) {
            return null
        }

        const handleEnded = () => {
            if (!isNaN(videoElement.currentTime) && videoElement.currentTime > 0) {
                sendWatchedProgress(videoElement.currentTime);
            }
        }

        const handlePause = () => {
            if (!isNaN(videoElement.currentTime) && videoElement.currentTime > 0) {
                sendWatchedProgress(videoElement.currentTime);
            }
        }

        const handlePlay = () => {
            if (!isNaN(videoElement.currentTime) && videoElement.currentTime > 0) {
                sendWatchedProgress(videoElement.currentTime);
            }
        }

        videoElement.addEventListener('ended', handleEnded)
        videoElement.addEventListener('pause', handlePause)

        return () => {
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('play', handlePlay);

            if (videoElement.currentTime > 0 && !videoElement.ended) {
                sendWatchedProgress(videoElement.currentTime);
            }
        };
    }, [source, sendWatchedProgress])

    return (
        <video
            ref={playerRef}
            autoPlay
            preload="auto"
            playsInline
            src={source.file}
            controls
            className="w-full max-h-screen aspect-video"
            title="Uma descrição concisa do conteúdo do vídeo"
        >

        </video>
    );
}
