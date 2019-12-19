const { exclusions, commonWords, profanity, pronouns } = require('./constants')

module.exports = {
  analyze: lyrics => {
    const lyricArr = lyrics.split(/[\n()"!.]/)

    const filterArr = lyricArr
      .map(element => element.toLowerCase().trim())
      .filter(element => {
        if (
          element.includes(']') ||
          element.includes('[') ||
          element === '' ||
          element === ' '
        ) {
          return false
        } else {
          return true
        }
      })

    const phrases = filterArr
      .reduce((acc, element) => {
        console.log(element)
        let match = false
        if (acc.length === 0) {
          acc.push({ phrase: element, [element]: 1 })
        } else {
          acc.forEach((phrase, index) => {
            if (
              phrase.phrase.includes(element) ||
              element.includes(phrase.phrase)
            ) {
              if (acc[index].hasOwnProperty(element)) {
                acc[index][element]++
              } else {
                acc[index][element] = 1
              }
              match = true
            }
          })
          if (!match) {
            acc.push({ phrase: element, [element]: 1 })
          }
        }

        return acc
      }, [])
      .sort((a, b) => {
        let sumA = 0
        let sumB = 0
        for (let key in a) {
          if (typeof a[key] === 'number') sumA += a[key]
        }
        for (let key in b) {
          if (typeof b[key] === 'number') sumB += b[key]
        }
        if (sumA < sumB) {
          return 1
        } else if (sumB < sumA) {
          return -1
        } else {
          return 0
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
          } else if (profanity.includes(element.id)) {
            acc.children[2].children.push(element)
            return acc
          } else if (pronouns.includes(element.id)) {
            acc.children[3].children.push(element)
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
            {
              id: 'pronouns',
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
      {
        id: 'pronouns',
        label: 'Pronouns',
        value: wordCount.children[3].children.length,
      },
    ]

    const totalUnique = [
      {
        id: 'total',
        label: 'Total',
        value:
          wordCount.children[0].children.length +
          wordCount.children[1].children.length +
          wordCount.children[2].children.length +
          wordCount.children[3].children.length,
      },
    ]

    wordCount.children[1].children.splice(25, Infinity)

    let colorCounter = 0
    const numList = ['one', 'two', 'three', 'four', 'five', 'six']

    wordCount.children[1].children.forEach(element => {
      element.colorPosition = colorCounter
      element.colorCounter = numList[colorCounter]
      if (colorCounter < 5) {
        colorCounter++
      } else {
        colorCounter = 0
      }
    })

    wordCount.children[3].children.forEach(element => {
      element.colorPosition = colorCounter
      element.colorCounter = numList[colorCounter]
      if (colorCounter < 5) {
        colorCounter++
      } else {
        colorCounter = 0
      }
    })

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
