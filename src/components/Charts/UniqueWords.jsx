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
import { Card } from 'antd'

const UniqueWords = ({ stats, colorsArr, loading }) => {
  return (
    <Card title="Unique Word Count" loading={loading}>
      <div className="chart-hold">
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
                value={`Total Unique Words: ${
                  loading ? 'Calculating' : stats.totalUnique[0].value
                }`}
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
              {formatCells(loading ? [] : stats.stats, colorsArr)}
            </Pie>
            <Tooltip content={<WordCountTooltip />} />
            <Legend
              payload={wordCountLegend(loading ? [] : stats.stats, colorsArr)}
              verticalAlign="bottom"
              iconType="square"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
export default UniqueWords
