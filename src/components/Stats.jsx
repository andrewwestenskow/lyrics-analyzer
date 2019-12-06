import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { regularTheme, largeTheme, largeSquareTheme } from '../constants/themes'

const Stats = props => {
  const { stats } = props
  console.log(stats)
  return (
    <div className="Stats">
      <section className="stats-section">
        <h1 className="stats-section-header">Word Count</h1>
      </section>
      <section className="stats-section">
        <div className="chart-hold">
          <p className="chart-label">Total Unique Words</p>
          <ResponsivePie
            sortByValue={true}
            data={stats.totalUnique}
            enableRadialLabels={false}
            enableSlicesLabels={true}
            sliceLabel={d => `${d.value}`}
            colors={{ scheme: 'dark2' }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={largeTheme}
          />
        </div>
        <div className="large-chart-hold common-vs-complex-bar">
          <p className="chart-label">Complex words by appearance</p>
          <ResponsiveTreeMap
            isInteractive={false}
            root={stats.wordCount.children[1]}
            colors={{ scheme: 'category10' }}
            leavesOnly={true}
            borderColor="black"
            borderWidth={3}
            label={d => `${d.id} - ${d.value}`}
            labelTextColor={{ from: 'color', modifiers: [['darker', '2']] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={regularTheme}
          />
        </div>
        <div className="chart-hold common-vs-complex-chart">
          <p className="chart-label">Common vs Complex words</p>
          <ResponsivePie
            sortByValue={true}
            data={stats.stats}
            enableRadialLabels={false}
            enableSlicesLabels={true}
            sliceLabel={d => `${d.label} - ${d.value}`}
            colors={{ scheme: 'nivo' }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={regularTheme}
          />
        </div>
      </section>
      <section className="stats-section">
        <h1 className="stats-section-header">Phrases</h1>
      </section>
      <section className="stats-section">
        <div className="large-square-chart-hold">
          <p className="chart-label">Most common phrases</p>
          <ResponsiveBubble
            root={stats.phrases}
            colors={{ scheme: 'nivo' }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={largeSquareTheme}
            isInteractive={true}
            isZoomable={true}
          />
        </div>
      </section>
    </div>
  )
}
export default Stats
