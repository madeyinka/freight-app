const config = require('./../config/app.json')
const dotenv = require('dotenv').config()

const Connector = {
    _mongo: null,
    _ses: null,

    MongoDB: () => {
        if (Connector._mongo === null) {
            const mongoose = require('mongoose')
            const url = process.env.NODE_ENV == 'development' ? 'mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.db :
                          process.env.MONGODB_URL
            Connector._mongo = mongoose.connection
            Connector._mongo.once('open', () => {console.log('Database Connection Initiated')})
            Connector._mongo.on('error', () => {console.log('Error Connecting to Database'); process.exit(1)})
            mongoose.Promise = global.Promise
            mongoose.set('strictQuery', false);
            mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            return Connector._mongo
        }
    },

    SES: () => {
        if (Connector._ses === null) {
            const AWS = require('aws-sdk')
            Connector._ses = new AWS.SES()
        }
        return Connector._ses
    }

}

module.exports = Connector