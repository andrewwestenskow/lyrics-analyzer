require('dotenv').config()
const express = require('express')
const app = express()
const { SERVER_PORT } = process.env
const lyricsCtrl = require('./controllers/lyricsController')

app.use(express.json())

app.get('/api/lyrics/search', lyricsCtrl.search)
app.get('/api/lyrics', lyricsCtrl.getLyrics)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
