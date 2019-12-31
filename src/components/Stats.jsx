import React from 'react'
import SongInfo from './SongInfo'
import UniqueWords from './Charts/UniqueWords'
import WordsTree from './Charts/WordsTree'
import PronounsTree from './Charts/PronounsTree'
import TopPhrases from './Charts/TopPhrases'
import PhrasesLegend from './Legends/PhrasesLegend'

const Stats = ({ stats, song, colorsArr, background, loading }) => {
  return (
    <>
      {!loading ? (
        <div style={{ background: background }} className="Stats">
          <SongInfo song={song} />
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
          <section className="stats-section  hook-hold">
            <h1 className="stats-section-header">Phrases</h1>
            <div className="predicted-hook-hold">
              <p className="predicted-hook">Predicted hook:</p>
              <p className="actual-hook">{stats.phrases[0].phrase}</p>
            </div>
          </section>
          <section className="stats-section">
            <TopPhrases stats={stats.phrases} colorsArr={colorsArr} />
            <PhrasesLegend stats={stats.phrases} colorsArr={colorsArr} />
          </section>
        </div>
      ) : (
        <div className="Stats">Loading</div>
      )}
    </>
  )
}
export default Stats
