import Message from '../models/Message';

 export const sendMessage = (connections,from, to, message) =>{
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
            })
        }
    })
 }