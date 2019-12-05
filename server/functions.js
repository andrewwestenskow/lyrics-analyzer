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
        const index = acc.findIndex(word => word.id === element.toLowerCase())

        if (index === -1) {
          acc.push({ id: element.toLowerCase(), value: 1 })
          return acc
        } else {
          acc[index].value++
          return acc
        }
      }, [])
      .sort((a, b) => {
        if (a.value < b.value) {
          return 1
        } else if (b.value < a.value) {
          return -1
        } else {
          return 0
        }
      })
      .reduce(
        (acc, element) => {
          if (commonWords.includes(element.id)) {
            acc.children[0].children.push(element)
            return acc
          } else {
            acc.children[1].children.push(element)
            return acc
          }
        },
        {
          id: 'wordCount',
          children: [
            {
              id: 'common',
              children: [],
            },
            {
              id: 'complex',
              children: [],
            },
          ],
        }
      )

    // const stats = {
    //   uniqueWords: wordCount.common.length + wordCount.complex.length,
    //   commonWords: wordCount.common.length,
    //   complexWords: wordCount.complex.length,
    // }

    const stats = [
      {
        id: 'common',
        label: 'Common',
        value: wordCount.children[0].children.length,
      },
      {
        id: 'complex',
        label: 'Complex',
        value: wordCount.children[1].children.length,
      },
    ]

    const totalUnique = [
      {
        id: 'total',
        label: 'Total',
        value:
          wordCount.children[0].children.length +
          wordCount.children[1].children.length,
      },
    ]

    wordCount.children[1].children.splice(25, Infinity)

    const songStats = {
      phrases,
      wordCount,
      stats,
      totalUnique,
      commonWords,
    }

    return songStats
  },
}
