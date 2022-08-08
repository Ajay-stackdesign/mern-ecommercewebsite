const winston = require("winston")

const tsFormat = () => (new Date()).toLocaleTimeString()
module.exports = logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.simple()
            ),
            level: 'info'
        }),
        new (require("winston-daily-rotate-file"))({
            filename: `logs/log-results.log`,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            )
        }),
        new winston.transports.File({
            filename: `logs/error.log`,
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
            )
        }),
    ]
})