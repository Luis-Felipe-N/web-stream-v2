import { PLAYER_CONTAINER_CLASS } from "@/constants";
import { useVideoProps } from "@/context/VideoPropsContext";
import useHotKey from "@/hooks/useHotKeys";
import { isMobile } from "@/utils/device";
import screenfull from "@/utils/screenfull";
import { useCallback, useState } from "react";
import { FaCompress, FaExpand } from "react-icons/fa6";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const { i18n } = useVideoProps();
  const hotkey = useHotKey('fullscreen');

  const handleFullscreen = useCallback(() => {
    if (!screenfull.isEnabled) return;

    const containerEl = document.querySelector(`.${PLAYER_CONTAINER_CLASS}`);

    if (!isFullscreen) {
      // @ts-ignore
      screenfull.request(containerEl).then(() => {
        if (!isMobile) return;

        // @ts-ignore
        screen.orientation.lock('landscape');
      });
      setIsFullscreen(true);
    } else {
      screenfull.exit().then(() => {
        if (!isMobile) return;

        // @ts-ignore
        screen.orientation.lock('portrait');
      });
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  return (
    <button
      onClick={handleFullscreen}
    >
      {!isFullscreen ? <FaExpand size={18} /> : <FaCompress size={18} />}
    </button>
  );
};

export default FullscreenButton;
