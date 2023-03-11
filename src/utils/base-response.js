function generateBaseResponse(data, err) {
    if (err == null) {
        return {
            success: true,
            message: null,
            data: data
        }
    } else {
        return {
            success: false,
            message: err,
            data: null
        }
    }
}

module.exports =  generateBaseResponse