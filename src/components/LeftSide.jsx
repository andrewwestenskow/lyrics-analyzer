import React, { useState } from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'

const LeftSide = props => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const handleSearch = async () => {
    const options = {
      url: `/api/lyrics/search?term=${search}`,
      method: 'GET',
    }

    const {
      data: {
        response: { hits: songs },
      },
    } = await axios(options)

    setResults(songs)
  }
  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
      />
      <button onClick={handleSearch}>Search</button>
      <SearchResults
        setSearch={setSearch}
        setResults={setResults}
        results={results}
      />
    </div>
  )
}
export default LeftSide
