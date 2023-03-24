const mongoose = require('mongoose')

const schemaDef = new mongoose.Schema({
    firstname: {type:String, default:""},
    lastname:{type:String, default:""},
    email: {type:String, default:"", unique:true},
    company: {type:String, default:""},
    phone:{type:String, default:""},
    password:{type:String},
    country: {type:String, default:""},
    state:{type:String, default:""},
    city:{type:String, default:""},
    address1:{type:String, default:""},
    address2:{type:String, default:""},
    postcode:{type:String, default:""},
    key:{type:String, default:""},
    status:{type:Boolean, default:0},
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model('Users', schemaDef)