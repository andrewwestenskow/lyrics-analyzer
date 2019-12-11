import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'

const WordsTree = ({ stats, colorsArr }) => {
  return (
    <div className="large-chart-hold common-vs-complex-bar">
      <p className="chart-label">Complex words by appearance</p>
      <div className="responsive-treemap-wrapper">
        <ResponsiveTreeMap
          isInteractive={false}
          root={stats}
          colors={d => colorsArr[d.colorPosition]}
          leavesOnly={true}
          label={d => `${d.id} - ${d.value}`}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', '2']],
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={regularTheme}
          innerPadding={5}
          outerPadding={10}
          defs={formatDef(colorsArr)}
          fill={formatFill()}
        />
      </div>
    </div>
  )
}
export default WordsTree
