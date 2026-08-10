import { StarIcon } from './icons'

/* Слот звезды агента (.sp).
   Рантайм монтирует сюда Lottie (STAR_ANIMS: pulse / float / rotate) и
   добавляет классу .lot, из-за которого статичная звезда прячется.
   Статичная <StarIcon/> остаётся запасным вариантом, если lottie не поднялся —
   ровно так же, как в legacy. */
export function LottieStar() {
  return (
    <span className="sp">
      <StarIcon />
    </span>
  )
}

export default LottieStar
