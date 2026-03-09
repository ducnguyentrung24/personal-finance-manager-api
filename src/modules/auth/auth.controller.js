const authService = require('./auth.service');
const { successResponse } = require('../../utils/response');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        return successResponse(res, user, 'User registered successfully', 201);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        return successResponse(res, result, 'Login successful');
    } catch (error) {
        next(error);
    }
};