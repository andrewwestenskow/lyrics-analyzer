export const formatDef = colors => {
  let colorCounter = 0
  const numList = ['one', 'two', 'three', 'four', 'five', 'six']
  const defs = []
  for (let i = 0; i < 5; i++) {
    defs.push({
      id: numList[colorCounter],
      type: 'linearGradient',
      colors: [
        { offset: 0, color: colors[colorCounter], opacity: 0.85 },
        { offset: 100, color: colors[colorCounter], opacity: 0.85 },
      ],
    })
    colorCounter++
  }
  return defs
}

export const formatFill = type => {
  const numList = ['one', 'two', 'three', 'four', 'five', 'six']
  const fillRules = []
  for (let i = 0; i < 5; i++) {
    if (type === 'word') {
      fillRules.push({
        match: d => d.data.colorCounter === numList[i],
        id: numList[i],
      })
    } else if (type === 'phrase') {
      fillRules.push({
        match: d => {
          // console.log(d)
          return d.data.data.colorCounter === numList[i]
        },
        id: numList[i],
      })
    }
  }
  return fillRules
}
