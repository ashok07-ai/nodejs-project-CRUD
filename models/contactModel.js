const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please fill the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "Please fill the contact phone number"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Contact", contactSchema)