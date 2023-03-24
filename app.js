const express = require('express')
const bodyParser = require('body-parser')
const db = require('./libraries/Connector').MongoDB()

const app = express()

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(require('./controllers'))

module.exports = app