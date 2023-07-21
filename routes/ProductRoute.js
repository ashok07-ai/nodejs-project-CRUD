const express = require("express");
const router = express.Router();
const {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController")

// Routes for Product
router.route("/").get(getAllProduct).post(createProduct)
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct)

module.exports = router