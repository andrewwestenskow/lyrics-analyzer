import React from 'react'
import Search from './components/Search'
import Landing from './components/Landing'
import Display from './components/Display'
import { Route } from 'react-router-dom'
import './styles/App.scss'

function App() {
  return (
    <div className="App">
      <Search />
      <Route exact path="/" component={Landing} />
      <Route path="/lyrics" component={Display} />
    </div>
  )
}

export default App
