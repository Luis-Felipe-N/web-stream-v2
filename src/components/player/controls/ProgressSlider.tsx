import { useVideo } from '@/context/VideoContextProvider';
import { classNames, convertTime } from '@/utils';
import { isDesktop } from '@/utils/device';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Slider from '../slider';


const ProgressSlider = () => {
  const { videoEl, setVideoState } = useVideo();
  const [bufferPercent, setBufferPercent] = useState(0);
  const [hoverPercent, setHoverPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // https://stackoverflow.com/questions/5029519/html5-video-percentage-loaded
  useEffect(() => {
    if (!videoEl) return;

    const handleProgressBuffer = () => {
      const buffer = videoEl.buffered;

      if (!buffer.length) return;
      if (!videoEl.duration) return;

      const bufferedTime = buffer.end(buffer.length - 1);
      const bufferedPercent = (bufferedTime / videoEl.duration) * 100;

      setBufferPercent(bufferedPercent);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    videoEl.addEventListener('progress', handleProgressBuffer);
    videoEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoEl.removeEventListener('progress', handleProgressBuffer);
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoEl]);

  const currentPercent = useMemo(() => {
    if (!videoEl?.duration) return 0;

    return (currentTime / videoEl.duration) * 100;
  }, [currentTime, videoEl?.duration]);

  const handlePercentIntent = useCallback((percent: number) => {
    setHoverPercent(percent);
  }, []);

  const handlePercentChange = useCallback(
    (percent: number) => {
      if (!videoEl?.duration) return;

      const newTime = (percent / 100) * videoEl.duration;

      videoEl.currentTime = newTime;

      if (videoEl.paused) {
        videoEl.play();
      }

      setVideoState({ seeking: false });
      setCurrentTime(newTime);
    },
    [setVideoState, videoEl]
  );

  const handleDragStart = useCallback(() => {
    setVideoState({ seeking: true });
  }, [setVideoState]);

  const handleDragEnd = useCallback(() => {
    setVideoState({ seeking: true });
  }, [setVideoState]);

  const handlePercentChanging = useCallback(
    (percent: number) => {
      if (!videoEl?.duration) return;

      if (!videoEl.paused) {
        videoEl.pause();
      }

      const newTime = (percent / 100) * videoEl.duration;

      setVideoState({ seeking: true });
      setCurrentTime(newTime);
    },
    [setVideoState, videoEl]
  );

  return (
    <Slider
      className={classNames(
        "w-full cursor-pointer flex flex-col justify-end",
        isDesktop ? "h-4" : "h-1"
      )}
      onPercentIntent={handlePercentIntent}
      onPercentChange={handlePercentChange}
      onPercentChanging={handlePercentChanging}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >

      <div>
        {/* {currentPercent && <div>{convertTime(currentPercent)}</div>} */}
        {/* {videoEl?.duration && <div>{convertTime(videoEl.duration)}</div>} */}
      </div>


      <div className="w-full h-2 relative group rounded-full">
        <Slider.Bar className="bg-slate-50/70" percent={hoverPercent} />
        <Slider.Bar className="bg-slate-50/60" percent={bufferPercent} />
        <Slider.Bar className="bg-slate-50" percent={currentPercent} />
        <Slider.Bar className="bg-slate-50/40 w-full" />
        <Slider.Dot
          className={classNames(
            "w-3.5 h-3.5 absolute bg-slate-50 rounded-full",
            isDesktop ? "hidden group-hover:block" : "block"
          )}
          percent={currentPercent}
        />


        {!!hoverPercent && videoEl?.duration && (
          <div
            className="bg-black/80 text-white p-1 absolute bottom-full mb-3 transform -translate-x-1/2"
            style={{ left: `${hoverPercent}%` }}
          >
            {convertTime((hoverPercent / 100) * videoEl.duration)}
          </div>
        )}
      </div>
    </Slider>
  );
};

export default ProgressSlider;
