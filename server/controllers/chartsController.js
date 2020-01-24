require('dotenv').config()
const querystring = require('querystring')
const { ACCESS_TOKEN } = process.env
const axios = require('axios')
const { getChart, listCharts } = require('billboard-top-100')
const moment = require('moment')

module.exports = {
  getCharts: (title, releaseDate) => {
    // listCharts((err, chart) => chart.forEach(element => console.log(element)))
    const nextWeek = moment(releaseDate, 'YYYY-MM-DD')
      .add(3, 'week')
      .format('YYYY-MM-DD')

    const easyTitle = title.toLowerCase()

    getChart('hot-100', nextWeek, (err, chart) => {
      // console.log(chart)
      chart.songs.forEach(element => {
        const easyNewTitle = element.title.toLowerCase()
        if (
          easyNewTitle === easyTitle ||
          easyNewTitle.includes(easyTitle) ||
          easyTitle.includes(easyNewTitle)
        ) {
          console.log(element)
        }
      })
    })
  },

  getCurrentChart: (req, res) => {
    getChart('hot-100', moment().format('YYYY-MM-DD'), (err, chart) => {
      res.status(200).send(chart.songs)
    })
  },

  getGeniusId: async (req, res) => {
    const { title, artist } = req.query
    const format = querystring.stringify({
      q: title,
      per_page: 20,
    })

    const options = {
      url: `https://api.genius.com/search?${format}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }

    const {
      data: {
        response: { hits },
      },
    } = await axios(options)

    const info = hits.find(element => {
      const {
        result: {
          title: geniusTitle,
          primary_artist: { name },
        },
      } = element

      return (
        title.toLowerCase().includes(geniusTitle.toLowerCase()) &&
        artist.toLowerCase().includes(name.toLowerCase())
      )
    })

    console.log(info)

    res.status(200).send({ id: info.result.id })
  },
}
