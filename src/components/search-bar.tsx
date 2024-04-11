'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Search } from 'lucide-react'
import { motion } from "framer-motion";

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5,
            }}
            className="relative flex flex-1 flex-shrink-0">
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