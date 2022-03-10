const express = require("express")
const { processPayment, sendStripeApiKey } = require("../controller/paymentController")

const { isAutheticated } = require("../middleware/auth")
const router = express.Router()

router.route("/payment/process").post(isAutheticated, processPayment)

router.route("/stripeapikey").get(isAutheticated, sendStripeApiKey)




module.exports = router
