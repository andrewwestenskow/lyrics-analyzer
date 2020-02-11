import React, { useEffect, useState } from 'react'
import Hot100 from './Hot100'
import LandingInfo from './LandingInfo'
import axios from 'axios'

const Landing = ({ history }) => {
  const [hot100, setHot100] = useState([])
  const [isLoadingHot100, setIsLoadingHot100] = useState(true)
  useEffect(() => {
    axios.get('/api/charts/hot-100').then(chart => {
      setHot100(chart.data)
      setIsLoadingHot100(false)
    })
  }, [])

  return (
    <div className="Landing">
      <section className="landing-row">
        <LandingInfo />
        <Hot100 history={history} data={hot100} loading={isLoadingHot100} />
      </section>
    </div>
  )
}
export default Landing
