const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
// console.log(fileUpload)
// const dotenv = require("dotenv")
const errorMiddleware = require("./middleware/error")
const path = require("path")

// dotenv.config({ path: "api/config/.env" })
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "api/config/.env" });
}


app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload())


const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/paymentRoute")

app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)
app.use("/api/v1", paymentRoute)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)
module.exports = app