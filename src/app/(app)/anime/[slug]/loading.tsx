'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <main>
            <div className='lg:h-[90vh] md:h-[70vh] h-[60vh]'>
                <div className="h-full relative z-10 flex items-end w-full bg-gradient-to-t from-slate-950/30 via-slate-950/30 to-transparent">
                    <div className="relative z-10 px-4 md:px-8 lg:px-24 lg:pb-32 pb-12 bg-gradient-to-tr from-slate-950 via-transparent to-transparent">
                        <h1 className="font-semibold  text-4xl"></h1>
                        <strong className="text-green-500 uppercase mt-4 block lg:text-base text-sm">

                        </strong>
                        <Skeleton className='w-[430px] h-[40px]'></Skeleton>
                        <Skeleton className='w-[230px] h-[24px] mt-4'></Skeleton>
                        <Skeleton className='w-[700px] h-[80px] mt-4'></Skeleton>

                        <Skeleton className='w-[200px] h-[56px] mt-4'></Skeleton>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 w-full  bg-gradient-to-t from-slate-950 via-slate-950/0 to-transparent z-0 h-[100rem]"></div>
                </div>
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