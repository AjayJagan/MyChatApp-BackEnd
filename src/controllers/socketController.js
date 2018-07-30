import io from 'socket.io';
import userService from '../services/userService';
import {sendMessage} from '../services/chatService';


const connectedSockets = {};

async function init(server) {
  const socket = io(server);
  socket.on('connection', async (connection)=>{
      const token = connection.handshake.query.token;
      const payload = await userService.verifyJWTToken(token);
      if(!payload){
          connection.close();
      }
      else{
          connection.email = payload.email;
          if(!connectedSockets[connection.email]){
              connectedSockets[connection.email]=[];
          }
          connectedSockets[connection.email].push(connection);
          console.log(connection.email, 'is now connected');
        
      }
    connection.on('chatMessage',(data)=>{
        console.log(data)
        sendMessage(connectedSockets, connection.email, data.to, data.message);
    })
  });
 
};

module.exports = init;