import React from 'react'
import Search from './components/Search'
import Landing from './components/Landing'
import Display from './components/Display'
import { Route } from 'react-router-dom'
import useMediaQuery from './hooks/useMediaQuery'
import { bigBreak } from './constants/breakPoints'
import './styles/App.scss'

function App() {
  const isDesktop = useMediaQuery(bigBreak)
  return (
    <div className="App">
      <Search isDesktop={isDesktop} />
      <Route
        exact
        path="/"
        component={props => <Landing {...props} isDesktop={isDesktop} />}
      />
      <Route
        path="/lyrics"
        component={props => <Display {...props} isDesktop={isDesktop} />}
      />
    </div>
  )
}

export default App
