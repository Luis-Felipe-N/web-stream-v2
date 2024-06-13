import * as React from 'react';
import { IndicatorRef } from '../indicator';
import useHotKey from '@/hooks/useHotKeys';
import { useVideoProps } from '@/context/VideoPropsContext';
import { useVideo } from '@/context/VideoContextProvider';
import { Loader2Icon, PauseIcon, PlayIcon } from 'lucide-react';
import { FaPlay, FaPause } from "react-icons/fa6";
import { stringInterpolate } from '@/utils';


const PlayPauseButton = () => {
  const playIndicator = React.useRef<IndicatorRef>(null);
  const pauseIndicator = React.useRef<IndicatorRef>(null);

  const hotkey = useHotKey('playPause');
  const { i18n } = useVideoProps();
  const { videoState, videoEl } = useVideo();

  const handleClick = () => {
    if (!videoEl) return;

    if (videoState.paused) {
      playIndicator.current?.show();
      videoEl.play();
    } else {
      pauseIndicator.current?.show();
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
        <Loader2Icon />
      ) : videoState.paused ? (
        <FaPlay size={24} />
      ) : (
        <FaPause size={24} />
      )}

      {/* <PlayIndicator ref={playIndicator} />
      <PauseIndicator ref={pauseIndicator} /> */}
    </button>
  );
};

export default React.memo(PlayPauseButton);
