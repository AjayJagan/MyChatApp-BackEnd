import contactService from '../services/contactService';
import userService from '../services/userService';

async function addContact(req, res) {
    const currentEmail = req.user.email;
    const contactEmail = req.body.email;
    try {
        console.log(currentEmail, contactEmail)
        const user = await contactService.addContact(currentEmail, contactEmail);
        res.send(user);
    }
    catch (e) {
        res.status(200).send(e);
    }
};

async function getAllContacts(req, res){
    // Promise.all((await userService.getUserByEmail(req.user.email)).contacts.map(id => userService.getUserById(id))).then(contactList => res.send(contactList));
    const user = await userService.getUserByEmail(req.user.email);
    //console.log(user);
    const contactIdList = user.contacts;
    //const contactList =[];
    const promises = [];
    try{
        contactIdList.map((id) => {
            promises.push(userService.getUserById(id));
        })
        Promise.all(promises).then((contactList) => res.send(contactList));
    }
    catch(e){
        res.status(200).send(e);
    }
}

async function getOneUser(req, res){
    try{
        const user =await userService.getUserByEmail(req.body.email);
        res.send(user);
    }
    catch(e){
        res.status(200).send(e)
    }
}

module.exports ={
    addContact,
    getAllContacts,
    getOneUser,
}
