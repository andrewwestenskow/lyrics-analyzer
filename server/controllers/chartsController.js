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
      chart.songs.splice(51, Infinity)
      res.status(200).send(chart)
    })
  },
}
