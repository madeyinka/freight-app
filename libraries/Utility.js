const dotenv = require('dotenv').config()

const Util = {
    param_extract: (req) => {
        let data = {}
        if (req.fields) 
            data = req.fields
        else if (req.body)
            data = req.body
        return data
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        return res;
    },

    rand_str: (len, charset) => {
        if (!len) len = 5
        if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let text = ""
        for (i=0; i < len; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        return text
    },

    match_key: (val1, val2) => {
        if (val1 === val2) {
            return true
        } else 
            return false
    },

    hash_password: (value) => {
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(value, salt)
    },

    compare_pass: (pass1, pass2, callback) => {
        const bcrypt = require('bcryptjs')
        const result = bcrypt.compareSync(pass1, pass2)
        return callback(result)
    },

    tokenize: (payload, callback) => {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRY})
        return callback(token)
    }
}

module.exports = Util