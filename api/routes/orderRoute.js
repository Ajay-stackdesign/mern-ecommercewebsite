const express = require("express")
const { createOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController")
const { isAutheticated, autorizesRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/order/new").post(isAutheticated, createOrder)

router.route("/order/:id").get(isAutheticated, getSingleOrder)

router.route("/orders/me").get(isAutheticated, myOrders)

router.route("/admin/orders").get(isAutheticated, autorizesRoles("admin"), getAllOrders)

router.route("/admin/order/:id").put(isAutheticated, autorizesRoles("admin"), updateOrder)

router.route("/admin/order/:id").delete(isAutheticated, autorizesRoles("admin"), deleteOrder)


module.exports = router 