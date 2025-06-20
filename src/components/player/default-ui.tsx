'use client'

import * as React from 'react';
import Player from './player';
import { StreamPlayerProps } from '@/context/VideoPropsContext';
import { isMobile } from '@/utils/device';
import { useInteract } from '@/context/VideoInteractingContext';

import Overlay from './overlay';
import Controls from './controls';
import { PLAYER_CONTAINER_CLASS } from '@/constants';
import { classNames } from '@/utils';

const noop = () => { };

const DefaultUI = React.forwardRef<HTMLVideoElement, StreamPlayerProps>(({ ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const { setIsInteracting, isInteracting } = useInteract();
    const interactingTimeout = React.useRef<NodeJS.Timeout>();

    const resetInteractingCycle = React.useCallback(() => {

        setIsInteracting(true);

        if (interactingTimeout.current) {
            clearTimeout(interactingTimeout.current);
        }

        interactingTimeout.current = setTimeout(() => {
            setIsInteracting(false);
        }, 3000);
    }, [setIsInteracting]);

    const playerRef = React.useCallback(
        (node: HTMLVideoElement) => {
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
        <div
            onClick={!isMobile ? resetInteractingCycle : noop}
            onMouseMove={!isMobile ? resetInteractingCycle : noop}
            // onTouchStart={isMobile ? handleTouchStart : noop}
            // onTouchEnd={isMobile ? onTap : noop}
            // onTouchMove={isMobile ? handleTouchMove : noop}
            className={classNames(PLAYER_CONTAINER_CLASS, 'relative')}
        >
            {/* Controls */}
            {/* Volume */}
            {/* Pause */}
            {/* Slider */}
            {/* Fullscreen */}
            {/* <MobileBackwardIndicator ref={backIndicatorRef} />
            <MobileForwardIndicator ref={forwardIndicatorRef} />

            {!disableVolumeSlider && (
                <MobileVolumeSlider ref={volumeSliderRef} />
            )}

            <Subtitle /> */}

            <div className="w-full h-full">
                <Player  {...props}></Player>
            </div>

            <div className="absolute z-1 inset-0">
                <Overlay />
            </div>

            {/* <div className="w-full absolute bottom-0 z-2">
                {isMobile ? <MobileControls /> :}
            </div>  */}
            <Controls />
        </div>
    );
}
);

DefaultUI.displayName = 'DefaultUI';

export default React.memo(DefaultUI);