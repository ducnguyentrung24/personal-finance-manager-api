const User = require('./user.model');

exports.getUsers = async () => {
    const users = await User.find();

    return users;
};

