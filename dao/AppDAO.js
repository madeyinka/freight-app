const Resp = require('./Response')

const AppInit = {

    _book_cargo: (param, id, callback) => {
        const error = []
        if (!param.from.name)error.push('Sender name is required')
        if (!param.from.address)error.push('Sender Address is required')
        if (!param.from.phone)error.push('Sender Phone Number is required')
        if (!param.to.name)error.push('Receiver name is required')
        if (!param.to.state)error.push('Recipient state is required')
        if (!param.to.address)error.push('Recipient Address is required')
        if (!param.to.phone)error.push('Recipient Phone Number is required')

        if (error.length === 0) {
            const bookingModel = require('./../model/Booking')
            const data = {origin:{name:param.from.name, address:param.from.address, phone:param.from.phone, company:param.from.company, state:param.from.state}, 
                         destination:{name:param.to.name, address:param.to.address, state:param.to.state, phone:param.to.phone, city:param.to.city, company:param.to.company},
                         act_weight:param.act_weight, vol_weight:param.vol_weight, cost:param.cost, fragile:param.fragile, user:id}
            bookingModel.create(data, (err, resp) => {
                if (resp && resp._id) {
                    return callback(Resp.success({msg:'Booking request successful', resp:resp}))
                } else 
                    return callback(Resp.error({msg:'Error Encountered', resp:null}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    }
}

module.exports = AppInit