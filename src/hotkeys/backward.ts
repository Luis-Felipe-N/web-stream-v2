import { HotKey } from "@/types/types";


const backwardHotKey = (hotKey: string | string[] = 'left'): HotKey => ({
  fn: (videoEl: HTMLVideoElement) => {
    videoEl.currentTime = videoEl.currentTime - 10;
  },
  name: 'backward',
  hotKey: hotKey,
});

export default backwardHotKey;
