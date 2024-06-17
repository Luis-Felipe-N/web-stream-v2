/* eslint-disable react/prop-types */
import React, { ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { isInArray } from '../utils';
import { useVideoProps } from './VideoPropsContext';
import { Audio, Subtitle } from '@/types/types';

export interface VideoState {
    subtitles: Subtitle[];
    qualities: string[];
    currentQuality: string | null;
    currentSubtitle: string | null;
    isSubtitleDisabled: boolean;
    currentAudio: string | null;
    audios: Audio[];
}

type StateSelector = (currentState: VideoState) => Partial<VideoState>;

type UpdateStateAction = (stateSelector: StateSelector) => void;

interface VideoContextProps {
    state: VideoState;
    setState: UpdateStateAction;
}

interface VideoContextProviderProps {
    children: ReactNode
    defaultState?: Partial<VideoState>;
}

const defaultVideoState: VideoState = {
    subtitles: [],
    qualities: [],
    audios: [],
    currentQuality: null,
    currentSubtitle: null,
    currentAudio: null,
    isSubtitleDisabled: false,
};

export const VideoStateContext = React.createContext<VideoContextProps>({
    state: defaultVideoState,
    setState: () => { },
});

const LOCALSTORAGE_KEY = 'netplayer_video_settings';

export function VideoStateContextProvider({ children }: VideoContextProviderProps) {
    const props = useVideoProps();

    const defaultQualities = useMemo(() => {
        return props.source.label ?? '';
    }, [props.source]);

    const defaultState = useMemo(
        () => ({
            currentSubtitle: props.subtitles[0]?.lang,
            subtitles: props.subtitles,
            qualities: defaultQualities,
        }),
        [props.subtitles, defaultQualities]
    );

    const getState = useCallback(() => {
        const rawSettings = localStorage.getItem(LOCALSTORAGE_KEY);

        const newState = {
            ...defaultVideoState,
            ...defaultState,
            ...props?.defaultVideoState,
        };

        if (!rawSettings) return newState;

        const settings: Partial<VideoState> = JSON.parse(rawSettings);

        const langAudios = newState.audios
            .filter((a) => a?.lang)
            .map((a) => a.lang);
        const langSubtitles = newState.subtitles
            .filter((a) => a?.lang)
            .map((s) => s.lang);
        const langQualities = newState.qualities;

        const filteredSettings = {
            currentAudio:
                isInArray(settings?.currentAudio, langAudios) || langAudios.length === 0
                    ? (settings.currentAudio as string) || null
                    : newState.currentAudio,
            currentQuality:
                // @ts-ignore
                isInArray(settings?.currentQuality, langQualities) ||
                    langQualities.length === 0
                    ? (settings.currentQuality as string) || null
                    : newState.currentQuality,
            currentSubtitle:
                isInArray(settings?.currentSubtitle, langSubtitles) ||
                    langSubtitles.length === 0
                    ? (settings.currentSubtitle as string) || null
                    : newState.currentSubtitle,
        };

        return { ...newState, ...filteredSettings };
    }, [defaultState, props?.defaultVideoState]);
    // @ts-ignore
    const [state, setState] = React.useState<VideoState>(getState);

    useEffect(() => {
        const state = getState();
        // @ts-ignore
        setState(state);
    }, [getState]);

    useEffect(() => {
        const {
            currentAudio,
            currentQuality,
            currentSubtitle,
            isSubtitleDisabled,
        } = state;

        localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify({
                currentAudio,
                currentQuality,
                currentSubtitle,
                isSubtitleDisabled,
            })
        );
    }, [state]);

    const updateState: UpdateStateAction = (stateSelector) => {
        setState((prev) => ({ ...prev, ...stateSelector(prev) }));
    };

    return (
        <VideoStateContext.Provider value={{ state, setState: updateState }}>
            {children}
        </VideoStateContext.Provider>
    );
};

export const useVideoState = () => {
    return useContext(VideoStateContext);
};