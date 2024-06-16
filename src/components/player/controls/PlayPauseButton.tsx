import * as React from 'react';
import useHotKey from '@/hooks/useHotKeys';
import { useVideoProps } from '@/context/VideoPropsContext';
import { useVideo } from '@/context/VideoContextProvider';
import { Loader2, Loader2Icon, PauseIcon, PlayIcon } from 'lucide-react';
import { FaPlay, FaPause } from "react-icons/fa6";
import { stringInterpolate } from '@/utils';


const PlayPauseButton = () => {
  const { videoState, videoEl } = useVideo();

  const handleClick = () => {
    if (!videoEl) return;

    if (videoState.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  return (
    <button
      onClick={handleClick}
      className='bg-slate-50 p-4 rounded-full text-slate-950'
    // {stringInterpolate(i18n.controls.pause)}
    >
      {videoState.buffering ? (
        <Loader2 className="animate-spin" />
      ) : videoState.paused ? (
        <FaPlay size={24} />
      ) : (
        <FaPause size={24} />
      )}

    </button>
  );
};

export default React.memo(PlayPauseButton);
