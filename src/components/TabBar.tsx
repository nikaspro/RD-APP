import { useEffect, useRef } from 'react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapIcon } from './icons'

/* Строка табов в шторе.
 *
 * Компонент табов — из библиотеки, файл src/components/ui/tabs.tsx лежит
 * ровно в том виде, в каком его отдаёт shadcn. Вариант line — их же
 * подчёркивание вместо серой капсулы.
 *
 * Проектный вид добавлен сверху классами .tabs и .tab из перенесённого
 * chiposh.css: капс с трекингом, подчёркивание 1.5px, волосяная линия под
 * рядом, прокрутка. Эти правила лежат вне слоёв Tailwind, поэтому в каскаде
 * стоят выше утилит библиотеки и переопределяют их — трогать сам компонент
 * не нужно.
 *
 * Порядок и подписи — те же, что были в TABS рантайма. */

const TABS = [
  { value: 'home', label: <MapIcon />, aria: 'Карта', map: true },
  { value: 'prep', label: 'Подготовка' },
  { value: 'today', label: 'Сегодня' },
  { value: 'd05', label: '5.07' },
  { value: 'd06', label: '6.07' },
  { value: 'out', label: 'Выезд' },
] as const

type Props = { value: string }

export function TabBar({ value }: Props) {
  const boxRef = useRef<HTMLDivElement>(null)

  /* Держим выбранный таб в видимой части ленты. Так же, как делал рантайм:
     руками по scrollLeft, а не scrollIntoView — тот утащил бы и вертикальную
     прокрутку страницы. */
  useEffect(() => {
    const bar = boxRef.current?.querySelector<HTMLElement>('[data-slot="tabs-list"]')
    const on = bar?.querySelector<HTMLElement>('.tab[data-active]')
    if (!bar || !on) return
    const left = on.offsetLeft
    const right = left + on.offsetWidth
    if (left - 32 < bar.scrollLeft) bar.scrollLeft = Math.max(0, left - 32)
    else if (right + 32 > bar.scrollLeft + bar.clientWidth)
      bar.scrollLeft = right + 32 - bar.clientWidth
  }, [value])

  /* min-w-0 на обёртке: Tabs из библиотеки — флекс-контейнер, а флекс-элемент
     по умолчанию не сжимается уже своего содержимого. Без этого ряд табов
     распирал бы рамку вместо того, чтобы прокручиваться внутри неё. */
  return (
    <div className="tabbar w-full min-w-0" ref={boxRef}>
      <TabsList
        variant="line"
        /* w-full и justify-start гасят w-fit и justify-center из библиотеки:
           ряд должен быть шириной с рамку и прокручиваться, а не растягиваться
           по содержимому. Конфликт классов разбирает cn() внутри компонента —
           побеждает то, что пришло снаружи. */
        className="tabs w-full justify-start"
        /* data-rail — перетаскивание ленты мышью, его вешает рантайм виджета */
        data-rail
        aria-label="Разделы поездки"
      >
        {TABS.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className={'map' in t && t.map ? 'tab tab-map' : 'tab'}
            aria-label={'aria' in t ? t.aria : undefined}
            aria-controls={`pane-${t.value}`}
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}

export default TabBar
