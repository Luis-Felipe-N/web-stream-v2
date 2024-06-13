import { Source } from '@/types/types';
import { ReactNode } from 'react';
import { VideoPropsProvider } from './VideoPropsContext';
import { VideoInteractingContextProvider } from './VideoInteractingContext';

interface GlobalContextProps {
    source: Source
    children: ReactNode
}

const GlobalContext = ({
    children,
    source,
    ...props
}: GlobalContextProps) => {
    return (
        <VideoPropsProvider source={source}  {...props}>
            {/* <VideoStateContextProvider> */}
            <VideoInteractingContextProvider>
                {children}
            </VideoInteractingContextProvider>
            {/* </VideoStateContextProvider> */}
        </VideoPropsProvider>
    );
};

export default GlobalContext;