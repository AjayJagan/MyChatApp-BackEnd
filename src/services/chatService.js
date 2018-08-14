import Message from '../models/Message';

 async function sendMessage(connections,from, to, message){
  //  console.log(connections)
    const messageObject = new Message({
        from,
        to,
        message,
        sent_at: new Date(),
    });

    messageObject.save((err, savedMessage)=>{
        if(err){
            throw err;
        }
        else{
            (connections[to] || []).map((recipient) =>{
                recipient.emit('onReceiveMessage',savedMessage,()=>{
                    messageObject.save();
                })
            });
           (connections[from] || []).map((sender)=>{
                sender.emit('onSentMessage',savedMessage);
           })
        }
    })
 };

 async function loadMessages(recipient, sender){
     //console.log('in service')
     return await Message.getMessages(recipient,sender);
 }

 module.exports ={
     loadMessages,
     sendMessage
 }