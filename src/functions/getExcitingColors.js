const getExcitingColors = colors => {
  const excitingColors = colors.reduce((acc, element) => {
    let push = true
    const newColor = element.color.split(/[,()]/).slice(1, 4)
    if (
      (+newColor[0] <= 90 && +newColor[1] <= 90 && +newColor[2] <= 90) ||
      (+newColor[0] >= 80 && +newColor[1] >= 80 && newColor[2] >= 80)
    ) {
      push = false
    }
    if (acc[0] && push) {
      const oldColor = acc[acc.length - 1].split(/[,()]/).slice(1, 4)
      oldColor.forEach((oldCheck, index) => {
        const dif = Math.abs(+oldCheck - newColor[index])
        if (dif <= 25) {
          push = false
        }
      })
    }
    if (push) {
      acc.push(element.color)
    }
    return acc
  }, [])
  return excitingColors
}

export default getExcitingColors
