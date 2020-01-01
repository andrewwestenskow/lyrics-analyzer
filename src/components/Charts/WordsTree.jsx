import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'
import { Card } from 'antd'

const WordsTree = ({ stats, colorsArr, loading }) => {
  return (
    <Card title="Complex words by appearance" loading={loading}>
      <div className="large-chart-hold common-vs-complex-bar">
        <div className="responsive-treemap-wrapper">
          <ResponsiveTreeMap
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
            labelSkipSize={30}
          />
        </div>
      </div>
    </Card>
  )
}
export default WordsTree
