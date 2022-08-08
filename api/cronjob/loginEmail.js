const cronJob = require("cron").CronJob
const logger = require("../logger")


async function sendEmailAfterRegister() {
    logger.info("CronJob Started")
    try {
        logger.info("Under try function")
    } catch (err) {
        logger.error("Error occured", err)
    }
    logger.info('Sending mail')
}

const expiringCertificatesJob = new cronJob("0 18 * * *", sendEmailAfterRegister, undefined, true, "America/New_York", console.log("hello world"))


module.exports = {
    expiringCertificatesJob,
    sendEmailAfterRegister,
}