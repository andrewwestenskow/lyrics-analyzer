import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { phraseKeys } from '../../constants/data'
import { regularTheme } from '../../constants/themes'
import { formatDef, formatFill } from '../../functions/formatFill'
import { phrasesTooltip } from '../../constants/labels'
import { Card } from 'antd'
import { halfChartHold } from '../../constants/styles'

const TopPhrases = ({ stats, colorsArr, loading, isDesktop }) => {
  return (
    <Card
      bodyStyle={halfChartHold(isDesktop)}
      className="card-container"
      title="Top Phrases"
      loading={loading}
    >
      <div className="responsive-chart-wrapper">
        <ResponsiveBar
          defs={formatDef(colorsArr)}
          fill={formatFill('phrase')}
          indexBy="phrase"
          keys={phraseKeys}
          data={stats}
          theme={regularTheme}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Appearances',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          borderColor={'#000000'}
          margin={{ left: 60, top: 20, bottom: 20 }}
          borderWidth={1}
          padding={0.3}
          tooltip={phrasesTooltip}
          axisBottom={null}
          colorBy="index"
        />
      </div>
    </Card>
  )
}
export default TopPhrases
