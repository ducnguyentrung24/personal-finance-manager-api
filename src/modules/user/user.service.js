const User = require('./user.model');
const { userRoles } = require('../../constants/userRoles');
const ApiError = require('../../utils/ApiError');

exports.getUsers = async () => {
    return await User.find();
};

exports.getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};

exports.createUser = async (data) => {
    const { email } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'Email already in use');
    }

    const user = await User.create(data);
    return user;
};

exports.updateUser = async (id, data) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (data.email && data.email !== user.email) {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new ApiError(400, 'Email already in use');
        }
    }

    Object.assign(user, data);
    await user.save();

    return user;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return true;
};

exports.deleteManyUsers = async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'User ids are required');
    }

    const adminUser = await User.findOne({ 
        _id: { $in: ids }, 
        role: userRoles.ADMIN
    });

    if (adminUser) {
        throw new ApiError(403, 'Admin users cannot be deleted');
    }

    const result = await User.deleteMany({ _id: { $in: ids }});

    if (result.deletedCount === 0) {
        throw new ApiError(404, 'No users found to delete');
    }

    return result;
};

exports.lockUser = async (id) => {
    const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};

exports.unlockUser = async (id) => {
    const user = await User.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return user;
};