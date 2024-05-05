import { WatchBrasilProvider } from "@/providers/useWatchBrasilProvider";



export default function MovieLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (


        <div>
            <WatchBrasilProvider>{children}</WatchBrasilProvider>
        </div>

    )
}