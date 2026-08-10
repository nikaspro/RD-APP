import { useEffect, useRef } from 'react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapIcon } from './icons'

/* Строка табов в шторе.
 *
 * Раньше её рисовал рантайм (paintTabs). Теперь — React поверх табов
 * дизайн-системы: от примитива берём поведение (стрелки, Home/End, roving
 * tabindex, aria-selected), вид остаётся проектным — капс с трекингом,
 * подчёркивание активного, волосяная линия под рядом.
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
  const listRef = useRef<HTMLDivElement>(null)

  /* Держим выбранный таб в видимой части ленты. Так же, как делал рантайм:
     руками по scrollLeft, а не scrollIntoView — тот утащил бы и вертикальную
     прокрутку страницы. */
  useEffect(() => {
    const bar = listRef.current
    if (!bar) return
    const on = bar.querySelector<HTMLElement>('.tab[data-active]')
    if (!on) return
    const left = on.offsetLeft
    const right = left + on.offsetWidth
    if (left - 32 < bar.scrollLeft) bar.scrollLeft = Math.max(0, left - 32)
    else if (right + 32 > bar.scrollLeft + bar.clientWidth)
      bar.scrollLeft = right + 32 - bar.clientWidth
  }, [value])

  return (
    <div className="tabbar">
      <TabsList ref={listRef} aria-label="Разделы поездки">
        {TABS.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className={'map' in t && t.map ? 'tab-map' : undefined}
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
