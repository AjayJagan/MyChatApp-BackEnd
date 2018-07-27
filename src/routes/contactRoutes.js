import express from 'express';
import authenticator from '../middlewares/authenticator';
const router = express.Router();
import {addContact, getAllContacts} from '../controllers/contactController';


router.post('/add', authenticator, addContact);
router.get('/getAllContacts', authenticator, getAllContacts);


module.exports = router;
