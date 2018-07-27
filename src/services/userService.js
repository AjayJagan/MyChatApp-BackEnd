import {OAuth2Client}  from 'google-auth-library';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

const client = new OAuth2Client(config.CLIENT_ID);

//To verify the token id 
async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: config.CLIENT_ID,
    });

    //contain user details
    return ticket.getPayload();
};

//generates a jwt token for encryption
function generateJWTToken(email, password, id) {
    return jwt.sign({ email, password, id }, config.SECRET);
};

//verifying the jwt token everytime
async function verifyJWTToken(token) {
    try {
        return jwt.verify(token, config.SECRET);
    }
    catch (e) {
        return false;
    }
};

//create user in db
async function registerUser(email, name, picture) {
    //console.log("inside register user 1")
    return await User.registerUser(email, name, picture);
}

//get the user by email from db
async function getUserByEmail(email) {
    return await User.getUserByEmail(email);
  }

async function getUserById(id) {
    return await User.getUserById(id);
}
  

module.exports = {
    verifyGoogleToken,
    generateJWTToken,
    verifyJWTToken,
    registerUser,
    getUserByEmail,
    getUserById,
};
