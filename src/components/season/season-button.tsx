'use client'

import { SeasonT } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface SeasonButtonProps {
  seasons: SeasonT[]
  onValueChange: (value: string) => void
}
export default function SeasonButton({
  seasons,
  onValueChange,
}: SeasonButtonProps) {
  return (
    <Select defaultValue={seasons[0].id} onValueChange={onValueChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Escolha uma temporada" />
      </SelectTrigger>
      <SelectContent>
        {seasons.map((season) => (
          <SelectItem key={season.id} value={season.id}>
            {season.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
