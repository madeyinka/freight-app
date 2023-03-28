const userModel = require('../model/User')
const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')
const {sendMail} = require('./UtilityDAO')

const AuthInit = {

    _register: (param, callback) => {
        const error = []
        if (!param.firstname)error.push('First name is required')
        if (!param.lastname)error.push('Last name is required')
        if (!param.email)error.push('Email is required')

        if (error.length === 0) {
            const data = {firstname:param.firstname, lastname:param.lastname, email:param.email, key:Util.rand_str(10)}
            userModel.create(data, (err, resp) => {
                if (resp) {
                    const link = _config.site_url+'?user='+resp._id+'&key='+resp.key
                    const mailOption = {sender:_config.emails.info, recipient:[resp.email], subject:_config.subject.confirmation,
                                        msg:{firstname:resp.firstname, link:link}, template:_config.templates.confirmation }
                    sendMail(mailOption, (state) => {
                        console.log(state)
                        if (state) 
                            return callback(Resp.success({msg:'Success, Check your mail to complete registration', resp:resp}))
                        else
                            return callback(Resp.error({msg:"Colud not send e-mail at this time.", resp:null}))
                    })
                } else {
                    return callback(Resp.error({msg:'Could not submit data', resp:null}))
                }
            })
        } else {
            return callback(Resp.error({msg:'Inavlid Parameter', resp:error}))
        }
    },

    _update_user: (param, id, key, callback) => {
        const error = [], data = {}
        if (!id)error.push('Provide user id')
        if (!key) error.push('Provide access key')
        if (param.phone)data.phone = param.phone
        if (param.password)data.password = Util.hash_password(param.password)
        if (param.company)data.company = param.company
        if (param.country)data.country = param.country
        if (param.state)data.state = param.state
        if (param.city)data.city = param.city
        if (param.address1)data.address1 = param.address1
        if (param.address2)data.address2 = param.address2
        if (param.postcode)data.postcode = param.postcode; data.status = 1
        if (error.length === 0) {
            userModel.findOne({_id:id}).exec((err, user) => {
                if (err)
                    return callback(Resp.error({msg:"User not found", resp:null}))
                else {
                    if (Util.match_key(key, user.key)){
                        data.key = Util.rand_str(10)
                        userModel.findByIdAndUpdate(id, data, {new:true}, (err, resp) => {
                            if (err)
                                return callback(Resp.error({msg:'Something went wrong', resp:null}))
                            else
                                return callback(Resp.success({msg:'User Activated', resp:resp}))
                        })
                    } else 
                        return callback(Resp.error({msg:'Link is not active', resp:null}))
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    _login_user: (param, callback) => {
        const error = []
        if (!param.email)error.push('Email is required')
        if (!param.password)error.push('Password is required')

        if (error.length === 0) {
            userModel.findOne({email:param.email}).exec((err, user) => {
                if (err)
                    return callback(Resp.error({msg:'User not found.', resp:null}))
                Util.compare_pass(param.password, user.password, (match) => {
                    if (match) {
                        if (user.status) {
                            const payload = {}
                            Util.tokenize(payload, (token) => {
                                return callback(Resp.success({msg:'Login Successful', resp:token}))
                            })
                        } else 
                            return callback(Resp.error({msg:'Account not activated', resp:null}))
                    } else 
                        return callback(Resp.error({msg:'Invalid Credentials', resp:null}))
                })
            })
        }
    }
}

module.exports = AuthInit