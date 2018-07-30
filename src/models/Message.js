import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  sent_at: Date,
});

const Message = mongoose.model('Message', messageSchema, 'Message');

module.exports = Message;