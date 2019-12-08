import React from 'react'

export function wordCountLabel({ payload, x, y, width, height, value }) {
  const allArgs = [].slice.apply(arguments)
  console.log(allArgs)

  if (payload) {
    return (
      <text
        x={x}
        y={y}
        viewBox={(x, y, width, height)}
      >{`${payload.label}: ${value}`}</text>
    )
  } else {
    return null
  }
}
