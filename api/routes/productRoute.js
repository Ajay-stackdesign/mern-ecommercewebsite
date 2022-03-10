// const { cerateProduct } = require("../controller/productController")

const express = require("express")

const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductDetail, getAdminProduct, createProductReview, getProductReviews, deleteReview } = require("../controller/productController")
const { isAutheticated, autorizesRoles } = require("../middleware/auth")
const router = express.Router()

router.route("/admin/product/new").post(isAutheticated, autorizesRoles("admin"), createProduct)

router.route("/products").get(getAllProduct)

router.route("/admin/products").get(isAutheticated, autorizesRoles("admin"), getAdminProduct)

router.route("/product/:id").get(getProductDetail)

router.route("/admin/product/:id").put(isAutheticated, autorizesRoles("admin"), updateProduct)

router.route("/admin/product/:id").delete(isAutheticated, autorizesRoles("admin"), deleteProduct)

router.route("/review").put(isAutheticated, createProductReview)

router.route("/reviews").get(isAutheticated, getProductReviews)

router.route("/reviews").delete(isAutheticated, deleteReview)

module.exports = router