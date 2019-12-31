import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

const SearchInput = props => {
  const [search, setSearch] = useState('')

  const handleSearch = e => {
    props.handleSearch(e)
    setSearch('')
  }
  return (
    <Search
      placeholder="Search for a song"
      enterButton="Search"
      size="large"
      value={search}
      loading={props.loading}
      onChange={e => setSearch(e.target.value)}
      onSearch={value => handleSearch(value)}
      style={{ maxWidth: '500px' }}
    />
  )
}
export default SearchInput
