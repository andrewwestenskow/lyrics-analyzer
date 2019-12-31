import React, { useState } from 'react'
import Search from './components/Search'
import Landing from './components/Landing'
import Stats from './components/Stats'
import './App.scss'

function App() {
  const [stats, setStats] = useState({})
  const [song, setSong] = useState({})
  const [loading, setLoading] = useState(true)
  return (
    <div className="App">
      <Search loading={loading} setSong={setSong} setStats={setStats} />
      {stats.phrases ? (
        <Stats
          loading={loading}
          setLoading={setLoading}
          song={song}
          stats={stats}
        />
      ) : (
        <Landing />
      )}
    </div>
  )
}

export default App
