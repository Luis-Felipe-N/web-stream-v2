import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale'

// export function formatDistanceDate(date: Date) {
//   const dateFormatted = formatDistanceToNow(date, {
//     locale: ptBR,
//     addSuffix: true,
//   })

//   return dateFormatted
// }

export function formatDate(date: Date | string) {
  const dateFormatted = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return dateFormatted
}
