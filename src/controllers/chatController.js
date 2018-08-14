import chatService from '../services/chatService';

async function loadMessagesFromDB(req, res){
    const recipient = req.body.email;
    const sender =req.user.email;
    //console.log("in controller")
    try{
       // console.log("inside try", recipient, sender)
    const messages = await chatService.loadMessages(recipient, sender);
    //console.log(messages);
    res.send(messages)
    }
    catch(err){
        res.status(200).send(err);
    }

}

module.exports={
    loadMessagesFromDB,
}