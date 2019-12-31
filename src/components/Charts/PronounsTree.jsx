import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'
import { Card } from 'antd'

const PronounsTree = ({ stats, colorsArr, loading }) => {
  return (
    <Card title="Pronouns by appearance" loading={loading}>
      <div className="chart-hold">
        <div className="responsive-treemap-wrapper">
          <ResponsiveTreeMap
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
            fill={formatFill('word')}
            labelSkipSize={12}
          />
        </div>
      </div>
    </Card>
  )
}
export default PronounsTree
