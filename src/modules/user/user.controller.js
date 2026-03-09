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

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);

        return successResponse(res, user, "User details");
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);

        return successResponse(res, user, "User created successfully", 201);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        return successResponse(res, user, "User updated successfully");
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);

        return successResponse(res, null, "User deleted successfully");
    } catch (error) {
        next(error);
    }
};

exports.deleteManyUsers = async (req, res, next) => {
    try {
        const { ids } = req.body;
        const result = await userService.deleteManyUsers(ids);

        return successResponse(res, result, "Users deleted successfully");
    } catch (error) {
        next(error);
    }
};

exports.lockUser = async (req, res, next) => {
    try {
        const user = await userService.lockUser(req.params.id);

        return successResponse(res, user, "User locked");
    } catch (error) {
        next(error);
    }
};

exports.unlockUser = async (req, res, next) => {
    try {
        const user = await userService.unlockUser(req.params.id);
        
        return successResponse(res, user, "User unlocked");
    } catch (error) {
        next(error);
    }
};