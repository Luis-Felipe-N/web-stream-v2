
'use client'

import screenfull from '@/utils/screenfull';
import { isMobile } from '@/utils/device';
import { Source } from '@/types/types';
import { PLAYER_CONTAINER_CLASS } from '@/constants';
import { api } from '@/lib/api'
import { forwardRef, MutableRefObject, useCallback, useEffect, useRef } from 'react';

export interface PlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    source: Source;
    autoPlay?: boolean;
    lockOrientationOnFullscreen?: boolean;
}


const Player = forwardRef<HTMLVideoElement, PlayerProps>(
    ({ source, children, autoPlay = false, ...props }, ref) => {
        const innerRef = useRef<HTMLVideoElement | null>(null);

        const playerRef = useCallback(
            (node: HTMLVideoElement) => {
                innerRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLVideoElement>).current = node;
                }
            },
            [ref]
        );

        const sendWatchedProgress = useCallback(async (currentTime: number) => {
            if (currentTime !== 0 || isNaN(currentTime)) {

                const response = await api.post('/watched', {
                    episodeId: source.refer,
                    duration: currentTime
                });
                return response
            }
        }, [source.refer])

        const getWatchedProgress = useCallback(async () => {
            const response = await api.get(`/watched/${source.refer}`);
            return response.data

        }, [source.refer])

        useEffect(() => {
            const videoElement = innerRef.current

            if (!videoElement) {
                return;
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

        useEffect(() => {
            const fetchWatchedProgress = async () => {
                try {
                    const { watched } = await getWatchedProgress();

                    if (innerRef.current && watched?.stopAt) {
                        innerRef.current.currentTime = watched.stopAt;
                    }

                    if (innerRef.current && innerRef.current.paused) {
                        innerRef.current.play()
                    }
                } catch (error) {

                }
            };

            fetchWatchedProgress();

            return () => {
            };
        }, []);



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
                {children}
            </video>
        );
    }
)
Player.displayName = 'Player';

export default Player;