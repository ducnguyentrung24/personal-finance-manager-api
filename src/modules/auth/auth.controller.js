const authService = require('./auth.service');
const { successResponse } = require('../../utils/response');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        return successResponse(res, user, 'User registered successfully', user);
    } catch (error) {
        next(error);
    }
};