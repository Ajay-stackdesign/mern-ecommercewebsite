const catchAsyncError = require("../middleware/catchAsyncError")
const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorhandler");
// const User = require("../models/userModels")
const Product = require("../models/productModel")

exports.createOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    })
})

// get Single Order 

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHander("order not found with this Id:", 404))
    }

    res.status(200).json({
        success: true,
        order,
    })
})

// get logged in user Orders

exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

// get all Orders --- (Admin)

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        orders
    })
})

// update order --admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHander("order not found with this id", 404))
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered tthis order", 400))
    }
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity)
        })
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


// delete order -- Admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHander("order not found", 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: "order Deleted by Amdin"
    })
})