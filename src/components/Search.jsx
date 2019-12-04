import React, { useState } from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'
import SearchInput from './SearchInput'

const Search = props => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(0)
  const handleSearch = async (searchTerm, pageNum) => {
    setResults([])
    setTerm(searchTerm)
    let searchPage
    if (pageNum && pageNum !== page) {
      searchPage = pageNum
    } else {
      searchPage = page
    }
    console.log(searchPage)
    const options = {
      url: `/api/lyrics/search?term=${searchTerm}&page=${searchPage}`,
      method: 'GET',
    }

    const {
      data: {
        response: { hits: songs },
      },
    } = await axios(options)

    console.log(songs)

    setResults(songs)
  }

  const searchNewPage = newPage => {
    console.log(newPage)
    setPage(newPage)
    handleSearch(term, newPage)
  }
  return (
    <div className="Search">
      <SearchInput handleSearch={handleSearch} />
      <SearchResults
        page={page}
        searchNewPage={searchNewPage}
        searchTerm={term}
        setPage={setPage}
        setResults={setResults}
        results={results}
      />
    </div>
  )
}
export default Search
