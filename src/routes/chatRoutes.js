import express from 'express';
import authenticator from '../middlewares/authenticator';
const router = express.Router();
import {loadMessagesFromDB} from '../controllers/chatController';

router.post('/loadMessage',authenticator,loadMessagesFromDB);

module.exports = router;