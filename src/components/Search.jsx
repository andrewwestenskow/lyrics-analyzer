import React, { useState } from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'
import SearchInput from './SearchInput'

const Search = props => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(0)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const handleSearch = async (searchTerm, pageNum) => {
    setLoadingSearch(true)

    setResults([])

    setTerm(searchTerm)
    let searchPage
    if (pageNum && pageNum !== page) {
      searchPage = pageNum
    } else {
      searchPage = page
    }

    const options = {
      url: `/api/lyrics/search?term=${searchTerm}&page=${searchPage}`,
      method: 'GET',
    }

    const {
      data: {
        response: { hits: songs },
      },
    } = await axios(options)
    setResults(songs)
    setLoadingSearch(false)
  }

  const searchNewPage = newPage => {
    setLoadingSearch(true)
    handleSearch(term, newPage).then(() => {
      setPage(newPage)
    })
  }
  return (
    <div className="Search">
      <SearchInput loading={loadingSearch} handleSearch={handleSearch} />
      <SearchResults
        setSong={props.setSong}
        setStats={props.setStats}
        loadingSearch={loadingSearch}
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
