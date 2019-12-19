import { Cell } from 'recharts'
import React from 'react'

export default (stats, colorsArr) => {
  return stats.map((element, index) => {
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
  })
}
