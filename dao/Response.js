const Response = {
    error: (data) => {
        return Response.handleResponse(data, 'error')
    },

    success: (data) => {
        return Response.handleResponse(data, 'success')
    },

    handleResponse: (data, type) => {
        let _status = false, _resp = [], _msg = ""
        if (type === "error") _status = true
        if (data.resp) _resp = data.resp
        if(data.msg) _msg = data.msg

        const response = {"error": _status, "message":_msg, "response":_resp}

        return response
    }
}

module.exports = Response