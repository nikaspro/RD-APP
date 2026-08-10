import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Чепош Парк
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Интерфейс бронирования путешествий с ИИ-агентом
          </p>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="font-semibold text-blue-900 mb-2">
              🔄 Миграция в процессе
            </h2>
            <p className="text-blue-800">
              Архивная версия: <code className="bg-white px-2 py-1 rounded">legacy/ChiposhPark.html</code>
            </p>
            <p className="text-blue-800 mt-2">
              Активная разработка идёт в <code className="bg-white px-2 py-1 rounded">src/</code>
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              📦 Структура проекта
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li>• <code className="bg-slate-100 px-2 py-1 rounded">src/</code> — React компоненты</li>
              <li>• <code className="bg-slate-100 px-2 py-1 rounded">src/assets/</code> — изображения и Lottie</li>
              <li>• <code className="bg-slate-100 px-2 py-1 rounded">legacy/</code> — архивная статичная версия</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
