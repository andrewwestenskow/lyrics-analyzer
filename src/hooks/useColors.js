import { useEffect, useState } from 'react'
import analyze from 'rgbaster'
import getExcitingColors from '../functions/getExcitingColors'
import getOppositeColor from '../functions/getOppositeColor'
import { pieColorsRgb } from '../constants/themes'

const useColors = ({ song, setLoading, stats }) => {
  const [colorsArr, setColorsArr] = useState([])
  const [background, setBackground] = useState('')

  useEffect(() => {
    const { song_art_image_thumbnail_url: image } = song
    setLoading(true)

    analyze(image, { scale: 1 })
      .then(res => {
        const excitingColors = getExcitingColors(res)
        if (excitingColors.length >= 6) {
          const colors = excitingColors.map(element => {
            const split = element.split(/[,()]/)
            const newColor = `rgba(${split[1]},${split[2]},${split[3]},0.65)`
            return newColor
          })
          setColorsArr(colors)
          setBackground(getOppositeColor(colors[0]))
        } else {
          const colors = pieColorsRgb.map(element => {
            const split = element.split(/[,()]/)
            const newColor = `rgba(${split[1]},${split[2]},${split[3]},0.65)`
            return newColor
          })
          setColorsArr(colors)
          setBackground(getOppositeColor(colors[0]))
        }
      })
      .catch(() => {
        const colors = pieColorsRgb.map(element => {
          const split = element.split(/[,()]/)
          const newColor = `rgba(${split[1]},${split[2]},${split[3]},0.65)`
          return newColor
        })
        setColorsArr(colors)
        setBackground(getOppositeColor(pieColorsRgb[0]))
      })
      .finally(() => {
        if (stats.wordCount) {
          setLoading(false)
        }
      })
  }, [stats, song, setLoading])
  return { background, colorsArr }
}

export default useColors
