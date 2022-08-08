const { sendEmailAfterRegister } = require("./loginEmail")
require("dotenv").config()


async function start() {
    await sendEmailAfterRegister();
    console.log("Manual cronjob Started")
}

start();