const fs = require('fs')
const path = require('path')
const handlebar = require('handlebars')

const Util = {

    sendMail: (data, callback) => {
        const Connector = require('./../libraries/Connector')
        const _client = Connector.SES(), params = {}
        const templatePath = fs.readFileSync(path.join(__dirname, '../template/'+data.template+'.hbs'), 'utf8')
        const template = handlebar.compile(templatePath)
        const html = template(data.msg)
        params.Destination = {ToAddresses:data.recipient}
        params.Message = {Body:{Html:{Data:html}}, Subject:{Data:data.subject}}
        params.Source = data.sender
        const result = _client.sendEmail(params).promise()
        result
        .then(data =>  callback({error:false, msg:data}))
        .catch(error => callback({error:true, msg:error.message}))
    }

}

module.exports = Util