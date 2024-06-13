import { ForwardButton } from "./ForwardButton";
import FullscreenButton from "./FullscreenButton";
import PlayPauseButton from "./PlayPauseButton";

export default function Controls() {
    return (
        <div className="absolute z-10 bottom-0 left-0 right-0 lg:p-12 md:p-8 p-4">

            <div className="grid grid-cols-12 items-center">
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
    )
}