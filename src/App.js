import React, { useState } from 'react'
import Search from './components/Search'
import Landing from './components/Landing'
import Stats from './components/Stats'
import './App.scss'

function App() {
  const [stats, setStats] = useState({})
  return (
    <div className="App">
      <Search setStats={setStats} />
      {stats.phrases ? <Stats stats={stats} /> : <Landing />}
    </div>
  )
}

export default App
