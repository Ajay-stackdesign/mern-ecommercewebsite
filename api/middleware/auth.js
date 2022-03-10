
const jwt = require("jsonwebtoken")
const User = require("../models/userModels")

exports.isAutheticated = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)
    if (!token) {
        return res.status(500).json("Please Login To acces this resource")
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)

    next();
}

exports.autorizesRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({
                message: `Role: ${req.user.role} is not allowed to access this resource`
            })
        }
        next();
    }
}