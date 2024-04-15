import React from "react";
import { motion } from 'framer-motion'

interface LazyYoutubeProps {
    videoId: string

}

export default function LazyYoutube({ videoId }: LazyYoutubeProps) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1.5,
                delay: 3.2
            }}
            className="absolute top-0 left-0 right-0 bottom-0 z-0"
        >
            <iframe
                className="absolute top-1/2 left-1/2 min-w-full h-[115vh] transform -translate-x-1/2 -translate-y-1/2"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&autohide=1&rel=0&version=3&loop=1&playlist=${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </motion.div>
    );
};
