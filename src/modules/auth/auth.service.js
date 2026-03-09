const User = require('../user/user.model');
const ApiError = require('../../utils/ApiError');

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