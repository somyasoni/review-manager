import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Reviews from './pages/Reviews'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [activePage, setActivePage] = useState('reviews')

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ flex: 1, background: '#f5f5f0', overflow: 'auto' }}>
        {activePage === 'reviews' && <Reviews />}
        {activePage === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}