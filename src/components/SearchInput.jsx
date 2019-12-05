import React, { useState } from 'react'

const SearchInput = props => {
  const [search, setSearch] = useState('')

  const handleSearch = e => {
    e.preventDefault()
    props.handleSearch(search)
    setSearch('')
  }
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  )
}
export default SearchInput