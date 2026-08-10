import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
/* После index.css: стили виджета перенесены из legacy и должны выигрывать
   у утилит при равной специфичности. */
import './styles/chiposh.css'

/* Без StrictMode: рантайм виджета работает с DOM напрямую и рассчитан на
   одну инициализацию, а StrictMode в dev монтирует дерево дважды. */
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
