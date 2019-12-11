import React from 'react'
import { common } from './data'

export const WordCountTooltip = ({ active, payload, label }) => {
  if (payload[0]) {
    const [{ payload: info }] = payload
    if (active) {
      if (info.label === 'Complex') {
        return (
          <div className="custom-tooltip">
            <p className="data">{info.payload.value}</p>
            <p className="label">
              The total number of unique complex words used
            </p>
          </div>
        )
      } else if (info.label === 'Common') {
        return (
          <div className="custom-tooltip">
            <p className="data">{info.payload.value}</p>
            <p className="label">
              The total number of unique common words used
            </p>
            <br />
            <p className="intro">Common words include: </p>
            <ul className="common-list">
              {common.map((element, index) => {
                return <li key={index}>{element}</li>
              })}
            </ul>
          </div>
        )
      } else if ((info.label = 'Profanity')) {
        return (
          <div className="custom-tooltip">
            <p className="data">{info.payload.value}</p>
            <p className="label">The total number of unique profanities used</p>
          </div>
        )
      }
    }
  }

  return null
}

export const wordCountLegend = (stats, colors) => {
  return stats.reduce((acc, element, index) => {
    if (element.value) {
      acc.push({
        id: element.name,
        type: 'square',
        color: colors[index],
        value: `${element.label} - ${element.value}`,
      })
    }
    return acc
  }, [])
}
