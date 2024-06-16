import { useInteract } from "@/context/VideoInteractingContext";
import { ForwardButton } from "./ForwardButton";
import FullscreenButton from "./FullscreenButton";
import PlayPauseButton from "./PlayPauseButton";
import { ProgressTimer } from "./Progress";
import ProgressSlider from "./ProgressSlider";

export default function Controls() {
    const { isInteracting } = useInteract()

    if (!isInteracting) {
        return null
    }

    return (
        <div className="absolute z-10 bottom-0 left-0 right-0 lg:p-12 md:p-8 p-4 b">
            <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-transparent z-0 h-[100rem]"></div>
            <div className="relative z-2">
                <ProgressTimer />
                <ProgressSlider />

                <div className="grid grid-cols-12 items-center mt-8">
                    <div className="col-span-4">

                    </div>

                    <div className="col-span-4 justify-self-center flex space-x-8">
                        {/* <PlayPauseButton /> */}
                        <PlayPauseButton />
                        <ForwardButton />
                    </div>


                    <div className="col-span-4 justify-self-end">
                        <FullscreenButton />
                    </div>
                </div>
            </div>
        </div>
    )
}