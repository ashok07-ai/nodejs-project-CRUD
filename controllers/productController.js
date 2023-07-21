const Product = require("../models/ProductModel")
const { constants } = require("../constants/statusCodeConstant")

//@desc Get All Products
//@route GET /api/products
// access public
const getAllProduct = async (req, res) => {
    const products = await Product.find();
    res.status(constants.SUCCESSFUL_RES).json({
        data: products
    })
}

//@desc Create Product
//@route POST /api/products
// access public
const createProduct = async (req, res) => {
    try {
        const { productName, isVatApplicable, description } = req.body
        if (!productName || !isVatApplicable || !description) {
            return res.status(constants.VALIDATION_ERROR).json({
                message: "Fields are Mandatory!!"
            })
        }
        const product = await Product.create({
            productName,
            isVatApplicable,
            description
        })
        res.status(constants.CREATED).json({
            message: "Product Created Successfully!!",
            data: product
        })

    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
}

//@desc Get Product by Id
//@route GET /api/product/:id
// access public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(constants.NOT_FOUND).json({ message: "Product Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({
            data: product
        });
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
};

//@desc Update Contact
//@route PUT /api/contacts/:id
// access public
const updateProduct = async (req, res) => {
    try {
        const updatedData = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedData) {
            return res.status(constants.NOT_FOUND).json({ message: "Contact Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({
            message: "Product Updated Successfully!!",
            data: updatedData,
        })
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })

    }
}

//@desc Delete Product
//@route DELETE /api/product/:id
// access public
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(constants.NOT_FOUND).json({ message: "Product Not Found!!" });
        }
        res.status(constants.SUCCESSFUL_RES).json({ message: "Product Deleted Successfully!!" })
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })

    }
}

module.exports = {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
