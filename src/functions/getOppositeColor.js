const getOppositeColor = color => {
  const oldColor = color.split(/[,()]/).splice(1, 3)
  const ceiling = 255
  const newColor = oldColor.map(element => {
    return ceiling - +element
  })
  return `rgba(${newColor.join(',')},0.2)`
}

export default getOppositeColor
