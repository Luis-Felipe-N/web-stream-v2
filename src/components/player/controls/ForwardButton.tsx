'use client'

import { useVideoProps } from "@/context/VideoPropsContext";
import { useRouter } from "next/navigation";
import { FaForward } from "react-icons/fa6";

export function ForwardButton() {

    const { forwarder } = useVideoProps()
    const router = useRouter()

    function handleForwarder() {
        // SALVAR O ESTADO

        router.push(`/episode/${forwarder.id}`)
    }

    return (
        <button onClick={handleForwarder}>
            <FaForward />
        </button>
    )
}