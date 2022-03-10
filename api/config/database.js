const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://ajaysahani:wfuZBTwTqEIF0mXt@ecommerce.s8tjf.mongodb.net/Ecommerce?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
        .then((data) => {
            console.log(`mongodb connected to with server: ${data.connection.host}`)
        }).catch((err) => {
            console.log(err)
        })
}

module.exports = connectDatabase