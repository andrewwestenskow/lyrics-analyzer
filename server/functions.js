const { exclusions, commonWords, profanity, pronouns } = require('./constants')

module.exports = {
  analyze: lyrics => {
    const lyricArr = lyrics.split(/[\n()]|,\s/)

    const filterArr = lyricArr
      .map(element => element.toLowerCase().trim())
      .filter(element => {
        return !element.includes('[')
      })

    const phrases = filterArr.reduce((acc, element) => {
      if (acc.length === 0) {
        acc.push({ phrase: element, [element]: 1 })
      } else {
        acc.forEach((phrase, index) => {
          if (phrase.phrase.includes(element)) {
            if (phrase.hasOwnProperty(element)) {
              phrase[element]++
            } else {
              phrase[element] = 1
            }
          } else {
            console.log(element)
          }
        })
      }
      return acc
    }, [])

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
