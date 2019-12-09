import React from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { ResponsiveBubble } from '@nivo/circle-packing'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
  Cell,
  Legend,
  Tooltip,
} from 'recharts'
import { regularTheme, largeSquareTheme, pieColors } from '../constants/themes'
import { WordCountTooltip } from '../constants/labels'

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
          <p className="chart-label">Unique Word Count</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                stroke="none"
                data={stats.totalUnique}
                outerRadius="70%"
                fill="#8884d8"
                startAngle={180}
                endAngle={540}
              >
                <Label
                  value={`Total Unique Words: ${stats.totalUnique[0].value}`}
                  position="center"
                />
              </Pie>
              <Pie
                paddingAngle={5}
                data={stats.stats}
                innerRadius="80%"
                outerRadius="95%"
              >
                {stats.stats.map((element, index) => {
                  return <Cell key={index} fill={pieColors[index]} />
                })}
              </Pie>
              <Tooltip content={<WordCountTooltip />} />
              <Legend
                payload={stats.stats.map((element, index) => ({
                  id: element.name,
                  type: 'square',
                  color: pieColors[index],
                  value: `${element.label} - ${element.value}`,
                }))}
                verticalAlign="bottom"
                iconType="square"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="large-chart-hold common-vs-complex-bar">
          <p className="chart-label">Complex words by appearance</p>
          <ResponsiveTreeMap
            isInteractive={false}
            root={stats.wordCount.children[1]}
            colors={{ scheme: 'category10' }}
            colorBy="name"
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
