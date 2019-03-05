/**
 * Require all modules and dependencies
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mySecretKey");
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            status: 401,
            error: error
        });
    }
}