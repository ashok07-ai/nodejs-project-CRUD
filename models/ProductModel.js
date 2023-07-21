const mongoose = require("mongoose")

const productSchemma = mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please fill the product name"],
    },
    isVatApplicable: {
        type: Boolean,
        required: [true, "Please fill the vat applicable status"],
    },
    description: {
        type: String,
        required: [false],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchemma)