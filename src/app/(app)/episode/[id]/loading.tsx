'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <AnimatePresence>
            <motion.div
                key="loading"
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: .5,
                    delay: .2
                }}
                className='absolute top-0 bottom-0 left-0 right-0 grid place-items-center z-50 bg-slate-950'>
                <Loader2 className="mr-2 h-10 w-10 animate-spin text-zinc-500" />
            </motion.div>
        </AnimatePresence >
    )
}