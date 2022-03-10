const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the username"],
        maxlength: [12, "the username should not be more than 12 characters"],
        minlength: [4, "the username should be more than 4"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        validate: [validator.isEmail, "Please eneter the valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please enter the password"],
        minlength: [8, "password should be more than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// // Generating reset passworrd token
// userSchema.methods.getResetPasswordToken = function () {
//     // generating token
//     const resetToken = crypto.randomBytes(20).toString("hex")

//     // Hashing and adding resetpasswordToken to Userschema
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken)
//         .digest("hex")

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

//     return resetToken
// }

// module.exports = new mongoose.model("User", userSchema)
// Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//     // Generating Token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hashing and adding resetPasswordToken to userSchema
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// };
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken)
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    console.log(this.resetPasswordExpire)
    return resetToken;
    // console.log(resetToken)
};

module.exports = new mongoose.model("User", userSchema)