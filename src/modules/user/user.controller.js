const userService = require('./user.service');
const { successResponse } = require('../../utils/response');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        return successResponse(res, users, "User list");
    } catch (error) {
        next(error);
    }
};

