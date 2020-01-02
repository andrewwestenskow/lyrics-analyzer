import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'
import { Card } from 'antd'
import { largeChartHold } from '../../constants/styles'

const WordsTree = ({ stats, colorsArr, loading, isDesktop }) => {
  return (
    <Card
      className="card-container"
      bodyStyle={largeChartHold(isDesktop)}
      title="Complex words by appearance"
      loading={loading}
    >
      <div className="responsive-chart-wrapper">
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
          labelSkipSize={isDesktop ? 30 : 60}
        />
      </div>
    </Card>
  )
}
export default WordsTree
