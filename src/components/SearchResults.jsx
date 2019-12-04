import React from 'react'
import axios from 'axios'

const SearchResults = props => {
  const getLyrics = async url => {
    props.setResults([])
    const options = {
      url: `/api/lyrics?url=${url}`,
      method: 'GET',
    }

    const stats = await axios(options)
    console.log(stats)
  }

  const results = props.results.map(element => {
    const { result } = element
    return (
      <div
        onClick={() => getLyrics(result.url)}
        className="result-hold"
        key={result.url}
      >
        <img
          className="result-image"
          src={result.song_art_image_url}
          alt={result.full_title}
        />
        <div className="result-text-hold">
          <p className="result-hold-title">{result.title}</p>
          <p className="result-hold-artist">{result.primary_artist.name}</p>
        </div>
      </div>
    )
  })
  return (
    <div className="Search-Results">
      {results}
      {props.results.length > 0 ? (
        <div className="results-page-control">
          {props.page > 0 && (
            <div
              onClick={() => props.searchNewPage(props.page - 1)}
              className="prev-page"
            >
              Prev
            </div>
          )}
          {results.length === 20 && (
            <div
              onClick={() => props.searchNewPage(props.page + 1)}
              className="next-page"
            >
              Next
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
export default SearchResults
