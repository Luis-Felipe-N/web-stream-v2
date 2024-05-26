'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        // <AnimatePresence>
        //     <motion.div
        //         key="loading"
        //         animate={{ opacity: 1 }}
        //         exit={{ opacity: 0 }}
        //         transition={{
        //             duration: .5,
        //             delay: .2
        //         }}
        //         className='absolute top-0 bottom-0 left-0 right-0 grid place-items-center z-50 bg-slate-950'>
        //         <Loader2 className="mr-2 h-10 w-10 animate-spin text-zinc-500" />
        //     </motion.div>
        // </AnimatePresence>
        <main>
            <div className='lg:h-[90vh] md:h-[70vh] h-[60vh]'>
                <Skeleton className='w-[280px] h-[30px]'></Skeleton>
            </div>

            <div>
                <div className='mb-24'>
                    <section className="lg:px-24 lg:py-8 p-4 relative z-20">
                        <strong className="lg:text-xl">
                            <Skeleton className='w-[280px] h-[30px]'></Skeleton>
                        </strong>

                        <div className='flex gap-1 mt-4'>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                            <Skeleton className='aspect-[4/3] lg:w-[15rem] lg:h-[21.92rem] md:w-[10rem] md:h-[14.62rem] w-[8rem] h-[11.69rem] border-2'></Skeleton>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}