const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const appDAO = require('./../dao/AppDAO')

router.post('/shipment', (req, res) => {
    appDAO._book_cargo(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router