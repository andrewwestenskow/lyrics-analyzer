require('dotenv').config()
const querystring = require('querystring')
const { ACCESS_TOKEN } = process.env
const axios = require('axios')
const { getChart, listCharts } = require('billboard-top-100')
const moment = require('moment')

let chartCache = []
let lastRetrieved = ''

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
    const currentDayOfYear = +moment().format('DDDD')
    const currentDayOfWeek = +moment().format('e')
    let now

    if (currentDayOfWeek !== 6 && currentDayOfWeek !== 5) {
      now = moment()
        .subtract(1, 'week')
        .format('YYYY-MM-DD')
    } else {
      now = moment().format('YYYY-MM-DD')
    }
    const currentWeekOfYear = +moment(now).format('WW')

    const getNewChart = chartDate => {
      getChart('hot-100', chartDate, (err, chart) => {
        console.log('Fetching new chart')
        if (err) {
          console.log(err)
          return res.status(500).send(err)
        }

        lastRetrieved = chartDate

        chartCache = [...chart.songs]

        return res.status(200).send(chartCache)
      })
    }

    if (lastRetrieved && chartCache.length) {
      const lastDayOfYearRetrieved = +moment(lastRetrieved).format('DDDD')
      const lastWeekOfYearRetrieved = +moment(lastRetrieved).format('WW')

      if (
        currentDayOfYear - lastDayOfYearRetrieved > 6 &&
        currentWeekOfYear !== lastWeekOfYearRetrieved
      ) {
        getNewChart(now)
      } else {
        return res.status(200).send(chartCache)
      }
    } else {
      getNewChart(now)
    }
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

    console.log(hits)

    const info = hits.find(element => {
      const {
        result: {
          title: geniusTitle,
          primary_artist: { name },
        },
      } = element

      return (
        (artist.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(artist.toLowerCase())) &&
        (title.toLowerCase().includes(geniusTitle.toLowerCase()) ||
          geniusTitle.toLowerCase().includes(title.toLowerCase()))
      )
    })

    // console.log(info)

    res.status(200).send({ id: info.result.id })
  },
}
