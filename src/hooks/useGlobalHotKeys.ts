'use client'

import { useEffect } from 'react';
import { useVideoProps } from '@/context/VideoPropsContext';
import isHotkey from '@/utils/hotkey';

const useGlobalHotKeys = (videoEl: HTMLVideoElement) => {
    const { hotkeys } = useVideoProps();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const focusEl = document.activeElement;

            if (
                focusEl &&
                ((focusEl.tagName.toLowerCase() == 'input' &&
                    // @ts-ignore
                    focusEl?.type == 'text') ||
                    focusEl.tagName.toLowerCase() == 'textarea')
            )
                return;

            const matchedHotKey = hotkeys.find((hotkey) =>
                isHotkey(hotkey.hotKey, event)
            );

            if (!matchedHotKey) return;

            const { fn, preventDefault = true } = matchedHotKey;

            if (preventDefault) event.preventDefault();

            fn(videoEl);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [videoEl, hotkeys]);
};

export default useGlobalHotKeys;