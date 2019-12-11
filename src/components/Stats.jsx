import React, { useState, useEffect, useCallback } from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { largeSquareTheme, pieColors } from '../constants/themes'
import SongInfo from './SongInfo'
import analyze from 'rgbaster'
import UniqueWords from './Charts/UniqueWords'
import WordsTree from './Charts/WordsTree'

const Stats = props => {
  const { stats, song } = props
  console.log(stats)

  const [colorsArr, setColorsArr] = useState([])
  const setLoading = useCallback(props.setLoading, [stats, song])

  useEffect(() => {
    const { song_art_image_thumbnail_url: image } = song

    analyze(image, { scale: 0.02 })
      .then(res => {
        const colors = res.map(element => {
          const split = element.color.split(/[,()]/)
          const newColor = `rgba(${split[1]},${split[2]},${split[3]},0.85)`
          return newColor
        })
        if (colors.length > 5) {
          setColorsArr(colors)
        } else {
          setColorsArr(pieColors)
        }
      })
      .catch(() => {
        setColorsArr(pieColors)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [stats, song, setLoading])
  return (
    <>
      {!props.loading ? (
        <div className="Stats">
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
              <ResponsiveBubble
                root={stats.phrases}
                colors={{ scheme: 'nivo' }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={largeSquareTheme}
                isInteractive={true}
                isZoomable={true}
              />
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
