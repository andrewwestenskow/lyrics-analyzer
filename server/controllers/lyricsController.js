const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
require('dotenv').config()
const { ACCESS_TOKEN } = process.env
const querystring = require('querystring')
const { analyze } = require('../functions')
const chartsCtrl = require('./chartsController')

module.exports = {
  search: async (req, res) => {
    const { term, page } = req.query
    const format = querystring.stringify({
      q: term,
      per_page: 20,
      page: +page + 1,
    })
    const options = {
      url: `https://api.genius.com/search?${format}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }

    try {
      const { data: results } = await axios(options)
      res.status(200).send(results)
    } catch (error) {
      res.send(error)
    }
  },
  getLyrics: async (req, res) => {
    const { id } = req.query

    const options = {
      url: `https://api.genius.com/songs/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }

    const {
      data: {
        response: { song },
      },
    } = await axios(options)

    const { url, title, release_date } = song

    chartsCtrl.getCharts(title, release_date)

    try {
      request(url, (err, result, html) => {
        if (!err) {
          let newLyrics
          const $ = cheerio.load(html)
          const newData = $('div.lyrics')
            .children()
            .first()
          newData.each(function(i, elem) {
            // console.log($(this).text())
            newLyrics = $(this).text()
          })

          const analysis = analyze(newLyrics)

          res.status(200).send({ stats: analysis, song })
        }
      })
    } catch (error) {
      res.send(error)
    }
  },
}
