import type { ReactNode } from 'react'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { StatusChip } from './StatusChip'

/* Карточка события в дне (.ev): заголовок, описание, фото с тегом.
   Card, CardTitle и CardDescription из библиотеки; бордер и тень с карточки
   сняты в theme.css — в этом проекте карточки плоские.

   CardTitle рендерит div, поэтому заголовку явно возвращена роль heading:
   в legacy это был <h3>, и терять уровень заголовка из-за смены компонента
   нельзя. Вид даёт .ev-t из chiposh.css. */

type Props = {
  title: string
  desc?: string
  image?: string
  chip?: string
  chipDark?: boolean
  emptyMedia?: boolean
  children?: ReactNode
}

export function EventCard({ title, desc, image, chip, chipDark, emptyMedia, children }: Props) {
  return (
    <Card className="ev">
      <CardTitle className="ev-t" role="heading" aria-level={3}>
        {title}
      </CardTitle>
      {desc ? <CardDescription className="ev-d">{desc}</CardDescription> : null}
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
