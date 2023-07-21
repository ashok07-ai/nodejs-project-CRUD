const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
        unique: [true, "Email already registered"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    }
})

module.exports = mongoose.model("User", userSchema)