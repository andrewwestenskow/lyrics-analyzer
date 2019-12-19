import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { phraseKeys } from '../../constants/data'

const TopPhrases = ({ stats, colorsArr }) => {
  console.log(stats)

  return (
    <div className="chart-hold">
      <p className="chart-label">Phrases</p>
      <div className="responsive-treemap-wrapper">
        <ResponsiveBar indexBy="phrase" keys={phraseKeys} data={stats} />
      </div>
    </div>
  )
}
export default TopPhrases
