const Product = require("../models/productModel")
const ApiFeature = require("../utils/apiFeature")
const catchAsyncError = require("../middleware/catchAsyncError")
// const ErrorHandler = require("../utils/errorhandler")
const ErrorHander = require("../utils/errorhandler")
const cloudinary = require("cloudinary")

// exports.createProduct = catchAsyncError(async (req, res, next) => {
//     // req.body.user = req.body.id
//     const product = await Product.create(req.body)
//     // res.user.id = req.body.user
//     res.status(200).json({
//         success: true,
//         product
//     })
// })

exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    console.log(imagesLinks)

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
})

exports.getAllProduct = catchAsyncError(async (req, res, next) => {
    // return next(new ErrorHander("this is error", 404))
    // // const product = await Product.find()
    // return next(new ErrorHander("my Error", 500))
    const resultPerPage = 5
    const productsCount = await Product.countDocuments()
    const apiFeature = new ApiFeature(Product.find(), req.query)
        .search()
        .filter()
    // .pagination(resultPerPage)
    let products = await apiFeature.query;
    let filteredProductsCount = products.length

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        resultPerPage,
        productsCount,
        filteredProductsCount
    })
})

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("product not found", 500))
    }

    res.status(200).json({
        success: true,
        product
    })
})

// get Admin product

exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products,
    })
})

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json("product not found")
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product,
    })
}

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    console.log(Product)
    console.log("ajay")
    if (!product) {
        return res.status(404).json("product not found")
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove()
    res.status(200).json({
        success: true
    })
})

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    // console.log(rating)

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)
            // console.log(rev.rating)
        });
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })

    // console.log(avg)
    // product.reviews.forEach(rev => {
    //     avg += rev.rating
    //     // console.log(rev.rating)
    //     // console.log(avg)
    // })
    product.ratings = avg / product.reviews.length
    console.log(avg)
    console.log(product.reviews.length)
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});


// get All Reviews of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
