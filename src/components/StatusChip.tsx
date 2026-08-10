import type { ReactNode } from 'react'

/* Тег статуса поверх картинки события: «на территории отеля», «доставка»,
   время. В legacy это <span class="chip"> и <span class="chip dark">. */

type Props = {
  /** dark — тёмная заливка поверх фото, по умолчанию светлая */
  dark?: boolean
  children?: ReactNode
}

export function StatusChip({ dark, children }: Props) {
  return <span className={dark ? 'chip dark' : 'chip'}>{children}</span>
}

/* Тег брони у события. Наполнение и видимость ставит рантайм
   (initBooking → [data-bookchip]), поэтому здесь только пустой слот. */
export function BookingChip() {
  return <span className="chip-book" data-bookchip hidden />
}

export default StatusChip
