'use client'

import * as React from 'react';

import loadScript from '../../utils/load-script';
import Hls from 'hls.js';

import screenfull from '@/utils/screenfull';
import { isMobile } from '@/utils/device';
import { Source } from '@/types/types';
import { PLAYER_CONTAINER_CLASS } from '@/constants';

const HLS_VARIABLE_NAME = 'Hls';

const getHlsScriptUrl = (version = 'latest') =>
    `https://cdn.jsdelivr.net/npm/hls.js@${version}/dist/hls.min.js`;

const getAltHlsScriptUrl = (version = '1.4.10') =>
    `https://cdnjs.cloudflare.com/ajax/libs/hls.js/${version}/hls.min.js`;

export interface PlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    source: Source;
    autoPlay?: boolean;
}

const shouldPlayHls = (source: Source) =>
    source.file.includes('m3u8') || source.type === 'hls';

const noop = () => { };

const Player = React.forwardRef<HTMLVideoElement, PlayerProps>(
    ({ source, children, autoPlay = false, ...props }, ref) => {
        const innerRef = React.useRef<HTMLVideoElement>();
        const hls = React.useRef<Hls | null>(null);

        const playerRef = React.useCallback(
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

        React.useEffect(() => {
            async function initHlsPlayer() {
                const HlsSDK = await loadScript<typeof Hls>(
                    [getHlsScriptUrl(), getAltHlsScriptUrl()],
                    HLS_VARIABLE_NAME
                );

                if (HlsSDK.isSupported()) {
                    const _hls = new HlsSDK();
                    hls.current = _hls;

                    if (innerRef.current != null) {
                        _hls.attachMedia(innerRef.current);
                        _hls.loadSource(source.file);

                        _hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            if (autoPlay) {
                                innerRef.current
                                    ?.play()
                                    .catch(() => console.error('User must interact before playing the video.'));
                            }
                        });
                    }
                } else if (innerRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
                    innerRef.current.src = source.file;
                }
            }

            if (shouldPlayHls(source)) {
                initHlsPlayer();

                const containerEl = document.querySelector(`.${PLAYER_CONTAINER_CLASS}`);

                // @ts-ignore
                screenfull.request(containerEl).then(() => {
                    if (!isMobile) return;

                    // @ts-ignore
                    screen.orientation.lock('landscape');
                });
            } else {
                if (innerRef.current) {
                    innerRef.current.src = 'https://cors-anywhere.herokuapp.com/' + source.file;
                }
            }

            return () => {
                if (hls.current) {
                    hls.current.destroy();
                }
            };
        }, [source]);

        return (
            <video
                ref={playerRef}
                autoPlay
                preload="auto"
                className="max-h-screen  w-full"
                playsInline
                crossOrigin="anonymous"
                {...props}
            >
                {children}
            </video>
        );
    }
);

Player.displayName = 'Player';

export default Player;