const express = require('express')
const router = express.Router()
const authDAO = require('./../dao/AuthDAO')
const Util = require('./../libraries/Utility')

router.post('/register', (req, res) => {
    authDAO._register(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/profile-update/:user/:key', (req, res) => {
    const id = req.params.user, key = req.params.key
    authDAO._update_user(Util.param_extract(req), id, key, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router