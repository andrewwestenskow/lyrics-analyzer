import React from 'react'
import SongInfo from './SongInfo'
import InfoTable from './Tables/InfoTable'
import UniqueWords from './Charts/UniqueWords'
import WordsTree from './Charts/WordsTree'
import PronounsTree from './Charts/PronounsTree'
import TopPhrases from './Charts/TopPhrases'
import PhrasesLegend from './Legends/PhrasesLegend'

const Stats = ({ stats, song, colorsArr, background, loading, isDesktop }) => {
  return (
    <>
      <div style={{ background: background }} className="Stats">
        <SongInfo song={song} />
        <section className="stats-section">
          <InfoTable
            isDesktop={isDesktop}
            loading={loading}
            song={song}
            stats={stats}
          />
          <UniqueWords
            isDesktop={isDesktop}
            loading={loading}
            stats={stats}
            colorsArr={colorsArr}
          />
        </section>
        <section className="stats-section">
          <WordsTree
            isDesktop={isDesktop}
            loading={loading}
            stats={loading ? {} : stats.wordCount.children[1]}
            colorsArr={colorsArr}
          />
          <PronounsTree
            isDesktop={isDesktop}
            loading={loading}
            colorsArr={colorsArr}
            stats={loading ? {} : stats.wordCount.children[3]}
          />
        </section>
        <section className="stats-section  hook-hold">
          <h1 className="stats-section-header">Phrases</h1>
          <div className="predicted-hook-hold">
            <p className="predicted-hook">Predicted hook:</p>
            <p className="actual-hook">
              {loading ? 'Calculating' : stats.phrases[0].phrase}
            </p>
          </div>
        </section>
        <section className="stats-section">
          <TopPhrases
            isDesktop={isDesktop}
            loading={loading}
            stats={stats.phrases}
            colorsArr={colorsArr}
          />
          <PhrasesLegend
            isDesktop={isDesktop}
            loading={loading}
            stats={stats.formattedPhraseData}
            colorsArr={colorsArr}
          />
        </section>
      </div>
    </>
  )
}
export default Stats
