const getOppositeColor = color => {
  const oldColor = color.split(/[,()]/).splice(1, 3)
  const ceiling = 255
  const newColor = oldColor.map(element => {
    return ceiling - +element / 8
  })
  return `rgba(${newColor.join(',')},0.7)`
}

export default getOppositeColor
