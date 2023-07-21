// const User = require("../models/userModel")
const { constants } = require("../constants/statusCodeConstant")
const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//@desc Register User
//@route GET /api/registerUser
// access public
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(constants.VALIDATION_ERROR).json({ message: "All Fields Are Mendatory!!" })
        }
        userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(constants.VALIDATION_ERROR).json({ message: "User Already Exist!!" })
        }

        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if (userData) {
            res.status(constants.CREATED).json({
                message: "User Created Successfully!!",
                data: { _id: userData.id, email: userData.email }
            })
        } else {
            return res.status(constants.VALIDATION_ERROR).json({ message: "User Data is Not Valid!!" })

        }
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
}

//@desc Login User
//@route GET /api/loginUser
// access public
const loggedInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(constants.VALIDATION_ERROR).json({ message: "All Fields Are Mendatory!!" })
        }
        const user = await User.findOne({ email })
        // compare password with hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
                process.env.ACCESS_TOKEN_SECRET
            )
            res.status(constants.SUCCESSFUL_RES).json({ accessToken })
        } else {
            return res.status(constants.UNAUTHORIZED).json({ message: "No Token Provided!!" })
        }
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })
    }
}

//@desc Get Current User
//@route GET /api/currentUser
// access private
const currentUser = async (req, res) => {
    res.json({ message: "Current  User" })
}


module.exports = { registerUser, loggedInUser, currentUser }
