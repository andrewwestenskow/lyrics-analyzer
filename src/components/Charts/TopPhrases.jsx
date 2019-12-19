import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { phraseKeys } from '../../constants/data'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'

const TopPhrases = ({ stats, colorsArr }) => {
  console.log(stats)

  return (
    <div className="large-chart-hold">
      <p className="chart-label">Phrases</p>
      <div className="responsive-treemap-wrapper">
        <ResponsiveBar
          defs={formatDef(colorsArr)}
          fill={formatFill('phrase')}
          indexBy="phrase"
          keys={phraseKeys}
          data={stats}
          theme={regularTheme}
        />
      </div>
    </div>
  )
}
export default TopPhrases
