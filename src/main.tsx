import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
/* Тема проекта поверх дефолтов shadcn, затем стили виджета из legacy —
   порядок важен: побеждать при равной специфичности должен перенесённый CSS. */
import './styles/theme.css'
import './styles/chiposh.css'

/* Без StrictMode: рантайм виджета работает с DOM напрямую и рассчитан на
   одну инициализацию, а StrictMode в dev монтирует дерево дважды. */
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
