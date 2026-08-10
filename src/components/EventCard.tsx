import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { StatusChip } from './StatusChip'

/* Карточка события в дне (.ev): заголовок, описание, фото с тегом.
   Card из библиотеки; бордер и тень с неё сняты в theme.css — в этом
   проекте карточки плоские. Свайп влево («Обсудить» / «Перенести»)
   навешивает рантайм по классу .ev. */

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
    <Card className="ev">
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
    </Card>
  )
}

export default EventCard
