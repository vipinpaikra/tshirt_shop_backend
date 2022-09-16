const Category = require("../models/Category");
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category is not found in DB",
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB",
            });
        }
        res.json(category);
    });
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found",
            });
        }
        res.json(categories);
    });
};
exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.updateCategory = (req, res) => {
    console.log(req.category);
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: { name: "hi" } }
    )
        .then((data) => {
            res.json();
        })
        .catch((err) => console.log(err));
};

exports.deleteCategory = (req, res) => {
    console.log(req);
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete category",
            });
        }
        res.json({
            message: "Successfully deleted",
        });
    });
};
