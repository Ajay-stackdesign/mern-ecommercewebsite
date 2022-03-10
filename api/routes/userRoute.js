const express = require("express")
const router = express.Router()
const { resisterUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controller/userController")
const { isAutheticated, autorizesRoles } = require("../middleware/auth")


router.route("/register").post(resisterUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)


router.route("/logout").get(logoutUser)

router.route("/me").get(isAutheticated, getUserDetails)

router.route("/password/update").put(isAutheticated, updatePassword)

router.route("/me/update").put(isAutheticated, updateProfile)

router.route("/admin/users").get(isAutheticated, autorizesRoles("admin"), getAllUser)

router.route("/admin/user/:id").get(isAutheticated, autorizesRoles("admin"), getSingleUser)

router.route("/admin/user/:id").put(isAutheticated, autorizesRoles("admin"), updateUserRole)

router.route("/admin/user/:id").delete(isAutheticated, autorizesRoles("admin"), deleteUser)

module.exports = router