import { CheckIcon, PlusIcon } from './icons'

/* Кружок-иконка слева в строке списка «Что взять с собой в дорогу».
   Отмеченное состояние (.li.on) навешивает рантайм по тапу. */

type Props = { variant?: 'check' | 'add' }

export function AmenityIcon({ variant = 'check' }: Props) {
  return <i>{variant === 'add' ? <PlusIcon /> : <CheckIcon />}</i>
}

export default AmenityIcon
