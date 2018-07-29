import userService from '../services/userService';

async function loginGoogleUser(req, res) {
    const payload = await userService.verifyGoogleToken(req.body.token);
    let userObject = await userService.getUserByEmail(payload.email);
    if (!userObject) {
        userObject = await userService.registerUser(payload.email, payload.name, payload.picture);
    }
    const token = userService.generateJWTToken(userObject.email, userObject.name, userObject.picture);
    res.json(Object.assign({}, payload, { token }))

}



module.exports = {
    loginGoogleUser,
};