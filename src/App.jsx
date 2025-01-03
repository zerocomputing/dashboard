import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Metrics from './components/Metrics'
import QueueStatus from './components/QueueStatus'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="lg:pl-64">
          <main className="py-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/queue" element={<QueueStatus />} />
              <Route path="/history" element={<div>History page coming soon...</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
