import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
  Cell,
  Legend,
  Tooltip,
} from 'recharts'
import { WordCountTooltip, wordCountLegend } from '../../constants/labels'

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
            {stats.stats.map((element, index) => {
              let newIndex
              switch (index) {
                case 0:
                  newIndex = 0
                  break
                case 1:
                  newIndex = 1
                  break
                case 2:
                  newIndex = 3
                  break
                case 3:
                  newIndex = 5
                  break
                default:
                  newIndex = 0
                  break
              }
              return <Cell key={index} fill={colorsArr[newIndex]} />
            })}
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
