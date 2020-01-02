import React, { useState, useEffect } from 'react'
import Stats from './Stats'
import axios from 'axios'
import queryString from 'query-string'
import useColors from '../hooks/useColors'
import useMediaQuery from '../hooks/useMediaQuery'
import { bigBreak } from '../constants/breakPoints'

const Display = ({ location }) => {
  const [song, setSong] = useState({})
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [colorsArr, setColorsArr] = useState([])
  const [background, setBackground] = useState('')
  const isDesktop = useMediaQuery(bigBreak)

  const getLyrics = async id => {
    const options = {
      url: `/api/lyrics?id=${id}`,
      method: 'GET',
    }

    const {
      data: { stats, song },
    } = await axios(options)

    setSong(song)
    setStats(stats)
  }

  useEffect(() => {
    setLoading(true)
    const { id } = queryString.parse(location.search)
    getLyrics(id)
  }, [location.search])

  const { colorsArr: colors, background: newBackground } = useColors({
    song,
    stats,
    setLoading,
  })

  useEffect(() => {
    setColorsArr(colors)
    setBackground(newBackground)
  }, [song, stats, setLoading, colors, newBackground])

  return (
    <Stats
      loading={loading}
      colorsArr={colorsArr}
      background={background}
      song={song}
      stats={stats}
      isDesktop={isDesktop}
    />
  )
}
export default Display
