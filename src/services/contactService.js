import User from '../models/User';

async function addContact(currentEmail, contactEmail) {
    if (currentEmail != contactEmail) {
        try {
            const currentUser = await User.getUserByEmail(currentEmail);
            const contactUser = await User.getUserByEmail(contactEmail);
            await currentUser.addContact(contactUser._id);
            await contactUser.addContact(currentUser._id);

            return contactUser;
        }
        catch (e) {
            console.log(e);
            throw 'contact not added'
        }
    }
    else {
        return 'Cannot add yourself to your contact dumbo'
    }

};


module.exports = {
    addContact,
}