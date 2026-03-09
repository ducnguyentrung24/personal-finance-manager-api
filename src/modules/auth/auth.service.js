const User = require('../user/user.model');
const ApiError = require('../../utils/ApiError');
const { generateToken } = require('../../utils/jwt');

exports.register = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'Email already in use');
    }

    const user = await User.create({ 
        name, 
        email, 
        password 
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

exports.login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (!user.isActive) {
        throw new ApiError(403, 'Your account is blocked. Please contact support.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const token = generateToken({
        id: user._id,
        role: user.role
    });

    return { token };
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        throw new ApiError(400, 'Old password is incorrect');
    }

    user.password = newPassword;

    await user.save();

    return true;
};