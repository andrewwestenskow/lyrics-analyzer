import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveTreeMap } from '@nivo/treemap'

const Stats = props => {
  const { stats } = props
  console.log(stats)
  return (
    <div className="Stats">
      <section className="stats-section">
        <div className="large-chart-hold common-vs-complex-bar">
          <p className="chart-label">Complex words by appearance</p>
          <ResponsiveTreeMap
            isInteractive={false}
            root={stats.wordCount}
            colors={{ scheme: 'pastel1' }}
          />
        </div>
        <div className="chart-hold common-vs-complex-chart">
          <p className="chart-label">Common vs Complex words</p>
          <ResponsivePie
            sortByValue={true}
            innerRadius={0.5}
            data={stats.stats}
            enableRadialLabels={false}
            enableSlicesLabels={true}
            sliceLabel={d => `${d.label} - ${d.value}`}
            colors={{ scheme: 'pastel1' }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </section>
    </div>
  )
}
export default Stats
