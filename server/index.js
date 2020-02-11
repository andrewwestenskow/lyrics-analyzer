require('dotenv').config()
const express = require('express')
const app = express()
const { SERVER_PORT } = process.env
const lyricsCtrl = require('./controllers/lyricsController')
const chartsCtrl = require('./controllers/chartsController')

app.use(express.static(`${__dirname}/../build`))
app.use(express.json())

app.use((req, res, next) => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `\n${req.method} ${req.path}${req.query.id ? `?id=${req.query.id}` : ''}`
  )
  next()
})

app.get('/api/lyrics/search', lyricsCtrl.search)
app.get('/api/lyrics', lyricsCtrl.getLyrics)

app.get('/api/charts/hot-100', chartsCtrl.getCurrentChart)
app.get('/api/song', chartsCtrl.getGeniusId)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
