const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, "Please enter the description"],
    },
    price: {
        type: String,
        required: [true, "Please enter the price"],
        maxlength: [8, "Price cannot exceed more than 8characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        required: [true, "Please enter the stock"],
        maxlength: [4, "stock cannot exceed morre than 4"],
        default: 1
    },
    category: {
        type: String,
        required: [true, "Please enter the category"],
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model("Product", productSchema)