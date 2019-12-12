import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'

const PronounsTree = ({ stats, colorsArr }) => {
  return (
    <div className="chart-hold">
      <p className="chart-label">Pronouns by appearance</p>
      <div className="responsive-treemap-wrapper">
        <ResponsiveTreeMap
          isInteractive={false}
          tile="slice"
          root={stats}
          colors={d => colorsArr[d.colorPosition]}
          leavesOnly={true}
          label={d => `${d.id} - ${d.value}`}
          labelTextColor={'black'}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={regularTheme}
          innerPadding={5}
          outerPadding={10}
          defs={formatDef(colorsArr)}
          fill={formatFill()}
          labelSkipSize={12}
        />
      </div>
    </div>
  )
}
export default PronounsTree
