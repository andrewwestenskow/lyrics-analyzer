const { exclusions, commonWords, profanity } = require('./constants')

module.exports = {
  analyze: lyrics => {
    const lyricArr = lyrics.split(/[\n()]|,\s/)

    lyricArr.forEach(
      (element, index, array) => (array[index] = element.toLowerCase().trim())
    )

    const phrases = lyricArr.reduce(
      (acc, element, ogIndex) => {
        const index = acc.children.findIndex(phrase => phrase.id === element)

        if (element === '') {
          return acc
        }

        if (index === -1) {
          const index2 = acc.children.findIndex(phrase => {
            return phrase.id.includes(element) && !exclusions.includes(element)
          })
          if (index2 === -1) {
            acc.children.push({
              id: element,
              value: 1,
            })
          } else {
            acc.children[index2].value++
            if (acc.children[index2].children) {
              const index3 = acc.children[index2].children.findIndex(
                variation => variation.id === element
              )
              if (index3 === -1) {
                acc.children[index2].children.push({ id: element, value: 1 })
              } else {
                acc.children[index2].children[index3].value++
              }
            } else {
              acc.children[index2].children = [
                { id: element, value: 1 },
                { id: '', value: 1, color: `rgba(255,255,255, 0.0)` },
              ]
            }
          }
        } else {
          acc.children[index].value++
        }

        if (ogIndex === lyricArr.length - 1) {
          const newChildren = acc.children
            .filter(element => {
              if (element.id[0] === '[') {
                return false
              } else {
                return true
              }
            })
            .sort((a, b) => {
              if (a.value < b.value) {
                return 1
              } else if (b.value < a.value) {
                return -1
              } else {
                return 0
              }
            })

          newChildren.splice(10, Infinity)

          acc.children = newChildren
          return acc
        } else {
          return acc
        }
      },
      { name: 'phrases', children: [] }
    )

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
          } else if (profanity.includes(element.id)) {
            acc.children[2].children.push(element)
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
            {
              id: 'profanity',
              children: [],
            },
          ],
        }
      )

    const stats = [
      {
        id: 'common',
        label: 'Common',
        value: wordCount.children[0].children.length,
      },
      {
        id: 'profanity',
        label: 'Profanity',
        value: wordCount.children[2].children.length,
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
