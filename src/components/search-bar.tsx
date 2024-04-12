'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Search } from 'lucide-react'
import { motion } from "framer-motion";

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    let timeOutSearch: any


    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        clearTimeout(timeOutSearch)
        timeOutSearch = setTimeout(async () => {
            if (term) {
                params.set('keyword', term);
            } else {
                params.delete('keyword');
            }

            replace(`${pathname}?${params.toString()}`);
        }, 700)


    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5,
            }}
            className="relative z-20 flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>

            <Input
                className="w-full"
                placeholder="Encontre animes de todos estilos"
                icon={<Search className="hover:font-bold" size={24} />}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}

            />
        </motion.div>
    )
}