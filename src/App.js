import React, { useState } from 'react'
import Search from './components/Search'
import './App.scss'

function App() {
  const [stats, setStats] = useState({})
  return (
    <div className="App">
      <Search setStats={setStats} />
    </div>
  )
}

export default App
