import React, { useState, useEffect, useCallback } from 'react'
import SongInfo from './SongInfo'
import UniqueWords from './Charts/UniqueWords'
import WordsTree from './Charts/WordsTree'
import PronounsTree from './Charts/PronounsTree'
import useColors from '../hooks/useColors'

const Stats = props => {
  const { stats, song } = props

  const [colorsArr, setColorsArr] = useState([])
  const [background, setBackground] = useState('')
  const setLoading = useCallback(props.setLoading, [stats, song])
  const { colorsArr: colors, background: newBackground } = useColors({
    song,
    stats,
    setLoading,
  })

  useEffect(() => {
    setColorsArr(colors)
    setBackground(newBackground)
  }, [song, stats, setLoading, colors, newBackground])

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
            <PronounsTree
              colorsArr={colorsArr}
              stats={stats.wordCount.children[3]}
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
