const { exclusions, commonWords } = require('./constants')

module.exports = {
  analyze: lyrics => {
    const lyricArr = lyrics.split(/[\n()]|,\s/)

    lyricArr.forEach(
      (element, index, array) => (array[index] = element.toLowerCase().trim())
    )

    const phrases = lyricArr
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
            if (!acc[index2].variations.includes(element)) {
              acc[index2].variations.push(element)
            }
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

    const wordCount = lyrics
      .split(/[\s,()]|,\s/)
      .reduce((acc, element) => {
        if (
          element === '' ||
          element[0] === '[' ||
          element[element.length - 1] === ']'
        ) {
          return acc
        }
        const index = acc.findIndex(word => word.word === element.toLowerCase())

        if (index === -1) {
          acc.push({ word: element.toLowerCase(), count: 1 })
          return acc
        } else {
          acc[index].count++
          return acc
        }
      }, [])
      .sort((a, b) => {
        if (a.count < b.count) {
          return 1
        } else if (b.count < a.count) {
          return -1
        } else {
          return 0
        }
      })
      .reduce(
        (acc, element) => {
          if (commonWords.includes(element.word)) {
            acc.common.push(element)
            return acc
          } else {
            acc.complex.push(element)
            return acc
          }
        },
        { common: [], complex: [] }
      )

    const stats = {
      uniqueWords: wordCount.common.length + wordCount.complex.length,
      commonWords: wordCount.common.length,
      complexWords: wordCount.complex.length,
    }

    const songStats = {
      phrases,
      wordCount,
      stats,
    }

    return songStats
  },
}
