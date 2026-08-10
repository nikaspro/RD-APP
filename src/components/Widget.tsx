import { useEffect } from 'react'
import { Hero } from './Hero'
import { TabBar } from './TabBar'
import { HomePane } from './HomePane'
import { PrepPane } from './PrepPane'
import { TodayPane } from './TodayPane'
import { OutPane } from './OutPane'
import { AgentOrb } from './AgentOrb'
import { AudioPlayer } from './AudioPlayer'
import { AgentReplyDialog } from './AgentReplyDialog'
import { initChiposh } from '../lib/chiposhRuntime'

/* Виджет целиком: рамка 393×812, обложка, прокрутка с табами и панелями,
   кнопка агента, плеер и лист разговора.
   Поведение поднимает initChiposh() после монтирования — в legacy эту роль
   играл <script> в конце body. Дальше рантайм владеет содержимым пустых
   контейнеров (билеты, табы, часы погоды, пины карты, клавиатура) и
   дорисовывает панели 5.07 / 6.07 копией дня, поэтому перерисовывать
   поддерево React не должен: рендер здесь одноразовый. */
export function Widget() {
  useEffect(() => {
    initChiposh()
  }, [])

  return (
    <div className="stage">
      <div className="frame" id="frame">
        <Hero />
        <div className="scroller" id="scroller">
          <div className="hero-gap" />
          <div className="curtain">
            <TabBar />
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
