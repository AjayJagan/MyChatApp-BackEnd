import express from 'express';
import userController from '../controllers/userController'

const router = express.Router();

router.post('/login', userController.loginGoogleUser); 


module.exports = router;


