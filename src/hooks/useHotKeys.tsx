import { useVideoProps } from '@/context/VideoPropsContext';
import { useMemo } from 'react';

const useHotKey = (hotKeyName: string) => {
    const { hotkeys } = useVideoProps();

    const hotkey = useMemo(
        () => hotkeys.find(({ name }) => name === hotKeyName),
        [hotkeys, hotKeyName]
    );

    return hotkey;
};

export const parseHotKey = (
    hotkey: string | string[] | undefined,
    seperator = '/'
) => {
    if (!hotkey) return '';

    if (Array.isArray(hotkey)) {
        return hotkey.join(seperator);
    }

    return hotkey;
};

export default useHotKey;