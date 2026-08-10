import { useEffect, useState } from 'react'
import { Hero } from './Hero'
import { TabBar } from './TabBar'
import { HomePane } from './HomePane'
import { PrepPane } from './PrepPane'
import { TodayPane } from './TodayPane'
import { OutPane } from './OutPane'
import { AgentOrb } from './AgentOrb'
import { AudioPlayer } from './AudioPlayer'
import { AgentReplyDialog } from './AgentReplyDialog'
import { Tabs } from '@/components/ui/tabs'
import { initChiposh, chiposh } from '../lib/chiposhRuntime'

/* Виджет целиком: рамка 393×812, обложка, штора с табами и панелями,
   кнопка агента, плеер и лист разговора.
   Поведение поднимает initChiposh() после монтирования — в legacy эту роль
   играл <script> в конце body. Дальше рантайм владеет содержимым пустых
   контейнеров (билеты, часы погоды, пины карты, клавиатура) и дорисовывает
   панели 5.07 / 6.07 копией дня, поэтому перерисовывать поддерево React
   не должен: рендер здесь одноразовый.
   Исключение — табы: их состояние держит React, а рантайму остаётся
   переключение панели. */
export function Widget() {
  const [tab, setTab] = useState('home')

  useEffect(() => {
    initChiposh()
    /* Панели становятся мишенями табов только после инициализации: две из
       шести рантайм дорисовывает копией дня, и id им нужно раздать уже
       по факту, иначе копия унесла бы чужой id. */
    document.querySelectorAll<HTMLElement>('.pane').forEach((pane) => {
      if (pane.dataset.tab) pane.id = `pane-${pane.dataset.tab}`
      pane.setAttribute('role', 'tabpanel')
    })
  }, [])

  return (
    <div className="stage">
      <div className="frame" id="frame">
        <Hero />
        <div className="scroller" id="scroller">
          <div className="hero-gap" />
          <div className="curtain">
            <Tabs
              value={tab}
              onValueChange={(next) => {
                const key = String(next)
                setTab(key)
                /* Переключение панели, прокрутка и пересчёт ленты фильмов
                   и заката — всё это по-прежнему делает рантайм. */
                chiposh.show(key)
              }}
            >
              <TabBar value={tab} />
            </Tabs>
            <div className="panes">
              <HomePane />
              <PrepPane />
              <OutPane />
              <TodayPane />
            </div>
          </div>
        </div>
        <AgentOrb />
        <AudioPlayer />
        <AgentReplyDialog />
      </div>
    </div>
  )
}

export default Widget
