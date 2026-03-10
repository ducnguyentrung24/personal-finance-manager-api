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

exports.getMe = async (req, res, next) => {
    try {
        return successResponse(res, req.user, 'Current user');
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        await authService.changePassword(req.user._id, oldPassword, newPassword);

        return successResponse(res, null, 'Password changed successfully');
    } catch (error) {
        next(error);
    }
};

exports.updateMe = async (req, res, next) => {
    try {
        const updatedUser = await authService.updateMe(req.user._id, req.body);

        return successResponse(res, updatedUser, 'Profile updated successfully');
    } catch (error) {
        next(error);
    }
};