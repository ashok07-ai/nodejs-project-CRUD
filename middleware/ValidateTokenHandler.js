const jwt = require("jsonwebtoken");
const { constants } = require("../constants/statusCodeConstant");

const validateToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(constants.UNAUTHORIZED).json({ message: "User is not Authorized!!" })
                }
                req.user = decoded.user;
                next();
            });
            if (!token) {
                return res.status(constants.UNAUTHORIZED).json({ message: "User is not Authorized!!" })
            }
        }
    } catch (error) {
        res.status(constants.SERVER_ERROR).json({ message: error.message })

    }
}

module.exports = validateToken