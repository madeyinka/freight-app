const mongoose = require('mongoose')

const schemaDef = new mongoose.Schema({
    origin:{type:Object, default:null},
    destination:{type:Object, default:null},
    act_weight:{type:Number, default:null},
    vol_weight:{type:Number, default:null},
    cost:{type:Number, default:null},
    fragile:{type:Boolean, default:0},
    user:{type:String, default:""},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Booking', schemaDef)