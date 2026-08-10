import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

/* Стопка вариантов (.ev[data-deck]): лицевая карточка лежит на двух
   подложках, тап раскрывает остальные варианты пружиной.
   Раскрытие и «Свернуть» ведёт рантайм по [data-deck] / [data-rest] / [data-hide]. */

type Props = {
  /** содержимое лицевой карточки над стопкой */
  face: ReactNode
  /** картинка лицевой карточки */
  image: string
  /** раскрываемые варианты */
  children: ReactNode
}

export function SwipeDeck({ face, image, children }: Props) {
  return (
    <div className="ev" data-deck>
      <div className="deck-face">
        {face}
        <div className="deck">
          <i />
          <i />
          <div className="media">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <div className="deck-rest" data-rest>
        {children}
        <div className="deck-hide">
          <Button variant="outline" className="pill" data-hide>
            Свернуть
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SwipeDeck
