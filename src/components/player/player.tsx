import * as React from 'react';
import { parseNumberFromString } from '../../utils';
import loadScript from '../../utils/load-script';
import { Source } from '@/types/types';
import Hls from 'hls.js';
import { useVideoState } from '@/context/VideoStateContext';

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


                    if (innerRef.current.requestFullscreen) {
                        innerRef.current.requestFullscreen();
                    } else if (innerRef.current.requestFullscreen) { /* Safari */
                        innerRef.current.requestFullscreen();
                    } else if (innerRef.current.requestFullscreen) { /* IE11 */
                        innerRef.current.requestFullscreen();
                    }
                }
            }

            console.log(shouldPlayHls(source))

            if (shouldPlayHls(source)) {
                initHlsPlayer();
            } else {
                if (innerRef.current) {
                    innerRef.current.src = 'https://cors-anywhere.herokuapp.com/' + source.file;
                    // if (innerRef.current.requestFullscreen) {
                    //     innerRef.current.requestFullscreen();
                    // }
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
                className="h-full w-full"
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