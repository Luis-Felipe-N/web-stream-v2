import { useVideo } from "@/context/VideoContextProvider";
import { convertTime } from "@/utils";

export function ProgressTimer() {
    const { videoEl } = useVideo();

    return (
        <div className="flex justify-between items-center mb-2">
            <div>
                {videoEl?.currentTime && convertTime(videoEl.currentTime)}
            </div>
            <div>
                {videoEl?.duration ? convertTime(videoEl.duration) : convertTime(0)}
            </div>
        </div>
    )
}