import React from 'react'
import { Card } from 'antd'

const PhrasesLegend = ({ stats, colorsArr, loading }) => {
  return (
    <Card loading={loading}>
      <div style={{ background: 'blue' }} className="half-chart-hold"></div>
    </Card>
  )
}
export default PhrasesLegend
