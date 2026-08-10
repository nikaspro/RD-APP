import type { ReactNode } from 'react'
import { StatusChip } from './StatusChip'

/* Карточка события в дне (.ev): заголовок, описание, фото с тегом.
   Свайп влево по карточке («Обсудить» / «Перенести») навешивает рантайм. */

type Props = {
  title: string
  desc?: string
  /** путь картинки; без него блок .media остаётся пустой подложкой */
  image?: string
  /** тег поверх фото: «на территории отеля», «доставка», время */
  chip?: string
  chipDark?: boolean
  /** пустой .media без картинки — так сделаны точки заката в legacy */
  emptyMedia?: boolean
  children?: ReactNode
}

export function EventCard({ title, desc, image, chip, chipDark, emptyMedia, children }: Props) {
  return (
    <div className="ev">
      <h3 className="ev-t">{title}</h3>
      {desc ? <p className="ev-d">{desc}</p> : null}
      {image ? (
        <div className="media">
          <img src={image} alt="" />
          {chip ? <StatusChip dark={chipDark}>{chip}</StatusChip> : null}
        </div>
      ) : emptyMedia ? (
        <div className="media" />
      ) : null}
      {children}
    </div>
  )
}

export default EventCard
