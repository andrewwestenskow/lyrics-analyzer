const { exclusions } = require('./constants')

module.exports = {
  analyze: lyrics => {
    const lyricArr = lyrics.split(/[\n()]|,\s/)

    lyricArr.forEach(
      (element, index, array) => (array[index] = element.toLowerCase().trim())
    )

    const tracker = lyricArr
      .reduce((acc, element) => {
        const index = acc.findIndex(phrase => phrase.phrase === element)

        if (element === '') {
          return acc
        }

        if (index === -1) {
          const index2 = acc.findIndex(phrase => {
            return (
              phrase.phrase.includes(element) && !exclusions.includes(element)
            )
          })
          if (index2 === -1) {
            acc.push({
              phrase: element,
              variations: [],
              count: 1,
            })
          } else {
            acc[index2].count++
            acc[index2].variations.push(element)
          }
        } else {
          acc[index].count++
        }

        return acc
      }, [])
      .sort((a, b) => {
        if (a.count < b.count) {
          return 1
        } else if (a.count > b.count) {
          return -1
        } else {
          return 0
        }
      })
      .filter(element => {
        if (element.phrase[0] === '[') {
          return false
        } else {
          return true
        }
      })

    return tracker
  },
}
