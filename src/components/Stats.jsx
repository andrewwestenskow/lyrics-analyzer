import React, { useState, useEffect, useCallback } from 'react'
import { pieColors } from '../constants/themes'
import SongInfo from './SongInfo'
import analyze from 'rgbaster'
import UniqueWords from './Charts/UniqueWords'
import WordsTree from './Charts/WordsTree'
import getOppositeColor from '../functions/getOppositeColor'

const Stats = props => {
  const { stats, song } = props

  const [colorsArr, setColorsArr] = useState([])
  const [background, setBackground] = useState('')
  const setLoading = useCallback(props.setLoading, [stats, song])

  useEffect(() => {
    const { song_art_image_thumbnail_url: image } = song
    setLoading(true)

    analyze(image, { scale: 0.0135 })
      .then(res => {
        const colors = res.map(element => {
          const split = element.color.split(/[,()]/)
          const newColor = `rgba(${split[1]},${split[2]},${split[3]},0.65)`
          return newColor
        })
        if (colors.length > 5) {
          setColorsArr(colors)
          const opposite = getOppositeColor(colors[0])
          setBackground(opposite)
        } else {
          setColorsArr(pieColors)
          const opposite = getOppositeColor(pieColors[0])
          setBackground(opposite)
        }
      })
      .catch(() => {
        setColorsArr(pieColors)
        const opposite = getOppositeColor(pieColors[0])
        setBackground(opposite)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [stats, song, setLoading])
  return (
    <>
      {!props.loading ? (
        <div style={{ background: background }} className="Stats">
          <SongInfo song={props.song} />
          <section className="stats-section">
            <h1 className="stats-section-header">Word Count</h1>
          </section>
          <section className="stats-section">
            <UniqueWords stats={stats} colorsArr={colorsArr} />
            <WordsTree
              stats={stats.wordCount.children[1]}
              colorsArr={colorsArr}
            />
          </section>
          <section className="stats-section">
            <h1 className="stats-section-header">Phrases</h1>
          </section>
          <section className="stats-section">
            <div className="large-square-chart-hold">
              <p className="chart-label">Most common phrases</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="Stats">Loading</div>
      )}
    </>
  )
}
export default Stats
