import type { ReactNode, HTMLAttributes } from 'react'

/* Горизонтальная лента с перетаскиванием мышью.
   В legacy это атрибут [data-rail] — рантайм вешает на каждый такой
   контейнер drag-to-scroll (секция «drag-to-scroll rails»). Компонент
   только проставляет атрибут, саму механику не дублирует.
   Остальные атрибуты (например data-times у ряда времён брони)
   пробрасываются как есть. */

type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children?: ReactNode
}

export function HScroll({ className, children, ...rest }: Props) {
  return (
    <div className={className} data-rail {...rest}>
      {children}
    </div>
  )
}

export default HScroll
