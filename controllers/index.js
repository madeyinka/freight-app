const express = require('express')
const router = express.Router()
const config = require('./../config/app.json')

const api = config.app_name + config.app_base + config.app_version

router.use(api+'/auth', require('./auth'))
router.use(api+'/main', require('./main'))

module.exports = router