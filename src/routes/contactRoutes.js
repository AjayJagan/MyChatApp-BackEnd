import express from 'express';
import authenticator from '../middlewares/authenticator';
const router = express.Router();
import {addContact, getAllContacts, getOneUser} from '../controllers/contactController';


router.post('/add', authenticator, addContact);
router.get('/getAllContacts', authenticator, getAllContacts);
router.post('/getOneUser', authenticator , getOneUser);


module.exports = router;
