import mongoose from 'mongoose';
import { resolve } from 'dns';

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  sent_at: Date,
});

messageSchema.statics.getMessages = async function (recipient, sender) {
 // console.log("in model",recipient,sender)
  return new Promise((resolve, reject) => {
    this.find({
      $or: [
        {
          from: recipient,
          to: sender,
        },
        {
          from: sender,
          to: recipient,
        }
      ]
    }, (err, messages) => {
      if (err) {
        reject(arr);
      } else {
        resolve(messages);
      }
    })
  });
}
const Message = mongoose.model('Message', messageSchema, 'Message');

module.exports = Message;