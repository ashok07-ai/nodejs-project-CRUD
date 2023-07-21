const express = require("express");
const { registerUser, currentUser, loggedInUser } = require("../controllers/userController");
const validateToken = require("../middleware/ValidateTokenHandler");
const router = express.Router();

// Routes for User
router.route("/registerUser").post(registerUser)
router.route("/currentUser").get(validateToken, currentUser)
router.route("/login").post(loggedInUser)

module.exports = router