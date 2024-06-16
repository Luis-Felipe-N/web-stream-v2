import { useVideo } from '@/context/VideoContextProvider';
import * as React from 'react';

const Overlay = () => {
    const { videoEl } = useVideo();

    const handleToggleVideo = () => {
        if (!videoEl) return;

        if (videoEl.paused) {
            videoEl.play();
        } else {
            videoEl.pause();
        }
    };

    return (
        <div onClick={handleToggleVideo} className="w-full h-full z-1"></div>
    );
};

export default Overlay;