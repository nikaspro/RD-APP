import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

/* Тег статуса поверх картинки события: «на территории отеля», «доставка»,
   время. Badge из библиотеки; вид проектный — класс .chip из chiposh.css
   (высота 24, радиус 12, плотная заливка), а не бордер из дефолта shadcn. */

type Props = {
  /** dark — тёмная заливка поверх фото, по умолчанию светлая */
  dark?: boolean
  children?: ReactNode
}

export function StatusChip({ dark, children }: Props) {
  return <Badge className={dark ? 'chip dark' : 'chip'}>{children}</Badge>
}

/* Тег брони у события. Наполнение и видимость ставит рантайм
   (initBooking → [data-bookchip]), поэтому здесь только пустой слот. */
export function BookingChip() {
  return <Badge className="chip-book" data-bookchip hidden />
}

export default StatusChip
