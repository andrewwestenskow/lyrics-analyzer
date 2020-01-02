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
        let match = false
        if (acc.length === 0) {
          acc.push({
            phrase: element,
            variation1Value: 1,
            variation1: element,
            variations: 1,
          })
        } else {
          acc.forEach((phrase, index) => {
            let subMatch = false
            if (
              phrase.phrase.includes(element) ||
              element.includes(phrase.phrase)
            ) {
              for (let key in phrase) {
                if (phrase[key] === element && key !== 'phrase') {
                  phrase[`${key}Value`]++
                  subMatch = true
                }
              }
              if (!subMatch) {
                phrase[`variation${phrase.variations + 1}Value`] = 1
                phrase[`variation${phrase.variations + 1}`] = element
                phrase.variations++
              }
              match = true
            }
          })
          if (!match) {
            acc.push({
              phrase: element,
              variation1Value: 1,
              variation1: element,
              variations: 1,
            })
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
      .slice(0, 10)

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
            acc.children.common.children.push(element)
            return acc
          } else if (profanity.includes(element.id)) {
            acc.children.profanity.children.push(element)
            return acc
          } else if (pronouns.includes(element.id)) {
            acc.children.pronouns.children.push(element)
            return acc
          } else {
            acc.children.complex.children.push(element)
            return acc
          }
        },
        {
          id: 'wordCount',
          children: {
            common: {
              id: 'common',
              children: [],
            },
            complex: {
              id: 'complex',
              children: [],
            },
            profanity: {
              id: 'profanity',
              children: [],
            },
            pronouns: {
              id: 'pronouns',
              children: [],
            },
          },
        }
      )

    const stats = [
      {
        id: 'common',
        label: 'Common',
        value: wordCount.children.common.children.length,
      },
      {
        id: 'profanity',
        label: 'Profanity',
        value: wordCount.children.profanity.children.length,
      },
      {
        id: 'complex',
        label: 'Complex',
        value: wordCount.children.complex.children.length,
      },
      {
        id: 'pronouns',
        label: 'Pronouns',
        value: wordCount.children.pronouns.children.length,
      },
    ]

    const totalUnique = [
      {
        id: 'total',
        label: 'Total',
        value:
          wordCount.children.common.children.length +
          wordCount.children.pronouns.children.length +
          wordCount.children.profanity.children.length +
          wordCount.children.complex.children.length,
      },
    ]

    wordCount.children.complex.children.splice(25, Infinity)

    let colorCounter = 0
    const numList = ['one', 'two', 'three', 'four', 'five', 'six']

    wordCount.children.complex.children.forEach(element => {
      element.colorPosition = colorCounter
      element.colorCounter = numList[colorCounter]
      if (colorCounter < 5) {
        colorCounter++
      } else {
        colorCounter = 0
      }
    })

    wordCount.children.pronouns.children.forEach(element => {
      element.colorPosition = colorCounter
      element.colorCounter = numList[colorCounter]
      if (colorCounter < 5) {
        colorCounter++
      } else {
        colorCounter = 0
      }
    })

    phrases.forEach(element => {
      element.colorPosition = colorCounter
      element.colorCounter = numList[colorCounter]
      if (colorCounter < 4) {
        colorCounter++
      } else {
        colorCounter = 0
      }
    })

    const formattedPhraseData = phrases.reduce(
      (acc, element, index) => {
        element.key = index
        let appearances = 0
        for (let key in element) {
          if (
            typeof element[key] === 'number' &&
            key !== 'variations' &&
            key !== 'colorPosition' &&
            key !== 'key'
          ) {
            appearances += element[key]
          }
        }
        const newData = {
          phrase:
            element.phrase.charAt(0).toUpperCase() + element.phrase.slice(1),
          id: index,
          key: index,
          appearances,
          variations: element.variations,
        }

        acc.formatted.push(newData)
        acc.sub.push(element)

        return acc
      },
      { formatted: [], sub: [] }
    )

    const songStats = {
      phrases,
      wordCount,
      stats,
      totalUnique,
      commonWords,
      formattedData: formattedPhraseData.formatted,
      subData: formattedPhraseData.sub,
    }

    return songStats
  },
}
