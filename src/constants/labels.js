import React from 'react'
import { common } from './data'

export const WordCountTooltip = ({ active, payload, label }) => {
  if (payload[0]) {
    const [{ payload: info }] = payload
    console.log(info)
    if (active) {
      if (info.label === 'Complex') {
        return (
          <div className="custom-tooltip">
            <p className="data">{info.payload.value}</p>
            <p className="label">The number of unique complex words used</p>
          </div>
        )
      } else if (info.label === 'Common') {
        return (
          <div className="custom-tooltip">
            <p className="data">{info.payload.value}</p>
            <p className="label">The number of unique common words used</p>
            <br />
            <p className="intro">Common words include: </p>
            <ul className="common-list">
              {common.map((element, index) => {
                return <li key={index}>{element}</li>
              })}
            </ul>
          </div>
        )
      }
    }
  }

  return null
}
