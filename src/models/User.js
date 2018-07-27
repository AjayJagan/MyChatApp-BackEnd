import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
    contacts: [String]
});

userSchema.statics.registerUser = async function (email, name, picture) {
    return new Promise((resolve, reject) => {
        //  console.log("inside model")
        const u = new this({
            email,
            name,
            picture,
        });
        u.save((err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        })
    });

}

userSchema.statics.getUserByEmail = async function (email) {
    return new Promise((resolve, reject) => {
        this.findOne({ email }, (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        });
    });
} 

userSchema.statics.getUserById = async function (id) {
    return new Promise((resolve, reject) => {
        this.findOne({ _id: id }, { contacts: 0 } , (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        });
    });
} 

userSchema.methods.addContact = async function (emailId) {
    return new Promise((resolve, reject) => {
        if(this.contacts.indexOf(emailId)==-1){
        this.contacts.push(emailId);
        }
        this.save((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(this);
            }
        })
    })
}

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;