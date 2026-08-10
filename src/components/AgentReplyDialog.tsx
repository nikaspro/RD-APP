/* Разговор с агентом: затемнение, лист с лентой сообщений, поле ввода и
   экранная клавиатура.
   Ленту, пилюли-подсказки и раскладку ЙЦУКЕН наполняет рантайм — здесь
   контейнеры и панель ввода в том же виде, что в legacy. */
export function AgentReplyDialog() {
  return (
    <>
      <div className="scrim" data-close />
      <div className="sheet">
        <div className="chat-msgs" data-msgs />
        <div className="chat-bar">
          <input className="chat-input" data-chatinput placeholder="Спросите о чём угодно" />
          <button className="chat-send" data-chatsend hidden aria-label="Отправить">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
          <button className="chat-skip" data-skip>
            Пропустить
          </button>
          <button className="chat-close" data-close aria-label="Закрыть">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#697079"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="kb" data-kb />
      </div>
    </>
  )
}

export default AgentReplyDialog
