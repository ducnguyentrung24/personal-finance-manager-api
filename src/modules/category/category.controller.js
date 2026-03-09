const categoryService = require('./category.service');
const { successResponse } = require('../../utils/response');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories(req.user._id);

        return successResponse(res, categories, 'Category list');
    } catch (error) {
        next(error);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.user._id, req.body);

        return successResponse(res, category, 'Category created successfully', 201);
    } catch (error) {
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id, 
            req.user._id, 
            req.body
        );

        return successResponse(res, category, 'Category updated successfully');
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await categoryService.deleteCategory(
            req.params.id, 
            req.user._id
        );

        return successResponse(res, null, 'Category deleted successfully');
    } catch (error) {
        next(error);
    }
};