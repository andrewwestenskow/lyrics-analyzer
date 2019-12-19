import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
  Legend,
  Tooltip,
} from 'recharts'
import { WordCountTooltip, wordCountLegend } from '../../constants/labels'
import formatCells from './formatCells'

const UniqueWords = ({ stats, colorsArr }) => {
  return (
    <div className="chart-hold">
      <p className="chart-label">Unique Word Count</p>
      <ResponsiveContainer className="responsive-pie-container">
        <PieChart className="word-count-pie">
          <Pie
            stroke="none"
            data={stats.totalUnique}
            outerRadius="70%"
            fill={colorsArr[0]}
            startAngle={180}
            endAngle={540}
            dataKey="value"
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
            stroke="none"
            dataKey="value"
          >
            {formatCells(stats.stats, colorsArr)}
          </Pie>
          <Tooltip content={<WordCountTooltip />} />
          <Legend
            payload={wordCountLegend(stats.stats, colorsArr)}
            verticalAlign="bottom"
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default UniqueWords
