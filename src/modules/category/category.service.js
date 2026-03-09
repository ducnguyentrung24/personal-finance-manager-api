const Category = require('./category.model');
const ApiError = require('../../utils/ApiError');

exports.getCategories = async (userId) => {
    const categories = await Category.find({ userId }).sort({ createdAt: -1 });

    return categories;
};

exports.createCategory = async (userId, data) => {
    const existingCategory = await Category.findOne({ 
        name: data.name, 
        type: data.type, 
        userId 
    });

    if (existingCategory) {
        throw new ApiError(400, 'Category with the same name and type already exists');
    }

    const category = await Category.create({ 
        ...data, 
        userId 
    });

    return category;
};

exports.updateCategory = async (id, userId, data) => {
    const category = await Category.findOne({
        _id: id, 
        userId 
    });

    if (!category) {
        throw new ApiError(404, 'Category not found');
    }

    Object.assign(category, data);
    await category.save();

    return category;
};

exports.deleteCategory = async (id, userId) => {
    const category = await Category.findOneAndDelete({
        _id: id, 
        userId 
    });

    if (!category) {
        throw new ApiError(404, 'Category not found');
    }

    return true;
};

