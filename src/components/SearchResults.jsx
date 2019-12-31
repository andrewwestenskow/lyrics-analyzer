import React from 'react'
import { BounceLoader } from 'react-spinners'
import { Drawer } from 'antd'
import { drawerBodyStyle, outerDrawerStyle } from '../constants/styles'
import { withRouter } from 'react-router-dom'

const SearchResults = props => {
  const getLyrics = async song => {
    props.setResults([])

    props.history.push(`/lyrics?id=${song.id}`)
  }

  const results = props.results.map(element => {
    const { result } = element
    return (
      <div
        onClick={() => getLyrics(result)}
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
    <Drawer
      title={'Results'}
      placement="top"
      visible={props.loadingSearch || !!props.results.length}
      bodyStyle={drawerBodyStyle}
      zIndex={99}
      closable={true}
      maskClosable={true}
      onClose={() => props.setResults([])}
      height={600 + (props.results.length === 20 || props.page !== 0 ? 50 : 0)}
      drawerStyle={outerDrawerStyle}
    >
      {results}
      {props.results.length > 0 ? (
        <div className="results-page-control">
          {results.length === 20 && (
            <div
              onClick={() => props.searchNewPage(props.page + 1)}
              className="page-button next-page"
            >
              Next
            </div>
          )}
          {props.page > 0 && (
            <div
              onClick={() => props.searchNewPage(props.page - 1)}
              className="page-button prev-page"
            >
              Prev
            </div>
          )}
        </div>
      ) : (
        props.loadingSearch && (
          <div className="loading">
            <BounceLoader />
            <p className="loading-text">Loading</p>
          </div>
        )
      )}
    </Drawer>
  )
}
export default withRouter(SearchResults)
