exports.successResponse = (res, data, message = 'Success') => {
    return res.json({
        success: true,
        message,
        data
    })
};

exports.errorResponse = (res, error, message = 'Error', statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message
    })
};