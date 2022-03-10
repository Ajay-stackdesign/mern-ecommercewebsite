module.exports = (working) => (req, res, next) => {
    Promise.resolve(working(req, res, next)).catch(next)
}