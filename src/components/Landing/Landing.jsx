import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import axios from 'axios'

const Landing = props => {
  const [hot100, setHot100] = useState([])
  const [isLoadingHot100, setIsLoadingHot100] = useState(true)
  useEffect(() => {
    axios.get('/api/charts/hot-100').then(chart => {
      setHot100(chart.data)
      setIsLoadingHot100(false)
    })
  }, [])
  console.log(hot100)
  return (
    <div className="Landing">
      <Card title="the thing is">Here's the thing</Card>
    </div>
  )
}
export default Landing
