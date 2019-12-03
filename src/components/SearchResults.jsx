import React from 'react'
import axios from 'axios'

const SearchResults = props => {
  const getLyrics = async (id, url) => {
    props.setResults([])
    props.setSearch('')
    const options = {
      url: `/api/lyrics?id=${id}`,
      method: 'GET',
    }

    const stats = await axios(options)
    console.log(stats)
  }
  const results = props.results.map(element => {
    const { result } = element
    return (
      <div onClick={() => getLyrics(result.id, result.url)} key={result.id}>
        {result.title}
      </div>
    )
  })
  return <div className="SearchResults">{results}</div>
}
export default SearchResults
