/* Иконка погоды. Слот пустой: рантайм кладёт сюда WX_ICON и тем же
   маркапом заполняет 24 колонки часового прогноза (#days), поэтому
   разметка иконки живёт в одном месте — в chiposhRuntime. */
export function WxIcon() {
  return <span data-icon />
}

export default WxIcon
