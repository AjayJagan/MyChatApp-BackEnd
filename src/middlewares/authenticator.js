import userService from '../services/userService'

async function authenticator(req, res, next) {
    const payload = await userService.verifyJWTToken(req.headers.authorization);
    if (!payload) {
        res.status(403).send("Unauthorized Login");
        return;
    }
    req.user = payload;
    next();
};

module.exports = authenticator;
